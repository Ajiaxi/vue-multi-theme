<template>
  <div>
    <Header/>
    <h3>传统替换样式文件实现多主题，当前主题色</h3>
    <div class="current-theme-color"></div>
    <div>当前主题参数：{{JSON.stringify(themeOptions, null, 2)}}</div>
  </div>
</template>

<script>
export default {
}
</script>

<style scoped>
.current-theme-color {
    width: 533px;
    height: 300px;
    margin: auto;
    border: 1px solid #666;
}
</style>