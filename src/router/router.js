import { createRouter, createWebHashHistory } from 'vue-router'
import mainVue from '../components/mainVue.vue'
import ieltsTest from '../components/ieltsTest.vue'
import cetSixTest from '../components/cetSixTest.vue'
import cetFourTest from '../components/cetFourTest.vue'
import ieltsExam from '../components/ieltsExam.vue'
import kieltsView from '../views/kielts/kieltsView.vue'
const routes = [
  {
    path: '/',
    component: kieltsView,
    name: "kieltsView",
    children: [
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
  },

  {
    path: '/ielts/exam',
    name: 'ieltsExam',
    component: ieltsExam
  }


]

const router = createRouter({
  // history: createWebHistory(),
  history: createWebHashHistory(),
  routes,
})

export default router;