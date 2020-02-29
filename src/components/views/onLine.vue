<template>
  <div id="onLine">
    <div v-if="$store.state.onlineArray.length > 1">
      <div>在线列表</div>
      <div
        :key="v.user_id"
        v-for="(v, k, index) in $store.state.onlineList"
        @click="enterRoom(v.user_id, v.user_name)"
        v-if="v.user_id != $store.state.user_id"
        class="list"
      >
        <span>{{ v.user_name }}</span>
      </div>
    </div>
    <div class="text" v-if="$store.state.onlineArray.length == 1">
      没有其他人在线，看来只有你这么无聊来看我了~<br />
      <!--先去打一会飞机吧-->
    </div>
    <!--<div class="btn" @click="goPlay()">打飞机走起</div>-->
  </div>
</template>

<script>
// import { Toast} from 'mint-ui';
export default {
  name: 'on-line',
  data() {
    return {
      user_name: '',
      user_id: '',
      list: []
    }
  },
  methods: {
    goPlay() {
      let audio = document.getElementById('audio')
      audio.pause()
      this.$router.push('/plane')
    },
    enterRoom(to_id, toName) {
      console.log(to_id)
      if (to_id == this.$store.state.user_id) {
        Toast({
          message: '这么无聊吗？和自己聊天'
        })
      } else {
        sessionStorage.setItem('toName', toName)
        this.$router.replace('/chat/' + this.$store.state.user_id + '/' + to_id)
      }
    }
  },
  created() {},
  computed: {},
  mounted() {
    this.$nextTick(() => {
      let audio = document.getElementById('audio')
      audio.play()
    })
  }
}
</script>

<style lang="less">
#onLine {
  width: 100vw;
  /*height: 100vh;*/
  background: #fff;
  .list {
    width: 100vw;
    padding: 0.24rem;
    box-sizing: border-box;
    border-bottom: 1px solid #eee;
  }
  .text {
    font-size: 0.26rem;
    padding: 0.8rem 0.3rem;
    text-align: center;
  }
  .btn {
    width: 2rem;
    height: 1rem;
    background: #26a2ff;
    display: block;
    margin: 1rem auto;
    color: #fff;
    font-size: 0.3rem;
    font-weight: bold;
    text-align: center;
    line-height: 1rem;
  }
}
</style>
