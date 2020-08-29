/** 
 * Vue多主题插件入口
 * @author 王智泉
 */
import Theme from './Theme'
import ThemeRender from './ThemeRender'
import themeRouteProps from './themeRouteProps'
import themeWebpackContextPaser from './themeWebpackContextPaser'

export {themeRouteProps, ThemeRender}

export default {
    installed: false,
    /** 
     * 主题插件初始化
     * @param {Object|webpackContext} options.themeConfigs 主题根目录的index.js对象或者是指向themes子目录的require.context对象包含所有主题信息
     * @param {string} options.themeName 默认主题名称
     * @param {Object} options.themeOptions 主题参数 
     */
    install: function(Vue, options = {}) {
    
        if (this.installed) return;
        this.installed = true

        // webpackContext，这里只做简单判断，不敢用ES6的name属性，怕有兼容问题
        if (typeof options.themeConfigs == 'function' && options.themeConfigs.keys) {
            options.themeConfigs = themeWebpackContextPaser(options.themeConfigs)
        }

        Theme.init(Vue, options.themeConfigs, options.themeName, options.themeOptions)
        Vue.component('ThemeRender', ThemeRender)
        
        Vue.mixin({
            computed: {
                themeOptions: function() {
                    return this.$getThemeOptions()
                }
            }
        })

        Vue.prototype.$setThemeOptions = Theme.setOptions.bind(Theme)
        Vue.prototype.$getThemeOptions = Theme.getOptions.bind(Theme)
        Vue.prototype.$setTheme = Theme.setTheme.bind(Theme)
        Vue.prototype.$getThemeComponent = Theme.getThemeComponent.bind(Theme)
    },
};
