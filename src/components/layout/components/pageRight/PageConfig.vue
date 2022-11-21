<template>
  <div class="page-config-wrap">
    <div class="page-title">页面配置</div>
    <!-- <div>
      背景颜色：<input
        v-model="globalConfig.editor.backgroundColor"
        type="color"
      />
    </div>
    <div>
      图片/视频背景：<a-upload
        accept=".jpg,.png,.mp4"
        :max-count="1"
        :before-upload="beforeUpload"
        @change="importFile"
      >
        <a-button type="primary">上传</a-button>
      </a-upload>
    </div> -->
  </div>
</template>

<script>
import { deepCopy } from '@/utils/utils'
import { mapGetters } from 'vuex'
export default {
  name: 'PageConfig',
  data() {
    return {
      isAccept: false
    }
  },
  computed: {
    ...mapGetters(['globalConfig'])
  },
  methods: {
    beforeUpload(file) {
      const value = file.type.includes('image/') ? 'image' : 'video'
      this.$store.commit('updateGlobalEditorConfig', { name: 'backgroundType', value })
      return false
    },

    importFile(data) {
    //   if (!this.isAccept) return
      const reader = new FileReader()
      reader.readAsDataURL(data.file)
      reader.onload = evt => {
        const value = `${evt.target.result}`
        this.$store.commit('updateGlobalEditorConfig', { name: 'background', value })
        this.$store.commit('addHandleCache', deepCopy(this.componentStore))
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.page-config-wrap {
  padding: 20px;

  .page-title {
    text-align: center;
    font-size: 20px;
    line-height: 50px;
    color: var(--text-color);
  }
}

</style>
