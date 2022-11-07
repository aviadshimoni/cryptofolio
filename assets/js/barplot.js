// set the dimensions and margins of the graph
var screenWidth = window.screen.width;
console.log(screenWidth)
var margin = {top: 10, right: 30, bottom: 120, left: 40},
    width = screenWidth*0.6 - margin.left - margin.right,
    height = screenWidth*0.4 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#my_dataviz")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .attr("stroke", "white")
  .append("g")
    .attr("stroke", "white")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

// Parse the Data
console.log(data.map(function(d) { return d._id; }))

// X axis
var x = d3.scaleBand()
  .range([ 0, width ])
  .domain(data.map(function(d) { return d._id; }))
  .padding(0.2);
svg.append("g")
  .attr("class", "axisWhite")
  .attr("transform", "translate(0," + height + ")")
  .call(d3.axisBottom(x))
  .selectAll("text")
    .attr("transform", "translate(-10,0)rotate(-45)")
    .style("stroke", "white")
    .style("text-anchor", "end");

// Add Y axis 
var scalers = data.map(function(d) { return d.amount; })
var scaler = scalers.reduce((a, b) => Math.max(a, b), -Infinity);
var y = d3.scaleLinear()
  .domain([0, scaler])
  .range([ height, 0]);
svg.append("g")
  .attr("class", "axisWhite")
  .call(d3.axisLeft(y));

// Bars
svg.selectAll("mybar")
  .data(data)
  .enter()
  .append("rect")
    .attr("x", function(d) { return x(d._id); })
    .attr("width", x.bandwidth())
    .attr("fill", "#69b3a2")
    // no bar at the beginning thus:
    .attr("height", function(d) { return height - y(0); }) // always equal to 0
    .attr("y", function(d) { return y(0); })

// Animation
svg.selectAll("rect")
  .transition()
  .duration(800)
  .attr("y", function(d) { return y(d.amount); })
  .attr("height", function(d) { return height - y(d.amount); })
  .delay(function(d,i){console.log(i) ; return(i*100)})
