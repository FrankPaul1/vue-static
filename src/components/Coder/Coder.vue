<template>
  <codemirror :code="editCode" :options="options" @changed="changed" :hint="true">
  </codemirror>
</template>

<script>
import { codemirror } from 'vue-codemirror'

const leastLines = 10

export default {
  data() {
    let editCode = this.code
    const lens = (this.code || '').split(/[\r\n]+/)
    if (lens.length < leastLines) {
      editCode = lens
        .concat(new Array(leastLines - lens.length).fill(''))
        .join('\r')
    }
    return {
      editCode,
    }
  },
  props: ['code', 'options'],
  computed: {
  },
  methods: {
    changed(newCode) {
      this.$emit('changed', newCode)
    },
  },
  components: {
    codemirror,
  },
}
</script>

<style>
</style>