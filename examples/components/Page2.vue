<template>
  <div>
    <Header/>
    <div>页面2</div>
    <ThemeRender __component="Component1" :__default="component1()">
      <div class="sub-com">子DIV</div>
    </ThemeRender>
  </div>
</template>

<script>
import Component1 from './Component1'
export default {
    methods: {
        component1: () => Component1
    }
}
</script>

<style scoped>
  .sub-com {
    margin: auto;
    width: 400px;
    line-height: 400px;
    background:white;
    color: black;
  }
</style>