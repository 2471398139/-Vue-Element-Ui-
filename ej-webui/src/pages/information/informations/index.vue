<!--
 * @Description: 
 * @Version: 1.0
 * @Autor: xuxu
 * @Date: 2021-09-06 16:02:22
 * @LastEditors: xuxu
 * @LastEditTime: 2021-09-10 10:36:48
-->
<template>
  <div class="production">
    <!-- 查询 -->
    <div class="btns">
      <!-- 检索框 -->
      <el-form :inline="true" :model="params" size="small">
        <!-- 按名称查找 -->
        <el-form-item>
          <el-input v-model="params.title" placeholder="请输入名称"></el-input>
        </el-form-item>
        <!-- /按名称查找 -->
        <el-form-item>
          <el-select v-model="params.status" placeholder="请选择状态" clearable>
            <el-option label="未审核" value="未审核"></el-option>
            <el-option label="审核通过" value="审核通过"></el-option>
            <el-option label="审核不通过" value="审核不通过"></el-option>
            <el-option label="推荐" value="推荐"></el-option>
          </el-select>
        </el-form-item>
        <!-- 按栏目查找 -->
        <el-form-item>
          <el-select v-model="params.id" placeholder="请选择栏目" clearable >
            <el-option
              :label="item.name"
              :value="item.id"
              v-for="(item, index) of Information"
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
          @click="pageQueryInformation"
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
        <!-- 图片 -->
        <el-table-column label="图片" prop="">
          <template v-slot="scope">
              <img :src="scope.row.cover" alt="图片丢失" width="150" />
          </template>
        </el-table-column>
        <!-- 图片 -->
        <el-table-column label="风采" prop="title">
            <template v-slot="scope">
                <el-card class="box-card">
                <div>{{scope.row.title}}</div>
                <div>{{scope.row.category.name}}</div>
                <div v-if="scope.row.baseUser != null">{{scope.row.baseUser.realname}}</div>
                <div>{{scope.row.publishTime | fmtDate}}</div>
                </el-card>
            </template>
        </el-table-column>
        <el-table-column label="状态" prop="status">
          <template v-slot="scope">
            <el-tag v-if="scope.row.status == '推荐'" type="warning">{{ scope.row.status }}</el-tag>
            <el-tag  v-else-if="scope.row.status == '审核通过'" type="success">{{scope.row.status}}</el-tag>
            <el-tag  v-else type="danger">{{scope.row.status}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template v-slot="scope">
            <el-button type="text" @click="editHandler" style="color:green">推荐</el-button>
            <el-button type="text" @click="delHandler(scope.row.id)" style="color: red">删除</el-button>
            <el-button type="text" @click="offineHandler(scope.row.id, $event)">审核</el-button>
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
    </div>
  </div>
</template>
<script>
import request from "@/utils/request";
import { mapActions } from "vuex";
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
      Information: [],
      production: {},
      formLabelWidth: "80px",
      imageUrl: null,
    };
  },
  methods: {
    // 导入状态机方法
    ...mapActions("information", ["findAllInformation"]),
    // 分页查询资讯栏目
    async pageQueryInformation() {
      // 过滤数据 将空字符串删除
      for (let key in this.params) {
        if (this.params[key] == "") {
          delete this.params[key];
        }
      }
      let res = await request.get("/article/pageQuery", {
        params: this.params,
      });
      this.resData = res.data;
    },
    // page改变事件
    pageChangeHandler(page) {
      this.params.page = page;
      // 最新数据
      this.pageQueryInformation();
    },
    // pageSize改变事件
    pageSizeChangeHandler(pageSize) {
      this.params.pageSize = pageSize;
      this.pageQueryInformation();
    },
    // 推荐
    editHandler(id,status) {
      {
            this.$confirm('确定要推荐此资讯吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
                center: true
            }).then(() => {
                // 这里得有属性名 id : id
                request.post("/article/deleteById",{params:{id,status}}).then((res) =>{
                    this.pageQueryInformation();  //刷新数据
                    this.$message({
                    type: 'success',
                    message: res.message //提示成功删除信息
                    });
                })
            })
        }
    },
    // 删除操作事件 通过获取这一数据id来删除
        delHandler(id){
            this.$confirm('此操作将永久删除该员工信息, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
                center: true
            }).then(() => {
                // 这里得有属性名 id : id
                request.get("/article/deleteById",{params:{id}}).then((res) =>{
                    this.pageQueryInformation();  //刷新数据
                    this.$message({
                    type: 'success',
                    message: res.message //提示成功删除信息
                    });
                })
            })
        },
        // 删除事件结尾
  },
  created() {
    this.pageQueryInformation(); //分页查询
    this.findAllInformation().then((res) => {
      this.Information = res.data;
    }); //查询所有栏目
  },
};
</script>
<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
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
.text {
    font-size: 14px;
  }

  .item {
    padding: 18px 0;
  }

  .box-card {
    width: 480px;
    margin-left: 10px;
  }
</style>