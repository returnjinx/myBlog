<template>
  <div class="shared-editor" ref="editor$" v-html="html"></div>
</template>
<script setup>
import Quill from 'quill';
import { ref, watch, onMounted } from 'vue';

let quill;
const editor$ = ref(null);
const props = defineProps({
  enable: {
    type: Boolean,
    default: true,
  },
  html: String,
  maxlength: Number,
  placeholder: String,
});

const html = props.html;
const emits = defineEmits(['change', 'blur']);

const onTextChange = (delta, old, source) => {
  let length = 0;
  let maxlength = props.maxlength;
  let html = quill.root.innerHTML;
  if (!methods.init) {
    methods.init = true;
    // 数据加载
    emits('change', { html: methods.getHtml(), length: quill.getLength() - 1, init: true });
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
      emits('change', { html, length });
    }, 100);
  } else {
    length = quill.getLength() - 1;
    emits('change', { html, length });
  }
};

const methods = {
  init: false,
  focus() {
    quill.focus();
  },
  focusin() {
    return quill.hasFocus();
  },
  enable: (enabled) => {
    quill.enable(enabled);
    onTextChange();
  },
  getHtml() {
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
  setHtml(html) {
    if (html !== void 0) {
      quill.root.innerHTML = html;
    }
  },
  getLength() {
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
};

defineExpose(methods);

onMounted(() => {
  quill = new Quill(editor$.value, {
    modules: { toolbar: false },
    placeholder: props.placeholder,
  });
  //quill.enable(props.enable)
  quill.on('text-change', onTextChange);
  quill.root.addEventListener('blur', () => emits('blur'));

  const $editable = editor$.value.querySelector('[contenteditable]');
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
        emits('change', { html: methods.getHtml(), length: quill.getLength() - 1, paste: true });
      }, 200);
    }
  });
});
</script>
