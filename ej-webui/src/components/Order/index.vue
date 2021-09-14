<!--
 * @Description: 
 * @Version: 1.0
 * @Autor: xuxu
 * @Date: 2021-09-07 09:31:51
 * @LastEditors: xuxu
 * @LastEditTime: 2021-09-09 19:18:55
-->
<template>
    <div class="orderTable">
    <el-table :data="resData.list" style="width: 100%">
        <el-table-column prop="id" label="订单编号"></el-table-column>
        <el-table-column label="下单时间">
        <template v-slot="scope">
            {{ scope.row.orderTime | fmtDate}}
        </template>
    </el-table-column>
    <el-table-column label="价格">
    <template v-slot="scope">
        ￥ {{ totalPrices(scope.row.orderLines) }}
    </template>
    </el-table-column>
    <el-table-column label="订单状态">
    <template v-slot="scope">
        <el-tag type="success" v-if="scope.row.status == '待派单'">{{
        scope.row.status
        }}</el-tag>
        <el-tag type="danger" v-else-if="scope.row.status == '待接单'">{{
        scope.row.status
        }}</el-tag>
        <el-tag type="warning" v-else>{{ scope.row.status }}</el-tag>
    </template>
    </el-table-column>
    <el-table-column
    prop="customer.realname"
    label="顾客姓名"
    ></el-table-column>
    <el-table-column label="员工姓名">
    <template v-slot="scope">
        <el-tag type="success" v-if="scope.row.employee">
          {{
            scope.row.employee.realname
          }}
        </el-tag>
        <el-tag type="info" v-else>未接单</el-tag>
    </template>
    </el-table-column>
    <el-table-column label="操作">
    <template v-slot="scope">
        <el-button type="text" @click="toDetailHandler(scope.row.id)">详情</el-button>
        <el-button type="text" @click="sendSingleHandler(scope.row.id)" :disabled="scope.row.status == '待派单' ?false:true"
        >派单</el-button
        >
    </template>
    </el-table-column>
</el-table>
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
    <!-- 派单模态框 -->
    <el-dialog title="派单" :visible.sync="visible" width="60%">
    <div class="content">
        <el-radio
        size="medium"
        v-for="(item, index) in waiters"
        v-model="waiterId"
        :label="item.id"
        border
        :key="index"
        >{{ item.username }}-{{ item.realname }}</el-radio
        >
    </div>
    <span slot="footer" class="dialog-footer">
        <el-button @click="visible = false">取 消</el-button>
        <el-button type="primary" @click="toSubmitHandler">确 定</el-button>
    </span>
    </el-dialog>
    <!-- /模态框 -->
    </div>
</template>
<script>
import request from "@/utils/request";
import { mapState, mapActions } from "vuex";

export default {
  props: {
    status: {
      type: String,
      defaults: null,
    },
  },
  data() {
    return {
      params: {
        page: 1,
        pageSize: 5,
        status: this.status,
      },
      resData: {},
      visible: false,
      waiterId: null,
      isDisabled: false
    };
  },
  computed: {
    // 映射状态机中的state
    ...mapState("waiter", ["waiters"]),
  },
  methods: {
    ...mapActions("waiter", ["findAllWaiters"]),
    pageQueryOrders() {
      // 过滤数据 将空字符串删除
      for (let key in this.params) {
        if (this.params[key] == "") {
          delete this.params[key];
        }
      }
      request
        .get("/order/pageQuery", {
          params: this.params,
        })
        .then((res) => {
          this.resData = res.data;
        });
    },
    // page改变事件
    pageChangeHandler(page) {
      this.params.page = page;
      // 最新数据
      this.pageQueryOrders();
    },
    // pageSize改变事件
    pageSizeChangeHandler(pageSize) {
      this.params.pageSize = pageSize;
      this.pageQueryOrders();
    },
    // 几个计算
    totalPrices(lines) {
      let total = 0;
      lines.forEach((line) => {
        total += line.product.price;
      });
      return total;
    },
    // 派单按钮点击事件处理程序
    sendSingleHandler(id) {
      this.orderId = id;
      this.visible = true;
    },
    // 派单确定点击事件
    toSubmitHandler() {
      const params = {
        waiterId: this.waiterId,
        orderId: this.orderId,
      };
      // 请求
      request
        .get("/order/sendOrder", {params,})
        .then((res) => {
          this.pageQueryOrders(); //重载数据
          this.$message.success(res.message);
          this.visible = false;
        });
    },
    // 详情按钮点击
    toDetailHandler(id){
        this.$router.push({
            path:"details",
            query: {id},
        })
    }

  },
  created() {
    this.pageQueryOrders(); //分页加载订单
    this.findAllWaiters(); //加载员工
  },
};
</script>
<style scoped>
.el-radio {
  margin-bottom: 10px;
}
</style>