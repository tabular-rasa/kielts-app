import { createRouter, createWebHashHistory } from 'vue-router'
import mainVue from '../components/mainVue.vue'
import ieltsTest from '../components/ieltsTest.vue'
import cetSixTest from '../components/cetSixTest.vue'
import cetFourTest from '../components/cetFourTest.vue'
import ieltsExam from '../components/ieltsExam.vue'
import kieltsView from '../views/kielts/kieltsView.vue'
import login from '../views/user/login.vue'
import register from '../views/user/register'
import score from '../components/score.vue'
const routes = [
  {
    path: '/',
    component: kieltsView,
    name: "kieltsView",
    redirect: '/main',
    meta: { authRequired: true },
    children: [
      {
        path: '/main',
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
  },
  {
    path: '/ielts/exam',
    name: 'ieltsExam',
    component: ieltsExam,
    meta: { authRequired: true }
  }
  ,
  {
    path: '/ielts/score',
    name: 'score',
    component: score
  },
  {
    path: '/login',
    name: 'login',
    component: login
  },
  {
    path: '/register',
    name: 'register',
    component: register
  },

]

const router = createRouter({
  base: '/',
  // history: createWebHistory(),
  history: createWebHashHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  if (to.name !== 'login' && !token) next({ name: 'login' })
  else next()
})

export default router;