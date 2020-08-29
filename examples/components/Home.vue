<template>
  <div>
    <Header/>
    <h1>默认界面：{{msg}} {{userId}} 当前主题 {{themeOptions.name}} {{themeOptions.cnName}}</h1>
    <button @click="btnClick">按钮1</button>
    <slot></slot>
  </div>
</template>

<script>

export default {
  props: {
    msg: String,
    userId: String
  },
  methods: {
    btnClick: function () {
      alert('Hello 我是默认主题的按钮事件')
    } 
  }
}
</script>

<style scoped>
h1 {
  margin: 40px 0 0;
  color: blue;
}
</style>
