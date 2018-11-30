import * as d3 from 'd3';


const margin      = {top: 30, right: 20, bottom: 30, left: 20},
      width       = 960,
      barHeight   = 20,
      barWidth    = (width - margin.left - margin.right) * 0.8,
      layerOffset = 20,
      duration    = 0,

      diagonal    = d3.linkHorizontal()
        .x(function (d) { return d.y; })
        .y(function (d) { return d.x; });


export default class D3MenuTree {
  constructor(el) {
    this.$el    = el;
    const style = getComputedStyle(this.$el);
    this.width  = parseFloat(style.width);
    this.height = parseFloat(style.height);

    this.i   = 0;
    this.svg = d3.select(this.$el).append('svg');
    this.g   = this.svg
      .attr('width', this.width)
      .attr('height', this.height)
      .append('g')
      .attr('transform', `translate(${margin.left}, ${margin.right})`)
  }

  draw(data) {
    this.root    = d3.hierarchy(data);
    this.root.x0 = 0;
    this.root.y0 = 0;
    this.update(this.root);
  }

  update(source) {
    // Compute the flattened node list.
    var nodes = this.root.descendants();

    var height = Math.max(500, nodes.length * barHeight + margin.top + margin.bottom);

    // Compute the "layout". TODO https://github.com/d3/d3-hierarchy/issues/67
    var index = -1,
        max   = 0;
    this.root.eachBefore(function (n) {
      n.x = ++index * barHeight;
      n.y = n.depth * layerOffset;
      max = Math.max(n.y, max);
    });

    this.svg
      .transition()
      .duration(duration)
      .attr('height', height);
    // .attr("viewBox", [0, 0, this.width + max, height]);

    d3.select(self.frameElement).transition()
      .duration(duration)
      .style("height", height + "px");


    console.log();

    // Update the nodes…
    var node = this.g.selectAll(".node")
      .data(nodes, function (d) { return d.id || (d.id = ++this.i); });

    var nodeEnter = node.enter().append("g")
      .attr("class", "node")
      .attr("transform", function (d) { return "translate(" + source.y0 + "," + source.x0 + ")"; })
      .style("opacity", 0);

    // Enter any new nodes at the parent's previous position.
    nodeEnter.append("rect")
      .attr("y", -barHeight / 2)
      .attr("height", barHeight)
      .attr("width", barWidth)
      .style("fill", color);

    nodeEnter
      .append('foreignObject')
      .attr("height", barHeight)
      .attr("width", barWidth)
      .attr("y", -barHeight / 2)
      .append(d => {
        const div = d3.create('div')
          .attr('class', 'node-title')
          .style("height", `${barHeight}px`)
          .style("width", `${barWidth}px`);

        let icon;
        if (!d.children && !d._children) {
          icon = '';
        } else if (d.children) {
          icon = d3.create('i').attr('class', 'el-icon-minus');
        } else {
          icon = d3.create('i').attr('class', 'el-icon-plus');
        }

        if (icon) {
          icon.on("click", _ => {
            if (d.children) {
              d._children = d.children;
              d.children  = null;
            } else {
              d.children  = d._children;
              d._children = null;
            }
            this.update(d);
          });
          div.append(_ => icon.node());
        }

        div.append(_ => d3.create('div')
          .attr('class', 'node-title-text')
          .text(d.data.name).node());

        return div.node();
      });

    // nodeEnter.append("text")
    //   .attr("dy", 3.5)
    //   .attr("dx", 5.5)
    //   .text(function (d) { return d.data.name; });

    // Transition nodes to their new position.
    nodeEnter.transition()
      .duration(duration)
      .attr("transform", function (d) { return "translate(" + d.y + "," + d.x + ")"; })
      .style("opacity", 1);

    node.transition()
      .duration(duration)
      .attr("transform", function (d) { return "translate(" + d.y + "," + d.x + ")"; })
      .style("opacity", 1)
      .select("rect")
      .style("fill", color);

    // Transition exiting nodes to the parent's new position.
    node.exit().transition()
      .duration(duration)
      .attr("transform", function (d) { return "translate(" + source.y + "," + source.x + ")"; })
      .style("opacity", 0)
      .remove();

    // Update the links…
    var link = this.g.selectAll(".link")
      .data(this.root.links(), function (d) { return d.target.id; });

    // Enter any new links at the parent's previous position.
    link.enter().insert("path", "g")
      .attr("class", "link")
      .attr("d", function (d) {
        var o = {x: source.x0, y: source.y0};
        return diagonal({source: o, target: o});
      })
      .transition()
      .duration(duration)
      .attr("d", diagonal);

    // Transition links to their new position.
    link.transition()
      .duration(duration)
      .attr("d", diagonal);

    // Transition exiting nodes to the parent's new position.
    link.exit().transition()
      .duration(duration)
      .attr("d", function (d) {
        var o = {x: source.x, y: source.y};
        return diagonal({source: o, target: o});
      })
      .remove();

    // Stash the old positions for transition.
    this.root.each(function (d) {
      d.x0 = d.x;
      d.y0 = d.y;
    });
  }
}


function color(d) {
  return d._children ? "#3182bd" : d.children ? "#c6dbef" : "#fd8d3c";
}
