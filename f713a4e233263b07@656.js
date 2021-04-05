// https://observablehq.com/@kneone/is-545-advanced-data-visualization/2@656
export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], function(md){return(
md`# IS 545 Advanced Data Visualization 
<strong>Assignment 4</strong>

<strong>Professor:</strong> Matthew Turk 

<strong>Name:</strong> Wei Jing  



`
)});
  main.variable(observer()).define(["html"], function(html){return(
html` <strong>Streetlights Dataset</strong>`
)});
  main.variable(observer()).define(["html"], function(html){return(
html` <strong>Individually-Selected Trees with pan-and-zoom</strong>

<p>When your mouse is placed on a certain point, it will display the data and the color of the point will change to Aqua. When the mouse is left, the color of observed point will turn red.

<p><strong>Here is the data of the point:</strong>
<div id="mytreeinfo2"></div>
`
)});
  main.variable(observer()).define(["d3","trees"], function*(d3,trees)
{
  function makeTrees() {
    
  const width = 600;
  const height = 450;
  const infoPanel = d3.select("#mytreeinfo2");
  const svg = d3
  .create("svg")
  .attr("width", width)
  .attr("height", height)
  .attr("viewBox", [4, 2, 6,4 ])
  .style("border", "solid 1px black");
  //yield svg.node();
  
  // Note: aspect ratios!
  const xScale = d3.scaleLinear().domain(d3.extent(trees, d => d.X)).range([0.0, 10]);
  const yScale = d3.scaleLinear().domain(d3.extent(trees, d => d.Y)).range([10, 0.0]);
  
  svg.append("g")
  .attr("id", "trees")
  .selectAll("circle")
  .data(trees)
  .enter()
  .append("circle")
  .attr("cx", d => xScale(d.X))
  .attr("cy", d => yScale(d.Y))
  .attr("r", 0.01)
  //.style("fill", "black")
  //.on("mouseover", (e, d) => {
  //  infoPanel.text(`${d.Pole_Arm_Type} ${d.Controller_ID}`);
 // })
  .on('mouseover', function(e, d) {
      infoPanel.text(`${d.Pole_Arm_Type} ${d.Controller_ID}`);
      console.log("mouseover on", this);
      
      d3.select(this)
        .transition()
        .duration(1)
        .attr('r', 0.05)
        .attr('fill', 'Aqua');
    })
    .on('mouseout', function(d, i) {
      console.log("mouseout", this);
      d3.select(this)
        .transition()
        .duration(1)
        .attr('r', 0.01)
        .attr('fill', 'black');
    });
    
   
    
  return {svg: svg, xScale: xScale, yScale: yScale};
  }
  const {svg, xScale, yScale} = makeTrees();
  yield svg.node();
  const zoom = d3.zoom();
  const tree = svg.select("g#trees");
  const infoPanel = d3.select("#mytreeinfo");
  function zoomCalled(event) {
    
    const zx = event.transform.rescaleX(xScale);
    const zy = event.transform.rescaleY(yScale);
    tree.transition().duration(0).attr("transform", event.transform);
  }
  svg.call(zoom.on("zoom", zoomCalled))
 
  .on("mouseover", (e, d) => {infoPanel.text(`${d.Pole_Arm_Type} ${d.Controller_ID}`);
  });
}
);
  main.variable(observer()).define(["html"], function(html){return(
html` <strong>Color tree</strong>

<p>The color of each point is distinguished according to the type of signal light, and different colors represent different types of signal lights

`
)});
  main.variable(observer()).define(["d3","trees"], function*(d3,trees)
{
  const width = 600;
  const height = 450;
  const infoPanel = d3.select("#mytreeinfo");
  const svg = d3
  .create("svg")
  .attr("width", width)
  .attr("height", height)
  .attr("viewBox", [0.45, 0.18, 0.5, 0.45])
  .style("border", "solid 1px black");
  yield svg.node();
  
  
  const xScale = d3.scaleLinear().domain(d3.extent(trees, d => d.X)).range([0.0, 1]);
  const yScale = d3.scaleLinear().domain(d3.extent(trees, d => d.Y)).range([1, 0.0]);
  const colorScale = d3.scaleOrdinal().domain(d3.group(trees, d => d.Pole_Arm_Type)).range(d3.schemeCategory10);
  svg.selectAll("g")
  .data(d3.group(trees, d => d.Pole_Arm_Type))
  .enter()
  .append("g")
  .attr("id", d => ""+d[0])
  .style("fill", d => colorScale(d[0]))
  .selectAll("circle")
  .data(d => d[1])
  .enter()
  .append("circle")
  .on("touchstart.zoom", null)
  .on("touchmove.zoom", null)
  .on("touchend.zoom", null)
  .attr("cx", d => xScale(d.X))
  .attr("cy", d => yScale(d.Y))
  .attr("r", 0.001);
}
);
  main.variable(observer()).define(["html"], function(html){return(
html` <strong>Rotating Individually-Selected Trees with pan-and-zoom</strong>

<p>The basic function is similar to the first Individually-Selected Trees. The tree first rotates 20° clockwise, then  rotates back to the original position.

<p><strong>Here is the data of the point:</strong>
<div id="mytreeinfo4"></div>
`
)});
  main.variable(observer()).define(["d3","trees","Promises"], async function*(d3,trees,Promises)
{
  function makeTrees() {
    
  const width = 600;
  const height = 450;
  const infoPanel = d3.select("#mytreeinfo4");
  const svg = d3
  .create("svg")
  .attr("width", width)
  .attr("height", height)
  .attr("viewBox", [4, 2, 6,4 ])
  .style("border", "solid 1px black");
  //yield svg.node();
  
  // Note: aspect ratios!
  const xScale = d3.scaleLinear().domain(d3.extent(trees, d => d.X)).range([0.0, 10]);
  const yScale = d3.scaleLinear().domain(d3.extent(trees, d => d.Y)).range([10, 0.0]);
  
  svg.append("g")
  .attr("id", "trees")
  .selectAll("circle")
  .data(trees)
  .enter()
  .append("circle")
  .attr("cx", d => xScale(d.X))
  .attr("cy", d => yScale(d.Y))
  .attr("r", 0.01)
  .style("fill", "green")
  .on("mouseover", (e, d) => {
   infoPanel.text(`${d.Pole_Arm_Type} ${d.Controller_ID}`);
});
    
   
    
  return {svg: svg, xScale: xScale, yScale: yScale};
  }
  const {svg, xScale, yScale} = makeTrees();
  yield svg.node();
    var origin = {
                x: 50,
                y: 35
            };
  await Promises.delay(2000);
  svg.select("g#trees").transition().duration(1000).attr("transform", "rotate(20)");
  await Promises.delay(2000);
  svg.selectAll("circle").transition().duration(1000).attr("transform", "rotate(-20)");
  

  const treeGroup = svg.select("g#trees");
  const brush = d3.brush().extent([[0, 0], [20, 20]]).handleSize(0.1);
  const zoom = d3.zoom();
  const tree = svg.select("g#trees");
  const infoPanel = d3.select("#mytreeinfo");
  const width = 600;
  const height = 450;

  function zoomCalled(event) {
    
    const zx = event.transform.rescaleX(xScale);
    const zy = event.transform.rescaleY(yScale);
    tree.transition().duration(0).attr("transform", event.transform);
  }
  svg.call(zoom.on("zoom", zoomCalled))
  .on("mouseover", (e, d) => {infoPanel.text(`${d.Pole_Arm_Type} ${d.Controller_ID}`);
  });
}
);
  main.variable(observer()).define(["html"], function(html){return(
html` <strong>Brushed Selections of Trees.</strong>

<p>The points in the selected area will turn blue.
<p>And the upper right corner will show how many points there are in the area you selected (that is, how many Streetlights there are)

`
)});
  main.variable(observer()).define(["makeTrees","d3","trees"], function*(makeTrees,d3,trees)
{
  const {svg, xScale, yScale} = makeTrees();
  yield svg.node();
  const treeGroup = svg.select("g#trees");
  const text = svg.append("text").attr("x", 18).attr("y", 3).style('font-size', '0.9px').style('fill', 'darkOrange');
  const brush = d3.brush().extent([[0, 0], [20, 20]]).handleSize(0.1);
  const dataPoints = [];
  function brushCalled(event) {
    treeGroup.selectAll("circle")
    .data(trees)
    .classed("selected", d => xScale(d.X) > event.selection[0][0]
                && xScale(d.X) < event.selection[1][0]
                && yScale(d.Y) > event.selection[0][1]
                && yScale(d.Y) < event.selection[1][1] );
    dataPoints.length = 0;
    treeGroup.selectAll("circle")
    .data(trees)
    .filter(".selected")
    .each(d => dataPoints.push(d));
    text.text('' + dataPoints.length);
  }
  svg.append("g")
    .attr("class", "mybrush")
    .style("stroke-width", 0.01)
    .call(
      brush.on("brush", brushCalled)
    );
}
);
  main.variable(observer()).define(["html"], function(html){return(
html` <strong>Brushed Selections of Trees with pan and zoom.</strong>

<p>When holding command(windows) key, the user is able to create a new brush area. The user can also use pan-and-zoom function normally. However, there is a small problem with the code. When the user releases mouse after creating a new brush area, it will keep panning the graph around even though the user has released the mouse. To stop this behavior, user must click somehwhere outside of the brush area. The same problem occurs when the user tries to move the brush area around, and the user has to click somewhere outside of the brush area to stop panning. Other than these problems, the user could pan-and-zoom and brush normally.
`
)});
  main.variable(observer()).define(["makeTrees","d3"], function*(makeTrees,d3)
{
  const {svg, xScale, yScale} = makeTrees();
  yield svg.node();
  const zoom = d3.zoom();
  const trees = svg.select("g#trees");
  const treeGroup = svg.select("g#trees");
 


  const brush = d3.brush().extent([[0, 0], [20, 20]]).handleSize(0.1)
                          .filter(event => !event.ctrlKey
                                  && !event.button
                                  && (event.metaKey
                                  || event.target.__data__.type !== "overlay"))
                          .on("start brush end", brushed);
;

  const circle = svg.append("g")
      .attr("fill-opacity", 0.2)
      .selectAll("circle")
      .data(Array.from({length: 2000}, () => [xScale(), yScale()]))
      .join("circle")
      .attr("transform", d => `translate(${d})`)
      .attr("r", 0.05);
    
  function brushCalled(event) {
    treeGroup.selectAll("circle")
    .data(trees)
    .classed("selected", d => xScale(d.X) > event.selection[0][0]
                && xScale(d.X) < event.selection[1][0]
                && yScale(d.Y) > event.selection[0][1]
                && yScale(d.Y) < event.selection[1][1] );
  }
  function zoomCalled(event) {
    const zx = event.transform.rescaleX(xScale);
    const zy = event.transform.rescaleY(yScale);
    trees.transition().duration(0).attr("transform", event.transform);
  }
  function brushed({selection}) {
    if (selection === null) {
      circle.attr("stroke", null);
    } else {
      const [[x0, y0], [x1, y1]] = selection;
      circle.attr("stroke", ([x, y]) => {
        return x0 <= x && x <= x1
            && y0 <= y && y <= y1
            ? "red" : null;
      });
    }
  }

  
  svg.append("g")
    .attr("class", "mybrush")
    .style("stroke-width", 0.01)
    //.call(brush.on("brush", brushCalled))
    .call(brush)
    .call(brush.move, [[100, 100], [200, 200]])
    .call(g => g.select(".overlay").style("cursor", "default"))
    .call(zoom.on("zoom", zoomCalled));
}
);
  main.variable(observer()).define(["html"], function(html){return(
html` <strong>City Owned Trees Dataset</strong> `
)});
  main.variable(observer()).define(["html"], function(html){return(
html` <strong>Individually-Selected Trees with pan-and-zoom</strong>

<p><strong>Here is the data of the point:</strong>
<div id="mytreeinfo22"></div>
`
)});
  main.variable(observer()).define(["d3","trees2"], function*(d3,trees2)
{
  function makeTrees() {
    
  const width = 600;
  const height = 450;
  const infoPanel = d3.select("#mytreeinfo22");
  const svg = d3
  .create("svg")
  .attr("width", width)
  .attr("height", height)
  .attr("viewBox", [4, 2, 6,4 ])
  .style("border", "solid 1px black");
  //yield svg.node();
  
  // Note: aspect ratios!
  const xScale = d3.scaleLinear().domain(d3.extent(trees2, d => d.X)).range([0.0, 10]);
  const yScale = d3.scaleLinear().domain(d3.extent(trees2, d => d.Y)).range([10, 0.0]);
  
  svg.append("g")
  .attr("id", "trees2")
  .selectAll("circle")
  .data(trees2)
  .enter()
  .append("circle")
  .attr("cx", d => xScale(d.X))
  .attr("cy", d => yScale(d.Y))
  .attr("r", 0.01)
  //.style("fill", "black")
  //.on("mouseover", (e, d) => {
  //  infoPanel.text(`${d.Pole_Arm_Type} ${d.Controller_ID}`);
 // })
  .on('mouseover', function(e, d) {
      infoPanel.text(`${d.ADDRESS} ${d.STREET}`);
      console.log("mouseover on", this);
      
      d3.select(this)
        .transition()
        .duration(1)
        .attr('r', 0.05)
        .attr('fill', 'Aqua');
    })
    .on('mouseout', function(d, i) {
      console.log("mouseout", this);
      d3.select(this)
        .transition()
        .duration(1)
        .attr('r', 0.01)
        .attr('fill', 'black');
    });
    
   
    
  return {svg: svg, xScale: xScale, yScale: yScale};
  }
  const {svg, xScale, yScale} = makeTrees();
  yield svg.node();
  const zoom = d3.zoom();
  const tree = svg.select("g#trees2");
  const infoPanel = d3.select("#mytreeinfo");
  function zoomCalled(event) {
    
    const zx = event.transform.rescaleX(xScale);
    const zy = event.transform.rescaleY(yScale);
    tree.transition().duration(0).attr("transform", event.transform);
  }
  svg.call(zoom.on("zoom", zoomCalled))
 
  .on("mouseover", (e, d) => {infoPanel.text(`${d.ADDRESS} ${d.STREET}`);
  });
}
);
  main.variable(observer()).define(["html"], function(html){return(
html` <strong>Color Tree</strong>

`
)});
  main.variable(observer()).define(["d3","trees2","trees"], function*(d3,trees2,trees)
{
  const width = 600;
  const height = 450;
  //const infoPanel = d3.select("#mytreeinfo");
  const svg = d3
  .create("svg")
  .attr("width", width)
  .attr("height", height)
  .attr("viewBox", [0.45, 0.18, 0.5, 0.45])
  .style("border", "solid 1px black");
  yield svg.node();
  
  
  const xScale = d3.scaleLinear().domain(d3.extent(trees2, d => d.X)).range([0.0, 1]);
  const yScale = d3.scaleLinear().domain(d3.extent(trees2, d => d.Y)).range([1, 0.0]);
  const colorScale = d3.scaleOrdinal().domain(d3.group(trees, d => d.COND)).range(d3.schemeCategory10);
  
  
  
  
  
  
  
  
  svg.selectAll("g")
  .data(d3.group(trees2, d => d.COND))
  .enter()
  .append("g")
  .attr("id", d => ""+d[0])
  .style("fill", d => colorScale(d[0]))
  .selectAll("circle")
  .data(d => d[1])
  .enter()
  .append("circle")
  .on("touchstart.zoom", null)
  .on("touchmove.zoom", null)
  .on("touchend.zoom", null)
  .attr("cx", d => xScale(d.X))
  .attr("cy", d => yScale(d.Y))
  .attr("r", 0.001);
}
);
  main.variable(observer()).define(["html"], function(html){return(
html` <strong>Brushed Selections of Trees</strong>`
)});
  main.variable(observer()).define(["makeTrees2","d3","trees2"], function*(makeTrees2,d3,trees2)
{
  const {svg, xScale, yScale} = makeTrees2();
  yield svg.node();
  const treeGroup = svg.select("g#trees2");
  const text = svg.append("text").attr("x", 16).attr("y", 2).style('font-size', '0.9px').style('fill', 'darkOrange');
  const brush = d3.brush().extent([[0, 0], [20, 20]]).handleSize(0.1);
  const dataPoints = [];
  function brushCalled(event) {
    treeGroup.selectAll("circle")
    .data(trees2)
    .classed("selected", d => xScale(d.X) > event.selection[0][0]
                && xScale(d.X) < event.selection[1][0]
                && yScale(d.Y) > event.selection[0][1]
                && yScale(d.Y) < event.selection[1][1] );
    dataPoints.length = 0;
    treeGroup.selectAll("circle")
    .data(trees2)
    .filter(".selected")
    .each(d => dataPoints.push(d));
    text.text('' + dataPoints.length);
  }
  svg.append("g")
    .attr("class", "mybrush")
    .style("stroke-width", 0.01)
    .call(
      brush.on("brush", brushCalled)
    );
}
);
  main.variable(observer("trees")).define("trees", ["d3"], function(d3){return(
d3.csv("https://opendata.arcgis.com/datasets/e7aaa7626af546a28f5fe0639e2ce7b2_34.csv", d3.autoType)
)});
  main.variable(observer("trees2")).define("trees2", ["d3"], function(d3){return(
d3.csv("https://gis-cityofchampaign.opendata.arcgis.com/datasets/979bbeefffea408e8f1cb7a397196c64_22.csv?outSR=%7B%22latestWkid%22%3A3857%2C%22wkid%22%3A102100%7D", d3.autoType)
)});
  main.variable(observer("makeTrees")).define("makeTrees", ["d3","trees"], function(d3,trees){return(
function makeTrees() {
  const width = 600;
  const height = 450;
  const infoPanel = d3.select("#mytreeinfo");
  const svg = d3
  .create("svg")
  .attr("width", width)
  .attr("height", height)
  .attr("viewBox", [0, 0, 20, 20])
  .style("border", "solid 1px black");
  // Note: aspect ratios!
  const xScale = d3.scaleLinear().domain(d3.extent(trees, d => d.X)).range([0.0, 20.0]);
  const yScale = d3.scaleLinear().domain(d3.extent(trees, d => d.Y)).range([20.0, 0.0]);
  svg.append("g")
    .attr("id", "trees")
    .selectAll("circle")
    .data(trees)
    .enter()
    .append("circle")
    .attr("cx", d => xScale(d.X))
    .attr("cy", d => yScale(d.Y))
    .attr("r", 0.02);
  return {svg: svg, xScale: xScale, yScale: yScale};
}
)});
  main.variable(observer("makeTrees2")).define("makeTrees2", ["d3","trees2"], function(d3,trees2){return(
function makeTrees2() {
  const width = 600;
  const height = 450;
  //const infoPanel = d3.select("#mytreeinfo");
  const svg = d3
  .create("svg")
  .attr("width", width)
  .attr("height", height)
  .attr("viewBox", [0, 0, 20, 20])
  .style("border", "solid 1px black");
  // Note: aspect ratios!
  const xScale = d3.scaleLinear().domain(d3.extent(trees2, d => d.X)).range([0.0, 20.0]);
  const yScale = d3.scaleLinear().domain(d3.extent(trees2, d => d.Y)).range([20.0, 0.0]);
  svg.append("g")
    .attr("id", "trees2")
    .selectAll("circle")
    .data(trees2)
    .enter()
    .append("circle")
    .attr("cx", d => xScale(d.X))
    .attr("cy", d => yScale(d.Y))
    .attr("r", 0.02);
  return {svg: svg, xScale: xScale, yScale: yScale};
}
)});
  main.variable(observer()).define(["html"], function(html){return(
html`
<style>
  .selected { fill: blue; }
</style>
`
)});
  main.variable(observer("d3")).define("d3", ["require"], function(require){return(
require("d3@6")
)});
  return main;
}
