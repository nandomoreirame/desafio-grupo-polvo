<template>
  <div class="Card">
    <div class="Card__inner">
      <header class="Card__header">
        <c-logo />
        <h2>Seja bem-vindo</h2>
      </header>
      <div class="Card__body">
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Card',
  components: {
    CLogo: () => import('~/components/Logo')
  }
}
</script>

<style lang="stylus" coped>
.Card
  max-width 26.25rem /* 420/16 */
  margin 1.875rem /* 30/16 */ auto
  &__inner
    box-shadow 0 0 5px rgba(#000, .1)
    background #fff
    padding 3.125rem /* 50/16 */
    position relative
  &__header
    text-align center
    margin-bottom 1.875rem /* 30/16 */
    h2
      font-size 12px
      color #6c41d7
</style>
