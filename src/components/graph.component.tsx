import * as d3 from "d3";
import { useEffect, useState } from "react";
import styles from "./graph.module.css";

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
  const [width, setWidth] = useState(0);

  const height = 178;
  const margin = { top: 0, right: 0, bottom: 24, left: 0 };
  const chartWidth = width - margin.left - margin.right;
  const chartHeight = height - margin.top - margin.bottom;

  useEffect(() => {
    const element = document.getElementById("app-container");

    const resizeHandler = () => {
      if (!element?.clientWidth) return;
      setWidth(element.clientWidth - 80);
    };
    resizeHandler();
    console.log("width", width);
    if (!width) return;
    //setWidth to change dynamically when screen size changes
    window.addEventListener("resize", resizeHandler);

    // // Create the chart group
    // const chart = svg
    //   .append("g")
    //   .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // // Create the x-axis
    // chart
    //   .append("g")
    //   .attr("transform", `translate(0, ${chartHeight + 6})`)
    //   .attr("color", "var(--text-color-light)")
    //   .attr("font-family", "var(--font-family)")
    //   .style("font-size", "15px")
    //   .call(d3.axisBottom(xScale).tickSize(0))
    //   .select(".domain") // Select the axis line
    //   .remove();

    // // Create the bars
    // chart
    //   .selectAll(".bar")
    //   .data(data)
    //   .enter()
    //   .append("rect")
    //   .attr("class", "bar")
    //   .attr("x", (d: Data) => xScale(d.day) ?? 0)
    //   .attr("y", (d) => yScale(d.amount))
    //   .attr("width", xScale.bandwidth())
    //   .attr("height", (d) => chartHeight - yScale(d.amount))
    //   .attr("fill", "var(--bar-bg)")
    //   .attr("fill", (d) =>
    //     d.day === "wed" ? "var(--bar-bg-active)" : "var(--bar-bg)"
    //   )
    //   .attr("opacity", 1)

    //   .on("mouseover", (event, d) => {
    //     // Set tooltip data and position
    //     setTooltipData(d);
    //     setTooltipPosition([
    //       event.target.x.animVal.value,
    //       event.target.y.animVal.value - 8,
    //     ]);

    //     const bar = d3.select(event.target);
    //     bar.style("opacity", 0.5);
    //   })
    //   .on("mouseout", () => {
    //     // Hide the tooltip
    //     setTooltipData(undefined);
    //   });

    // Set the scales for the x-axis and y-axis

    return () => {
      window.removeEventListener("resize", resizeHandler);
    };
  }, [data, width]);

  const xScale = d3
    .scaleBand()
    .range([0, chartWidth])
    .padding(0.2)
    .domain(data.map((d) => d.day));

  const yScale = d3
    .scaleLinear()
    .range([chartHeight, 0])
    // .domain([0, d3.max(data, (d) => d.amount)]);
    .domain([0, d3.max(data, (d) => d.amount as number) ?? 0]);

  return (
    <div style={{ position: "relative" }}>
      <svg className={styles.graph} viewBox={`0 0 ${width} ${height}`}>
        <g id="chart">
          {data.map((d) => (
            <rect
              className={styles.bar}
              key={d.day}
              rx="5px"
              x={xScale(d.day)}
              y={yScale(d.amount)}
              width={xScale.bandwidth()}
              height={chartHeight - yScale(d.amount)}
              fill={d.day === "wed" ? "var(--bar-bg-active)" : "var(--bar-bg)"}
              opacity={1}></rect>
          ))}
        </g>

        <g
          transform={`translate(0, ${chartHeight + 20})`}
          fill="var(--text-color-light)"
          fontFamily="var(--font-family)"
          fontSize="15px">
          {xScale.domain().map((tick) => (
            <g
              transform={`translate(${
                xScale(tick) ? xScale(tick) + xScale.bandwidth() / 2 : 0
              }, 0)`}>
              <text textAnchor="middle">{tick}</text>
            </g>
          ))}
        </g>
      </svg>

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
