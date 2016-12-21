<template>
  <coder :code="code" :options="option" @changed="changed"></coder>
</template>

<script>
import Coder from './Coder'

export default {
  name: 'js-coder',
  data() {
    return {
      option: {
        tabSize: 2,
        styleActiveLine: true,
        lineNumbers: true,
        line: true,
        foldGutter: true,
        styleSelectedText: true,
        gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter'],
        highlightSelectionMatches: { showToken: /\w/, annotateScrollbar: true },
        mode: 'text/javascript',
        // hint.js的配置项
        hintOptions: {
          // 当匹配只有一项的时候是否自动补全
          completeSingle: false,
        },
        // 快捷键 可提供三种模式 sublime、emacs、vim
        keyMap: 'sublime',
        matchBrackets: true,
        showCursorWhenSelecting: true,
        theme: 'monokai',
        extraKeys: { Ctrl: 'autocomplete' },
      },
    }
  },
  props: ['code'],
  methods: {
    changed(newCode) {
      this.$emit('changed', newCode)
    },
  },
  components: {
    Coder,
  },
}
</script>

<style scoped>
</style>