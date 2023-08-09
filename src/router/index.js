import { createRouter, createWebHistory } from 'vue-router'
import ManagerView from '@/views/Manager/ManagerView.vue'
import PictureView from '@/views/PictureView.vue'
import ConfigManager from '@/views/Manager/components/ConfigManager.vue'
import PictureManager from '@/views/Manager/components/PictureManager.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'picture',
      component: PictureView,
    },
    {
      path: '/manager',
      component: ManagerView,
      children: [
        {
          path: '/manager/',
          component: ConfigManager,
        },
        {
          path: '/manager/picture',
          component: PictureManager,
        },
      ],
    },
  ],
})

export default router
