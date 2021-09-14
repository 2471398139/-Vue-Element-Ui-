<!--
 * @Description: 
 * @Version: 1.0
 * @Autor: xuxu
 * @Date: 2021-09-06 16:10:29
 * @LastEditors: xuxu
 * @LastEditTime: 2021-09-11 15:31:05
-->
<template>
  <div class="table">
    <!-- 检索框 -->
    <div class="btn">
      <el-form :inline="true" :model="params" size="small">
        <!-- 添加按钮 -->
        <el-button type="primary" size="small" style="margin-right: 10px" @click="toaddHandler">添加</el-button>
        <!-- /添加按钮 -->

        <!-- 按用户名查找 -->
        <el-form-item>
          <el-input v-model="params.username" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <!-- /按用户名查找 -->

        <!-- 按状态查找 -->
        <el-form-item>
          <el-select v-model="params.status" placeholder="请选择状态" clearable>
            <el-option label="正常" value="正常"></el-option>
            <el-option label="禁用" value="禁用"></el-option>
          </el-select>
        </el-form-item>
        <!-- /按状态查找 -->

        <!-- 按角色分类查找 -->
        <el-form-item>
          <el-select v-model="params.name" clearable>
            <el-option :value="item.id" :label="item.name" :key="index" v-for="(item,index) of roles"></el-option>
          </el-select>
        </el-form-item>
        <!-- /按角色分类查找 -->

        <!-- 搜索框 -->
        <el-form-item>
          <el-button type="primary" size="small" style="margin-right: 10px" @click="findAllUSer">搜索</el-button>
        </el-form-item>
        <!-- /搜索框 -->
      </el-form>
    </div>
    <!-- /检索框 -->
    <!-- 内容区域 -->
    <div class="content">
      <el-table :data="resData.list" style="width: 100%">
        <el-table-column label="序号" type="index"></el-table-column>
        <el-table-column label="用户名" prop="username"></el-table-column>
        <el-table-column label="姓名" prop="realname"></el-table-column>
        <el-table-column label="角色" prop="roles[0].name"></el-table-column>
        <el-table-column label="性别" prop="gender"></el-table-column>
        <!-- 状态 -->
        <el-table-column label="状态">
          <template v-slot="scope">
            <el-tag v-if="scope.row.status == '正常'" type="success">{{scope.row.status}}</el-tag>
            <el-tag v-else type="danger">{{scope.row.status}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="手机号" prop="telephone"></el-table-column>
        <el-table-column label="操作">
          <template v-slot="scope">
            <el-button type="text" style="color:black" @click="toSetupHandler(scope.row.id)">设置</el-button>
            <el-button type="text" style="color:red" @click="delHandler(scope.row.id)">删除</el-button>
            <el-button type="text" style="color:green" @click="editHandler(scope.row)">编辑</el-button>
            <el-button type="text" @click="toDetailHandler(scope.row.id)">详情</el-button>
          </template>
        </el-table-column>
      
      </el-table>
    </div>
    
    <!-- /内容区域 -->
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
        <el-form :model="production"  ref="saveForm" >
          <el-form-item label="用户名" :label-width="formLabelWidth" prop="username">
            <el-input v-model="production.username"></el-input>
          </el-form-item>
          <el-form-item label="姓名" :label-width="formLabelWidth" prop="realname">
            <el-input v-model="production.realname"></el-input>
          </el-form-item>
          <el-form-item label="密码" :label-width="formLabelWidth" prop="password">
            <el-input v-model="production.password"></el-input>
          </el-form-item>
          <el-form-item label="手机号" :label-width="formLabelWidth" prop="telephone">
            <el-input v-model="production.telephone"></el-input>
          </el-form-item>
          <el-form-item
              label="性别"
              :label-width="formLabelWidth"
              prop="gender"
            >
              <el-radio-group v-model="production.gender">
                <el-radio label="male"></el-radio>
                <el-radio label="female"></el-radio>
              </el-radio-group>
          </el-form-item>
          <el-form-item
              label="角色"
              :label-width="formLabelWidth"
              prop="name"
            >
              <el-radio-group v-model="production.name">
                <el-radio label="员工"></el-radio>
                <el-radio label="顾客"></el-radio>
                <el-radio label="管理员"></el-radio>
              </el-radio-group>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="visible = false">取 消</el-button>
          <el-button type="primary" @click="toSaveHandler">确 定</el-button>
        </div>
      </el-dialog>
      <!-- /模态框 -->
      <!-- 设置角色权限模态框  (待解决) -->
      <el-dialog title="设置角色" :visible.sync="visible1" @close="dialogHandler">
        <el-form :model="production"  ref="saveForm">
          <el-form-item label="名称" :label-width="formLabelWidth"></el-form-item>
          <el-form-item
            label="角色"
            :label-width="formLabelWidth"
            prop="roleId"
          >
            <el-select
              v-model="production.roleId"
              placeholder="请选择角色"
            >
              <el-option
                :label="item.name"
                :value="item.id"
                v-for="(item, index) of roles"
                :key="index"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="visible1 = false">取 消</el-button>
          <el-button type="primary" @click="toSaveHandler1">确 定</el-button>
        </div>
      </el-dialog>
      <!-- /模态框 -->
      <!-- /设置角色权限模态框 -->
  </div>
</template>
<script>
import request from '@/utils/request'
import { mapActions } from 'Vuex'
import qs from "qs";
import _clone from "lodash";
export default {
  data(){
    return{
      params:{
        page:1,
        pageSize:5
      },
        resData:{},
        roles:[],
        title:"",
        visible: false,
        visible1:false,
        production: {},
        formLabelWidth: "80px",
    }
  },
  methods:{
    // 导入状态机的方法
    ...mapActions("alluser",["findAllRole"]),
    // 分页查询用户
    async findAllUSer(){
      let res = await request.get('/baseUser/pageQuery',{
        params: this.params
      })
        this.resData = res.data
    },
    // page改变事件
    pageChangeHandler(page) {
      this.params.page = page;
      // 最新数据
      this.findAllUSer();
    },
    // pageSize改变事件
    pageSizeChangeHandler(pageSize) {
      this.params.pageSize = pageSize;
      this.findAllUSer();
    },
    // 添加按钮事件
    toaddHandler(){
      this.visible = true;
      this.title = "添加";
      this.production = {};
    },
    // 编辑按钮点击事件
    editHandler(row) {
      this.production = _.clone(row);
      this.title = "编辑";
      this.visible = true;
      this.disabled = true;
    },
    // 详情按钮点击事件
    toDetailHandler(id) {
      this.$router.push({
        path: "details",
        query: { id },
      });
    },
    // 设置按钮点击事件
    toSetupHandler(row){
      this.production = _.clone(row);
      this.visible1 = true;
    },
    // 删除操作事件 通过获取这一数据id来删除
    delHandler(id) {
      this.$confirm("此操作将永久删除该用户信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true,
      }).then(() => {
        // 这里得有属性名 id : id
        request.get("/baseUser/deleteById", { params: { id } }).then((res) => {
          this.findAllUSer(); //刷新数据
          this.$message({
            type: "success",
            message: res.message, //提示成功删除信息
          });
        });
      });
    },
    // 删除事件结尾
    // 关闭模态框
    dialogHandler(){
      this.$refs["saveForm"].resetFields();
    },
    // 表单保存事件
    toSaveHandler() {
      this.$refs["saveForm"].validate((valid) => {
        if (valid) {
          request
            .post("/baseUser/saveOrUpdate", qs.stringify(this.production))
            .then((res) => {
              this.findAllUSer(); //重载数据
              this.$message.success(res.message); //提示操作结果
              this.visible = false; //关闭模态框
            });
        } else {
          return false;
        }
      });
    },
    // 设置表单保存
    toSaveHandler1(){
      this.$refs["saveForm"].validate((valid) => {
        if (valid) {
          request
            .post("/baseUser/saveOrUpdate", qs.stringify(this.production))
            .then((res) => {
              this.findAllUSer(); //重载数据
              this.$message.success(res.message); //提示操作结果
              this.visible1 = false; //关闭模态框
            });
        } else {
          return false;
        }
      });
    }
    
  },
  created(){
    this.findAllUSer() //查询所有用户
    this.findAllRole().then((res) =>{
      this.roles = res.data
    }) //查询所有用户分类
  }
}
</script>
<style lang="stylus">

</style>