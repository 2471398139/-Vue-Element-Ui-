<!--
 * @Description: 
 * @Version: 1.0
 * @Autor: xuxu
 * @Date: 2021-09-06 15:28:16
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-09-13 10:05:16
-->
<template>
  <div class="production">
    <!-- 查询 -->
    <div class="btns">
      <!-- 检索框 -->
      <el-form :inline="true" :model="params" size="small">
        <!-- 时间选择器 -->
        <el-date-picker
          type="datetimerange"
          v-model="params.applyTime"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          align="right"
          size="small"
        >
        </el-date-picker>

        <!-- /时间选择器 -->
        <!-- 按名称查找 -->

        <!-- /按名称查找 -->
        <el-form-item style="margin-left: 10px">
          <el-select v-model="params.status" placeholder="请选择状态">
            <el-option label="通过" value="通过"></el-option>
            <el-option label="不通过" value="不通过"></el-option>
          </el-select>
        </el-form-item>
        <!-- 按申请人编号查找 -->
        <el-form-item > 
          <el-input
            v-model="params.id"
            placeholder="请输入申请人编号"
          ></el-input>
        </el-form-item>
        <!-- /申请人编号查找 -->
        <!--查询按钮 -->
        <el-button
          type="primary"
          size="small"
          style="margin-right: 10px"
          @click=" pageQueryCertificationApply"
          icon="el-icon-search"
          >查询</el-button
        >
        <!-- /查询按钮 -->
      </el-form>
    </div>
    <!-- /检索区域 -->
    <!-- 内容区域 -->
    <div class="content">
      <!-- 表格 -->
      <el-table :data="resData.list" style="width: 100%" size="small">
        <el-table-column type="index" label="序号"></el-table-column>
        <el-table-column label="申请人编号" prop="id"></el-table-column>
        <el-table-column label="姓名" prop="realname"></el-table-column>
        <el-table-column label="申请时间">
          <template v-slot="scope">
            {{ scope.row.applyTime | fmtDate }}
          </template>
        </el-table-column>

        <el-table-column label="银行卡图片">
          <template v-slot="scope">
            <el-popover placement="right" width="225" trigger="hover">
              <img :src="scope.row.bankCardPhoto" alt="图片丢失" width="200" />
              <img
                :src="scope.row.bankCardPhoto"
                alt="图片丢失"
                width="40"
                slot="reference"
              />
            </el-popover>
          </template>
        </el-table-column>

        <el-table-column label="身份证号" prop="idCard"></el-table-column>
        <el-table-column label="身份证正面">
          <template v-slot="scope">
            <el-popover placement="right" width="225" trigger="hover">
              <img
                :src="scope.row.idcardPhotoPositive"
                alt="图片丢失"
                width="200"
              />
              <img
                :src="scope.row.idcardPhotoPositive"
                alt="图片丢失"
                width="40"
                slot="reference"
              />
            </el-popover>
          </template>
        </el-table-column>

        <el-table-column label="身份证反面">
          <template v-slot="scope">
            <el-popover placement="right" width="225" trigger="hover">
              <img
                :src="scope.row.idcardPhotoNegative"
                alt="图片丢失"
                width="200"
              />
              <img
                :src="scope.row.idcardPhotoNegative"
                alt="图片丢失"
                width="40"
                slot="reference"
              />
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="银行卡号" prop="bankCard"></el-table-column>
        <el-table-column label="状态">
          <template v-slot="scope">
            <el-button
              type="text"
              size="small"
              v-if="scope.row.status == '不通过'"
              style="color: red"
              >{{ scope.row.status }}</el-button
            >
            <el-button
              type="text"
              v-else-if="scope.row.status == '通过'"
              style="color: green"
              size="small"
              >{{ scope.row.status }}</el-button
            >
            <el-button type="text" v-else style="color: gray" size="small">{{
              scope.row.status
            }}</el-button>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作">
          <template v-slot="scope">
            <el-button
              type="text"
              v-if="scope.row.status == '未审核'"
              style="color: green"
              @click="offineHandler(scope.row.id, $event)"
            >
              通过
            </el-button>
            <el-button
              type="text"
              v-if="scope.row.status == '未审核'"
              style="color: red"
              @click="offineHandler(scope.row.id, $event)"
            >
              不通过
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- /表格 -->
      <!-- 分页 -->
      <el-pagination
        background
        layout="prev, pager, next, sizes"
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
    async pageQueryCertificationApply() {
      // 过滤数据 将空字符串删除
      for (let key in this.params) {
        if (this.params[key] == "") {
          delete this.params[key];
        }
      }
      
      let res = await request.get(
        "/certification/pageQueryCertificationApply",
        {
          params: this.params,
        }
      );
      this.resData = res.data;
    },
    // page改变事件
    pageChangeHandler(page) {
      this.params.page = page;
      // 最新数据
      this.pageQueryCertificationApply();
    },
    // pageSize改变事件
    pageSizeChangeHandler(pageSize) {
      this.params.pageSize = pageSize;
      this.pageQueryCertificationApply();
    },
    // 操作
    offineHandler(id, e) {
      if (e.target.innerText == "不通过") {
        request
          .get("/certification/checkNoPass", { params: { id } })
          .then((res) => {
            this.pageQueryCertificationApply();
            this.$message.success(res.message); //提示信息
          });
      } else {
        request
          .get("/certification/checkPass", { params: { id } })
          .then((res) => {
            this.pageQueryCertificationApply();
            this.$message.success(res.message); //提示信息
          });
      }
    },
   
  },
  created() {
    this.pageQueryCertificationApply(); //分页查询
  },
};
</script>
<style>
</style>