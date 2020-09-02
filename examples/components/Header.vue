<template>
    <header>
        <ul>
            <li><router-link to="/">首页(配合Vue Router)</router-link></li>
            <li><router-link to="page2">页面2（仅页面内组件做多主题）</router-link></li>
            <li><router-link to="page3">页面3（仅通过主题参数实现多主题）</router-link></li>
            <li><router-link to="page4">页面4（替换body的class）</router-link></li>
            <li><router-link to="page5">页面5（修改ElementUI主题）</router-link></li>
        </ul>
        请选择主题
        <select v-model="themeName">
            <option v-for="item in themes" :value ="item" :key="item">{{item}}</option>
        </select>
    </header>
</template>

<script>
import {themeWebpackContextPaser} from 'vue-multi-theme'
const themeConfigs = themeWebpackContextPaser(require.context(
    '../themes',
    true,
    /\/.*\/index\.js$/
  ))
export default {
    data: function() {
        let themes = []
        for (let key in themeConfigs) {
            themes.push(key)
        }
        return {
            themes
        }
    },
    computed:  {
        themeName: {
            get: function () {
                return this.themeOptions.name
            },
            set: function (v) {
                this.$setTheme(v)
            }
        }
    }
}
</script>

<style scoped>
header {
  line-height: 40px;
  border-bottom: 1px solid #ccc;
}
li {
    display: inline-block;
    margin: 0 10px;
    color: cornflowerblue;
}
li a {
    cursor: pointer;
}
</style>
