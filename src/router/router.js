/**
 * Created by wton on 2016/10/6.
 */
import Vue from "vue";
import VueRouter from "vue-router";
import my from "../components/index";


Vue.use(VueRouter);


export  default  new VueRouter({
    scrollBehavior (to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            return {x: 0, y: 0}
        }
    },
    // mode: 'history',
    routes: [
        //连载页
        {path: '/main', component: my.main},
        {path: '/login', component: my.login},
        {path: '/register', component: my.register},
        {path: '/foot', component: my.foot},
        {path: '/plane', component: my.plane},
        {path: '/mood', component: my.mood},
        {path: '/moodList', component: my.moodList},
        {path: '/upload', component: my.upload},
        {path: '/friend', component: my.friend},
        {path: '/onLine', component: my.onLine},
        {path: '/chat/:from_id/:to_id', component: my.chat},

        {path: '*', redirect: "/main"},


    ],


})
