import { createRouter, createWebHashHistory } from 'vue-router'
import mainVue from '../components/mainVue.vue'
import ieltsTest from '../components/ieltsTest.vue'
import cetSixTest from '../components/cetSixTest.vue'
import cetFourTest from '../components/cetFourTest.vue'

const routes = [
  {
    path: '/',
    component: mainVue
  },
  {
    path: '/ielts',
    component: ieltsTest
  },
  {
    path: '/cet6',
    component: cetSixTest
  },
  {
    path: '/cet4',
    component: cetFourTest
  }



]

const router = createRouter({
  // history: createWebHistory(),
  history: createWebHashHistory(),
  routes,
})

export default router;