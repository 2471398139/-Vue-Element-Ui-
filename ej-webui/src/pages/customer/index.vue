<!--
 * @Description: 
 * @Version: 1.0
 * @Autor: xuxu
 * @Date: 2021-09-06 15:02:34
 * @LastEditors: xuxu
 * @LastEditTime: 2021-09-10 14:50:56
-->
<template>
  <div class="production">
    <!-- 查询 -->
    <div class="btns">
      <!-- 检索框 -->
      <el-form :inline="true" :model="params" size="small">
        <!-- 添加按钮 -->
        <el-button
          type="primary"
          size="small"
          style="margin-right: 10px"
          @click="toaddHandler"
          >添加</el-button
        >
        <!-- /添加按钮 -->
        <!-- 按名称查找 -->
        <el-form-item>
          <el-input v-model="params.username" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <!-- /按名称查找 -->
        <el-form-item>
          <el-select v-model="params.status" placeholder="请选择状态" clearable>
            <el-option label="正常" value="正常"></el-option>
            <el-option label="禁用" value="禁用"></el-option>
          </el-select>
        </el-form-item>
        <!--搜索按钮 -->
        <el-button
          type="primary"
          size="small"
          style="margin-right: 10px"
          @click="pageQueryCustomer"
          icon="el-icon-search"
          >搜索</el-button
        >
        <!-- /搜索按钮 -->
      </el-form>
    </div>
    <!-- /查询 -->
    <div class="content" >
    <!-- 表格内容区域 -->
    <div class="table" >
        <el-table :data="resData.list" style="width: 100%" stripe>
        <el-table-column prop="id" label="编号"> </el-table-column>
        <el-table-column prop="username" label="用户名"> </el-table-column>
        <el-table-column prop="realname" label="姓名"> </el-table-column>
        <el-table-column prop="telephone" label="手机号"> </el-table-column>
        <el-table-column prop="gender" label="性别">
        </el-table-column>
        <el-table-column prop="employee.status" label="状态">
            <template v-slot="scope">
            <el-tag
                size="medium"
                v-if="scope.row.status == '正常'"
                type="success"
                >{{ scope.row.status }}</el-tag
            >
            <el-tag size="medium" v-else-if="scope.row.status == '禁用'" type="warning">{{
                scope.row.status
            }}</el-tag>
            </template>
        </el-table-column>
        <!-- 右侧操作列 -->
        <el-table-column label="操作">
            <template v-slot="scope">
                <el-button type="text" @click="editHandler(scope.row)" style="color: green">编辑</el-button>
                <el-button type="text" @click="delHandler(scope.row.id)" style="color: red">删除</el-button>
                <el-button type="text" @click="toDetailHandler(scope.row.id)" >详情</el-button>
            </template>
        </el-table-column>
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
        <!-- 添加模态框 -->
        <el-dialog :title="title" :visible.sync="visible1" @close="dialogHandler">
            <el-form :model="production" :rules="rules" ref="saveForm">
                <el-form-item label="角色ID" :label-width="formLabelWidth" prop="roleId">
                    <el-input v-model="production.roleId" ></el-input>
                </el-form-item>
                <el-form-item label="用户名" :label-width="formLabelWidth" prop="username">
                    <el-input v-model="production.username"></el-input>
                </el-form-item>
                <el-form-item label="姓名" :label-width="formLabelWidth" prop="realname">
                    <el-input v-model="production.realname"></el-input>
                </el-form-item>
                <el-form-item label="手机号" :label-width="formLabelWidth" prop="telephone">
                    <el-input v-model="production.telephone"></el-input>
                </el-form-item>
                <el-form-item label="密码" :label-width="formLabelWidth" prop="password">
                    <el-input v-model="production.password"></el-input>
                </el-form-item>
                <el-form-item label="性别" :label-width="formLabelWidth" prop="gender" >
                    <el-radio-group v-model="production.gender">
                        <el-radio label="male"></el-radio>
                        <el-radio label="female"></el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="状态" :label-width="formLabelWidth" prop="status" >
                    <el-radio-group v-model="production.status">
                        <el-radio label="正常"></el-radio>
                        <el-radio label="禁用"></el-radio>
                    </el-radio-group>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
            <el-button @click="visible1 = false">取 消</el-button>
            <el-button type="primary" @click="toEditHandler">确 定</el-button>
            </div>
        </el-dialog>
    <!-- /添加模态框 -->
    <!-- 编辑模态框 -->
    <el-dialog :title="title" :visible.sync="visible" @close="dialogHandler">
            <el-form :model="production" :rules="rules" ref="saveForm">
                <el-form-item label="用户名" :label-width="formLabelWidth" prop="username">
                    <el-input v-model="production.username"></el-input>
                </el-form-item>
                <el-form-item label="姓名" :label-width="formLabelWidth" prop="realname">
                    <el-input v-model="production.realname"></el-input>
                </el-form-item>
                <el-form-item label="手机号" :label-width="formLabelWidth" prop="telephone">
                    <el-input v-model="production.telephone"></el-input>
                </el-form-item>
                <el-form-item label="密码" :label-width="formLabelWidth" prop="password">
                    <el-input v-model="production.password"></el-input>
                </el-form-item>
                <el-form-item label="性别" :label-width="formLabelWidth" prop="gender" >
                    <el-radio-group v-model="production.gender">
                        <el-radio label="male"></el-radio>
                        <el-radio label="female"></el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="状态" :label-width="formLabelWidth" prop="status" >
                    <el-radio-group v-model="production.status">
                        <el-radio label="正常"></el-radio>
                        <el-radio label="禁用"></el-radio>
                    </el-radio-group>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
            <el-button @click="visible = false">取 消</el-button>
            <el-button type="primary" @click="toSaveHandler">确 定</el-button>
            </div>
        </el-dialog>
    <!-- /编辑模态框 -->
    </div>
    </div>
</div>
</template>
<script>
import request from "@/utils/request";
import qs from "qs";
import _clone from "lodash";
export default {
    data() { 
        return {
        params: {
            page: 1,
            pageSize: 5,
            // 根据roleId筛选人员
            roleId:6
        },
        resData: {},
        title: "",
        telephone:"",
        password:"",
        username: "",
        realname:"",
        gender:"",
        visible1:false,
        visible:false,
        formLabelWidth: "80px",
        production: {},
        disabled:"",
        rules: {
           username: 
            [
                { required: true, message: "请输入用户名", trigger: "blur" },
            ],
            realname: 
            [
                { required: true, message: "请输入姓名", trigger: "blur" },
            ],
            telephone: 
            [
                { required: true, message: "请输入手机号", trigger: "blur",},
            ],
            password: 
            [
                { required: true, message: "请输入密码", trigger: "change",},
            ],
            gender: 
            [
                { required: true, message: "请选择性别", trigger: "change",},
            ],
            status: 
            [
                { required: true, message: "请选择状态", trigger: "change",},
            ],
            },
        };
    },
    methods: {
        async pageQueryCustomer() {
        let res = await request.get("/baseUser/pageQuery", {
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
                request.get("/baseUser/deleteById",{params:{id}}).then((res) =>{
                    this.pageQueryCustomer();  //刷新数据
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
            this.visible1 = true;
            this.disabled = false
            this.telephone = "";
            this.password = "";
            this.production = {};
            this.title = "添加";
        },
        // 编辑表单保存事件
        toSaveHandler() {
        this.$refs["saveForm"].validate((valid) => {
            if (valid) {
            request
                .post("/baseUser/saveOrUpdate", qs.stringify(this.production))
                .then((res) => {
                this.pageQueryCustomer(); //重载数据
                this.$message.success(res.message); //提示操作结果
                this.visible = false; //关闭模态框
                });
            } else {
                return false;
            }
        });
        },
        // 添加表单保存事件
        toEditHandler() {
        this.$refs["saveForm"].validate((valid) => {
            if (valid) {
            request
                .post("/baseUser/addUserWidthRole", qs.stringify(this.production))
                .then((res) => {
                this.pageQueryCustomer(); //重载数据
                this.$message.success(res.message); //提示操作结果
                this.visible1 = false; //关闭模态框
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
            this.visible = true;
            this.disabled = true
        },
        // 编辑按钮点击事件结尾
        // page改变事件
        pageChangeHandler(page) {
        this.params.page = page;
        // 最新数据
        this.pageQueryCustomer();
        },
        // pageSize改变事件
        pageSizeChangeHandler(pageSize) {
        this.params.pageSize = pageSize;
        this.pageQueryCustomer();
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
        this.pageQueryCustomer();
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