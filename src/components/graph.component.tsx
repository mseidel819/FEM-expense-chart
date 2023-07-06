import * as d3 from "d3";
import { useEffect, useRef, useState } from "react";

type Data = {
  day: string;
  amount: number;
};

type DataProps = {
  data: Data[];
};

const Graph = ({ data }: DataProps) => {
  const [tooltipData, setTooltipData] = useState<Data>();
  const [tooltipPosition, setTooltipPosition] = useState<[number, number]>([
    0, 0,
  ]);
  const [width, setWidth] = useState();
  // const containerRef = useRef();

  const svgRef = useRef();

  useEffect(() => {
    const element = document.getElementById("app-container");

    const resizeHandler = () => {
      if (!element?.clientWidth) return;
      setWidth(element.clientWidth - 60);
    };
    resizeHandler();
    console.log("width", width);
    if (!width) return;
    //setWidth to change dynamically when screen size changes
    window.addEventListener("resize", resizeHandler);

    const height = 178;
    const margin = { top: 0, right: 0, bottom: 32, left: 0 };
    const chartWidth = width - margin.left - margin.right;
    const chartHeight = height - margin.top - margin.bottom;

    // Create the SVG container
    const svg = d3
      .select(svgRef.current ?? "")
      .attr("width", width)
      .attr("height", height);

    // Create the chart group
    const chart = svg
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // Set the scales for the x-axis and y-axis
    const xScale = d3
      .scaleBand()
      .range([0, chartWidth])
      .padding(0.2)
      .domain(data.map((d) => d.day));

    const yScale = d3
      .scaleLinear()
      .range([chartHeight, 0])
      .domain([0, d3.max(data, (d) => d.amount)]);

    // Create the x-axis
    chart
      .append("g")
      .attr("transform", `translate(0, ${chartHeight + 6})`)
      .attr("color", "var(--text-color-light)")
      .attr("font-family", "var(--font-family)")
      .style("font-size", "15px")
      .call(d3.axisBottom(xScale).tickSize(0))
      .select(".domain") // Select the axis line
      .remove();

    // Create the bars
    chart
      .selectAll(".bar")
      .data(data)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", (d) => xScale(d.day))
      .attr("y", (d) => yScale(d.amount))
      .attr("width", xScale.bandwidth())
      .attr("height", (d) => chartHeight - yScale(d.amount))
      .attr("fill", "var(--bar-bg)")
      .attr("fill", (d) =>
        d.day === "wed" ? "var(--bar-bg-active)" : "var(--bar-bg)"
      )
      .attr("opacity", 1)

      .on("mouseover", (event, d) => {
        // Set tooltip data and position
        setTooltipData(d);
        setTooltipPosition([
          event.target.x.animVal.value,
          event.target.y.animVal.value - 8,
        ]);

        const bar = d3.select(event.target);
        bar.style("opacity", 0.5);
      })
      .on("mouseout", () => {
        // Hide the tooltip
        setTooltipData(undefined);
      });

    return () => {
      window.removeEventListener("resize", resizeHandler);
    };
  }, [data, width]);

  // useEffect(() => {
  //   if (!containerRef.current) return;
  //   // Update the chart width when the container width changes
  //   const resizeObserver = new ResizeObserver((entries) => {
  //     for (const entry of entries) {
  //       const containerWidth = entry.contentRect.width;
  //       if (svgRef.current)
  //         svgRef.current.setAttribute("width", containerWidth);
  //     }
  //   });
  //   resizeObserver.observe(containerRef.current);

  //   return () => {
  //     resizeObserver.disconnect();
  //   };
  // }, []);

  return (
    <div style={{ position: "relative" }}>
      <svg ref={svgRef}></svg>
      {tooltipData && (
        <div
          className="tooltip"
          style={{
            top: `${tooltipPosition[1]}px`,
            left: `${tooltipPosition[0]}px`,
          }}>
          <p>{`$${tooltipData.amount}`}</p>
        </div>
      )}
    </div>
  );
};

export default Graph;
