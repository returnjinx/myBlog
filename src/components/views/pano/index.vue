<template>
  <div class="content">
    <input v-if="!panoImg" type="file" ref="file" accept=".jpg,.png" @change="hanlderChangeFile" />
    <div v-else id="panorama"></div>
  </div>
</template>

<script>
import panoImg from '@/img/pano/test.jpg';
import browser from '@/utils/browser.js';
export default {
  name: 'pano',

  data() {
    return {
      panoImg: null,
      viewer: null,
      socket: null,
    };
  },

  mounted() {
    this.panoImg = panoImg;
    setTimeout(() => {
      this.initPano();
      this.setSocket();
    }, 100);
  },

  methods: {
    hanlderChangeFile(e) {
      console.log(e.target.files[0]);
      let file = e.target.files[0];
      this.panoImg = window.URL.createObjectURL(file);
      console.log(this.panoImg);
      this.$nextTick(() => {
        this.initPano();
      });
      this.$refs.file.value = '';
    },
    movePano(pos) {
      this.viewer.lookAt(pos.pitch, pos.yaw, pos.hfov);
    },

    sendPanoData() {
      let data = {
        pitch: this.viewer.getPitch(),
        yaw: this.viewer.getYaw(),
        hfov: this.viewer.getHfov(),
      };
      this.socket.emit('same_screen', data);
    },
    receivePanoData() {},
    setSocket() {
      if (!this.socket) {
        this.socket = io.connect('ws://localhost:3001');
        this.socket.on('connecting', function (data) {
          console.log('连接中...');
        });
        this.socket.on('connected', (data) => {
          console.log('连接成功');
        });
        this.socket.on('same_screen', (data) => {
          console.log(data);
          this.movePano(data);
        });

        this.socket.on('disconnect', function () {
          console.log('与服务其断开');
        });
        this.socket.on('connect_failed', function (data) {
          console.log('连接失败');
        });
      }
    },

    initPano() {
      if (!this.viewer) {
        let tapTime = null;
        this.viewer = pannellum.viewer('panorama', {
          type: 'equirectangular',
          // panorama: 'https://pannellum.org/images/alma.jpg',
          panorama: this.panoImg,
          autoLoad: true,
          showControls: false,
          hfov: browser.isMobile() ? 0 : 100,
          // friction: 0.1,
          touchPanSpeedCoeffFactor: 1,
        });

        this.viewer.on('load', () => {});
        this.viewer.on('zoomchange', () => {});
        this.viewer.on('touchstart', (e) => {
          tapTime = {};
          tapTime.start = new Date().getTime();
        });
        document.getElementById('panorama').addEventListener('touchmove', (e) => {
          console.log('move');
          tapTime.move = true;
          this.sendPanoData();
        });
        this.viewer.on('touchend', (e) => {
          tapTime.end = new Date().getTime();
          let time = tapTime.end - tapTime.start;
          if (time >= 50 && !tapTime.move) {
            console.log('长按了1');
          }
          tapTime = null;
        });
      }
    },
  },
};
</script>

<style lang="less" scoped>
.content {
  width: 100%;
  height: 100vh;
}
</style>
