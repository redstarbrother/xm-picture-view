import { defineStore } from 'pinia'
import { reactive } from 'vue'

export const useUserInfoStore = defineStore('userInfoStore', () => {
  const userInfo = reactive({
    // 服务器地址
    serverAddr: '123456',
    // 用户名
    serverUser: 'jhx',
    // 密码
    serverPwd: '',
    // 阿里云OSS服务地址
    aliOSS: '',
    // 用户登录标志
    isLogin: true,
  })

  /**
   * @funcName:   changeValue
   * @author: RedStar★
   * @date: 2023-07-13 23:01:37
   * @description: 更改指定配置项
   */
  const changeValue = (key, value) => {
    switch (key) {
      case 'serverAddr':
        userInfo.serverAddr = value
        break
      case 'serverUser':
        userInfo.serverUser = value
        break
      case 'serverPwd':
        userInfo.serverPwd = value
        break
      case 'aliOSS':
        userInfo.aliOSS = value
        break
    }
  }

  return {
    userInfo,
    changeValue,
  }
})
