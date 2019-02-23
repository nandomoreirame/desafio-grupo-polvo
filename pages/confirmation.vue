<template>
  <div class="Confirmation">
    <c-card>
      <p>O seu cadastro com o email: <strong>{{ email }}</strong> foi efetivado com sucesso. Obrigado!</p>
      <p><nuxt-link to="/" v-text="`Entrar`" /></p>
    </c-card>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'Confirmation',
  components: {
    CCard: () => import('~/components/Card')
  },
  computed: {
    ...mapState({
      email: state => state.email
    })
  },
  mounted() {
    if (!this.email) {
      this.toggleLoading(true)
      this.$nuxt.$router.replace({ path: '/' })
    }

    setTimeout(() => {
      this.toggleLoading(false)
    }, 1000)
  },
  methods: {
    ...mapActions([
      'toggleLoading'
    ])
  }
}
</script>

<style lang="stylus">
.Confirmation
  text-align center
  p
    font-size .875rem /* 14/16 */
    margin-bottom .9375rem /* 15/16 */
    a
      font-size 80%
      opacity .8
</style>
