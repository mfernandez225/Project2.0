/* eslint-disable no-undef */
$("#searchForm").on("submit", function (event) {

  event.preventDefault();
  // This line grabs the input from the textbox

  const stockName = $("#findStock").val().trim();

  getStock(stockName);

  $("#searchForm")[0].reset();
});

function getStock(stockName) {


  var APIKey = "Tpk_8ffdae4873fd4f08a97e679741d27746";
  //var APIKey = "pk_ab67997aa39c4296b79de441635e9a49";

  var stockAPI = "https://sandbox.iexapis.com/stable/stock/" + stockName + "/quote/2?token=" + APIKey;
  //var stockAPI = "https://cloud.iexapis.com/stable/stock/" + stockName + "/quote/2?token=" + APIKey;


  $.getJSON(stockAPI, function (response) {
    $("#stocks").append(
      `<div class="container">
              <div id="stockRow" class="row m-3">
              <div class="col-10 card p-2">
              <div><strong> Company: </strong>${response.companyName}</div>
              <div><strong> Symbol: </strong> ${response.symbol}</div>
              <div><strong> Current Price: </strong> ${response.latestPrice.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
      })}</div>
              <div><strong> Market Cap: </strong> ${response.marketCap.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
      })}</div>
              <div><strong> PE Ratio: </strong> ${response.peRatio}</div>
              </div>
              <button id="deleteStock" type="button" class="col m-1 btn"><i class="fas fa-times fa-2x" style="color:#FF0000;"></i></button>
              </div>
              </div>`);
  }).fail(() => {
    // We can insert an error message in the HTML
    console.log("error")
  });
}
