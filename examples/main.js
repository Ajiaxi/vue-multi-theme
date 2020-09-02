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
  onThemeChange: (themeOptions, loadExternalCss) => {

    let cssFile = 'index.css'

    // 如果主题是theme1，则ElementUI加载红色主题
    // 当然你也可以通过其它自定义的主题参数来确定要加载哪个文件
    if (themeOptions.name === 'theme1') {
      cssFile = 'red.css'
    }
    // 加载外部css到指定ID的link上，如果ID的link已存在，则删除重建
    loadExternalCss('element-theme-link', `/element-themes/${cssFile}`)
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
