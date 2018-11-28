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
        console.log(treeJson);
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
      background: #6cc7fe;
      border-radius: 5px;
      border: 1px solid lightgrey;
      display: flex;
      justify-content: center;
      align-items: center;

      width: $title-width;
      height: $title-height;
      text-align: center;
      transform: translate(-$title-width / 2, -$title-height / 2);

      h1 {
        font-size: 12px;
        margin: 0;
      }
    }
  }
</style>
