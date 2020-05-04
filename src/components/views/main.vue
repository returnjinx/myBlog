<template>
  <div id="main">
    <!--<mt-button  icon="back" size="small"  type="primary" @click="logout">退出登录</mt-button>-->
    <div style="height: 1rem;width: 100%;"></div>
    <mt-header :title="'欢迎，' + username">
      <div slot="right">
        <mt-button @click.native="logout">退出登录</mt-button>
      </div>
      <div slot="left">
        <mt-button @click.native="pushMood()">去发布</mt-button>
      </div>
    </mt-header>

    <div
      class="music"
      v-if="!musicEffect"
      @click="
            musicShow = true
            musicEffect = true
          "
    ></div>

    <musicList
      @close="close()"
      v-if="musicShow"
      class="animated"
      :class="musicEffect ? 'bounceInRight' : 'bounceOutRight'"
    ></musicList>

    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <div class="tabBar">
      <router-link
        :to="'/main/home'"
        tag="div"
        active-class="active"
        replace
        @click.native="chooseTab(0)"
      >
        <div class="icon home"></div>
        <div class="tabName">首页</div>
      </router-link>
      <router-link
        :to="'/main/moodList'"
        tag="div"
        active-class="active"
        replace
        @click.native="chooseTab(1)"
      >
        <div class="icon shuoshuo"></div>
        <div class="tabName">说说</div>

      </router-link>
      <router-link
        :to="'/main/online'"
        tag="div"
        active-class="active"
        replace
        @click.native="chooseTab(2)"
      >
        <div class="icon online"></div>
        <div class="tabName">在线人数</div>
      </router-link>
      <router-link
        :to="'/main'"
        tag="div"
        active-class="active"
        replace
        @click.native="chooseTab(3)"
      >
        <div class="icon me"></div>
        <div class="tabName">我的</div>
      </router-link>
    </div>

  </div>
</template>

<script>
// import {Toast,Header} from 'mint-ui';
import online from './online.vue'
import musicList from './musicList.vue'
import swiperL from './swiperL.vue'
import moodList from './moodList.vue'

export default {
  //数据处理
  // name: 'backlogin',
  data() {
    return {
      is_online: 0,
      username: '',
      musicEffect: false,
      musicShow: false,
      num: '',
      src: '',
      selected: '首页',
      itemList: [
        '首页',
        '说说',
        '在线人数',
        '我的',
      ]
    }
  },
  //引用的组件
  components: { musicList, swiperL, moodList, online },
  //方法
  methods: {
    chooseTab(type) {
      this.selected = this.itemList[type]
    },
    pushMood() {
      this.$router.replace('/mood')
    },
    close() {
      this.musicEffect = false
      let s = setTimeout(() => {
        this.musicShow = false
        clearTimeout(s)
      }, 1000)
    },
    logout() {
      this.axios
        .get('/logout')
        .then(res => {
          if (res.data.status == 1) {
            sessionStorage.removeItem('username')
            this.$router.replace('/login')
            let audio = document.getElementById('audio')
            audio.pause()
          }
        })
        .catch(function (err) { })
    },
    listen() {
      // audio.removeEventListener("ended",this.listen,false);
      let audio = document.getElementById('audio')
      audio.src = this.src

      audio.addEventListener(
        'ended',
        () => {
          this.num = this.$store.state.playIndex
          if (this.num >= this.$store.state.musicList.length - 1) {
            this.num = 0
          } else {
            this.num++
          }
          this.$store.commit('chooseMusic', this.num)
          audio.play()
        },
        false
      )
    }
  },
  //生命周期
  created() {
    this.axios
      .get('/checkLogin')
      .then(res => {
        //                console.log(res)
        if (res.data.status == 1) {
          this.is_online = 1
          // sessionStorage.setItem('username',res.data.username);
          // this.$router.replace('/main');
          this.username = res.data.username
          let Vuex_userInfo = {}
          Vuex_userInfo.username = res.data.username
          Vuex_userInfo.user_id = res.data.user_id
          this.$store.commit('setUserInfo', Vuex_userInfo)

          if (!this.$store.state.onlineList) {
            this.$store.commit('setSocket')
          }

          const url = 'http://hellojinx.cn:4000/top/list?idx=1'
          fetch(url)
            .then(response => {
              response
                .json()
                .then(data => {
                  if (this.$store.state.play_url == '') {
                    this.$store.commit('setMusicList', data.playlist.tracks)
                    this.$store.commit('setMusic', data.playlist.tracks[0].id)
                    this.$store.commit('change', 0)
                    this.num = this.$store.state.playIndex
                    this.listen()
                  }
                  // if(this.$store.state.ws==''){
                  //     this.$store.commit('setSocket');
                  //
                  // }
                })
                .catch(error => {
                  console.log(error)
                })
            })
            .catch(error => console.log('刚开始就出错了,,,,', error))
        } else {
          this.$router.replace('/login')
          sessionStorage.removeItem('username')
        }
      })
      .catch(function (err) { })
  },
  computed: {},
  mounted() {
    // let audio = document.getElementById('audio');
    // document.addEventListener("WeixinJSBridgeReady", ()=> {
    //     audio.play();
    // }, false);
  }
}
</script>
<style lang="less">
#main {
  width: 100%;
  height: 100vh;
  background: #fff;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  padding-bottom: 1.3rem;
  box-sizing: border-box;
  .mint-header-title {
    height: 100%;
    line-height: 1rem;
  }
  .mint-header {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 999;
    height: 1rem;
    font-size: 0.3rem;
  }
  .tabBar {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 1rem;
    display: flex;
    align-items: center;
    border-top: 1px solid #f2f2f2;
    background: #fff;
    box-sizing: border-box;
    > div {
      flex: 1;
      .icon {
        width: 0.48rem;
        height: 0.48rem;
        margin: 0 auto 0.05rem;
        &.home {
          background: url("../../img/international.png") no-repeat;
          background-size: 100% 100%;
        }
        &.shuoshuo {
          background: url("../../img/social_server_fault.png") no-repeat;
          background-size: 100% 100%;
        }
        &.online {
          background: url("../../img/sub_account.png") no-repeat;
          background-size: 100% 100%;
        }
        &.me {
          background: url("../../img/user.png") no-repeat;
          background-size: 100% 100%;
        }
      }
      .tabName {
        font-size: 0.24rem;
        text-align: center;
      }
    }
    .router-link-exact-active {
      .icon {
        &.home {
          background: url("../../img/i_international.png") no-repeat;
          background-size: 100% 100%;
        }
        &.shuoshuo {
          background: url("../../img/i_social_server_fault.png") no-repeat;
          background-size: 100% 100%;
        }
        &.online {
          background: url("../../img/i_sub_account.png") no-repeat;
          background-size: 100% 100%;
        }
        &.me {
          background: url("../../img/i_user.png") no-repeat;
          background-size: 100% 100%;
        }
      }

      .tabName {
        color: #26a2ff;
      }
    }
  }
  .music {
    width: 0.5rem;
    height: 0.5rem;
    background: url("../../img/musicIcon.png") no-repeat;
    background-size: 100%;
    position: fixed;
    top: 1.2rem;
    right: 0.24rem;
    z-index: 2;
  }
}
</style>
