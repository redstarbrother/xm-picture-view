<script setup>
import { reactive, onMounted, getCurrentInstance } from 'vue'
import { useBaseConfigStore } from '@/stores/BaseConfigStore'

const { proxy } = getCurrentInstance()

// 获取配置信息
const baseConfigStore = useBaseConfigStore()

const data = reactive({
  // 图片列表
  imgList: [],
  curShowImgIndex: 0,
  preShowImgIndex: 0,
  timer: null,
})

onMounted(() => initImgList())

/**
 * @funcName: initImgList
 * @author: RedStar★
 * @date: 2023-07-14 10:01:08
 * @description: 初始化图片列表
 */
const initImgList = () => {
  data.imgList = []
  baseConfigStore.baseConfig.imgUrlList.map((item) => {
    data.imgList.push({
      src: item,
      showClass: 'img-hidden',
    })
  })
}

// 开启图片播放
onMounted(() => {
  startPlay()
})

/**
 * @funcName: startPlay
 * @author: RedStar★
 * @date: 2023-07-14 10:15:07
 * @description: 开启图片播放/更改播放时间
 */
const startPlay = () => {
  changeShow()
  // 如果data.timer不为空，则为更改播放时间逻辑
  if (data.timer != null) {
    clearInterval(data.timer)
  }
  data.timer = setInterval(() => {
    changeShow()
  }, baseConfigStore.baseConfig.playDuration)
}

const changeShow = () => {
  // if (baseConfigStore.baseConfig.playMode == 'single') return
  // 将所有img状态设置为hidden
  data.imgList.map((item) => {
    item.showClass = 'img-hidden'
  })
  let imgClass = getShowClass()
  data.imgList[data.preShowImgIndex].showClass = 'img-preshow'
  data.imgList[data.curShowImgIndex].showClass = imgClass
  data.preShowImgIndex = data.curShowImgIndex
  if (baseConfigStore.baseConfig.playMode == 'order') {
    data.curShowImgIndex = (data.curShowImgIndex + 1) % data.imgList.length
  } else if (baseConfigStore.baseConfig.playMode == 'random') {
    data.curShowImgIndex = Math.floor(Math.random() * data.imgList.length)
  } else {
    data.curShowImgIndex = data.preShowImgIndex
  }
}

/**
 * @funcName: getShowClass
 * @author: RedStar★
 * @date: 2023-07-14 10:25:32
 * @description: 获取图片过渡动画类名(动态拼接)
 */
const getShowClass = () => {
  let imgClass = 'img-'
  imgClass += baseConfigStore.baseConfig.transitionEffect
  let isEnlarge = true
  imgClass += isEnlarge ? '-enlarge-show' : '-show'
  return imgClass
}

// 监听pinia数据改变
baseConfigStore.$subscribe((mutation, state) => {
  const { key, oldValue, newValue } = mutation.events
  // console.log(mutation)
  // console.log('mutayion: ', key, oldValue, newValue)
  // console.log('state: ', state)
  // 检测到播放时间发生改变
  if (key == 'playDuration') {
    startPlay()
  } else if (key == 'imgUrlList') {
    initImgList()
  }
})

proxy.$socket.on('changeCurShow', (index) => {
  // baseConfigStore.baseConfig.curShowIndex = index
  data.curShowImgIndex = index
  changeShow()
})

// onMounted(() => {
//   proxy.$socket.emit('getCurConfig')
// })

// onMounted(() => {
//   proxy.$socket.on('changeCurShow', (index) => {
//     baseConfigStore.baseConfig.curShowIndex = index
//     data.curShowImgIndex = index
//     changeShow()
//   })
// })
</script>

<template>
  <div class="img-fill">
    <img
      :class="'img-base ' + img.showClass"
      v-for="(img, index) in data.imgList"
      alt="img"
      :src="img.src"
      :key="index"
    />
  </div>
</template>

<style scoped>
.img-fill {
  width: 100vw;
  height: 100vh;
  background-color: #000;
}

.img-base {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
}

/* 控制图片竖屏显示 */
.img-vertical {
  transform: rotate(90deg);
}

.img-flash-enlarge-show {
  animation-name: img-enlarge;
  animation-duration: 5s;
  animation-delay: 0s;
  animation-fill-mode: forwards;
  z-index: 1;
}

.img-flash-show {
  z-index: 1;
}

.img-gradual-enlarge-show {
  animation-name: img-gradual-animation, img-enlarge;
  animation-duration: 5s, 5s;
  animation-delay: 0s, 0s;
  animation-fill-mode: forwards, forwards;
  z-index: 1;
}

.img-gradual-show {
  animation-name: img-gradual-animation;
  animation-duration: 5s;
  animation-delay: 0s;
  animation-fill-mode: forwards;
  z-index: 1;
}

.img-expand-enlarge-show {
  animation-name: img-expand-animation, img-enlarge;
  animation-duration: 5s, 5s;
  animation-delay: 0s, 0s;
  animation-fill-mode: forwards, forwards;
  z-index: 1;
}

.img-expand-show {
  animation-name: img-expand-animation;
  animation-duration: 5s;
  animation-delay: 0s;
  animation-fill-mode: forwards;
  z-index: 1;
}

.img-hidden {
  z-index: -1;
}

.img-preshow {
  z-index: 0;
  transform: scale(1.1);
}

/* 图片渐显过渡效果 */
@keyframes img-gradual-animation {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

/* 图片展开过渡效果 */
@keyframes img-expand-animation {
  0% {
    clip-path: polygon(50% 0%, 50% 0%, 50% 100%, 50% 100%);
  }
  100% {
    clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%);
  }
}

/* 图片缓慢扩大 */
@keyframes img-enlarge {
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(1.1);
  }
}
</style>
