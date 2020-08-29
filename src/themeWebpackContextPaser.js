/** 
 * 将require.context返回的webpackContext整理成主题配置对象
 *  @author 王智泉
 *  @param {function} webpackContext require.context返回的webpackContext函数
 */
export default (webpackContext) => {
    const themeConfigs = {}
    webpackContext.keys().forEach((fileName) => {
        const themeConfig = webpackContext(fileName)
        if (themeConfig) {
            let themeName = fileName.replace(/\.\/(.*)\/index.js/, '$1')
            themeConfigs[themeName] = themeConfig.default
        }
    })
    return themeConfigs
}
