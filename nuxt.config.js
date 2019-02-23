import webpack from 'webpack'

import {
  title,
  description,
  homepage
} from './package'

export const isProduction = process.env.NODE_ENV === 'production'
export const baseUrl = isProduction ? homepage : 'http://localhost:3000'

export default {
  mode: 'universal',
  head: {
    title,
    meta: [
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { 'http-equiv': 'X-UA-Compatible', content: 'IE=edge' },
      { name: 'og:locale', content: 'pt_BR' },
      { 'http-equiv': 'Content-Language', content: 'pt-br' },
      { name: 'googlebot', content: 'index,follow' },
      { name: 'robots', content: 'index,follow,noodp' },
      { name: 'country', content: 'Brazil' },
      { name: 'revisit-after', content: '7 days' },
      { name: 'mobile-web-app-capable', content: 'yes' },
      { name: 'generator', content: 'Visual Studio Code - Insiders' },
      { hid: 'description', name: 'description', content: description }
    ],
    link: [
      { rel: 'author', href: `${baseUrl}/humans.txt` },
      { rel: 'index', href: `${baseUrl}/` },
      { rel: `shortcut icon`, href: `${baseUrl}/icon.png`, type: `image/png` },
      { rel: 'icon', type: 'image/x-icon', href: `${baseUrl}/favicon.ico` }
    ]
  },
  loading: '~/components/Loading.vue',
  plugins: [
    { src: '~/plugins/client.js', ssr: false }
  ],
  modules: [ '@nuxtjs/pwa' ],
  build: {
    plugins: [
      new webpack.LoaderOptionsPlugin({
        options: {
          stylus: {
            use: [ require('rupture')() ],
            preferPathResolver: 'webpack',
            import: [
              '~assets/stylus/config.styl',
              '~assets/stylus/mixins.styl',
              '~assets/stylus/placeholders.styl'
            ]
          },
          context: '/'
        }
      })
    ],
    extend(config, { isDev, isClient }) {
      config.devtool = 'source-map'
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}
