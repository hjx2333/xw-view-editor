<template>
  <div class="right-box">
    <template v-if="currentComponent">
      <a-tabs v-model="active" @change="tabChange">
        <a-tab-pane v-for="item in titleTabs" :key="item.key" :tab="item.tab" />
      </a-tabs>

      <div class="component-box">
        <keep-alive>
          <!-- 公共样式 -->
          <common-style-config v-if="active === 'CStyle'">
            <component :is="renderComponent" />
          </common-style-config>
          <component :is="renderComponent" v-else />
        </keep-alive>
      </div>
    </template>
    <template v-else>
      <page-config />
    </template>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import CStore from './components/pageRight/CStore.vue'
import AnimateConfig from './components/pageRight/AnimateConfig.vue'
import PageConfig from './components/pageRight/PageConfig.vue'
import CommonStyleConfig from './components/pageRight/CommonStyleConfig.vue'
export default {
  name: 'PageRight',
  components: { CStore, AnimateConfig, PageConfig, CommonStyleConfig },
  data() {
    return {
      active: 'CStyle',
      titleTabs: [
        {
          key: 'CStyle',
          tab: '属性'
        },
        {
          key: 'AnimateConfig',
          tab: '动画'
        },
        {
          key: 'CStore',
          tab: '数据'
        }
      ],
      renderComponent: ''
    }
  },
  computed: {
    ...mapGetters(['currentComponent'])
  },
  watch: {
    currentComponent(val) {
      if (!val || this.active !== 'CStyle') return
      this.renderComponent = `${val.component}Style`
    }
  },
  methods: {
    tabChange(val) {
      const currentComponent = this.currentComponent
      if (!currentComponent) return

      console.log(this)

      if (val === 'CStyle') {
        this.renderComponent = `${currentComponent.component}Style`
        return
      }

      this.renderComponent = val
    }
  }
}
</script>

<style lang="scss" scoped>
.right-box {
  width: 360px;
  background-color: var(--aside-bg-color);
  .tab-group {
    display: flex;
    height: 40px;
    line-height: 40px;
    border-bottom: 1px solid var(--border-color);

    .tab-item {
      flex: 1;
      margin-right: 8px;
      cursor: pointer;
      padding: 0 8px;
      text-align: center;
    }

    .active {
      border-bottom: 2px solid $primary-color;
    }
  }

  .component-box {
    padding: 0 20px;
    height: calc(100% - 64px);
    overflow: auto;
    overflow-x: hidden;
  }
}
</style>
