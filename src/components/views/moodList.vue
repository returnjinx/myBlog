<template>
  <div id="moodList">
    <div class="list-item clearfix" v-for="(i, index) in list" :key="index">
      <span class="name">{{ i.username }}</span>
      <span class="content">{{ i.msg }}</span>
      <div class="imgBox" v-if="i.imgUrl != 'null'">
        <img :src="setImgBucket(i.imgUrl)" alt="" />
      </div>
      <div class="label">
        <span class="city" v-if="i.city != 'null'">{{ i.city }}</span>

        <span class="time">{{ i.time }}</span>
      </div>

      <div class="comments-layout" v-if="i.comment && i.comment.length > 0">
        <div class="comments-box">
          <div class="comments-item" v-for="j in i.comment">
            <div class="commenter">{{ j.user_name }}</div>
            <span>:</span>
            <div class="comment-msg">{{ j.content }}</div>
          </div>
        </div>
      </div>

      <div class="control-box">
        <div class="control-top">
          <div class="like-btn btn">点赞</div>
          <div class="comment-btn btn" @click="showComment(i.id)">评论</div>
        </div>
        <div class="control-bottom" v-if="commentId == i.id">
          <input v-model="commentMsg" type="text" />
          <div class="commit-btn btn" @click="commitComment(index)">确定</div>
        </div>
      </div>
    </div>
    <div class="loadData" v-if="loadData">加载中...</div>
  </div>
</template>

<script>
import { Toast } from 'mint-ui';
import { mapGetters } from 'vuex';
export default {
  //数据处理
  data() {
    return {
      list: [],
      page: 1,
      pagesize: 10,
      dataLoad: true,
      loadData: false,
      commentId: -1,
      commentMsg: '',
    };
  },
  computed: {
    ...mapGetters({
      user_name: 'user_name',
    }),
  },

  //引用的组件
  components: {},
  //方法
  methods: {
    commitComment(index) {
      let params = {
        content: this.commentMsg,
        cid: this.commentId,
        user_name: this.user_name,
      };
      this.$http.addComments(params).then((res) => {
        if (res.status == 'ok') {
          this.commentId = -1;
          this.commentMsg = '';
          if (this.list[index].comment) {
            this.list[index].comment.unshift(params);
          }
          this.$forceupdate();
        }
        Toast({
          message: res.message,
        });
      });
    },
    showComment(id) {
      if (this.commentId > -1) {
        this.commentId = -1;
        this.commentMsg = '';
      } else {
        this.commentId = id;
      }
    },
    getData() {
      this.$http.getMoodList({ page: this.page, pagesize: this.pagesize }).then((res) => {
        if (res.status == 'ok') {
          if (res.data.length != 0) {
            this.loadData = false;
            this.list = this.list.concat(res.data);
            // this.list = (res.data)
          } else {
            this.loadData = false;
            this.dataLoad = false;
          }
        } else {
          this.loadData = false;
          Toast({
            message: res.message,
          });
        }
      });
    },
    onScroll() {
      this.$nextTick(() => {
        let main = document.getElementById('main');
        let allH = window.screen.availHeight;
        let allW = window.screen.availWidth;
        let topH = 100 * (allW / 750) * 1;
        let bottomH = 100 * (allW / 750) * 1;
        let isPush = true;
        main.onscroll = () => {
          let moodListH = document.getElementById('moodList').offsetHeight;

          // console.log(main.scrollTop + allH, moodListH + topH + bottomH)
          // console.log((main.scrollTop + allH))
          if (main.scrollTop + allH >= moodListH + topH + bottomH) {
            if (isPush) {
              isPush = false;
              if (this.dataLoad) {
                this.loadData = true;
                console.log('到底了，有数据');
                let t = setTimeout(() => {
                  clearTimeout(t);
                  this.page++;
                  this.getData();
                  isPush = true;
                }, 300);
              } else {
                console.log('到底了，无数据');
              }
            }
          }
        };
      });
    },
  },
  //生命周期
  created() {
    this.getData();
    this.onScroll();
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
  mounted() {},
};
</script>
<style lang="less">
#moodList {
  .loadData {
    height: 0.5rem;
    line-height: 0.5rem;
    text-align: center;
  }
  .list-item {
    width: 100%;
    min-height: 1.3rem;
    border-bottom: 1px solid #eee;
    padding: 0.3rem 0.24rem 0.2rem;
    box-sizing: border-box;

    &:last-of-type {
      border-bottom: 0;
    }
    .control-box {
      min-height: 0.5rem;
      .control-top {
        height: 0.5rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .btn {
          // width: 0.4rem;
          // height: 0.4rem;
          // background: #26a2ff;
          font-size: 0.26rem;
          font-weight: bold;
          &.like-btn {
            display: block;
            color: #666;
          }
          &.comment-btn {
            display: block;
            color: #666;
          }
        }
      }
      .control-bottom {
        height: 0.5rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        > input {
          width: 80%;
          height: 0.5rem;
          border: 1px solid #eee;
          border-radius: 4px;
          padding: 0 0.1333rem;
          box-sizing: border-box;
        }
      }
    }
    .name {
      font-size: 0.3rem;
      font-weight: bold;
      display: block;
      color: #26a2ff;
      margin-bottom: 0.2rem;
    }
    .content {
      font-size: 0.3rem;
      font-weight: bold;
      display: block;
      width: 100%;
      color: #333;
      margin-bottom: 0.2rem;
    }
    .comments-layout {
      padding: 0.1333rem;
      box-sizing: border-box;
      .comments-box {
        padding: 0.1333rem;
        box-sizing: border-box;
        background: #f2f2f2;
        border-radius: 0.0533rem;

        .comments-item {
          display: flex;
          align-items: flex-start;
          align-content: flex-start;
          // min-height: 0.4rem;
          padding: 0.0667rem 0;
          .commenter {
            max-width: 25%;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            font-size: 0.24rem;
            color: #333;
          }
          .comment-msg {
            max-width: 75%;
            font-size: 0.24rem;
            padding-left: 0.0667rem;
            color: #333;
          }
        }
      }
    }
    .label {
      height: 0.4rem;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .time {
        font-size: 0.2rem;
        display: block;
        color: #999;
      }
      .city {
        font-size: 0.2rem;
        display: block;
        color: #999;
      }
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
