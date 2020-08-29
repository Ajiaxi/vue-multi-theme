<template>
  <div>
    <Header/>
    <div class="page3" :style="{backgroundImage:themeOptions.page3Background}">
    </div>
    <h3>各主题并没有单独定义这个页面（使用默认页面组件），仅仅通过主题的参数page3Background让不同主题有不同背景</h3>
    <div>当前主题参数：{{JSON.stringify(themeOptions, null, 2)}}</div>
  </div>
</template>

<script>
export default {
}
</script>

<style scoped>
.page3 {
    margin: auto;
    width: 533px;
    height: 300px;
    font-size: 24px;
    font-weight: bold;
    color: red;
    background-repeat:no-repeat;
    background-image: url(/page3Background.jpg);
}
</style>