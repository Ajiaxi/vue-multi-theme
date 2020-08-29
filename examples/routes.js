import {themeRouteProps, ThemeRender} from 'vue-multi-theme'
import Home from './components/Home'
import Page2 from './components/Page2'
import Page3 from './components/Page3'

export default [
    {path: '/', name:'home', component: ThemeRender, props: themeRouteProps('Home', Home) },
    {path: '/page2', name:'page2', component: Page2},
    {path: '/page3', name:'page3', component: Page3},
];