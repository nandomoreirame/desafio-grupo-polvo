import webpack from 'webpack'

import {
  name,
  description
} from './package'

export default {
  mode: 'universal',
  head: {
    title: name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  loading: {
    color: '#000'
  },
  css: [],
  plugins: [
    { src: '~/plugins/client.js', ssr: false }
  ],
  modules: [
    '@nuxtjs/pwa'
  ],
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
