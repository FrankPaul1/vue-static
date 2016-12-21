<template>
  <coder :code.sync="code" :options="option" @changed="changed"></coder>
</template>

<script>
import Coder from './Coder'

export default {
  name: 'html-coder',
  data() {
    return {
      option: {
        tabSize: 2,
        styleActiveLine: true,
        lineNumbers: true,
        autoCloseTags: true,
        line: true,
        mode: 'text/html',
        theme: 'ambiance',
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