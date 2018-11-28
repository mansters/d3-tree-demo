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

    .every {
      width: 400px;
      height: 425px;
      margin: 15px;
      float: left;

      h3 {
        margin: 0;

        .button {
          float: right;
          margin-right: 20px;
          font-size: 14px;
          cursor: pointer;
          padding: 2px 8px;
          border: 1px solid #ccc;
          background: yellowgreen;
          border-radius: 4px;

          &:hover {
            background: violet;
          }

        }
      }
      .svg {
        width: 400px;
        height: 400px;
      }

    }

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

  }
</style>
