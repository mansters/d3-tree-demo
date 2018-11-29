<template>
  <div ref="treeNode" class="d3-tree">
  </div>
</template>

<script>
  import D3Tree   from './D3Tree';
  import treeJson from '../data/tree.json';


  export default {
    name: 'HelloWorld',
    mounted() {
      this.$nextTick(function () {
        const d3Tree = new D3Tree(this.$refs.treeNode);
        d3Tree.draw(treeJson);
      });
    },
    data() {
      return {}
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' rel="stylesheet/scss" type="text/scss">
  .d3-tree {
    width: 100%;
    height: 100%;

    .link {
      fill: none;
      stroke: #ccc;
      stroke-width: 1.5px;
    }

    .node circle {
      fill: #fff;
      stroke: steelblue;
      stroke-width: 1.5px;
    }

    .node {
      font: 12px sans-serif;
    }

    .tree-node__title {
      $title-width: 80px;
      $title-height: 40px;
      background: lightgrey;
      color: #fff;
      border-radius: 5px;
      border: 1px solid #DCDFE6;
      display: flex;
      justify-content: center;
      align-items: center;

      &.primary {background: #409EFF;}
      &.success {background: #67C23A;}
      &.warning {background: #E6A23C;}
      &.danger {background: #F56C6C;}

      width: $title-width;
      height: $title-height;
      text-align: center;
      transform: translate(-$title-width / 2, -$title-height / 2);

      h1 {
        font-size: 12px;
        margin: 0;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
</style>
