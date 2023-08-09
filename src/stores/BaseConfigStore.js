import { defineStore } from 'pinia'
import { reactive } from 'vue'

export const useBaseConfigStore = defineStore('baseConfigStore', () => {
  const baseConfig = reactive({
    // 离线（播放sd卡中的图片）/在线（播放云图片）
    online: true,
    // 无线网SSID
    wifiSSID: '',
    // 无线网密码
    wifiPass: '',
    // 画框摆放模式（横屏、竖屏）
    displayMode: 'hor',
    // 显示亮度（0-100）
    brightness: 100,
    // 播放模式（单张播放、顺序播放、随机播放）
    playMode: 'simple',
    // 切换过渡效果
    transitionEffect: 'gradual',
    // 图片播放持续时间（秒） n<(2^31-1)/1000
    playDuration: 300,
    // 图片列表
    // imgUrlList: [
    //   'https://xm-photo-test.oss-cn-hangzhou.aliyuncs.com/image/1.jpg',
    //   'https://xm-photo-test.oss-cn-hangzhou.aliyuncs.com/image/2.jpg',
    //   'https://xm-photo-test.oss-cn-hangzhou.aliyuncs.com/image/3.jpg',
    //   'https://xm-photo-test.oss-cn-hangzhou.aliyuncs.com/image/4.jpg',
    //   'https://xm-photo-test.oss-cn-hangzhou.aliyuncs.com/image/5.jpg',
    //   'https://xm-photo-test.oss-cn-hangzhou.aliyuncs.com/image/6.jpg',
    //   'https://xm-photo-test.oss-cn-hangzhou.aliyuncs.com/image/7.jpg',
    //   'https://xm-photo-test.oss-cn-hangzhou.aliyuncs.com/image/8.jpg',
    //   'https://xm-photo-test.oss-cn-hangzhou.aliyuncs.com/image/9.jpg',
    // ],
    imgUrlList: [
      // 'https://w.wallhaven.cc/full/we/wallhaven-weml17.png',
      // 'https://w.wallhaven.cc/full/kw/wallhaven-kwk2e7.jpg',
      // 'https://w.wallhaven.cc/full/q6/wallhaven-q6x2wd.jpg',
      'https://www.jhxblog.cn/image/xmpicture/1.jpg',
      'https://www.jhxblog.cn/image/xmpicture/2.jpg',
      'https://www.jhxblog.cn/image/xmpicture/3.jpg',
      'https://www.jhxblog.cn/image/xmpicture/4.jpg',
      'https://www.jhxblog.cn/image/xmpicture/5.jpg',
      'https://www.jhxblog.cn/image/xmpicture/6.jpg',
      'https://www.jhxblog.cn/image/xmpicture/7.jpg',
      'https://www.jhxblog.cn/image/xmpicture/8.jpg',
      'https://www.jhxblog.cn/image/xmpicture/9.jpg',
    ],
    // 当前播放图片索引
    curShowIndex: 0,
  })

  /**
   * @funcName: changeValue
   * @author: RedStar★
   * @date: 2023-07-13 23:00:00
   * @description: 更改指定配置项
   */
  const changeValue = (key, value) => {
    switch (key) {
      case 'online':
        baseConfig.online = value
        break
      case 'wifiSSID':
        baseConfig.wifiSSID = value
        break
      case 'wifiPass':
        baseConfig.wifiPass = value
        break
      case 'displayMode':
        baseConfig.displayMode = value
        break
      case 'brightness':
        baseConfig.brightness = value
        break
      case 'playMode':
        baseConfig.playMode = value
        break
      case 'transitionEffect':
        baseConfig.transitionEffect = value
        break
      case 'playDuration':
        baseConfig.playDuration = value
        break
    }
  }

  const playModeList = [
    {
      value: 'simple',
      label: '固定播放',
    },
    {
      value: 'order',
      label: '顺序播放',
    },
    {
      value: 'random',
      label: '随机播放',
    },
  ]

  return {
    baseConfig,
    playModeList,
    changeValue,
  }
})
