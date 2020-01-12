import Vue, { DirectiveOptions } from 'vue'
import 'normalize.css'
import '@/styles/index.scss'

import ElementUI from 'element-ui'
import SvgIcon from 'vue-svgicon'

import '@/styles/element-variables.scss'
import i18n from '@/lang'
import '@/permission'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/icons/components'
// import * as filters from '@/filters'

Vue.config.productionTip = false

Vue.use(ElementUI, {
  i18n: (key: string, value: string) => i18n.t(key, value)
})

Vue.use(SvgIcon, {
  tagName: 'svg-icon',
  defaultWidth: '1em',
  defaultHeight: '1em'
})

// // Register global filter functions
// Object.keys(filters).forEach(key => {
//   Vue.filter(key, (filters as { [key: string]: Function })[key])
// })

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
