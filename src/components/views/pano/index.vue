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
    };
  },

  mounted() {
    // this.initPano();
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
          friction: 0.1,
          touchPanSpeedCoeffFactor: 1,
          // hotSpots: [
          //   {
          //     pitch: 14.1,
          //     yaw: 1.5,
          //     type: 'info',
          //     text: 'Baltimore Museum of Art',
          //     URL: 'https://artbma.org/',
          //   },
          //   {
          //     pitch: -9.4,
          //     yaw: 222.6,
          //     type: 'info',
          //     text: 'Art Museum Drive',
          //   },
          //   {
          //     pitch: -0.9,
          //     yaw: 144.4,
          //     type: 'info',
          //     text: 'North Charles Street',
          //   },
          // ],
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
