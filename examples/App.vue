<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
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
