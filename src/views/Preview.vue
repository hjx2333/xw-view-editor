<template>
  <xw-preview :componentStore="componentStore" :globalConfig="globalConfig" @echartsClick="clickHandle">
    <custom-map style="padding-top: 40px;" @clickHandle="mapClickHandle" />
  </xw-preview>
</template>

<script>
import { deepCopy } from '@/utils/utils'
import customMap from './components/Map.vue'
export default {
  components: { customMap },
  name: 'Preview',
  data() {
    return {
      style: {},
      timer: null,
      componentStore: {},
      globalConfig: {}
    }
  },
  created() {
    this.componentStore = deepCopy(this.$store.state.system.componentStore)
    this.globalConfig = deepCopy(this.$store.state.system.globalConfig)
  },
  mounted() {
    this.timer = setInterval(() => {
      this.mapClickHandle()
    }, 3000)

    window.addEventListener('resize', this.init)
  },
  destroyed() {
    clearInterval(this.timer)
    window.removeEventListener('resize', this.init)
  },
  methods: {
    clickHandle({ name }) {
      alert(name)
    },

    mapClickHandle(e) {
      try {
        this.componentStore.forEach(d => {
          if (['柱状图', '折线图'].includes(d.title)) {
            d.store.staticData = [
              {
                title: '越秀区',
                count: Math.floor(Math.random() * 60)
              },
              {
                title: '天河区',
                count: Math.floor(Math.random() * 60)
              },
              {
                title: '南沙区',
                count: Math.floor(Math.random() * 60)
              }
            ]
            // throw new Error()
          } else if (d.title === '饼图') {
            d.store.staticData = [
              {
                name: '越秀区',
                value: Math.floor(Math.random() * 60),
                itemStyle: {
                  color: '#0072ff'
                }
              },
              {
                name: '天河区',
                value: Math.floor(Math.random() * 60),
                itemStyle: {
                  color: '#00eaff'
                }
              },
              {
                name: '南沙区',
                value: Math.floor(Math.random() * 60),
                itemStyle: {
                  color: '#01aaff'
                }
              }
            ]
          }
        })
      } catch (error) {
        console.log(1)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.preview-wrap {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #000;

  .preview-contain {
    position: relative;

    .component-item {
      position: absolute;
    }
  }
}
</style>
