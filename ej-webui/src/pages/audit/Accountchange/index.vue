<!--
 * @Description: 
 * @Version: 1.0
 * @Autor: xuxu
 * @Date: 2021-09-06 15:35:39
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-09-13 10:02:36
-->
<template>
  <div class="account">
    <!-- 检索区域 -->
    <div class="btns">
      <el-form :inline="true"  :v-model="params">
        <el-form-item>
          <el-date-picker placeholder="选择日期开始时间"   v-model="search_data.startTime" type="datetime">
          </el-date-picker>
          --
          <el-date-picker placeholder="选择日期结束时间"  v-model="search_data.endTime" type="datetime">
          </el-date-picker>
        </el-form-item>

        <el-select
          v-model="params.applyType"
          placeholder="请选择类型"
          style="margin-left: 10px"
          clearable
        >
          <el-option label="提现" value="提现">提现</el-option>
          <el-option label="充值" value="充值">充值</el-option>
        </el-select>
        <el-select
          v-model="params.status"
          placeholder="请选择状态"
          style="margin-left: 10px"
          clearable
        >
          <el-option label="通过" value="通过">通过</el-option>
          <el-option label="不通过" value="不通过">不通过</el-option>
          <el-option label="未审核" value="未审核">未审核</el-option>
        </el-select>
        <el-form-item>
          <el-input
            v-model="params.userId"
            placeholder="申请人编号"
            size="big"
            style="margin-left: 10px"
          ></el-input>
        </el-form-item>
        <!--查询按钮 -->
        <el-button
          type="primary"
          size="small"
          style="margin-right: 10px"
          @click="pageQueryAccountApply"
          icon="el-icon-search"
          >查询</el-button
        >
        <!-- /查询按钮 -->
      </el-form>
    </div>

    <!-- 表格区域 -->
    <div class="content">
      <el-table :data="resData.list" style="width: 100%">
        <el-table-column type="index" label="序号"> </el-table-column>
        <el-table-column prop="id" label="申请人编号"> </el-table-column>
        <el-table-column label="申请时间">
          <template v-slot="scope">
            {{ scope.row.applyTime | fmtDate }}
          </template>
        </el-table-column>
        <el-table-column prop="applyType" label="变更类型"> </el-table-column>
        <el-table-column prop="money" label="变更资金">
          <template v-slot="scope">
            ￥<span style="color: red">{{ scope.row.money }}</span
            >元
          </template>
        </el-table-column>
        <el-table-column prop="reason" label="变更原因"> </el-table-column>
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
      filterTableData: [],	//经过时间筛选后得到的数据
				search_data:{
					startTime: '',
					endTime: ''
				},
    };
  },

  methods: {
    //请求所有数据
    async pageQueryAccountApply() {
      // 过滤数据 将空字符串删除
      for (let key in this.params) {
        if (this.params[key] == "") {
          delete this.params[key];
        }
      }
      let res = await request.get("/accountApply/pageQueryAccountApply", {
        params: this.params,
      });
      this.resData = res.data;
      this.filterTableData = res.data;
    },

    // page改变事件
    pageChangeHandler(page) {
      this.params.page = page;
      // 最新数据
      this.pageQueryAccountApply();
    },
    // pageSize改变事件
    pageSizeChangeHandler(pageSize) {
      this.params.pageSize = pageSize;
      this.pageQueryAccountApply();
    },
    //审核
    offineHandler(id, e) {
      if (e.target.innerText == "通过") {
        request
          .get("/accountApply/checkPass", { params: { id } })
          .then((res) => {
            this.pageQueryAccountApply();
            this.$message.success(res.message); //提示信息
          });
      } else {
        request
          .get("/accountApply/checkNoPass", { params: { id } })
          .then((res) => {
            this.pageQueryAccountApply();
            this.$message.success(res.message); //提示信息
          });
      }
    },
    imtScreen(){
		//判断是否输入时间区间
		if(!this.search_data.startTime || !this.search_data.endTime){
			this.$message({
				type: 'warning',
				message: "请选择时间区间！"
			})
		}
		//获取全部表格数据
		this.pageQueryAccountApply();
		const stime = this.search_data.startTime.getTime();
		const etime = this.search_data.endTime.getTime();
		//将筛选后的数据赋值给 allTableDate
		this.resData = this.filterTableData.filter(item => {
			//筛选后得到的数据 item 中包含数据日期 date
			//创建一个数组 date，存储得到的item.date
			let date = new Date(item.date);
			let time = date.getTime();
			return time >= stime && time <= etime;
		});
		//重新分页
		this.pageQueryAccountApply();
	}
  },

  created() {
    this.pageQueryAccountApply();
  },
};
</script>