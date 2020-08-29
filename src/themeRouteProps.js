/** 
 * 多主题组件做为Vue-Router的页面组件时的路由参数
 * @author 王智泉
 * @description 当在主题中找到__component对应的组件实例时，渲染该组件；否则，渲染__default指定的组件
 * 
 * @param {string} __component 要渲染的页面组件的名称
 * @param {function} __default 如果在主题找不到__component组件时，默认渲染的组件
 * @param {Object} __props 要传递给组件的其它参数，一般用不上
 */
export default (__component, __default, __props = null) => {
    return (route) => {
        let props = Object.assign(
            __props ? __props : {},
            route.query,
            route.params // RESTful风格
        )
        props.__component = __component;
        if (__default != null) {
            props.__default = __default
        }
        return props
    }
}
