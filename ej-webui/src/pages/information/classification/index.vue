<!--
 * @Description: 
 * @Version: 1.0
 * @Autor: xuxu
 * @Date: 2021-09-06 15:58:15
 * @LastEditors: xuxu
 * @LastEditTime: 2021-09-09 21:13:56
-->
<template>
  <div class="production">
    <!-- 添加按钮 -->
    <div class="btns">
      <!-- 检索框 -->
      <el-form :inline="true"  size="small">
        <el-button
          type="primary"
          size="small"
          style="margin-right: 10px;margin-bottom: 10px"
          @click="toaddHandler"
          >新增</el-button
        >
      </el-form>
    </div>
    <!-- /添加按钮 -->
    <div class="content" >
    <!-- 表格内容区域 -->
    <div class="table">
        <el-table :data="resData" style="width: 100%">
        <el-table-column
            type="index"
            width="55"
            label="序号"
        ></el-table-column>
        <el-table-column prop="name" label="名称"> </el-table-column>
        <el-table-column prop="no" label="排序号"> </el-table-column>
        <el-table-column prop="description" label="描述"> </el-table-column>
        <!-- 右侧操作列 -->
        <el-table-column label="操作">
            <template v-slot="scope">
                <el-button type="text" @click="editHandler(scope.row)" style="color: green">编辑</el-button>
                <el-button type="text" @click="delHandler(scope.row.id)" style="color: red">删除</el-button>
            </template>
        </el-table-column>
        <!-- /右侧操作列 -->
        </el-table>
        <!-- /表格内容区域 -->
        <!-- 模态框 -->
        <el-dialog :title="title" :visible.sync="visible" @close="dialogHandler">
            <el-form :model="production" :rules="rules" ref="saveForm">
            <el-form-item label="栏目名称" :label-width="formLabelWidth" prop="name">
                <el-input v-model="production.name"></el-input>
            </el-form-item>
            <el-form-item label="序号" :label-width="formLabelWidth" prop="no">
                <el-input v-model="production.no"></el-input>
            </el-form-item>
            <el-form-item label="栏目介绍" :label-width="formLabelWidth" prop="description">
                <el-input v-model="production.description"></el-input>
            </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
            <el-button @click="visible = false">取 消</el-button>
            <el-button type="primary" @click="toSaveHandler">确 定</el-button>
            </div>
        </el-dialog>
    <!-- /模态框 -->
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
        resData: {},
        title: "",
        no: "",
        name: "",
        visible:false,
        formLabelWidth: "80px",
        production: {},
        rules: {
            name: 
            [
                { required: true, message: "请输入栏目名称", trigger: "blur" },
            ],
            no: 
            [
                {
                required: true,
                message: "请输入序号",
                trigger: "change",
                },
            ],
            description: 
            [
                { required: false, message: "请输入描述", trigger: "blur" }
            ],
            },
        };
    },
    methods: {
        // 查询所有资讯
        findAllCategory() {
        request.get("/category/findAll", {
            }).then((res) =>{
                this.resData = res.data;
            })
            // console.log(this.resData);
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
                request.get("/category/deleteById",{params:{id}}).then((res) =>{
                    this.findAllCategory();  //刷新数据
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
            this.no = '';
            this.visible = true;
            this.production = {};
            this.title = "添加";
        },
        // 图片上传成功回调
        handlePhotoSuccess(res, file) {
        // 将返回的图片在线地址映射到数据模型中
            this.production.photo = res;
            this.icon = res;
        },
        // 表单保存事件
        toSaveHandler() {
        this.$refs["saveForm"].validate((valid) => {
            if (valid) {
            request
                .post("/category/saveOrUpdate", qs.stringify(this.production))
                .then((res) => {
                this.findAllCategory(); //重载数据
                this.$message.success(res.message); //提示操作结果
                this.visible = false; //关闭模态框
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
        },
        // 修改按钮点击事件结尾
    },
    created() {
        this.findAllCategory();
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