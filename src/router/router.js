/**
 * Created by wton on 2016/10/6.
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import my from '../components/index'

Vue.use(VueRouter)

export default new VueRouter({
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  },
  // mode: 'history',
  routes: [
    //连载页
    // { path: '/main', component: my.main },
    { path: '/login', component: my.login },
    { path: '/register', component: my.register },
    { path: '/foot', component: my.foot },
    { path: '/plane', component: my.plane },
    { path: '/mood', component: my.mood },
    { path: '/pano', component: my.pano },
    // { path: '/main/moodList', component: my.moodList },
    // { path: '/main/musicList', component: my.musicList },
    // {path: '/upload', component: my.upload},
    // {path: '/friend', component: my.friend},
    // { path: '/onLine', component: my.onLine },
    { path: '/chat/:from_id/:to_id', component: my.chat },

    //首页子路由
    {
      path: '/main',
      component: my.main,
      children: [
        // { path: '', redirect: 'main' },
        {
          path: 'home',
          component: my.home,
          meta: {
            keepAlive: true, // 需要缓存
          },
        },
        {
          path: 'moodList',
          component: my.moodList,
          meta: {
            keepAlive: true, // 需要缓存
          },
        },
        {
          path: 'onLine',
          component: my.onLine,
          meta: {
            keepAlive: true, // 需要缓存
          },
        },
        {
          path: 'main',
          component: my.main,
          meta: {
            keepAlive: true, // 需要缓存
          },
        },
      ],
    },

    { path: '*', redirect: '/main/home' },
  ],
})
