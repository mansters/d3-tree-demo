<template>
  <div id="app">
    <div class="layout-item">
      <SqlMenuTree/>
    </div>
    <div class="layout-item"></div>

  </div>
</template>

<script>
  import SqlExplainTree from './components/SqlExplainTree'
  import SqlMenuTree from './components/SqlMenuTree';


  export default {
    name      : 'App',
    components: {
      SqlExplainTree,
      SqlMenuTree,
    }
  }
</script>

<style lang='scss' rel="stylesheet/scss" type="text/scss">

  html, body {
    width: 100%;
    height: 100%;
  }

  #app {
    width: 100%;
    height: 100%;
    display: flex;

    .layout-item {
      flex: 1;
    }
  }

</style>
