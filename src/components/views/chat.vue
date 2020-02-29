<template>
  <div id="chat">
    <!--<mt-header title="发表心情"></mt-header>-->

    <mt-header :title="`与${toName}的聊天`">
      <div slot="left">
        <mt-button @click.native="$router.replace('/main')">返回</mt-button>
      </div>
    </mt-header>
    <div class="msgBox">
      <div
        class="scrollBox"
        ref="allH"
      >
        <div
          class="contentBox"
          ref="conH"
        >
          <div
            v-for="(i, index) in msgList"
            :key="index"
            class=" clearfix"
            :class="i.from_id == from_id ? 'myselfBox' : 'youselfBox'"
          >
            <span :class="i.from_id == from_id ? 'my_content' : 'you_content'">
              {{ i.message }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <div class="sendBar">
      <input
        @focus="upInput('ipt')"
        @blur="downInput()"
        id="ipt"
        class="input"
        v-model="message"
        type="text"
      />
      <button
        id="snedBtn"
        @click="send()"
      >发送</button>
    </div>
  </div>
</template>

<script>
import { Toast } from 'mint-ui'
export default {
  //数据处理
  data() {
    return {
      toName: sessionStorage.getItem('toName'),
      user_id: '',
      message: '',
      from_id: '',
      to_id: '',
      send_token: '',
      receive_token: '',
      ws: '',
      msgList: []
    }
  },
  //引用的组件
  components: {},
  //方法
  methods: {
    newUpInput(ele) {
      const input = document.getElementById(ele)
      let interval

      input.onfocus = () => {
        interval = setInterval(() => {
          input.scrollIntoViewIfNeeded()
        }, 1000)
      }
      input.onblur = () => {
        clearInterval(interval)
      }
    },
    setScroll() {
      this.$nextTick(() => {
        let allH = this.$refs.allH.offsetHeight
        let conH = this.$refs.conH.offsetHeight

        console.log(allH, conH)
        if (conH > allH) {
          this.$refs.allH.scroll(0, conH + allH)
          // this.ScrollTop(conH + allH, 2000000)
        }
      })
    },
    send() {
      if (this.message != '') {
        let res = {}
        res.from_id = this.from_id
        res.to_id = this.to_id
        res.message = this.message
        // res.socket_id = this.$store.state.ws.id

        Object.keys(this.$store.state.onlineList).forEach(key => {
          if (this.$store.state.onlineList[key].user_id == this.to_id) {
            res.socket_id = this.$store.state.onlineList[key].socket_id
          }
        })
        this.$store.state.ws.emit('new_message', res)
        this.msgList.push(res)
        this.message = ''
        this.setScroll()
      } else {
        Toast({
          message: '请输入信息'
        })
      }
    },
    upInput(ele) {
      // this.err_ipt = ''
      // 键盘调起需要时间延时处理，scrollIntoView是H5的api jquery没有这种方法要用原生获取元素
      setTimeout(function () {
        var element = document.getElementById(ele)
        element.scrollIntoView()
        element.scrollIntoView(false)
        element.scrollIntoView({ block: 'end' })
        element.scrollIntoView({
          behavior: 'instant',
          block: 'end',
          inline: 'nearest'
        })

        //下面方法解释中 true 是在可视区域的顶部，但是在我实际使用中发现他是在可视区域的底部
      }, 500)
    },
    downInput() {
      let t = setTimeout(() => {
        window.scroll(0, 0)
        clearTimeout(t)
      }, 200)
    }
  },
  //生命周期
  created() {
    this.from_id = this.$route.params.from_id
    this.to_id = this.$route.params.to_id
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
          this.$store.state.ws.on('receive_message', data => {
            this.msgList.push(data)
            this.setScroll()
          })
        } else {
          this.$router.replace('/login')
          sessionStorage.removeItem('username')
        }
      })
      .catch(function (err) { })
  },
  computed: {},
  mounted() { }
}
</script>
<style lang="less">
#chat {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  .mint-header {
    z-index: 10;
  }
  .msgBox {
    width: 100vw;
    height: 100%;
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;
    padding: 40px 0 1.3rem;
    box-sizing: border-box;
    .scrollBox {
      width: 100%;
      height: 100%;
      padding: 0.24rem;
      box-sizing: border-box;
      overflow-y: scroll;
      .contentBox {
        height: auto;
        overflow: hidden;
      }
      .myselfBox {
        width: 100%;
        height: auto;
        line-height: 0.4rem;
        margin-bottom: 0.3rem;
        .my_content {
          max-width: 90%;
          display: block;
          color: #fff;
          font-size: 0.3rem;
          float: right;
          padding: 0.24rem;
          box-sizing: border-box;
          background: #26a2ff;
          border-radius: 0.08rem;
        }
      }
      .youselfBox {
        width: 100%;
        height: auto;
        line-height: 0.4rem;
        margin-bottom: 0.3rem;
        .you_content {
          max-width: 90%;
          display: block;
          color: #222;
          font-size: 0.3rem;
          float: left;
          padding: 0.24rem;
          box-sizing: border-box;
          background: #eee;
          border-radius: 0.08rem;
        }
      }
    }
  }
  .sendBar {
    position: fixed;
    z-index: 10;
    bottom: 0;
    left: 0;
    height: 1.3rem;
    width: 100vw;
    padding: 0.15rem 2% 0;
    box-sizing: border-box;
    background: #f2f2f2;

    .input {
      width: 76%;
      height: 1rem;
      border-radius: 0.08rem 0 0 0.08rem;
      box-sizing: border-box;
      float: left;
      padding: 0.24rem;
      font-size: 0.24rem;
      line-height: 0.65rem;
    }
    #snedBtn {
      width: 24%;
      height: 1rem;
      background: #26a2ff;
      border-radius: 0 0.08rem 0.08rem 0;
      color: #fff;
      float: right;
      &:active {
        opacity: 0.8;
      }
    }
  }
}
</style>
