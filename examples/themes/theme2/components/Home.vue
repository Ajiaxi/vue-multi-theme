
<template>
  <div>
    <Header/>
    <h3>你好，我是主题 {{themeOptions.name}} 的Home</h3>
    <div class="content">
      <div>我长得和默认的Home完全不一样</div>
      <ul>
        <li>列表项1</li>
        <li>列表项2</li>
        <li>列表项3</li>
      </ul>
    </div>
    <slot></slot>
  </div>
</template>
<script>
import Home from '../../../components/Home'
export default {
  extends: Home
}
</script>
<style scoped>
.content {
  margin: auto;
  width: 400px;
  height: 200px;
  background: #ccc;
}
ul {
  margin: auto;
  width: 100px;
}
</style>
