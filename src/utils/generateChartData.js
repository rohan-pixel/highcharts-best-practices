async function generateChartData() {
  const numCharts = 50; // 50
  const dataSize = 10000;
  const chartTypes = [
    "line",
    "column",
    "bar",
    "area",
    "pie",
    "spline",
    "scatter",
    "bubble",
    "gauge",
    "bellcurve",
  ]; // Array of chart types

  const worker = new Worker("workers/generate.worker.js");

  return new Promise((resolve) => {
    worker.onmessage = function (e) {
      worker.terminate();
      resolve(e.data);
    };

    worker.postMessage({ numCharts, dataSize, chartTypes });
  });
}

export default generateChartData;
