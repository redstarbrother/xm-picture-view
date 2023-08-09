<!-- 
 * @description: websocket客户端组件，负责拉取配置、更改配置
 * @fileName: WsClient.vue 
 * @author: RedStar 
 * @date: 2023-07-13 20:13:59
!-->
<script setup>
// import { onMounted } from 'vue'
// import { socket } from './socket'
// import { useBaseConfigStore } from '@/stores/BaseConfigStore'

// const baseConfigStore = useBaseConfigStore()

// onMounted(() => {
//   socket.connect()
// })

// onMounted(() => {
//   socket.emit('getCurConfig')
// })

// onMounted(() => {
//   socket.on('configChanged', (config) => {
//     console.log('config changed', config)
//   })
// })

// onMounted(() => {
//   socket.on('changeCurShow', (curShowImgIndex) => {
//     baseConfigStore.baseConfig.curShowIndex = curShowImgIndex
//   })
// })

// import { reactive } from 'vue'
/*

res: {
  status: true/false,
  data: {
    item1: {},
    item2: {}
  }
}

message: {
  type: 'xxx',
  data: {
    item1: {},
    item2: {}
  }
}


*/
import { onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import { socket, state } from './socket'
import { useBaseConfigStore } from '@/stores/BaseConfigStore'
import { useUserInfoStore } from '@/stores/UserInfoStore'

const baseConfigStore = useBaseConfigStore()
const UserInfoStore = useUserInfoStore()

// 连接事件
socket.on('connect', () => {
  state.connected = true
  console.log('connect server...')
})

// 断开连接事件
socket.on('disconnect', () => {
  state.connected = false
  console.log('disconnect...')
})

// 监听更改配置事件,将配置数据同步到pinia中
socket.on('configChanged', (res) => {
  const configItem = res.configItem
  console.log(configItem)
  if (res.type == 'baseConfig') {
    for (let key in configItem) {
      baseConfigStore.changeValue(key, configItem[key])
    }
  } else if (res.type == 'userInfo') {
    for (let key in configItem) {
      UserInfoStore.changeValue(key, configItem[key])
    }
  }
})

/**
 * @funcName:
 * @author: RedStar★
 * @date: 2023-07-13 20:24:46
 * @description: 拉取Controller端配置数据，没有配置数据(用户重置或第一次使用)则提示用户连接指定热点，
 *              有配置数据则将配置同步至pinia并连接热点;
 */
onMounted(() => {
  socket.emit('getConfig', (res) => {
    console.log(res)
    if (res.status == true) {
      // 同步配置数据至pinia
      const baseConfig = res.data.baseConfig
      const onlineConfig = res.data.userInfo
      console.log('baseConfigJson: ', baseConfig)
      console.log('onlineConfigJson: ', onlineConfig)
      for (let key in baseConfig) {
        baseConfigStore.changeValue(key, baseConfig[key])
      }
      for (let key in onlineConfig) {
        UserInfoStore.changeValue(key, onlineConfig[key])
      }

      // 连接热点
      // socket.emit(
      //   'connectWifi',
      //   {
      //     wifiSSID: baseConfigStore.baseConfig.wifiSSID,
      //     wifiPass: baseConfigStore.baseConfig.wifiPass,
      //   },
      //   (res) => {
      //     if (res.status == true) {
      //       ElMessage({
      //         message: 'Wifi connected',
      //         type: 'success',
      //       })
      //     } else {
      //       ElMessage.error('Wifi connect failed')
      //     }
      //   }
      // )
    } else {
      // TODO 前端展示提示页面
    }
  })
})
</script>
<template></template>
