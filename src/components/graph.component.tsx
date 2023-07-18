import * as d3 from "d3";
import { useEffect, useState } from "react";
import styles from "./graph.module.css";
import { motion } from "framer-motion";

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
  const margin = { top: 0, right: 0, bottom: 21, left: 0 };
  const chartWidth = width - margin.left - margin.right;
  const chartHeight = height - margin.top - margin.bottom;

  useEffect(() => {
    const element = document.getElementById("svg-container");

    const resizeHandler = () => {
      if (!element?.clientWidth) return;
      setWidth(element.clientWidth);
    };
    resizeHandler();
    if (!width) return;
    window.addEventListener("resize", resizeHandler);

    return () => {
      window.removeEventListener("resize", resizeHandler);
    };
  }, [width]);

  const xScale = d3
    .scaleBand()
    .range([0, chartWidth])
    .padding(0.18)
    .domain(data.map((d) => d.day));

  const yScale = d3
    .scaleLinear()
    .range([chartHeight, 0])
    .domain([0, d3.max(data, (d) => d.amount as number) ?? 0]);

  return (
    <div id="svg-container" style={{ position: "relative" }}>
      <svg className={styles.graph} viewBox={`0 0 ${width} ${height}`}>
        <g id="chart">
          {data.map((d, i) => {
            const barWidth = xScale.bandwidth();
            const barX = xScale(d.day) || 0;
            const barMiddleX = barX + barWidth / 2;
            const barY = yScale(d.amount);
            const barHeight = chartHeight - yScale(d.amount);

            return (
              <motion.rect
                initial={{ height: 0, y: chartHeight }}
                animate={{ height: barHeight, y: barY }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={styles.bar}
                key={d.day}
                rx="5px"
                x={barX}
                // y={barY}
                width={barWidth}
                // height={barHeight}
                fill={
                  d.day === "wed" ? "var(--bar-bg-active)" : "var(--bar-bg)"
                }
                opacity={1}
                onMouseOver={() => {
                  setTooltipData(d);
                  setTooltipPosition([barMiddleX, barY - 8]);
                }}
                onMouseOut={() => {
                  setTooltipData(undefined);
                }}></motion.rect>
            );
          })}
        </g>

        <g
          transform={`translate(0, ${chartHeight + 17})`}
          fill="var(--text-color-light)"
          fontFamily="var(--font-family)"
          fontSize="15px">
          {xScale.domain().map((tick) => (
            <g
              key={tick}
              transform={`translate(${
                xScale(tick) ? xScale(tick) + xScale.bandwidth() / 2 : 0
              }, 0)`}>
              <text textAnchor="middle">{tick}</text>
            </g>
          ))}
        </g>
      </svg>

      {tooltipData && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: tooltipData ? 1 : 0 }}
          transition={{ duration: 0.9, type: "spring" }}
          className={styles.tooltip}
          style={{
            top: `${tooltipPosition[1]}px`,
            left: `${tooltipPosition[0]}px`,
          }}>
          <p>{`$${tooltipData.amount}`}</p>
        </motion.div>
      )}
    </div>
  );
};

export default Graph;
