import Vue from 'vue'
import Router from 'vue-router'
import TopPage from '@/components/pages/TopPage'
import NewCalendar from '@/components/pages/NewCalendar'
import { ROOT, NEW_CALENDAR } from '@/router/pathStrings'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: ROOT,
      name: 'TopPage',
      component: TopPage
    },
    {
      path: NEW_CALENDAR,
      name: 'NewCalendar',
      component: NewCalendar
    },
  ]
})