<!--
 * @Description: 
 * @Version: 1.0
 * @Autor: xuxu
 * @Date: 2021-09-06 15:41:56
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-09-13 10:04:45
-->
<template>
  <div class="order">
    <!-- 查询 -->
    <div class="btns">
      <!-- 检索框 -->
      <el-form :inline="true" :model="params" size="small">
        <!-- 按名称查找 -->
        <el-form-item>
          <el-input v-model="params.comment" placeholder="请输入关键字"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input
            v-model="params.orderId"
            placeholder="请输入订单编号"
          ></el-input>
        </el-form-item>

        <!-- 按栏目查找 -->
        <el-form-item  prop="status">
          <el-select v-model="params.status" placeholder="请选择状态"  clearable>
            <el-option label="通过" value="通过" ></el-option>
            <el-option label="不通过" value="不通过"></el-option>
          </el-select>
        </el-form-item>
        <!-- /按栏目查找 -->
        <!--搜索按钮 -->
        <el-button
          type="primary"
          size="small"
          style="margin-right: 10px"
          @click="pageQueryOrderComment"
          icon="el-icon-search"
          >查询</el-button
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
        <el-table-column label="评论内容" prop="content"></el-table-column>
        <el-table-column label="顾客编号" prop="customerId"></el-table-column>
        <el-table-column label="订单编号" prop="orderId"> </el-table-column>
        <el-table-column label="评论时间"> 
            <template v-slot="scope">
               {{scope.row.commentTime | fmtDate}}
            </template>
        </el-table-column>
        <el-table-column label="评论状态" prop="status">
          <template v-slot="scope">
            <el-tag
              size="mini"
              v-if="scope.row.status == '通过'"
              type="success"
              >{{ scope.row.status }}</el-tag
            >
            <el-tag size="mini" v-else type="danger">{{
              scope.row.status
            }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template v-slot="scope">
            <el-button  type="text" @click="delHandler(scope.row.id)"
            style="color:yellow"
              >删除</el-button>
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
export default {
  data() {
    return {
      params: {
        page: 1,
        pageSize: 5,
      },
      resData: {},
    };
  },
  methods: {
    
    // 分页查询产品表格
    async pageQueryOrderComment() {
      // 过滤数据 将空字符串删除
      for (let key in this.params) {
        if (this.params[key] == "") {
          delete this.params[key];
        }
      }
      let res = await request.get("/orderComment/pageQuery", {
        params: this.params,
      });
      this.resData = res.data;
    },
    // page改变事件
    pageChangeHandler(page) {
      this.params.page = page;
      // 最新数据
      this.pageQueryOrderComment();
    },
    // pageSize改变事件
    pageSizeChangeHandler(pageSize) {
      this.params.pageSize = pageSize;
      this.pageQueryComment();
    },
    delHandler(id) {
      this.$confirm("此操作将永久删除该用户，是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        request.get("/orderComment/deleteById", { params: { id } }).then((res) => {
          this.pageQueryOrderComment(); //重载数据
          this.$message.success(res.message); //提示操作结果
        });
      });
    },
  },
  created() {
    this.pageQueryOrderComment(); //分页查询
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
</style>