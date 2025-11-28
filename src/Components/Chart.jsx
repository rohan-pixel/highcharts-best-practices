import React, { useEffect, useRef } from "react";

const Chart = ({ options, isDynamic = false, height = 400 }) => {
  const chartContainerRef = useRef(null);
  const chartInstanceRef = useRef(null);
  const updateIntervalRef = useRef(null);

  useEffect(() => {
    let highcharts = null;
    let highchartsMore = null;

    const loadHighcharts = async () => {
      highcharts = await import("highcharts/highstock");
      highchartsMore = await import("highcharts/highcharts-more");
      highchartsMore.default(highcharts);

      if (chartContainerRef.current) {
        chartInstanceRef.current = highcharts.chart(chartContainerRef.current, {
          ...options,
          chart: {
            ...options.chart,
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            borderRadius: 10,
            animation: highcharts.svg, // smooth animations
          },
          title: {
            text: options.title?.text || "Dynamic Chart",
            style: { fontSize: "16px", fontWeight: "bold" },
          },
          tooltip: {
            valueDecimals: 2,
            backgroundColor: "rgba(0,0,0,0.8)",
            style: { color: "#fff" },
            borderRadius: 5,
          },
          series: [
            {
              data: options?.series[0]?.data,
              turboThreshold: 10000,
              color: "#4CAF50", // default series color
              marker: { enabled: true, radius: 3 },
            },
          ],
          plotOptions: {
            series: {
              dataGrouping: { enabled: true },
              boostThreshold: 1000,
              animation: { duration: 500 },
            },
          },
          accessibility: { enabled: false },
        });
      }
    };

    loadHighcharts();

    if (isDynamic) {
      updateIntervalRef.current = setInterval(() => {
        const seriesData = chartInstanceRef.current?.series[0]?.data;
        const newDataPoint = Math.floor(Math.random() * 10) + 1;

        if (seriesData?.length >= 1000) seriesData[0].remove();
        chartInstanceRef.current.series[0].addPoint(newDataPoint, true, false);
      }, 1000);

      return () => clearInterval(updateIntervalRef.current);
    }

    return () => {
      if (chartInstanceRef.current) chartInstanceRef.current.destroy();
    };
  }, [options, isDynamic]);

  return (
    <div
      ref={chartContainerRef}
      style={{
        width: "100%",
        height: height,
        margin: "20px auto",
        boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
        borderRadius: 12,
        padding: 10,
        backgroundColor: "#fff",
      }}
    />
  );
};

export default Chart;
