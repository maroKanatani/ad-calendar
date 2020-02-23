import Vue from 'vue'
import Router from 'vue-router'
import TopPage from '@/components/pages/TopPage'
import NewCalendar from '@/components/pages/NewCalendar'
import ViewCalendar from '@/components/pages/ViewCalendar'
import { ROOT, NEW_CALENDAR, VIEW_CALENDAR } from '@/router/pathStrings'

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
    {
      path: VIEW_CALENDAR,
      name: 'ViewCalendar',
      component: ViewCalendar
    }
  ]
})