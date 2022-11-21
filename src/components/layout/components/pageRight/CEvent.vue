<template>
  <div>
    <!-- <a-button type="primary" @click="eventConfig">点击事件配置</a-button> -->

    <c-event-form v-if="currentComponent" v-model="visible" :eventCode="currentComponent.event.clickFn" @confirm="confirm" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import CEventForm from './CEventConfig.vue'
export default {
  name: 'CEvent',
  components: { CEventForm },
  data() {
    return {
      visible: false
    }
  },
  computed: {
    ...mapGetters(['currentComponent'])
  },
  methods: {
    eventConfig() {
      this.visible = true
    },

    confirm(code) {
      this.$store.commit('updateEvent', { eventName: 'clickFn', handler: code })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
