import Vue from 'vue'
import App from './App.vue'
import index from './common/index'
import store from './store/store'
import Promise from 'promise-polyfill'
import router from './router/router'
import jinx_sdk from './common/js/jinx_sdk.js'
// import Mint from 'mint-ui';
// import 'mint-ui/lib/style.css';
// Vue.use(Mint);

import {
  Header,
  Tabbar,
  Toast,
  TabItem,
  Button,
  TabContainer,
  TabContainerItem,
  Cell,
  Field,
} from 'mint-ui'
Vue.component(Header.name, Header)
Vue.component(Tabbar.name, Tabbar)
Vue.component(Toast.name, Toast)
Vue.component(TabItem.name, TabItem)
Vue.component(Button.name, Button)
Vue.component(TabContainer.name, TabContainer)
Vue.component(TabContainerItem.name, TabContainerItem)
Vue.component(Cell.name, Cell)
Vue.component(Field.name, Field)
if (!window.Promise) {
  window.Promise = Promise
}

// import axios from 'axios'
import config from './common/js/config.js'
var axios = config.axios
var $http = config.api
axios.defaults.withCredentials = true //跨域保存session有用
// axios.defaults.baseURL="http://192.168.0.241:3000";
// axios.defaults.baseURL="http://hellojinx.cn:3000/" ;

window.socket_url = 'ws://192.168.4.41:3001'
if (window.location.href.indexOf('hellojinx.cn') != -1) {
  window.mode = 'API'
  window.socket_url = 'ws://hellojinx.cn:3001'
  Vue.prototype.imgUrl = 'http://hellojinx.cn:3000'
  axios.defaults.baseURL = 'http://hellojinx.cn:3000/api/'
} else {
  window.mode = 'DEV'
  Vue.prototype.imgUrl = 'http://192.168.0.130:3000'
  window.socket_url = 'ws://192.168.0.130:3001'
  axios.defaults.baseURL = 'http://192.168.0.130:3000/api/'
}
Vue.prototype.$http = $http
Vue.prototype.axios = axios
const app = new Vue({
  render: (h) => h(App),
  router,
  store,
  index,
})

app.$mount('#app')
Vue.use(jinx_sdk)

var browser = {
  versions: (function () {
    var u = navigator.userAgent,
      app = navigator.appVersion
    return {
      //移动终端浏览器版本信息
      trident: u.indexOf('Trident') > -1, //IE内核
      presto: u.indexOf('Presto') > -1, //opera内核
      webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
      gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
      mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
      ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
      android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或uc浏览器
      iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
      iPad: u.indexOf('iPad') > -1, //是否iPad
      webApp: u.indexOf('Safari') == -1, //是否web应该程序，没有头部与底部
    }
  })(),
  language: (navigator.browserLanguage || navigator.language).toLowerCase(),
}
if (browser.versions.ios) {
  Vue.prototype.inIos = true
} else {
  Vue.prototype.inIos = false
}
