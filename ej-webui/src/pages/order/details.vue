<!--
 * @Description: 
 * @Version: 1.0
 * @Autor: xuxu
 * @Date: 2021-09-07 14:17:38
 * @LastEditors: xuxu
 * @LastEditTime: 2021-09-07 19:07:00
-->
<template>
  <div class="orderDetail">
    <div class="btn">
      <el-button type="text" @click="$router.go(-1)">返回</el-button>
    </div>
    <!-- 表格 -->
    <el-table :data="resData.orderLines">
      <el-table-column prop="id" label="订单编号"></el-table-column>
      <el-table-column prop="productId" label="产品编号"></el-table-column>
      <el-table-column prop="product.name" label="产品"></el-table-column>
      <el-table-column label="产品图片">
        <template v-slot="scope">
          <img :src="scope.row.product.photo"  width="50" alt="丢失"/>
        </template>
      </el-table-column>
      <el-table-column prop="price" label="单价"></el-table-column>
      <el-table-column prop="number" label="数量"></el-table-column>
    </el-table>
    <!-- /表格 -->
    <!-- 卡片区域 -->
    <el-row :gutter="20" style="margin-top: 20px">
      <el-col :span="8">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>订单基本信息</span>
          </div>
          <div class="text item">订单编号:{{ resData.id }}</div>
          <div class="text item">订单金额:{{ resData.total }}</div>
          <div class="text item">下单时间:{{ resData.ordertime | fmtDate}}</div>
          <div class="text item">订单状态:{{ resData.status }}</div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card class="box-card" v-if="resData.customer">
          <div slot="header" class="clearfix">
            <span>下单者信息</span>
          </div>
          <div class="text item">下单者:{{ resData.customer.realname }}</div>
          <div class="text item">手机号:{{ resData.customer.telephone }}</div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card class="box-card" v-if="resData.address">
          <div slot="header" class="clearfix">
            <span>雇主信息</span>
          </div>
          <div class="text item">雇主:{{ resData.address.username }}</div>
          <div class="text item">手机号:{{ resData.address.telephone }}</div>
          <div class="text item">
            服务地址:{{
              resData.address.province +
              resData.address.city +
              resData.address.area +
              resData.address.address
            }}
          </div>
        </el-card>
      </el-col>
    </el-row>
    <!-- /卡片区域 -->
  </div>
</template>
<script>
import request from "@/utils/request";
export default {
  data() {
    return {
      resData: [],
    };
  },
  methods: {
    findUserDetailsById(id) {
      request.get("/order/findById", { params: { id } }).then((res) => {
        this.resData = res.data;
      });
    },
  },
  created() {
    // const id = this.$route.query.id;
    this.findUserDetailsById(this.$route.query.id);
  },
};
</script>
<style scoped>
.item{
    height: 30px;
    line-height: 30px;
}
</style>