import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import VueMultiTheme from 'vue-multi-theme'
import Header from './components/Header'
import routes from './routes'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false

Vue.use(VueMultiTheme, {
  themeConfigs: require.context(
    './themes',
    true,
    /\/.*\/index\.js$/
  ),
  onThemeChanged: (/*themeOptions, loadExternalCss*/) => {
  }
  // themeName: 'theme3'
})

Vue.component('Header', Header)
Vue.use(VueRouter)

Vue.use(ElementUI);

const router = new VueRouter({
  mode: 'history',
  routes
})

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
