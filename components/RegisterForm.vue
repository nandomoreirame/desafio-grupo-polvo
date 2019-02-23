<template>
  <form class="RegisterForm" @submit="validateForm">
    <div class="RegisterForm__control">
      <label
        class="RegisterForm__label"
        for="RegisterFormEmail"
      >
        E-mail
      </label>
      <input
        id="RegisterFormEmail"
        v-model.trim="$store.state.email"
        type="text"
        :class="
          `RegisterForm__input
          ${(notValid.email || notValid.empty && notValid.email) ? ' RegisterForm__input--error' : ''}`
        "
        @blur="validateEmail"
      >
      <label
        v-if="notValid.empty && notValid.email"
        for="RegisterFormEmail"
        class="RegisterForm__message"
      >
        Campo obrigatório.
      </label>
      <label
        v-if="notValid.email"
        for="RegisterFormEmail"
        class="RegisterForm__message"
      >
        Email inválido, tente novamente.
      </label>
    </div>

    <div class="RegisterForm__control">
      <label
        class="RegisterForm__label"
        for="RegisterFormPassword"
      >
        Senha
      </label>
      <input
        id="RegisterFormPassword"
        v-model.trim="$store.state.password"
        type="password"
        :class="
          `RegisterForm__input
          ${(notValid.password || notValid.empty && notValid.password) ? ' RegisterForm__input--error' : ''}`
        "
        @input="passLength"
      >
      <span
        :class="
          `RegisterForm__passLength
            ${(passForce.low ? ' RegisterForm__passLength--low ' : '')}
            ${(passForce.average ? ' RegisterForm__passLength--average ' : '')}
            ${(passForce.strong ? ' RegisterForm__passLength--strong ' : '')}`
        "
      >
        <span />
      </span>
      <label
        v-if="notValid.empty && notValid.password"
        for="RegisterFormPassword"
        class="RegisterForm__message"
      >
        Campo obrigatório.
      </label>
      <label
        v-if="notValid.password"
        for="RegisterFormPassword"
        class="RegisterForm__message"
      >
        A senha não é forte o suficiente.
      </label>
      <ul>
        <li>
          <svg width="5" height="5" viewBox="0 0 5 5" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="2.5" cy="2.5" r="2.5" fill="#DBDBDB" />
          </svg>
          <span>Pelo menos 6 caracteres</span>
        </li>
        <li>
          <svg width="5" height="5" viewBox="0 0 5 5" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="2.5" cy="2.5" r="2.5" fill="#DBDBDB" />
          </svg>
          <span>Pelo menos 1 letra maiúscula</span>
        </li>
        <li>
          <svg width="5" height="5" viewBox="0 0 5 5" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="2.5" cy="2.5" r="2.5" fill="#DBDBDB" />
          </svg>
          <span>Pelo menos 1 número</span>
        </li>
      </ul>
    </div>

    <div class="RegisterForm__control">
      <label
        class="RegisterForm__label"
        for="RegisterFormConfirmPassword"
      >
        Confirme sua senha
      </label>
      <input
        id="RegisterFormConfirmPassword"
        v-model.trim="$store.state.confirmPassword"
        type="password"
        :disable="!$store.state.email"
        :class="
          `RegisterForm__input
          ${(notValid.confirmPassword || notValid.empty && notValid.confirmPassword) ? ' RegisterForm__input--error' : ''}`
        "
      >
      <label
        v-if="notValid.empty && notValid.confirmPassword"
        for="RegisterFormConfirmPassword"
        class="RegisterForm__message"
      >
        Campo obrigatório.
      </label>
      <label
        v-if="notValid.passEqual"
        for="RegisterFormConfirmPassword"
        class="RegisterForm__message"
      >
        As suas senhas não conferem.
      </label>
    </div>

    <div class="RegisterForm__control">
      <input
        type="submit"
        class="RegisterForm__button"
        role="button"
        value="Cadastrar"
      >
    </div>
  </form>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data() {
    return {
      notValid: {
        empty: false,
        email: false,
        password: false,
        confirmPassword: false,
        passEqual: false
      },
      passForce: {
        low: false,
        average: false,
        strong: false
      }
    }
  },
  mounted() {
    this.setEmail('')
    this.setPassword('')
    this.setConfirmPassword('')
  },
  methods: {
    ...mapActions([
      'toggleLoading',
      'setEmail',
      'setPassword',
      'setConfirmPassword'
    ]),
    validateForm(event) {
      event.preventDefault()
      if (this.validateEmail() && this.validatePasswords()) {
        this.toggleLoading(true)
        setTimeout(() => {
          this.$nuxt.$router.replace({ path: '/confirmation' })
        }, 2000)
      }
    },
    validateEmail() {
      const { email } = this.$store.state
      let isValid = true

      this.clearMessages()

      if (this.notIsEmail(email)) {
        this.notValid.email = true

        if (this.isEmpty(email)) {
          this.notValid.empty = true
        }

        isValid = false
      }

      return isValid
    },
    validatePasswords() {
      const { password, confirmPassword } = this.$store.state
      let isValid = true

      if (this.invalidPassword(password)) {
        this.notValid.password = true

        if (this.isEmpty(password)) {
          this.notValid.empty = true
        }

        isValid = false
      }

      if (this.invalidPassword(confirmPassword)) {
        this.notValid.confirmPassword = true

        if (this.isEmpty(confirmPassword)) {
          this.notValid.empty = true
        }

        isValid = false
      }

      if (password !== confirmPassword) {
        this.notValid.passEqual = true
        isValid = false
      }

      return isValid
    },
    notIsEmail(email) {
      if (!email) return true

      const matcher = /.+\@.+\..+/ // eslint-disable-line
      return !matcher.test(email)
    },
    isEmpty(val) {
      return val === ''
    },
    // test at least one number, one lowercase and one uppercase letter
    // and at least six characters
    invalidPassword(pass) {
      if (!pass) return true

      const matcher = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/ // eslint-disable-line
      return !matcher.test(pass)
    },
    passLength(event) {
      event.preventDefault()
      const password = event.target.value

      this.passForce.low = false
      this.passForce.average = false
      this.passForce.strong = false

      if (!this.isEmpty(password)) {
        this.passForce.low = true

        if (!this.invalidPassword(password)) {
          this.passForce.average = true

          if (password.length > 10) {
            this.passForce.strong = true
          }
        }
      }
    },
    clearMessages() {
      this.notValid.empty = false
      this.notValid.email = false
      this.notValid.password = false
      this.notValid.confirmPassword = false
    }
  }
}
</script>

<style lang="stylus">
.RegisterForm
  @extend .clearfix
  &__control
    width 100%
    margin-bottom 15px
  &__label
    line-height 1.0625rem /* 17/16 */
    font-size .75rem /* 12/16 */
    margin-bottom .3125rem /* 5/16 */
    display block
    cursor pointer
  &__message
    display block
    cursor pointer
    font-size .75rem /* 12/16 */
    color $low-color
    margin-top 4px
  &__input
    display block
    width 100%
    appearance none
    background-color #fff
    border 1px solid #bfbfbf
    box-shadow inset 1px 1px 2px rgba(#000, .15)
    font-family $font-family-base
    line-height 35px
    font-size .75rem /* 12/16 */
    padding 0 .75rem /* 12/16 */
    +above(768px)
      line-height 25px
    &--error
      color $low-color
    &--error,
    &--pass-low
      border-color $low-color
    &--pass-average
      border-color $average-color
    &--pass-strong
      border-color $strong-color
  &__button
    display block
    width 100%
    position relative
    font-size .875rem /* 14/16 */
    text-align center
    text-decoration none
    cursor pointer
    vertical-align bottom
    appearance none
    text-rendering auto
    user-select none
    box-sizing border-box
    font-family $font-family-base
    background-color #6c41d7
    color #fff
    margin 15px 0 0
    transition color .12s $timingFunction,
      background-color .12s $timingFunction
    padding .625rem /* 10/16 */ 1.875rem /* 30/16 */
    letter-spacing 0
    font-weight 700
    font-style normal
    text-rendering optimizeLegibility
    -webkit-font-smoothing antialiased
    -moz-osx-font-smoothing grayscale
    -moz-font-feature-settings "liga" on
  li
    line-height 11px
    font-size .625rem /* 10/16 */
    span, svg
      display inline-block
      vertical-align middle
  &__passLength
    margin-top .625rem /* 10/16 */
    display inline-block
    width 100%
    height .3125rem /* 5/16 */
    background-color #ededed
    position relative
    z-index 1
    &:before,
    &:after
      content ''
      width .3125rem /* 5/16 */
      height .4375rem /* 7/16 */
      background-color #fff
      z-index 3
      display block
      position absolute
      top 0
    &:before
      left percentage(1/3)
    &:after
      right percentage(1/3)
    span
      display inline-block
      position absolute
      height .3125rem /* 5/16 */
      background-color transparent
      transition all .5s linear
      top 0
      left 0
      width 0
      z-index 2
    &--low span
      background-color $low-color
      width percentage(1/3)
      opacity 1
    &--average span
      background-color $average-color
      width percentage(2/3)
      opacity 1
    &--strong span
      background-color $strong-color
      width 100%
      opacity 1
</style>
