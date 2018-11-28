import * as d3 from 'd3'


export default class D3Tree {
  constructor(el) {
    this.width  = 400;
    this.height = 400;

    this.svg = d3.select(el)
      .append('svg')
      .attr('width', this.width)
      .attr('height', this.height);

    // 初始化树状图数据获取器
    this.tree = d3.tree()
      .size([this.width, this.height - 80])
      .separation(function (a, b) {
        return (a.parent === b.parent ? 1 : 2) / a.depth
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
    let nodes = treeData.descendants();
    // 获取连线
    let links = treeData.links();
    // 绘制线
    let g = this.svg.append('g').attr('transform', 'translate(40, 0)');
    g.selectAll('.link')
      .data(links)
      .enter().append('path')
      .attr('class', 'link')
      .style('fill', '#ccc')
      .attr('d', d3.linkHorizontal()
        .x(d => d.y)
        .y(d => d.x));

    // 绘制文本和节点
    g.selectAll('.node')
      .data(nodes)
      .enter().append('g')
      .attr('class', function (d) {
        return 'node' + (d.children ? 'node--internal': 'node--left')
      })
      .attr('transform', function (d) {
        return `translate(${d.y}, ${d.x})`;
      });
    g.selectAll('.node').append('circle')
      .attr('r', 5)
      .style('fill', 'green');
    g.selectAll('.node').append('text')
      .attr('dy', 3)
      .attr('x', function (d) {
        return d.children ? -8 : 8;
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
