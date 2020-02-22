import Vue from 'vue'
import Router from 'vue-router'
import TopPage from '@/components/pages/TopPage'
import NewCalendar from '@/components/pages/NewCalendar'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'TopPage',
      component: TopPage
    },
    {
      path: '/new-calendar',
      name: 'NewCalendar',
      component: NewCalendar
    },
  ]
})