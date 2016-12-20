<template>
  <codemirror :code="code" :options="editorOption"></codemirror>
</template>

<script>
import { codemirror } from 'vue-codemirror'

export default {
  data() {
    return {
      editorOption: {
        keyMap: 'sublime',
        styleSelectedText: true,
      },
    }
  },
  props: ['code'],
  components: {
    codemirror,
  },
}
</script>

<style>
  
</style>