import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const Bar = () => {
  const barras = useRef();

  useEffect(() => {
    const canvas = d3.select(barras.current);
    d3.json(
      "https://gist.githubusercontent.com/josejbocanegra/d3b9e9775ec3a646603f49bc8d3fb90f/raw/3a39300c2a2ff8644a52e22228e900251ec5880a/population.json"
    ).then((dataS) => {
      console.log(dataS);

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
        const y = d3.scaleLinear().domain([0, 1000000]).range([iheight, 0]);

      const x = d3
        .scaleBand()
        .domain(dataS.map((d) => d.name))
        .range([0, iwidth])
        .padding(0.1);

      const bars = g.selectAll("rect").data(dataS);

      bars
        .enter()
        .append("rect")
        .attr("class", "bar")
        .style("fill", "steelblue")
        .attr("x", (d) => x(d.name))
        .attr("y", (d) => y(d.value))
        .attr("height", (d) => iheight - y(d.value))
        .attr("width", x.bandwidth());

      g.append("g")
        .classed("x--axis", true)
        .call(d3.axisBottom(x))
        .attr("transform", `translate(0, ${iheight})`);

      g.append("g").classed("y--axis", true).call(d3.axisLeft(y));
    });
  });

  return <svg height="500" width ="700" ref={barras}></svg>;
};

export default Bar;
