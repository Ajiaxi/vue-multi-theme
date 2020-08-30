export default {
    components: {
        Component1: () => import('./components/Component1'),
        Home: () => import('./components/Home'),
	},
    options: {
        cnName: '重定义按钮的行为',
        page3Background: `url(${require('./res/page3background.jpg')})`,
    }
}