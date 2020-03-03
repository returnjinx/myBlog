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

    <musicList
      v-show="selected == '首页'"
      @close="close()"
      v-if="musicShow"
      class="animated"
      :class="musicEffect ? 'bounceInRight' : 'bounceOutRight'"
    ></musicList>

    <mt-tab-container v-model="selected">
      <mt-tab-container-item id="首页">
        <!--<swiperL></swiperL>-->

        <div
          class="music"
          v-if="!musicEffect"
          @click="
            musicShow = true
            musicEffect = true
          "
        ></div>
      </mt-tab-container-item>
      <mt-tab-container-item id="说说">
        <moodList></moodList>
      </mt-tab-container-item>
      <mt-tab-container-item id="在线人数">
        <online v-if="is_online == 1"></online>
      </mt-tab-container-item>
      <mt-tab-container-item id="我的">
        <mt-cell title="敬请期待"></mt-cell>
      </mt-tab-container-item>
    </mt-tab-container>
    <mt-tabbar v-model="selected">
      <mt-tab-item id="首页">
        <img
          v-if="selected != '首页'"
          slot="icon"
          src="../../img/international.png"
        />
        <img
          v-if="selected == '首页'"
          slot="icon"
          src="../../img/i_international.png"
        />
        首页
      </mt-tab-item>
      <mt-tab-item id="说说">
        <img
          v-if="selected != '说说'"
          slot="icon"
          src="../../img/social_server_fault.png"
        />
        <img
          v-if="selected == '说说'"
          slot="icon"
          src="../../img/i_social_server_fault.png"
        />
        说说
      </mt-tab-item>
      <mt-tab-item id="在线人数">
        <img
          v-if="selected != '在线人数'"
          slot="icon"
          src="../../img/sub_account.png"
        />
        <img
          v-if="selected == '在线人数'"
          slot="icon"
          src="../../img/i_sub_account.png"
        />
        在线人数
      </mt-tab-item>
      <mt-tab-item id="我的">
        <img
          v-if="selected != '我的'"
          slot="icon"
          src="../../img/user.png"
        />
        <img
          v-if="selected == '我的'"
          slot="icon"
          src="../../img/i_user.png"
        />
        我的
      </mt-tab-item>
    </mt-tabbar>
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
      selected: '首页'
    }
  },
  //引用的组件
  components: { musicList, swiperL, moodList, online },
  //方法
  methods: {
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
  /*position: fixed;*/
  /*top: 0;*/
  /*left: 0;*/
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  padding-bottom: 1.3rem;
  box-sizing: border-box;
  .mint-header {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 999;
    height: 1rem;
    font-size: 0.3rem;
  }
  .mint-tabbar {
    /*position: fixed;*/
    /*bottom: 0;*/
    /*left: 0;*/
  }
  .mint-header-title {
    height: 1rem;
    line-height: 1rem;
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
