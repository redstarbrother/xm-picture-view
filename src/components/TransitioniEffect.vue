<template>
  <div class="transition-root">
    <div
      class="transition-item"
      :class="selectMode == 'flash' ? 'selected' : ''"
      @click="changedHandle('flash')"
    >
      <img
        class="transition-photo flash-next"
        src="https://www.jhxblog.cn/image/xmpicture/3.jpg"
      />
      <img
        class="transition-photo flash-pre"
        src="https://www.jhxblog.cn/image/xmpicture/4.jpg"
      />
    </div>
    <div
      class="transition-item"
      :class="selectMode == 'gradual' ? 'selected' : ''"
      @click="changedHandle('gradual')"
    >
      <img
        class="transition-photo gradual-next"
        src="https://www.jhxblog.cn/image/xmpicture/3.jpg"
      />
      <img
        class="transition-photo gradual-pre"
        src="https://www.jhxblog.cn/image/xmpicture/4.jpg"
      />
    </div>
    <div
      class="transition-item"
      :class="selectMode == 'segement' ? 'selected' : ''"
      @click="changedHandle('segement')"
    >
      <img
        class="transition-photo segement-next"
        src="https://www.jhxblog.cn/image/xmpicture/3.jpg"
      />
      <img
        class="transition-photo segement-pre"
        src="https://www.jhxblog.cn/image/xmpicture/4.jpg"
      />
    </div>
  </div>
</template>

<script>
import { reactive, toRefs } from 'vue'
export default {
  name: 'TransitionEffect',
  setup(props, ctx) {
    const data = reactive({
      selectMode: 'flash',
    })

    function changedHandle(selectMode) {
      data.selectMode = selectMode
      ctx.emit('changeTE', selectMode)
    }

    return {
      ...toRefs(data),
      changedHandle,
    }
  },
}
</script>

<style>
.transition-root {
  display: flex;
}

.transition-item {
  height: 50px;
  width: 75px;
  margin: 10px 10px;
  border-radius: 10%;
  border: 3px solid rgba(0, 0, 0, 0);
  overflow: hidden;
  cursor: pointer;
}

.selected {
  border: 3px solid #409eff;
  box-shadow: 1px 3px 3px rgba(64, 158, 255, 0.7);
}

.transition-photo {
  width: 100%;
  height: 100%;
}

.flash-next {
  animation: flash-animation 2s infinite;
}

.flash-pre {
  animation: flash-animation 2s infinite reverse;
  position: relative;
  top: -108%;
}

.gradual-next {
  animation: gradual-animation 2s infinite;
}

.gradual-pre {
  position: relative;
  top: -108%;
  animation: gradual-animation 2s infinite reverse;
}

.segement-next {
}

.segement-pre {
  position: relative;
  top: -108%;
  animation: segement-animation 2s linear infinite;
}

@keyframes flash-animation {
  from {
    z-index: 1;
  }
  to {
    z-index: -1;
  }
}

@keyframes gradual-animation {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}

@keyframes segement-animation {
  from {
    clip-path: polygon(50% 0%, 50% 0%, 50% 100%, 50% 100%);
  }
  to {
    clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%);
  }
}
</style>
