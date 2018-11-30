<template>
  <div
    class="sql-menu-tree"
    ref="sqlMenuTree"
  ></div>
</template>

<script>
  import D3MenuTree from './D3MenuTree';
  import json       from '../data/tree'


  export default {
    name: "SqlMenuTree",
    mounted() {
      this.$nextTick(function () {
        const menuTree = new D3MenuTree(this.$refs.sqlMenuTree);
        menuTree.draw(json);
      })
    }
  }
</script>

<style lang='scss' rel="stylesheet/scss" type="text/scss">
  .sql-menu-tree {
    width: 100%;
    height: 100%;

    .node-title {
      display: flex;
      font-size: 12px;
      align-items: center;

      i {
        margin-left: 5px;
        transform: scale(0.6);
        cursor: pointer;
      }

      .node-title-text {
        margin-left: 20px;
      }
    }

    .node rect {
      cursor: pointer;
      fill: #fff;
      fill-opacity: 0.5;
      stroke: #3182bd;
      stroke-width: 1.5px;
    }

    .node text {
      font: 10px sans-serif;
      pointer-events: none;
    }

    .link {
      fill: none;
      stroke: #9ecae1;
      stroke-width: 1.5px;
    }
  }
</style>
