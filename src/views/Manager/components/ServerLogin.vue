<script setup>
import { useBaseConfigStore } from '@/stores/BaseConfigStore'
import { useUserInfoStore } from '@/stores/UserInfoStore'
import { reactive } from 'vue'

// 获取配置信息
// const baseConfigStore = useBaseConfigStore()
// const configContent = baseConfigStore.baseConfig

// 获取用户配置信息
const userInfoStore = useUserInfoStore()
const userInfo = userInfoStore.userInfo

// 定义用户登录数据
const userLoginForm = reactive({
  serverAddr: userInfo.serverAddr != '' ? userInfo.serverAddr : '',
  userName: userInfo.serverUser != '' ? userInfo.serverUser : '',
  password: userInfo.serverPwd != '' ? userInfo.serverPwd : '',
  aliOss: userInfo.aliOSS != '' ? userInfo.aliOSS : '',
})
</script>

<template>
  <el-form class="login-component" :model="userLoginForm">
    <el-form-item label="服务器地址">
      <el-input
        class="login-input"
        v-model="userLoginForm.serverAddr"
        autocomplete="off"
      />
    </el-form-item>
    <el-form-item label="用户名">
      <el-input
        class="login-input"
        v-model="userLoginForm.userName"
        autocomplete="off"
      />
    </el-form-item>
    <el-form-item label="密码">
      <el-input
        class="login-input"
        v-model="userLoginForm.password"
        autocomplete="off"
      />
    </el-form-item>
    <el-form-item label="阿里云OSS地址">
      <el-input
        class="login-input"
        v-model="userLoginForm.aliOSS"
        autocomplete="off"
      />
    </el-form-item>
  </el-form>
</template>

<style scoped>
.login-input {
  width: 150px;
  margin: 0;
}

.login-component {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  /* align-items: center; */
  /* width: auto; */
}

.el-form-item {
  display: flex;
  justify-content: center;
  width: 100%;
  /* margin: auto; */
}
</style>
