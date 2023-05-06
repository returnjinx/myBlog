<template>
  <div class="infomation-layer">
    <!-- <Editor :html="description" :maxlength="descriptionMax" ref="editor$" @change="onDescriptionChange" @blur="onEditDescription" /> -->
  </div>
</template>

<script>
import Editor from '../editor/index.vue';
export default {
  name: 'Infomation',

  data() {
    return { description: '1232', descriptionMax: 20 };
  },
  components: { Editor },
  mounted() {},

  methods: {
    onDescriptionChange: () => {
      console.log('onDescriptionChange');
    },
    onEditDescription: () => {
      console.log('onEditDescription');
    },
  },
};
</script>

<style lang="less" scoped>
.infomation-layer {
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.3);
  -webkit-backdrop-filter: blur(3px);
  backdrop-filter: blur(3px);
  position: fixed;
  z-index: 5000;
}
</style>
