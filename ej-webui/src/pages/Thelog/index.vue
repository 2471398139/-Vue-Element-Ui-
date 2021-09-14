<!--
 * @Description: 
 * @Version: 1.0
 * @Autor: xuxu
 * @Date: 2021-09-06 15:13:13
 * @LastEditors: xuxu
 * @LastEditTime: 2021-09-06 15:13:13
-->
<template>
  <div class="production">
    <div class="content" >
    <!-- 表格内容区域 -->
    <div class="table">
        <el-table :data="resData.list" style="width: 100%">
        <el-table-column
            type="index"
            width="55"
            label="序号"
        ></el-table-column>
        <el-table-column prop="realname" label="访问人真实姓名"> </el-table-column>
        <el-table-column prop="method" label="访问方式"> </el-table-column>
        <el-table-column prop="content" label="访问路径"></el-table-column>
        <el-table-column label="访问时间">{{logTime | fmtDate}}</el-table-column>
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
        };
    },
    methods: {
        // 导入状态机方法
        ...mapActions("category", ["findAllCategories"]),
        async pageQueryProductions() {
        let res = await request.get("/baseLog/pageQuery", {
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