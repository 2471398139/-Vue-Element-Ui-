<!--
 * @Description: 
 * @Version: 1.0
 * @Autor: xuxu
 * @Date: 2021-09-11 14:47:51
 * @LastEditors: xuxu
 * @LastEditTime: 2021-09-11 14:47:52
-->
<template>
  <div class="details">
    <!-- 返回 -->
    <div class="btn">
      <el-button type="text" @click="$router.go(-1)">返回</el-button>
    </div>
    <!-- /返回 -->
    <!-- 卡片区域 -->
    <div class="table">
      <el-table-column label="头像">
        <template>
          <div class="demo-type">
            <div>
              <el-avatar :src="imageUrl" :size="100"></el-avatar>
            </div>
          </div>
        </template>
        <el-button type="text" @click="visible = true" style="color: #2cc5d7"
          >修改头像</el-button
        >
      </el-table-column>
    </div>
    <el-row :gutter="20" style="margin-top: 20px">
      <el-card class="box-card">
        <div class="text item">登录用户： {{ resData.username }}</div>
        <div class="text item">用户姓名： {{ resData.realname }}</div>
        <div class="text item">用户手机：{{ resData.telephone }}</div>
        <div class="text item">用户角色： {{ resData.roles[0].name }}</div>
        <div class="text item">用户生日：{{ resData.birth | fmtDate}}</div>
        <div class="text item">
          注册时间：{{ resData.registerTime | fmtDate }}
        </div>
        <div class="text item" v-if="resData.email != ''">邮箱：{{ resData.email }}</div>
        <div class="text item" v-else>邮箱：暂无</div>
        <div class="text item">
            用户状态：
            <el-tag v-if="resData.status == '正常'" type="success" effect="dark" size="medium">{{ resData.status }}</el-tag>
            <el-tag v-if="resData.status == '禁用'" type="warning" effect="dark" size="medium">{{ resData.status }}</el-tag>
            </div>
            <template>
          <el-button type="text" @click="editHandler" style="color: #2cc5d7"
        >修改个人信息</el-button
      >
        </template>   
      </el-card>
        
    </el-row>
    <!-- /卡片区域 -->
    <!-- 头像模态框 -->
    <el-dialog
      title="修改头像"
      :visible.sync="visible"
      width="50%"
      style="text-align:center"
      @close="dialogHandler"
    >
      <el-form :model="production" :rules="rules" ref="saveForm">
        <!-- 用户头像修改 -->
        <el-upload
          class="avatar-uploader"
          action=" https://81.69.24.232/pet/jz_upload.php"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <!-- 用户头像修改 -->
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="visible = false">取 消</el-button>
        <el-button type="primary" @click="toSaveHandler">确 定</el-button>
      </span>
    </el-dialog>
    <!-- /用户头像模态框 -->
    <!-- 个人信息模态框 -->
    <el-dialog :title="title" :visible.sync="visible1" @close="dialogHandler">
      <el-form :model="production" :rules="rules" ref="saveForm">
        <el-form-item
          label="登录用户"
          :label-width="formLabelWidth"
          prop="username"
        >
          <el-input v-model="production.username"></el-input>
        </el-form-item>
        <el-form-item
          label="姓名"
          :label-width="formLabelWidth"
          prop="realname"
        >
          <el-input v-model="production.realname"></el-input>
        </el-form-item>
        <el-form-item
          label="手机号"
          :label-width="formLabelWidth"
          prop="telephone"
        >
          <el-input v-model="production.telephone"></el-input>
        </el-form-item>
        <el-form-item
          label="邮箱"
          :label-width="formLabelWidth"
          prop="email"
        >
          <el-input v-model="production.email"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="visible1 = false">取 消</el-button>
        <el-button type="primary" @click="toSaveHandler">确 定</el-button>
      </div>
    </el-dialog>
    <!-- /个人信息模态框 -->
  </div>
</template>
<script>
import request from "@/utils/request";
import qs from "qs";
import _clone from "lodash";
export default {
  data() {
    return {
      resData: [],
      roles: {},
      imageUrl: "",
      visible: false,
      visible1: false,
      production: {},
      title: "",
      formLabelWidth: "80px",
    };
  },
  methods: {
    // 根据id查询用户数据
    findUserDetailsById(id) {
      request
        .get("/baseUser/findUserDetailsById", { params: { id } })
        .then((res) => {
          this.resData = res.data;
          // 将拿到的头像地址映射给imageUrl
          this.imageUrl = res.data.userFace;
        });
    },
    // 上传图片点击事件
    handleAvatarSuccess(res, file) {
      // 将返回的图片在线地址映射到数据模型中
      this.production.photo = res;
      this.imageUrl = res;
    },
    //保存
    // 表单保存事件
    toSaveHandler() {
      this.$refs["saveForm"].validate((valid) => {
        if (valid) {
          request
            .post("/baseUser/saveOrUpdate", qs.stringify(this.production))
            .then((res) => {
              this.findUserDetailsById(); //重载数据
              this.$message.success(res.message); //提示操作结果
              this.visible = false; //关闭头像模态框
              this.visible1 = false; //关闭信息模态框
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
    // 修改个人信息按钮点击事件
    editHandler(row) {
      this.production = _.clone(row);
      this.title = "修改个人信息";
      this.visible1 = true;
    },
  },
  created() {
    this.findUserDetailsById(this.$route.query.id);
  },
};
</script>
<style scoped>
.text {
  font-size: 18px;
  font-weight: bolder;
}
.item {
  margin-bottom: 18px;
  padding: 10px;
  margin-right: 10px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
  width: 480px;
}
/* 设置头像位置 */
.demo-type {
  margin-left: 300px;
}
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