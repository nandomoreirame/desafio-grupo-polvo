<template>
  <div class="Challenge">
    <nuxt />
  </div>
</template>

<style lang="stylus">
// Blocks
html, body, p, ol, ul, li, dl, dt, dd, blockquote, figure, fieldset, legend,
textarea, pre, iframe, hr, h1, h2, h3, h4, h5, h6
  margin 0
  padding 0

// Box sizing
html
  font-size 16px
  word-spacing 1px
  box-sizing border-box
  -ms-text-size-adjust 100%
  -webkit-text-size-adjust 100%
  -moz-osx-font-smoothing grayscale
  -webkit-font-smoothing antialiased

*,
*:before,
*:after
  box-sizing inherit

body
  font-family $font-family-base
  font-size 1rem /* 16/16 */
  font-weight 600
  background-color #f7f7f7
  color #828282
  word-spacing 1px
  line-height 1.5

h1, h2, h3, h4, h5, h6, strong
  font-weight 800

h1, h2, h3, h4, h5, h6
  font-family $font-family-base
  line-height 1.2

h1
  font-size 2.375rem /* 38/16 */
h2
  font-size 2.25rem /* 36/16 */
h3
  font-size 1.875rem /* 30/16 */
h4
  font-size 1.75rem /* 28/16 */
h5
  font-size 1.625rem /* 26/16 */
h6
  font-size 1.375rem /* 22/16 */

ul
  list-style none

button, input, select, textarea
  margin 0

img,
embed,
iframe,
object,
audio,
video
  height auto
  max-width 100%

iframe
  border 0

table
  border-collapse collapse
  border-spacing 0

td,
th
  padding 0
  text-align left

.Challenge
  margin 0 auto
  min-height 100vh
  display flex
  justify-content center
  align-items center
  > div
    width 100%
</style>
