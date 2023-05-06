<template>
  <div>
    <div class="toolbar">
      <div class="menu-list">
        <div class="menu-item" v-for="(i, index) in muenList">
          <i class="iconfont" :class="i.icon"></i>
          {{ i.text }}
        </div>
      </div>
    </div>
    <component is="Infomation" />
  </div>
</template>

<script>
import Infomation from '../infomation/index.vue';
export default {
  name: 'Toolbar',
  components: { Infomation },
  data() {
    return {
      muenList: [
        {
          icon: 'icon-message',
          text: '基础信息',
          name: 'info',
        },
        {
          icon: 'icon-music-t',
          text: '背景音乐',
          name: 'music',
        },
        {
          icon: 'icon-size-f',
          text: '初始画面',
          name: 'entry',
        },
        {
          icon: 'icon-eye-s',
          text: '可视设置',
          name: 'visible',
        },
      ],
    };
  },

  mounted() {},

  methods: {},
};
</script>

<style lang="less" scoped>
.toolbar {
  width: 100%;
  height: 2.08rem;
  background: rgba(27, 27, 28, 0.8);
  box-shadow: inset 0px 4px 0px 0px rgba(255, 255, 255, 0.1), inset 0px 2px 0px 0px #000000;
  border-radius: 0.2667rem 0.2667rem 0px 0px;
  -webkit-backdrop-filter: blur(4px);
  backdrop-filter: blur(4px);
  pointer-events: auto;
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 4000;
  display: flex;
  align-items: center;
  justify-content: center;
  .menu-list {
    padding: 0 0.4rem;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: #fff;
    font-size: 0.24rem;
    .menu-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      .iconfont {
        margin-bottom: 0.2rem;
        font-size: 0.4rem;
      }
    }
  }
}
</style>
