// Function to generate chart data for a specific chart type and index
function generateData(chartType, dataSize, index) {
  const data = [];
  const batchSize = 1000; // Adjust the batch size for performance optimization

  for (let i = 0; i < dataSize; i += batchSize) {
    const remainingDataSize = dataSize - i;
    const currentBatchSize =
      remainingDataSize < batchSize ? remainingDataSize : batchSize;

    const batchData = Array.from(
      { length: currentBatchSize },
      () => Math.floor(Math.random() * 10) + 1
    );

    data.push(...batchData);
  }

  return {
    title: {
      text: `${chartType}-${index}`,
    },
    series: [
      {
        type: chartType,
        data,
      },
    ],
  };
}

// Event listener for the incoming message
onmessage = ({ data }) => {
  const { numCharts, dataSize, chartTypes } = data;
  const chartData = [];

  // Generate a list of random chart types in advance
  const randomChartTypes = Array.from(
    { length: numCharts },
    () => chartTypes[Math.floor(Math.random() * chartTypes.length)]
  );

  // Generate an array of promises to run the chart data generation asynchronously
  const workerPromises = randomChartTypes.map((chartType, index) => {
    return new Promise((resolve) => {
      const workerData = generateData(chartType, dataSize, index);
      chartData.push(workerData);
      resolve();
    });
  });

  // Wait for all the promises to resolve before posting the chart data
  Promise.all(workerPromises).then(() => {
    postMessage(chartData);
  });
};
