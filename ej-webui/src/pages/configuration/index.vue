<!--
 * @Description: 
 * @Version: 1.0
 * @Autor: xuxu
 * @Date: 2021-09-06 15:09:41
 * @LastEditors: xuxu
 * @LastEditTime: 2021-09-06 15:09:41
-->
<template>
  <div class="production">
    <!-- 添加按钮 -->
    <div class="btns">
      <!-- 检索框 -->
      <el-form :inline="true" :model="params" size="small">
        <el-button
          type="primary"
          size="small"
          style="margin-right: 10px;margin-bottom: 10px"
          @click="toaddHandler"
          >添加</el-button
        >
      </el-form>
    </div>
    <!-- /添加按钮 -->
    <div class="content" >
    <!-- 表格内容区域 -->
    <div class="table">
        <el-table :data="resData.list" style="width: 100%">
        <el-table-column
            type="index"
            width="55"
            label="序号"
        ></el-table-column>
      
        <el-table-column prop="name" label="名称"> </el-table-column>
        <el-table-column prop="val" label="值"> </el-table-column>
        <el-table-column prop="introduce" label="介绍"> </el-table-column>
        <!-- 右侧操作列 -->
        <!-- <el-table-column label="操作">
            <template v-slot="scope">
                <el-button type="text" @click="editHandler(scope.row)" style="color: green">编辑</el-button>
                <el-button type="text" @click="delHandler(scope.row.id)" style="color: red">删除</el-button>
            </template>
        </el-table-column> -->
        <!-- /右侧操作列 -->
        </el-table>
        <!-- /表格内容区域 -->
        <!-- 分页 -->
        <el-pagination class="psz"
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
            <el-form-item label="栏目名称" :label-width="formLabelWidth" prop="name">
                <el-input v-model="production.name"></el-input>
            </el-form-item>
            <el-form-item label="序号" :label-width="formLabelWidth" prop="num">
                <el-input v-model="production.num"></el-input>
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
        title: "",
        id: "",
        name: "",
        icon: "",
        visible:false,
        imageUrl:null,
        formLabelWidth: "80px",
        production: {},
        rules: {
            name: 
            [
                { required: true, message: "请输入栏目名称", trigger: "blur" },
            ],
            id: 
            [
                {
                required: true,
                message: "请输入id",
                trigger: "change",
                },
            ],
            icon: 
            [
                { required: false, message: "请上传产品图标", trigger: "blur" }
            ],
            },
        };
    },
    methods: {
        // 导入状态机方法
        ...mapActions("category", ["findAllCategories"]),
        async pageQueryProductions() {
        let res = await request.get("/baseConfig/findAll", {
            params: this.params,
        });
        this.resData = res.data;
        },
        // 删除操作事件 通过获取这一数据id来删除
        delHandler(id){
            this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
                center: true
            }).then(() => {
                // 这里得有属性名 id : id
                request.get("/productCategory/deleteById",{params:{id}}).then((res) =>{
                    this.pageQueryProductions();  //刷新数据
                    this.$message({
                    type: 'success',
                    message: res.message //提示成功删除信息
                    });
                })
            })
        },
        // 删除事件结尾
        // 添加按钮点击事件
        toaddHandler(){
            this.imageUrl = null,
            this.visible = true;
            this.production = {};
            this.title = "添加";
        },
        // 图片上传成功回调
        handlePhotoSuccess(res, file) {
        // 将返回的图片在线地址映射到数据模型中
            this.production.photo = res;
            this.icon = res;
        },
        // 表单保存事件
        toSaveHandler() {
        this.$refs["saveForm"].validate((valid) => {
            if (valid) {
            request
                .post("/productCategory/saveOrUpdate", qs.stringify(this.production))
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
        // 编辑按钮点击事件
        editHandler(row){
            this.production = _.clone(row);
            this.title = "编辑";
            this.imageUrl = row.icon;
            this.visible = true;
        },
        // 修改按钮点击事件结尾
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
    },
    created() {
        this.pageQueryProductions();
    },
};
</script>
<style >
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  /* 分页按钮位置调整 */
  .psz{
      text-align: right;
      margin-top: 20px;
  }
  /* 内容区域位置调整 */
  .content{
      margin-left: 10px;
  }
</style>