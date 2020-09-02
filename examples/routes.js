import {themeRouteProps, ThemeRender} from 'vue-multi-theme'
import Home from './components/Home'
import Page2 from './components/Page2'
import Page3 from './components/Page3'
import Page4 from './components/Page4'
import Page5 from './components/Page5'

export default [
    {path: '/', name:'home', component: ThemeRender, props: themeRouteProps('Home', Home) },
    {path: '/page2', name:'page2', component: Page2},
    {path: '/page3', name:'page3', component: Page3},
    {path: '/page4', name:'page4', component: Page4},
    {path: '/page5', name:'page5', component: Page5},
];