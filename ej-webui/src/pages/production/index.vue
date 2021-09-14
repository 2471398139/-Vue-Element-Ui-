<!--
 * @Description: 
 * @Version: 1.0
 * @Autor: xuxu
 * @Date: 2021-09-03 14:03:48
 * @LastEditors: xuxu
 * @LastEditTime: 2021-09-10 19:32:04
-->
<template>
  <div class="production">
    <!-- 查询 -->
    <div class="btns">
      <!-- 检索框 -->
      <el-form :inline="true" :model="params" size="small">
        <!-- 添加按钮 -->
        <el-button
          type="primary"
          size="small"
          style="margin-right: 10px"
          @click="toaddHandler"
          >添加</el-button
        >
        <!-- /添加按钮 -->
        <!-- 按名称查找 -->
        <el-form-item>
          <el-input v-model="params.name" placeholder="请输入名称"></el-input>
        </el-form-item>
        <!-- /按名称查找 -->
        <el-form-item>
          <el-select v-model="params.status" placeholder="请选择状态">
            <el-option label="正常" value="正常"></el-option>
            <el-option label="下架" value="下架"></el-option>
          </el-select>
        </el-form-item>
        <!-- 按栏目查找 -->
        <el-form-item>
          <el-select
            v-model="params.categoryName"
            placeholder="请选择栏目"
            clearable
          >
            <el-option
              :label="item.name"
              :value="item.id"
              v-for="(item, index) of categories"
              :key="index"
            ></el-option>
          </el-select>
        </el-form-item>
        <!-- /按栏目查找 -->
        <!--搜索按钮 -->
        <el-button
          type="primary"
          size="small"
          style="margin-right: 10px"
          @click="pageQueryProductions"
          icon="el-icon-search"
          >搜索</el-button
        >
        <!-- /搜索按钮 -->
      </el-form>
    </div>
    <!-- /查询 -->
    <!-- 内容区域 -->
    <div class="content">
      <!-- 表格 -->
      <el-table :data="resData.list" style="width: 100%" size="small">
        <el-table-column type="index" label="序号"></el-table-column>
        <el-table-column label="产品编号" prop="id"></el-table-column>
        <el-table-column label="名称" prop="name"></el-table-column>
        <!-- 图片 -->
        <el-table-column label="图片" prop="">
          <template v-slot="scope">
            <el-popover placement="right" width="225" trigger="hover">
              <img :src="scope.row.photo" alt="图片丢失" width="200" />
              <img
                :src="scope.row.photo"
                alt="图片丢失"
                width="40"
                slot="reference"
              />
            </el-popover>
          </template>
        </el-table-column>
        <!-- 图片 -->
        <el-table-column label="价格" >
          <template v-slot="scope">
            {{scope.row.price}} ￥
          </template>
        </el-table-column>
        <el-table-column label="状态" prop="status">
          <template v-slot="scope">
            <el-tag
              size="mini"
              v-if="scope.row.status == '正常'"
              type="success"
              >{{ scope.row.status }}</el-tag
            >
            <el-tag size="mini" v-else type="danger">{{
              scope.row.status
            }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          label="所属栏目"
          prop="category.name"
        ></el-table-column>
        <el-table-column label="操作">
          <template v-slot="scope">
            <el-button type="text" @click="editHandler(scope, row)"
              >编辑</el-button
            >
            <el-button
              type="text"
              v-if="scope.row.status == '正常'"
              style="color: red"
              @click="offineHandler(scope.row.id, $event)"
              >下架</el-button
            >
            <el-button
              type="text"
              v-else
              style="color: green"
              @click="offineHandler(scope.row.id, $event)"
              >上架</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <!-- /表格 -->
      <!-- 分页 -->
      <el-pagination
        background
        layout="prev, pager, next, sizes"
        :total="resData.total"
        :page-size="params.pageSize"
        :current-page="params.page"
        @current-change="pageChangeHandler"
        :page-sizes="[5, 10, 15, 20]"
        @size-change="pageSizeChangeHandler"
      >
      </el-pagination>
      <!-- /分页 -->
      <!-- 模态框 -->
      <el-dialog :title="title" :visible.sync="visible" @close="dialogHandler">
        <el-form :model="production" :rules="rules" ref="saveForm">
          <el-form-item label="名称" :label-width="formLabelWidth" prop="name">
            <el-input v-model="production.name"></el-input>
          </el-form-item>
          <el-form-item
            label="所属栏目"
            :label-width="formLabelWidth"
            prop="productCategoryId"
          >
            <el-select
              v-model="production.productCategoryId"
              placeholder="请选择所属栏目"
            >
              <el-option
                :label="item.name"
                :value="item.id"
                v-for="(item, index) of categories"
                :key="index"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            label="产品价格"
            :label-width="formLabelWidth"
            prop="price"
          >
            <el-input v-model="production.price"></el-input>
          </el-form-item>
          <!-- 图片上传 -->
          <el-form-item
            label="产品图片"
            :label-width="formLabelWidth"
            prop="photo"
          >
            <el-upload
              class="avatar-uploader"
              action="https://81.69.24.232/pet/jz_upload.php"
              :show-file-list="false"
              :on-success="handlePhotoSuccess"
            >
              <img v-if="imageUrl" :src="imageUrl" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <!-- /图片上传 -->
          <el-form-item label="简介" :label-width="formLabelWidth">
            <el-input
              type="textarea"
              v-model="production.description"
            ></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="visible = false">取 消</el-button>
          <el-button type="primary" @click="toSaveHandler">确 定</el-button>
        </div>
      </el-dialog>
      <!-- /模态框 -->
    </div>
  </div>
</template>
<script>
import request from "@/utils/request";
import { mapActions } from "Vuex";
import qs from "qs";
import _clone from "lodash";
export default {
  data() {
    return {
      params: {
        page: 1,
        pageSize: 5,
      },
      resData: {},
      categories: [],
      title: "",
      visible: false,
      production: {},
      formLabelWidth: "80px",
      imageUrl: null,
      rules: {
        name: [
          { required: true, message: "产品名称不能为空", trigger: "blur" },
        ],
        productCategoryId: [
          {
            required: true,
            message: "产品所属栏目不能为空",
            trigger: "change",
          },
        ],
        price: [
          { required: true, message: "产品价格不能为空", trigger: "blur" },
        ],
        photo: [{ required: false, message: "请上传产品封面", trigger: "blur" }],
      },
    };
  },
  methods: {
    // 导入状态机方法
    ...mapActions("category", ["findAllCategories"]),
    // 分页查询产品表格
    async pageQueryProductions() {
      // 过滤数据 将空字符串删除
      for (let key in this.params) {
        if (this.params[key] == "") {
          delete this.params[key];
        }
      }
      let res = await request.get("/product/pageQuery", {
        params: this.params,
      });
      this.resData = res.data;
    },
    // page改变事件
    pageChangeHandler(page) {
      this.params.page = page;
      // 最新数据
      this.pageQueryProductions();
    },
    // pageSize改变事件
    pageSizeChangeHandler(pageSize) {
      this.params.pageSize = pageSize;
      this.pageQueryProductions();
    },
    // 添加按钮改变事件
    toaddHandler() {
      (this.imageUrl = null), (this.production = {}), (this.visible = true);
      this.title = "新增";
    },
    // 图片上传成功回调
    handlePhotoSuccess(res, file) {
      // 将返回的图片在线地址映射到数据模型中
      this.production.photo = res;
      this.imageUrl = res;
    },
    // 表单保存事件
    toSaveHandler() {
      this.$refs["saveForm"].validate((valid) => {
        if (valid) {
          request
            .post("/product/saveOrUpdate", qs.stringify(this.production))
            .then((res) => {
              this.pageQueryProductions(); //重载数据
              this.$message.success(res.message); //提示操作结果
              this.visible = false; //关闭模态框
            });
        } else {
          return false;
        }
      });
    },
    // 模态框关闭
    dialogHandler() {
      this.$refs["saveForm"].resetFields();
    },
    // 编辑
    editHandler(row) {
      this.production = _.clone(row);
      this.title = "编辑";
      this.imageUrl = row.photo;
      this.visible = true;
    },
    // 上架和下架
    offineHandler(id,e) {
      if (e.target.innerText == "下架") {
        request.get("/product/offline", { params: { id } }).then((res) =>{
          this.pageQueryProductions();
          this.$message.success(res.message); //提示信息
          
        });
      }else{
        request.get("/product/online", { params: { id } }).then((res) =>{
          this.pageQueryProductions();
          this.$message.success(res.message); //提示信息   
        })
      }
    },
  },
  created() {
    this.pageQueryProductions(); //分页查询
    this.findAllCategories().then((res) => {
      this.categories = res.data.list;
    }); //查询所有栏目
  },
};
</script>
<style>
</style>