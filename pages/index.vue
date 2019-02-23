<template>
  <div class="Home">
    <c-card>
      <c-register-form />
    </c-card>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'Home',
  components: {
    CCard: () => import('~/components/Card'),
    CRegisterForm: () => import('~/components/RegisterForm')
  },
  mounted() {
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
</style>
