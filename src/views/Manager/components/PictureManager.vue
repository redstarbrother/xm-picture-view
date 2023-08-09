<script setup>
import { useBaseConfigStore } from '@/stores/BaseConfigStore'
import { useUserInfoStore } from '@/stores/UserInfoStore'
import ServerLogin from './ServerLogin.vue'
import PictureContainer from './PictureContainer.vue'
import { reactive, ref, getCurrentInstance, onMounted } from 'vue'
const { proxy } = getCurrentInstance()

// 获取配置信息
const baseConfigStore = useBaseConfigStore()
const configContent = baseConfigStore.baseConfig

const userInfoStore = useUserInfoStore()
const userInfo = userInfoStore.userInfo

const showLoginComponentFlag = ref(false)

const login = () => {
  // TODO 用户登录逻辑

  showLoginComponentFlag.value = false
}

const changeShowHandler = () => {
  console.log('run changeShowHandler')
  proxy.$socket.emit('testChange', 3)
}
</script>
<template>
  <div class="content-config-base">
    <el-dialog v-model="showLoginComponentFlag" title="用户登录">
      <ServerLogin />
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="showLoginComponentFlag = false">取消</el-button>
          <el-button type="primary" @click="login"> 登录 </el-button>
        </span>
      </template>
    </el-dialog>
    <div class="user-login">
      <p>
        {{ userInfo.isLogin ? userInfo.serverUser + '(已登录)' : '用户未登录' }}
      </p>
      <el-button @click="showLoginComponentFlag = true">登录</el-button>
    </div>
    <PictureContainer />
    <div class="content-base content-button">
      <el-button type="primary" round>上传图片</el-button>
      <RouterLink :to="'/manager'"
        ><el-button type="primary" round>基础设置</el-button></RouterLink
      >
    </div>
  </div>
</template>

<style scoped>
.state-enable {
  color: #000;
}

.state-disable {
  color: #c0c4cc;
}

.content-slider {
  width: 200px;
  margin: 0 10px;
}

.mt-2 {
  margin: 0 5px;
  position: relative;
  top: 2px;
}

.content-button {
  margin: 15px;
}

.input-base {
  width: 132px;
  height: 26px;
}

.user-login {
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.login-dialog {
  width: 30vw;
}

.content-base {
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
  width: 100%;
  margin: 10px 0;
}
</style>
