/** 
 * 多主题组件的渲染组件（包装组件）
 * @author 王智泉
 * @description 跟据传入的组件名（__component）找到当前主题中对就的组件，然后将其渲染出来，如果主题中找不到对应的组件，则渲染默认组件（__default）
 */
export default {
    functional: true,
    props: {
        __component: { // 要渲染当前主题里的组件的名称
            type: String,
            required: true
          },
        __default: Object // 如果当前主题找不到__component时，默认渲染的组件
    },
    render: function(createElement, context) {
        // functional模式
        let renderCom = ''
        if (context) {
            renderCom = context.props.__component
            let component = context.parent.$getThemeComponent(context.props.__component)
            if (component == null && context.props.__default) {
                component = context.props.__default
            }
            if (component) {
                let params = Object.assign(context.data, {key: context.parent.themeOptions.name})
                return createElement(component, params, context.children)
            }
        }
        // 非functional模式
        else {
            renderCom = this.__component
            let component = this.$getThemeComponent(this.__component)
            if (component == null && this.__default) {
                component = this.__default
            }
            return createElement(component, {
                key: this.themeOptions.name,
                props: this.$attrs,
                on: this.$on,
                scopedSlots: this.$scopedSlots
            })
        }
        // throw new Error(`ThemeRender:没可渲染的组件"${renderCom}",请检查__component和__default参数`)
        return createElement('div', {style: {color: 'red'}}, `ThemeRender:没可渲染的组件"${renderCom}",请检查__component和__default参数`)
    }
}