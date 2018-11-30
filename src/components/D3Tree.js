import * as d3 from 'd3'


const margin   = {top: 30, right: 20, bottom: 30, left: 20},
      nodeSize = {width: 200, height: 150, margin: 10},
      duration = 400;


const TITLE_COLOR_CLASS = [
  'primary',
  'success',
  'warning',
  'danger',
];


export default class D3Tree {
  constructor(el) {
    this.$el = el;
    const style = getComputedStyle(this.$el);
    this.width = parseFloat(style.width);
    this.height = parseFloat(style.height);

    // this.svg = d3.select(this.$el)
    //   .append('svg')
    //   .attr('width', this.width)
    //   .attr('height', this.height);

    // 初始化树状图数据获取器
    this.tree = d3.tree()
      .nodeSize([nodeSize.width, nodeSize.height]);
    // .separation(function (a, b) { // 设置节点之间的间距
    //   return (a.parent === b.parent ? 2 : 1) / a.depth
    // });
  }

  draw(data) {
    const hierarchyData = d3.hierarchy(data)
      .sum(function (d) {
        return d.value;
      });

    // 初始化树状图
    this.treeData = this.tree(hierarchyData);
    this.$_draw();
  }

  $_draw() {
    const ctx = this;

    // 删除当前树
    this.svg && this.svg.remove();
    this.svg = d3.select(this.$el)
      .append('svg')
      .attr('width', this.width)
      .attr('height', this.height);

    // 获取节点
    let nodes = this.treeData.descendants();
    // 获取连线
    let links = this.treeData.links();


    console.log('treeData', this.treeData);
    console.log('nodes', nodes);
    console.log('links', links);

    let depth = 0;
    for (let i = 0; i < nodes.length; i++) {
      depth = Math.max(nodes[i].depth, depth);
      if (nodes[i].children) {
        nodes[i]._children = nodes[i].children;
      }
    }

    // 根节点高度即为深度
    const viewPortWidthHalf  = Math.pow(2, Math.max(depth + 1, 1)) * nodeSize.width,
          viewPortHeightHalf = depth * nodeSize.height;


    this.svg.transition()
      .duration(duration)
      .attr("viewBox", [
        -margin.left - viewPortWidthHalf / 2,
        -margin.top,
        viewPortWidthHalf + margin.right,
        viewPortHeightHalf + margin.bottom
      ]);

    // 绘制线
    let g = this.svg.append('g').attr('transform', 'translate(40, 40)');
    g.selectAll('.link')
      .data(links)
      .enter().append('path')
      .attr('class', 'link')
      .attr('d', d3.linkVertical()
        .x(d => d.x)
        .y(d => d.y));

    // 创建节点
    g.selectAll('.node')
      .data(nodes)
      .enter().append('g')
      .attr('class', function (d) {
        return 'node' + (d.children ? ' node--internal' : ' node--leaf')
      })
      .attr('transform', function (d) {
        return `translate(${d.x}, ${d.y})`;
      })
      .on("click", function (d) { //为节点添加click事件
        if (d.children) {//如果这个节点有children属性，则删除并重新绘图
          delete d.children;
          ctx.$_draw();
        }
        else {//否则的话，检测这个节点是否有_children属性，有的话为这个节点添加children属性，并重新绘图
          if (d._children) {
            d.children = d._children;
            ctx.$_draw();
          }
        }
      });

    // 创建标题框
    g.selectAll(('.node')).append('foreignObject')
      .append(function (d, index, group) {
        const div = document.createElement('div');
        div.setAttribute('class', `tree-node__title ${TITLE_COLOR_CLASS[d.depth % 4]}`);
        div.innerHTML = `<h1>${d.data.name}</h1>`;
        return div;
      });
  }
}
