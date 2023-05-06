<template>
  <div>
    <div class="shared-editor" ref="editor$" v-html="html"></div>
  </div>
</template>

<script>
import Quill from 'quill';
let quill;
export default {
  data() {
    return {
      init: false,
    };
  },
  props: {
    // enable: {
    //   type: Boolean,
    //   default: true,
    // },
    html: String,
    maxlength: Number,
    placeholder: String,
  },

  mounted() {
    this.$nextTick(() => {
      quill = new Quill(this.$refs.editor$, {
        modules: { toolbar: false },
        placeholder: this.placeholder,
      });
      //quill.enable(props.enable)
      quill.on('text-change', this.onTextChange);
      quill.root.addEventListener('blur', () => this.$emits('blur'));

      const $editable = this.$refs.editor$.querySelector('[contenteditable]');
      $editable.addEventListener('paste', (e) => {
        e.preventDefault();
        let clp = (e.originalEvent || e).clipboardData;
        let text;
        if (clp === undefined || clp === null) {
          text = window.clipboardData.getData('text') || '';
        } else {
          text = clp.getData('text/plain') || '';
        }

        if (text) {
          if (!quill.hasFocus()) {
            quill.focus();
          }
          let index = (quill.getSelection() || {}).index;
          if (typeof index == 'undefined') {
            index = quill.getLength() - 1;
          }
          setTimeout(() => {
            quill.insertText(index, text);
            quill.setSelection(index + text.length, 0);
          }, 50);
          setTimeout(() => {
            quill.update();
            this.$emits('change', { html: methods.getHtml(), length: quill.getLength() - 1, paste: true });
          }, 200);
        }
      });
    });
  },

  methods: {
    onTextChange: (delta, old, source) => {
      let length = 0;
      let maxlength = this.maxlength;
      let html = quill.root.innerHTML;
      if (!this.init) {
        this.init = true;
        // 数据加载
        this.$emits('change', { html: methods.getHtml(), length: quill.getLength() - 1, init: true });
        if (maxlength && quill.getLength() > maxlength) {
          setTimeout(() => {
            quill.deleteText(maxlength, quill.getLength());
          }, 100);
        }
        return;
      }

      // 过滤emoji表情
      html = html.replace(/[\ud800-\udbff][\udc00-\udfff]/g, function (char) {
        if (char.length === 2) {
          return '';
        } else {
          return char;
        }
      });
      if (maxlength && quill.getLength() > maxlength) {
        setTimeout(() => {
          quill.deleteText(maxlength, quill.getLength());
          length = quill.getLength() - 1;
          this.$emits('change', { html, length });
        }, 100);
      } else {
        length = quill.getLength() - 1;
        this.$emits('change', { html, length });
      }
    },

    focus: () => {
      quill.focus();
    },
    focusin: () => {
      return quill.hasFocus();
    },
    enable: (enabled) => {
      quill.enable(enabled);
      this.onTextChange();
    },
    getHtml: () => {
      let html = quill.root.innerHTML;
      // 过滤emoji表情
      html = html.replace(/[\ud800-\udbff][\udc00-\udfff]/g, function (char) {
        if (char.length === 2) {
          return '';
        } else {
          return char;
        }
      });
      return html;
    },
    setHtml: (html) => {
      if (html !== void 0) {
        quill.root.innerHTML = html;
      }
    },
    getLength: () => {
      return quill.getLength() - 1;
    },
    insertLink: (text, link) => {
      if (!text || !link) {
        return;
      }
      if (!/http(s)?:\/\//.test(link)) {
        link = location.protocol + '//' + link;
      }
      if (!quill.hasFocus()) {
        quill.focus();
      }
      let index = (quill.getSelection() || {}).index;
      if (typeof index == 'undefined') {
        index = quill.getLength() - 1;
      }

      methods.init = true;
      quill.insertText(index, text, 'link', link);
      quill.blur();
    },
  },
};
</script>

<style lang="less" scoped></style>
