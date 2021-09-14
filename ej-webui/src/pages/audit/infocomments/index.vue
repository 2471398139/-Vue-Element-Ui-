<!--
 * @Description: 
 * @Version: 1.0
 * @Autor: xuxu
 * @Date: 2021-09-06 15:40:20
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-09-13 10:04:20
-->
<template>
  <div>
    <div>
      <el-input
        v-model="params.comment"
        placeholder="关键字"
        clearable
        style="width: 300px; margin-left: 10px"
        size="small"
      >
      </el-input>
      <el-button
        type="success"
        size="small"
        style="margin-left: 10px"
        @click="pageQuerycomments"
        >查询</el-button
      >
      <el-button
        type="danger"
        size="small"
        style="float: right"
        @click="batchDelete"
        :disabled="this.sels.length === 0"
        >批量删除</el-button
      >
    </div>
    <div>
      <!-- 表格 -->
      <el-table
        :data="resData.list"
        @selection-change="handleSelectionChange"
        :disabled="this.sels.length === 0"
        style="width: 100%"
        size="small"
      >
        <el-table-column type="selection"></el-table-column>
        <el-table-column type="index" label="序号"></el-table-column>
        <el-table-column label="评论内容" prop="comment"></el-table-column>
        <el-table-column label="评论人编号" prop="userId"></el-table-column>
        <el-table-column label="咨询编号" prop="articleId"></el-table-column>
        <el-table-column label="评论时间">
          <template v-slot="scope">
            {{ scope.row.commentTime | fmtDate }}
          </template>
        </el-table-column>
        <el-table-column label="评论状态" prop="status">
          <template v-slot="scope">
            <el-button
              type="text"
              v-if="scope.row.status == '审核'"
              style="color: red"
              >审核</el-button
            >
            <el-button type="text" v-else style="color: green">
              未审核
            </el-button>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template v-slot="scope">
            <el-button type="text" @click="delHandler(scope.row.articleId)">
              删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import requset from "@/utils/request";
export default {
  data() {
    return {
      sels:[],//选中的值
      resData: {},
      params: {
        page: 1,
        pageSize: 5,
      },
      ids: [],
      
    };
  },
  methods: {
    // 分页查询产品表格

    async pageQuerycomments() {
      // 过滤数据将空字符串删除
      for (let key in this.params) {
        if (this.params[key] == "") {
          delete this.params[key];
        }
      }
      let res = await requset.get("/comment/pageQuery", {
        params: this.params,
      });
      this.resData = res.data;
    },

    delHandler(id) {
      this.$confirm("此操作将永久删除该用户，是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        request.get("/comment/deleteById", { params: id }).then((res) => {
          this.pageQuerycomments(); //重载数据
          this.$message.success(res.message); //提示操作结果
        });
      });
    },
    handleSelectionChange(sels) {
      this.sels = sels
    },
    batchDelete(id) {
      this.ids = this.sels.map(item => item.id).join()
      this.$confirm("此操作将永久批量删除，是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        request.get("/category/batchDelete", { params: id}).then((res) => {
          this.pageQuerycomments(); //重载数据
          this.$message.success(res.message); //提示操作结果
        });
      });



    },
  },
  created() {
    this.pageQuerycomments(); // 分页查询产品
  },
};
</script>

<style lang="less" scoped>
</style>