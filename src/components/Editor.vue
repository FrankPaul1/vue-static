<template>
  <el-row :gutter="20">
    <el-col :span="12">
      <div id="wapper">
        <el-button type="primary" @click="save">
          上传
          <i class="el-icon-upload el-icon--right"></i>
        </el-button>
        <el-tabs type="border-card" id="editor">
          <el-tab-pane label="HTML">
            <el-input
              type="textarea"
              :autosize="{ minRows: 2, maxRows: 4}"
              placeholder="请输入内容"
              v-model="html"
              @input="update">
            </el-input>
          </el-tab-pane>
          <el-tab-pane label="Script">
            <coder>
            </coder>
          </el-tab-pane>
          <el-tab-pane label="Script">
            
          </el-tab-pane>
        </el-tabs>

      </el-col>
      <el-col :span="12">
        <iframe ref="preview" :src="frameUrl"></iframe>
      </el-col>
    </div>
  </el-row>
</template>

<script>
import _ from 'lodash'
import shortId from 'shortid'
import Coder from './Coder'

export default {
  name: 'editor',
  data() {
    return {
      html: 'Welcome to Your Vue.js App',
      js: '',
      draftId: shortId.generate(),
    }
  },
  computed: {
    frameUrl() {
      return `/api/frame?draftId=${this.draftId}`
    },
  },
  methods: {
    save() {
      const { html, js: script } = this
      this.$http
        .post('/api/draft', { html, script })
        .then(() => {
          // success callback
          this.$refs.preview.src = this.$refs.preview.src
        })
    },
    update: _.debounce(() => {
      global.$socket.publish(`DRAFT:${this.draftId}`, { js: this.js, html: this.html })
    }, 1000),
  },
  components: {
    Coder,
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
iframe {
  border: solid 1px #ccc;
  width: 100%;
}

#wapper {
  width: 100%;
}

#editor {
  width: 100%;
}
</style>
