<template>
    <div class="com1">
        <h3>这是默认主题的组件1</h3>
        <slot></slot>
    </div>
   
</template>

<script>
    export default {
    }
</script>

<style scoped>
.com1 {
    color: white;
    background: black;
    width: 100%;
    height: 500px;
    font-size: 24px;
    font-weight: bold;
}
</style>