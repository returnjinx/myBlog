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



        {path: '*', redirect: "/main"},


    ],


})
