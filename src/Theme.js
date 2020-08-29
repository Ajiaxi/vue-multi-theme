
/**
 * 主题管理器
 * @description 对主题进行注册和管理
 * @author 王智泉
 */
const Theme = {

    themeConfigs: {}, // 主题的配置列表
    themes: {}, // 主题的组件列表
    currentTheme: {}, // 当前主题
    currentOptions: {}, // 当前主题参数
    _vm: null,

    /** 
     * 初始化主题管理器
     * @param {function} Vue Vue构造函数
     * @param {Object} themeConfigs 包含所有主题的index.js对象的对象集
     * @param {string} themeName 默认要加载的主题名称
     * @param {Object} themeOptions 默认要加载的主题的参数
     */
    init: function (Vue, themeConfigs, themeName, themeOptions = {}) {
        if (this._vm == null) {
            this._vm = new Vue({
                data: {
                  $$themeOptions: {}
                }
            })
        }
        this.themeConfigs = themeConfigs
        this.setTheme(themeName, themeOptions)
    },

    /**
     * 设置当前主题
     * @param {string} name 要加载的主题的名称
     * @param {Object} options 主题参数
     */
    setTheme: function(name, options) {
        
        let theme = this.themes[name]
        if (theme == null) {
            const themeConfig = this.themeConfigs[name]
            if (themeConfig) {
                theme = {
                    name,
                    config: Object.assign(themeConfig),
                    loaded: false
                }
                if (theme.config.components == null) {
                    theme.config.components = {}
                }
                theme.options = Object.assign(themeConfig.options, options ? options : {})
                theme.options.name = name
                theme.options.cssRoot = 'theme-' + name // 样式前缀
                this.themes[name] = theme
            }
        } else {
            theme.options = Object.assign(theme.options, options)
        }
        this.setOptions(theme ? theme.options : {}, true)
        this.currentTheme = theme
    },

    /**
     * 获取当前主题参数
     * @returns {Object} 返回当前主题的参数
     */
    getOptions: function () {
        if (this._vm) {
            return this._vm.$data.$$themeOptions
        }
    },

    /**
     * 设置当前主题的参数
     * @param {Object} options 主题参数 
     * @param {boolean} overwrite 是否覆盖之前的参数，如果设置为false表示和之前的参数合并 
     */
    setOptions: function (options, overwrite = false) {
        if (overwrite) {
            this.currentOptions = options
        } else {
            this.currentOptions = Object.assign(this.currentOptions, options)
        }
        this._vm._data.$$themeOptions = this.currentOptions
    },
    
    /**
     * 从当前主题中获取指定的组件
     * @param {string} componentName 要获取的组件的名称
     */
    getThemeComponent: function(componentName) {
        let componentInst = null

        if (this.currentTheme) {
            componentInst = this.currentTheme.config.components[componentName]
            if (this.currentTheme.config.components && !this.currentTheme.loaded) {
                this.currentTheme.loaded = true
                 // 注册主题下的组件
                for (let k in this.currentTheme.config.components) {
                    this.currentTheme.config.components[k]()
                }
            }
        }

        return componentInst
    },
}

export default Theme;