<template>
  <transition name="layout" mode="out-in">
    <c-preloader v-if="$store.state.isLoading" />
  </transition>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  components: {
    CPreloader: () => import('~/components/Preloader')
  },
  methods: {
    ...mapActions([
      'toggleLoading'
    ]),
    start() {
      this.toggleLoading(true)
    },
    finish() {
      this.toggleLoading(false)
    }
  }
}
</script>

<style lang="stylus">
.loading
  &-enter-active,
  &-leave-active,
  &-leave-to
    transition opacity .25s ease-in-out
    opacity: 1

  &-enter,
  &-leave-to,
  &-leave-active
    opacity 0
</style>
