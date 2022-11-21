<template>
  <div class="component-group">
    <div class="component-tab">
      <div
        v-for="(item, i) in tabs"
        :key="i"
        class="component-tab-item"
        :class="{ 'tab-selected': selected === item.value }"
        @click="selected = item.value"
      >
        {{ item.title }}
      </div>
    </div>
    <div class="component-item-box">
      <div
        v-for="item in componentStore"
        :key="item.id"
        class="component-item"
        draggable="true"
        @dragstart="handleDragstart(item)"
      >
        <div class="component-title">{{ item.title }}</div>
        <div class="component-img-box">
          <img :src="item.src" class="component-img" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PageLeft',
  data() {
    return {
      tabs: [
        {
          title: '图表',
          value: '1'
        },
        {
          title: '容器',
          value: '2'
        },
        {
          title: '控件',
          value: '3'
        }
      ],
      selected: '1',
      store: Object.freeze(this.$xwview.getDefaultComponentConfig())
    }
  },
  computed: {
    componentStore() {
      const { echarts, boxs, unit } = this.store
      let store = null
      switch (this.selected) {
        case '1':
          store = echarts
          break
        case '2':
          store = boxs
          break
        case '3':
          store = unit
      }

      return store
    }
  },
  methods: {
    handleDragstart(item) {
      this.$store.commit('updateDragStartComponent', item)
    }
  }
}
</script>

<style lang="scss" scoped>
.component-group {
  display: flex;
  padding: 10px;
  width: 300px;
  background-color: var(--aside-bg-color);

  .component-tab-item {
    width: 80px;
    padding: 5px 10px;
    cursor: pointer;
    color: var(--text-color);
  }

  .tab-selected {
    color: var(--primary-color);
    border-bottom: 1px solid var(--primary-color);
  }

  .component-item-box {
    overflow-y: auto;
    overflow-x: hidden;
    flex: 1;
  }

  .component-item {
    cursor: pointer;
    width: 140px;
    margin: 0 auto 20px auto;
    border-bottom: 1px solid var(--border-color);

    .component-title {
      font-size: 18px;
      color: var(--text-color);
      text-align: center;
    }

    .component-img-box {
      overflow: hidden;
    }
  }

  .component-img {
    width: 100%;
    transition: all 400ms ease;
    &:hover {
      transform: scale(1.3);
    }
  }
}
</style>
