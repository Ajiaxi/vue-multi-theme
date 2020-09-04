
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
    _currentExternalCss: [],
    _themeExternalCssPrefix: 'theme_external_css_',
    _vm: null,
    _onThemeChanged: null,

    /** 
     * 初始化主题管理器
     * @param {function} Vue Vue构造函数
     * @param {Object} themeConfigs 包含所有主题的index.js对象的对象集
     * @param {string} themeName 默认要加载的主题名称
     * @param {Object} themeOptions 默认要加载的主题的参数
     * @param {function} onThemeChanged 当主题发生变化时的回调
     */
    init: function (Vue, themeConfigs, themeName, themeOptions = {}, onThemeChanged = null) {
        if (this._vm == null) {
            this._vm = new Vue({
                data: {
                  $$themeOptions: {}
                }
            })
        }
        this._onThemeChanged = onThemeChanged
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
                theme.options.cssRootClass = 'theme-' + name // 样式前缀
                this.themes[name] = theme
                if (themeConfig.styles) {
                    themeConfig.styles.forEach(style => {
                        if (style && typeof style == 'function') {
                            style() // 加载主样式
                        }
                    });
                }
            }
        } else {
            theme.options = Object.assign(theme.options, options)
        }

        // 外部CSS处理
        const oldExternalCss = this._currentExternalCss ? this._currentExternalCss : []
        for (let i = 0; i < oldExternalCss.length; i++) {
            this._removeExternalCss(this._themeExternalCssPrefix + i)
        }
        this._currentExternalCss = []
        if (theme) {
            document.body.className = theme.options.cssRootClass
            this._currentExternalCss = theme.config.externalCss ? theme.config.externalCss : []
        }
        for (let i = 0; i < this._currentExternalCss.length; i++) {
            this._loadExternalCss(
                this._themeExternalCssPrefix + i,
                this._currentExternalCss[i]
            )
        }

        this.setOptions(theme ? theme.options : {}, true)
        this.currentTheme = theme
        if (this._onThemeChanged) {
            this._onThemeChanged(this.getOptions(), this)
        }
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

    /**
     * 加载外部css到指定ID的link上，如果ID已存在，则删除重建
     * @param {string} id link的id
     * @param {string} path css文件的路径
     */
    _loadExternalCss: function(id, path) {
        if (id == null || id.length == 0) {
            return
        }
        linnk = document.createElement('link')
        linnk.id = id + ''
        linnk.rel = 'stylesheet'
        linnk.type = 'text/css'
        linnk.href = path
        document.getElementsByTagName('head')[0].appendChild(linnk)
    },

    /**
     * 删除已加载的外部CSS
     * @param {string} id link标签的id
     */
    _removeExternalCss: function(id) {
        if (id == null || id === '') {
            return
        }
        let linnk = document.getElementById(id + '')
        if (linnk) {
            linnk.remove()
        }
    }
}

export default Theme;