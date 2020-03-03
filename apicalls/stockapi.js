// var arrSymbol = [];
// var gI = 0;
// var gSymbol = "";
// localStorage.clear();


// // 1.  This function handles events where a add stock button is clicked
// $("#add-stock").on("click", function (event) {

//   event.preventDefault();
//   // This line grabs the input from the textbox

//   var stockName = $("#stock-input").val().trim();

//   arrSymbol.push(stockName);
//   gSymbol = stockName;

//   stockSuccess();
//   console.log('currStock search : ' + stockName + ' gSymbol: ' + gSymbol);
// });


// function showError(msg) {
//   alert(msg);
// }

// function stockSuccess() {


//   var APIKey = "Tpk_8ffdae4873fd4f08a97e679741d27746";
//   //var APIKey = "pk_ab67997aa39c4296b79de441635e9a49";

//   var stockAPI = "https://sandbox.iexapis.com/stable/stock/" + gSymbol + "/quote/2?token=" + APIKey;
//   //var stockAPI = "https://cloud.iexapis.com/stable/stock/" + gSymbol + "/quote/2?token=" + APIKey;


//   $.getJSON(stockAPI, function (response) {

//     // Store the cache
//     localStorage.stockCacheUser = JSON.stringify({
//       timestamp: (new Date()).getTime(),
//       data: response
//     });

//     populateCurrentStock(response);
//   });
// }

// function stockError(error) {
//   switch (error.code) {
//     case error.TIMEOUT:
//       showError("A timeout occured! Please try again!");
//       break;
//     case error.POSITION_UNAVAILABLE:
//       showError('We can\'t detect your location. Sorry!');
//       break;
//     case error.PERMISSION_DENIED:
//       showError('Please allow geolocation access for this to work.');
//       break;
//     case error.UNKNOWN_ERROR:
//       showError('An unknown error occured!');
//       break;
//   }

// }

// function populateCurrentStock(response) {
//   {

//     gSymbol = response.symbol;
//     console.log(response);


//     var companyName = response.companyName;
//     var symbol = response.symbol;
//     var latestPrice = response.latestPrice.toLocaleString('en-US', {
//       style: 'currency',
//       currency: 'USD',
//     });
//     var marketCap = response.marketCap.toLocaleString('en-US', {
//       style: 'currency',
//       currency: 'USD',
//     });
//     var peRatio = response.peRatio;


//     localStorage.setItem("curr_companyName", companyName);
//     localStorage.setItem("curr_symbol", symbol);
//     localStorage.setItem("curr_latestPrice", latestPrice);
//     localStorage.setItem("curr_marketCap", marketCap);
//     localStorage.setItem("curr_peRatio", peRatio);


//     addStockData(companyName, symbol, latestPrice, marketCap, peRatio, gI++);

//     console.log("Company Name: " + response.companyName);
//     console.log("Stock Symbol: " + response.symbol);
//     console.log("Stock Price: " + response.latestPrice);
//     console.log("Market Cap: " + response.marketCap);
//     console.log("peRatio: " + response.peRatio);

//   }

// }


// function addStockData(companyName, symbol, latestPrice, marketCap, peRatio, i) {



//   var markup = ' <div id="stockInfo' + i + '"><p> <div class="companyName' + i + '"> Company Name: ' + companyName +
//     ' </div> <div class="symbol' + i + '"> Stock Symbol: ' + symbol +
//     '</div>  <div class="latestPrice' + i + '"> Stock Price: ' + latestPrice +
//     '</div>  <div class="marketCap' + i + '"> Market Cap: ' + marketCap +
//     '</div> <div class="peRatio' + i + '"> PE Ratio: ' + peRatio +
//     '</div> </p><input type="button" id="btnDelete' + i + '" value="Delete ' + symbol + ' data" onclick="fnDeleteStockInfo(' + i + ');" /> </div>';
//   var div = document.createElement('div');
//   div.innerHTML = markup
//   document.getElementById('pStock').prepend(div);

// }


// function fnDeleteStockInfo(i) {
//   var stockInfo = 'stockInfo' + i;
//   document.getElementById(stockInfo).remove(stockInfo);
// };
