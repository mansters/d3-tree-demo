import * as d3 from 'd3'


export default class D3Tree {
  constructor(el) {
    this.width  = 600;
    this.height = 400;

    this.svg = d3.select(el)
      .append('svg')
      .attr('width', this.width)
      .attr('height', this.height);

    // 初始化树状图数据获取器
    this.tree = d3.tree()
      .size([this.width - 200, this.height - 200])
      .separation(function (a, b) { // 设置节点之间的间距
        return (a.parent === b.parent ? 1 : 2) * a.depth
      });
  }

  draw(data) {
    // 初始化 JSON 数据转成一棵树
    let hierarchyData = d3.hierarchy(data)
      .sum(function (d) {
        return d.value;
      });

    // 初始化树状图
    let treeData = this.tree(hierarchyData);
    // 获取节点
    let nodes    = treeData.descendants();
    // 获取连线
    let links    = treeData.links();

    console.log('treeData', treeData);
    console.log('nodes', nodes);
    console.log('links', links);

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
      });

    // 绘制节点
    g.selectAll('.node').append('circle')
      .attr('r', 5)
      .style('fill', function (d) {
        return ['#b7ff6b', '#ffd000', '#6c9aff', '#ff8095'][d.depth % 4];
      });

    // 绘制文字
    g.selectAll('.node').append('text')
      .attr('dy', function (d) {
        return d.children ? 3 : 20;
      })
      .attr('x', function (d) {
        return d.children ? -8 : -15;
      })
      .style('text-anchor', function (d) {
        return d.children ? 'end' : 'start';
      })
      .text(function (d) {
        return d.data.name
      })
      .style('font-size', '11px');
  }
}
