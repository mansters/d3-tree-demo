<template>
  <div id="app">
    <SqlExplainTree/>
  </div>
</template>

<script>
  import SqlExplainTree from './components/SqlExplainTree'


  export default {
    name      : 'App',
    components: {
      SqlExplainTree
    }
  }
</script>

<style lang='scss' rel="stylesheet/scss" type="text/scss">


  #app {

  }

</style>
