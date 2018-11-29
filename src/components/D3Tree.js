import * as d3 from 'd3'


const TITLE_COLOR_CLASS = [
  'primary',
  'success',
  'warning',
  'danger',
];


export default class D3Tree {
  constructor(el) {
    this.width = 800;
    this.height = 800;
    this.$el = el;

    this.svg = d3.select(el)
      .append('svg')
      .attr('width', this.width)
      .attr('height', this.height);

    // 初始化树状图数据获取器
    this.tree = d3.tree()
      .size([this.width - 100, this.height - 200])
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
    this.svg.remove();
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

    for (let i = 0; i < nodes.length; i++) {
      if (nodes[i].children) {
        nodes[i].childrenB = nodes[i].children;
      }
    }

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
        else {//否则的话，检测这个节点是否有childrenB属性，有的话为这个节点添加children属性，并重新绘图
          if (d.childrenB) {
            d.children = d.childrenB;
            ctx.$_draw();
          }
        }
      });

    // 创建标题框
    g.selectAll(('.node')).append('foreignObject')
      .append(function (d, index, group) {
        console.log(d);
        const div = document.createElement('div');
        div.setAttribute('class', `tree-node__title ${TITLE_COLOR_CLASS[d.depth % 4]}`);
        div.innerHTML = `<h1>${d.data.name}</h1>`;
        return div;
      });
  }
}
