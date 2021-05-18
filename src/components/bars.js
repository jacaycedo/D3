import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const Bar = () => {
  const barras = useRef();

  useEffect(() => {
    const canvas = d3.select(barras.current);
    d3.json("https://gist.githubusercontent.com/josejbocanegra/000e838b77c6ec8e5d5792229c1cdbd0/raw/83cd9161e28e308ef8c5363e217bad2b6166f21a/countries.json")
    .then(dataS => {
        console.log(dataS);
        
        const data = dataS;
        
        const width = 700;
        const height = 500;
        const margin = { top: 10, left: 50, bottom: 40, right: 10 };
        const iwidth = width - margin.left - margin.right;
        const iheight = height - margin.top - margin.bottom;
        
        const svg = canvas.append("svg");
        svg.attr("width", width);
        svg.attr("height", height);
        
        let g = svg
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);
        
        const y = d3.scaleLinear().domain([0, 30]).range([iheight, 0]);
        
        const x = d3
        .scaleBand()
        .domain(data.map((d) => d.country))
        .range([0, iwidth])
        .padding(0.1);
        
        const bars = g.selectAll("rect").data(data);
        
        bars
        .enter()
        .append("rect")
        .attr("class", "bar")
        .style("fill", "steelblue")
        .attr("x", (d) => x(d.country))
        .attr("y", (d) => y(d.country))
        .attr("height", (d) => iheight - y(d.population))
        .attr("width", x.bandwidth());
        
        g.append("g")
        .classed("x--axis", true)
        .call(d3.axisBottom(x))
        .attr("transform", `translate(0, ${iheight})`);
        
        g.append("g").classed("y--axis", true).call(d3.axisLeft(y));
    });
});
    
    return (
        <svg ref={barras}></svg>
        );
    };
    
    export default Bar;
    