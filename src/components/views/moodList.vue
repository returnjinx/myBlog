<template>
  <div id="moodList">
    <div class="list clearfix" v-for="(i, index) in list" :key="index">
      <span class="name">{{ i.username }}</span>
      <span class="content">{{ i.msg }}</span>
      <div class="imgBox" v-if="i.imgUrl != 'null'">
        <img :src="imgUrl + i.imgUrl" alt="" />
      </div>

      <span class="city" v-if="i.city != 'null'">{{ i.city }}</span>

      <span class="time">{{ i.time }}</span>
    </div>
  </div>
</template>
<style lang="less">
#moodList {
  .list {
    width: 100%;
    min-height: 1.3rem;
    border-bottom: 1px solid #eee;
    padding: 0.3rem 0.24rem 0.2rem;
    box-sizing: border-box;
    &:last-of-type {
      border-bottom: 0;
    }
    .name {
      font-size: 0.3rem;
      font-weight: bold;
      display: block;
      color: #26a2ff;
      margin-bottom: 0.2rem;
    }
    .content {
      font-size: 0.24rem;
      font-weight: bold;
      display: block;
      width: 100%;
      color: #333;
      margin-bottom: 0.2rem;
    }
    .time {
      font-size: 0.2rem;
      display: block;
      color: #999;
      float: right;
    }
    .city {
      font-size: 0.2rem;
      display: block;
      color: #999;
      float: left;
    }
    .imgBox {
      width: 3.5rem;
      height: 3.5rem;
      margin-bottom: 0.2rem;
      > img {
        height: 100%;
        width: auto;
      }
    }
  }
}
</style>
<script>
export default {
  //数据处理
  data() {
    return {
      list: ''
    }
  },
  //引用的组件
  components: {},
  //方法
  methods: {},
  //生命周期
  created() {
    this.axios
      .get('/getMoodList?page=1&pagesize=10')
      .then(res => {
        console.log(res)
        if (res.data.status == 'ok') {
          this.list = res.data.data
        } else {
          Toast({
            message: res.data.message
          })
        }
      })
      .catch(err => {
        console.log(err)
      })
  },
  computed: {},
  mounted() {}
}
</script>
