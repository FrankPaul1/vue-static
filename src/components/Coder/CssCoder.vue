<template>
  <coder :code="code" :options="option" @changed="changed"></coder>
</template>

<script>
import Coder from './Coder'

export default {
  name: 'css-coder',
  data() {
    return {
      option: {
        tabSize: 2,
        styleActiveLine: true,
        lineNumbers: true,
        line: true,
        mode: 'text/css',
        theme: 'paraiso-light',
      },
    }
  },
  props: ['code', 'changed'],
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