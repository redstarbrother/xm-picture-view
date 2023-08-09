<script setup>
import { getCurrentInstance } from 'vue'
import {
  MostlyCloudy,
  Location,
  Monitor,
  Iphone,
} from '@element-plus/icons-vue'
import { useBaseConfigStore } from '@/stores/BaseConfigStore'
import TransitioniEffect from '@/components/TransitioniEffect.vue'
const { proxy } = getCurrentInstance()

// 获取配置信息
const baseConfigStore = useBaseConfigStore()
const configContent = baseConfigStore.baseConfig
const playModeList = baseConfigStore.playModeList

function changeTransitionEffect(selectedMode) {
  configContent.transitionEffect = selectedMode
}

// 监听pinia数据改变
baseConfigStore.$subscribe((mutation, state) => {
  const { key, oldValue, newValue } = mutation.events
  let changeItem = {}
  changeItem[key] = newValue
  proxy.$socket.emit('changeConfig', 'baseConfig', changeItem)
})
</script>
<template>
  <div class="content-base">
    <span>工作模式：</span>
    <span :class="configContent.online ? 'state-disable' : 'state-enable'"
      >单机</span
    >
    <el-switch
      v-model="configContent.online"
      class="mt-2"
      inline-prompt
      :active-icon="MostlyCloudy"
      :inactive-icon="Location"
      active-color="#67C23A"
      inactive-color="#409EFF"
    />
    <span :class="configContent.online ? 'state-enable' : 'state-disable'"
      >联机</span
    >
  </div>
  <div class="content-base" v-if="configContent.online">
    <span>无线网SSID：</span>
    <el-input
      class="input-base"
      v-model="configContent.wifiSSID"
      size="small"
      placeholder="SSID"
      clearable
    />
  </div>
  <div class="content-base" v-if="configContent.online">
    <span>无线网密码：</span>
    <el-input
      class="input-base"
      v-model="configContent.wifiPass"
      size="small"
      placeholder="PASSWORD"
      type="password"
      show-password
    />
  </div>
  <div class="content-base">
    <span>显示模式：</span>
    <span
      :class="
        configContent.displayMode == 'ver' ? 'state-enable' : 'state-disable'
      "
      >竖屏</span
    >
    <el-switch
      v-model="configContent.displayMode"
      class="mt-2"
      inline-prompt
      :active-icon="Monitor"
      :inactive-icon="Iphone"
      active-value="hor"
      inactive-value="ver"
      active-color="#67C23A"
      inactive-color="#409EFF"
    />
    <span
      :class="
        configContent.displayMode == 'hor' ? 'state-enable' : 'state-disable'
      "
      >横屏</span
    >
  </div>
  <div class="content-base">
    <span>显示亮度：</span>
    <el-slider
      class="content-slider"
      size="small"
      v-model="configContent.brightness"
    />
  </div>
  <div class="content-base">
    <span>播放模式：</span>
    <el-select
      v-model="configContent.playMode"
      placeholder="Select"
      size="small"
    >
      <el-option
        v-for="item in playModeList"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
  </div>
  <div class="content-base">
    <span>过渡效果：</span>
    <TransitioniEffect @changeTE="changeTransitionEffect" />
  </div>
  <div class="content-base" v-if="configContent.playMode != 'single'">
    <span>播放时长(s)：</span>
    <el-input-number
      v-model="configContent.playDuration"
      :min="5"
      :max="2073600"
    />
  </div>
  <div class="content-base content-button">
    <RouterLink :to="'/manager/picture'"
      ><el-button type="primary" round>图片管理</el-button></RouterLink
    >
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
  margin-top: 25px;
}

.input-base {
  width: 132px;
  height: 26px;
}
</style>
