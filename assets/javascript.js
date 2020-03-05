/* eslint-disable no-undef */

const apiKey = "Tpk_8ffdae4873fd4f08a97e679741d27746";
// const apiKey = "pk_ab67997aa39c4296b79de441635e9a49";
const apiBaseUrl = "https://sandbox.iexapis.com/stable/stock"
// const apiBaseUrl = "https://cloud.iexapis.com/stable/stock"

$("#searchForm").on("submit", async (event) => {
  event.preventDefault();
  const stockName = $("#findStock").val().trim();
  const {
    companyName,
    symbol,
    latestPrice,
    marketCap,
    peRatio
  } = await getStockInfo(stockName);
  const {
    chartData
  } = await getStockChart(stockName);
  addStockToPage({
    companyName,
    symbol,
    latestPrice,
    marketCap,
    peRatio,
    chartData
  })
  $("#searchForm")[0].reset();
});

const getStockInfo = async (stockName) => {
  const stockApiUrl = `${apiBaseUrl}/${stockName}/quote/2?token=${apiKey}`;
  const response = await $.getJSON(stockApiUrl, response => response).fail(() => {
    // We can insert an error message in the HTML
    console.log("get stock info fail")
  });
  console.log('getStockInfo', response)
  return response;
}

const getStockChart = async (stockName) => {
  const chartApiUrl = `${apiBaseUrl}/${stockName}/chart/5d?token=${apiKey}`;
  const response = await $.getJSON(chartApiUrl, response => response).fail(() => {
    // We can insert an error message in the HTML
    console.log("get stock chart fail")
  });
  console.log('getStockChart', response)
  return {
    chartData: response
  };
}

const addStockToPage = ({
  companyName,
  symbol,
  latestPrice,
  marketCap,
  peRatio,
  chartData
}) => {
  $("#stocks").append(`
    <div id="stock-${symbol}" class="container">
      <div id="stockRow" class="row m-3">
        <div class="col-10 card p-2">
          <div><strong> Company: </strong>${companyName}</div>
          <div><strong> Symbol: </strong> ${symbol}</div>
          <div>
            <strong> Current Price: </strong>
            ${latestPrice.toLocaleString('en-US', {
              style: 'currency',
              currency: 'USD',
            })}
          </div>
          <div>
            <strong> Market Cap: </strong>
            ${marketCap.toLocaleString('en-US', {
              style: 'currency',
              currency: 'USD',
            })}
          </div>
          <div><strong> PE Ratio:</strong> ${peRatio}</div>
          <canvas width="200" height="200" class="stock-chart"></canvas>
        </div>
        <button type="button" class="col m-1 btn delete-stock-button">
          <i class="fas fa-times fa-2x" style="color:#FF0000;"></i>
        </button>
      </div>
    </div>
  `);

  // DELETE BUTTON
  $(`#stock-${symbol} .delete-stock-button`).on("click", () => removeStockFromPage(symbol))

  // CHART.JS
  new Chart($(`#stock-${symbol} canvas`), {
    type: 'bar',
    data: {
      labels: chartData.map(data => data.date),
      datasets: [{
        label: 'Closing Price',
        data: chartData.map(data => data.close),
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      }]
    }
  });
}

// DELETE BUTTON (FOR THE API CALL/ROUTE)
const removeStockFromPage = stockName => {
  $(`#stock-${stockName}`).remove();
}
