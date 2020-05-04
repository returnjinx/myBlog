<template>
  <div id="moodList">
    <div
      class="list clearfix"
      v-for="(i, index) in list"
      :key="index"
    >
      <span class="name">{{ i.username }}</span>
      <span class="content">{{ i.msg }}</span>
      <div
        class="imgBox"
        v-if="i.imgUrl != 'null'"
      >
        <img
          :src="imgUrl + i.imgUrl"
          alt=""
        />
      </div>

      <span
        class="city"
        v-if="i.city != 'null'"
      >{{ i.city }}</span>

      <span class="time">{{ i.time }}</span>
    </div>
    <div
      class="loadData"
      v-if="loadData"
    > 加载中...</div>
  </div>
</template>

<script>
export default {
  //数据处理
  data() {
    return {
      list: [],
      page: 1,
      pagesize: 10,
      dataLoad: true,
      loadData: false,
    }
  },
  //引用的组件
  components: {},
  //方法
  methods: {
    getData() {
      this.$http.getMoodList({ page: this.page, pagesize: this.pagesize }).then(res => {
        if (res.status == 'ok') {
          if (res.data.length != 0) {
            this.loadData = false
            this.list = this.list.concat(res.data)
            // this.list = (res.data)
          } else {
            this.loadData = false
            this.dataLoad = false
          }
        } else {
          this.loadData = false
          Toast({
            message: res.message
          })
        }
      })
    },
    onScroll() {
      this.$nextTick(() => {
        let main = document.getElementById('main')
        let allH = window.screen.availHeight
        let allW = window.screen.availWidth
        let topH = 100 * (allW / 750) * 1
        let bottomH = 100 * (allW / 750) * 1
        let isPush = true
        main.onscroll = () => {
          let moodListH = document.getElementById('moodList').offsetHeight

          // console.log(main.scrollTop + allH, moodListH + topH + bottomH)
          // console.log((main.scrollTop + allH))
          if ((main.scrollTop + allH) >= (moodListH + topH + bottomH)) {
            if (isPush) {
              isPush = false
              if (this.dataLoad) {
                this.loadData = true
                console.log('到底了，有数据')
                let t = setTimeout(() => {
                  clearTimeout(t)
                  this.page++
                  this.getData()
                  isPush = true
                }, 300);
              } else {
                console.log('到底了，无数据')

              }
            }



          }
        }
      })

    }
  },
  //生命周期
  created() {
    this.getData()
    this.onScroll()
    // this.axios
    //   .get('/getMoodList?page=2&pagesize=10')
    //   .then(res => {
    //     console.log(res)
    //     if (res.data.status == 'ok') {
    //       this.list = res.data.data
    //     } else {
    //       Toast({
    //         message: res.data.message
    //       })
    //     }
    //   })
    //   .catch(err => {
    //     console.log(err)
    //   })
  },
  computed: {},
  mounted() { }
}
</script>
<style lang="less">
#moodList {
  .loadData {
    height: 0.5rem;
    line-height: 0.5rem;
    text-align: center;
  }
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