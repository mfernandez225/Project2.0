/* eslint-disable no-undef */

const apiKey = "Tpk_8ffdae4873fd4f08a97e679741d27746";
// const apiKey = "pk_ab67997aa39c4296b79de441635e9a49";
const apiBaseUrl = "https://sandbox.iexapis.com/stable/stock"
    // const apiBaseUrl = "https://cloud.iexapis.com/stable/stock"

//This is the api call for header
stockDow();
stockSNP();

// Search Function
$("#searchForm").on("submit", async(event) => {
    event.preventDefault();
    const stockName = $("#findStock").val().trim();
    if ($(`#stock-${stockName}`).length === 0) {
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
    }
});

// When the user is typing it will automatically make the text Uppercase
$("#findStock").on("keydown", () => {
    $("#findStock").val($("#findStock").val().toUpperCase());
})

const getStockInfo = async(stockName) => {
    const stockApiUrl = `${apiBaseUrl}/${stockName}/quote/2?token=${apiKey}`;
    const response = await $.getJSON(stockApiUrl, response => response).fail(() => {
        // We can insert an error message in the HTML
        console.log("get stock info fail")
    });
    console.log('getStockInfo', response)
    return response;
}

const getStockChart = async(stockName) => {
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

// Creating the Row that displays the API INFORMATION
const addStockToPage = ({
    companyName,
    symbol,
    latestPrice,
    marketCap,
    peRatio,
    chartData
}) => {
    $("#stocks").prepend(`
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
          <div class="container mt-1">
          <canvas width="200" height="200" class="stock-chart"></canvas>
          </div>
        </div>
        <button type="button" class="col m-3 btn delete-stock-button">
          <i class="fas fa-trash-alt fa-2x" style="color:#FF0000;"></i>
        </button>
      </div>
    </div>
  `);

    // DELETE BUTTON
    $(`#stock-${symbol} .delete-stock-button`).on("click", () => removeStockFromPage(symbol))

    // CHART.JS
    new Chart($(`#stock-${symbol} canvas`), {
        type: 'line',
        data: {
            labels: chartData.map(data => data.label),
            datasets: [{
                    label: 'Closing Price',
                    data: chartData.map(data => data.close),
                    borderColor: [
                        'rgb(0, 128, 0)'
                    ],
                    backgroundColor: [
                        'rgb(255, 255, 255)'
                    ],
                    borderWidth: 2
                },
                {
                    label: 'High Price',
                    data: chartData.map(data => data.high),
                    borderColor: [
                        'rgb(0, 0, 255)'
                    ],
                    backgroundColor: [
                        'rgb(255, 255, 255)'
                    ],
                    borderWidth: 2
                },
                {
                    label: 'Low Price',
                    data: chartData.map(data => data.low),
                    borderColor: [
                        'rgb(255, 0, 0)'
                    ],
                    backgroundColor: [
                        'rgb(255, 255, 255)'
                    ],
                    borderWidth: 2
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            legend: {
                display: true
            }
        }
    });
}

//This is the ticker api call for S&P and Dow
function stockDow() {

    var dowAPI = "https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=DJI&apikey=6QFBH662YTYIW2BW";

    $.getJSON(dowAPI, function(response) {

        localStorage.stockCacheUser = JSON.stringify({
            timestamp: (new Date()).getTime(),
            data: response
        });
        populateDowStock(response);
    });

    function populateDowStock(response) {
        {
            var markup = '<div id="topTickerDow">' + "USD " + response["Global Quote"]["05. price"].slice(0, -2) +
                '</div>'
            console.log(response);
            var div = document.createElement('div');
            div.innerHTML = markup
            document.getElementById('topTickerDow').prepend(div);
        }
    }
}

function stockSNP() {

    var snpAPI = "https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=INX&apikey=6QFBH662YTYIW2BW";

    $.getJSON(snpAPI, function(response) {
        localStorage.stockCacheUser = JSON.stringify({
            timestamp: (new Date()).getTime(),
            data: response
        });

        populateSNPStock(response);
    });

    function populateSNPStock(response) {
        {
            var markup = ' <div id="topTickerSP">' + "USD " + response["Global Quote"]["05. price"].slice(0, -2) +
                '</div>';

            var div = document.createElement('div');
            div.innerHTML = markup
            document.getElementById('topTickerSP').prepend(div);
        }
    }
}

// DELETE BUTTON (FOR THE API CALL/ROUTE)
const removeStockFromPage = stockName => {
    $(`#stock-${stockName}`).remove();
}