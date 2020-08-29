<template>
  <div id="app" :class="themeOptions.cssRoot">
    <!-- <Home/> -->
    <ThemeRender __component="Home" :__default="home()" msg="哈哈，这是一条消息"/>
  </div>
</template>

<script>
import Home from './components/Home'
export default {
  name: 'App',
  methods: {
    home: () => Home
  }
}
</script>

<style>
#app {
  text-align: center;
}
.sub-component {
  width: 100%;
    background: yellow;
    line-height: 50px;
    font-size: 24px;
    font-weight: bold;
}
</style>
