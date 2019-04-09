import Vue from 'vue';
import App from './App.vue';
import index from './common/index';
import store from './store/store';
import Promise from 'promise-polyfill';
import router from './router/router';
import Mint from 'mint-ui';
import 'mint-ui/lib/style.css';
import './common/css/animate.min.css';
if (!window.Promise) {
    window.Promise = Promise;
}

Vue.use(Mint);
import axios from 'axios';
axios.defaults.withCredentials=true;  //跨域保存session有用
// axios.defaults.baseURL="http://192.168.0.105:3000";
axios.defaults.baseURL="http://192.168.0.241:3000";
// axios.defaults.baseURL="http://hellojinx.cn:3000/";


Vue.prototype.axios=axios;
const app = new Vue({
    render: (h)=>h(App),
    router,
    store,
    index
});

app.$mount("#app");

var browser = {
    versions: function () {
        var u = navigator.userAgent, app = navigator.appVersion;
        return {         //移动终端浏览器版本信息
            trident: u.indexOf('Trident') > -1, //IE内核
            presto: u.indexOf('Presto') > -1, //opera内核
            webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
            gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
            mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
            ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
            android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或uc浏览器
            iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
            iPad: u.indexOf('iPad') > -1, //是否iPad
            webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部
        };
    }(),
    language: (navigator.browserLanguage || navigator.language).toLowerCase()
}
if (browser.versions.ios) {
    Vue.prototype.inIos = true;
}else{
    Vue.prototype.inIos = false;
};





