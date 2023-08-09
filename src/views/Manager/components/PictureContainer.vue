<script setup>
import { useBaseConfigStore } from '@/stores/BaseConfigStore'
import { onMounted, reactive, getCurrentInstance } from 'vue'
import draggable from 'vuedraggable'
const { proxy } = getCurrentInstance()

const baseConfigStore = useBaseConfigStore()
const configContent = baseConfigStore.baseConfig
const data = reactive({
  imgList: [],
  dragOptions: {
    animation: 200,
    group: 'description',
    disabled: false,
    ghostClass: 'ghost',
  },
})

onMounted(() => {
  configContent.imgUrlList.map((item, index) => {
    data.imgList.push({
      id: index,
      url: item,
      show: false,
    })
  })
})

// 改变图片顺序
const sortChange = (event) => {
  let imgListSort = []
  data.imgList.map((item) => imgListSort.push(item.url))
  configContent.imgUrlList = imgListSort
  // console.log(event)
}

// 改变当前显示图片
const showChange = (index) => {
  // 如果是单图片显示，则不执行后续逻辑
  if (configContent.playMode != 'simple') {
    return
  }
  // 切换当前显示图片,添加图片选中效果
  proxy.$socket.emit('showImg', index)
  data.imgList.map((img) => (img.show = false))
  data.imgList[index].show = true
}
</script>

<template>
  <draggable
    class="picture-container"
    animation="300"
    :list="data.imgList"
    group="picture"
    @change="sortChange"
    itemKey="id"
  >
    <template #item="{ element, index }">
      <div class="picture-item">
        <img
          :class="{ 'picture-curent-show': element.show }"
          :src="element.url"
          :key="index"
          @click="showChange(index)"
        />
      </div>
    </template>
  </draggable>
</template>

<style scoped>
/* .picture-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 20px;
  max-width: 30vw;
  border-radius: 5%;
  box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.2);
} */
.picture-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 20px;
  max-width: 30vw;
  border-radius: 5%;
  margin-right: 8px;
  box-shadow: inset 2px 2px 5px #babecc, inset -5px -5px 10px #fff;
  box-sizing: border-box;
  transition: all 0.2s ease-in-out;
  appearance: none;
  -webkit-appearance: none;
}
.picture-item img {
  width: 80px;
  height: 60px;
  margin: 5px 5px;
  border-radius: 10%;
}

.picture-curent-show {
  box-shadow: 0px 0px 0px 3px rgba(64, 158, 255, 0.9);
}

/* 屏幕自适应 */
@media screen and (max-width: 900px) {
  .picture-container {
    max-width: 80vw;
  }
}
</style>
