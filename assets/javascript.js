// eslint-disable-next-line no-undef
$(document).ready(function () {});
/* This will be the javascript needed for user to transvers the DOM
The list of items needed for a functional website: 

#1. The search bar, when selected will make a get request for database.
    - This will be an autofill submit form: https://www.w3schools.com/howto/howto_js_autocomplete.asp

#2. onSubmit is needed for search bar to access api
    - suggested solution: Create a function that will submit company symbol into API call.

#3. The results from api call should be able to populate : Name, symbol, price, graph, etc.
    - This api call should be done when the page loads so that it can populate the NASDAQ, S&P 500, and DOW JONES header.

#4  The row that is created from the form submit shall have a watchlist button, and a delete button.

#5. The on click event from the delete row button will only effect rows that are not selected for the watchlist.

#6. If a row is not selected for watchlist it shall be removed from dom on reload.

#7. If watchlist is selected when getting company info from database, call the api, and generate a row for api call to populate.

*/

$("#searchForm").on("submit", function (event) {

    event.preventDefault();
    // This line grabs the input from the textbox

    const stockName = $("#findStock").val().trim();

    getStock(stockName);
});

function getStock(stockName) {


    var APIKey = "Tpk_8ffdae4873fd4f08a97e679741d27746";
    //var APIKey = "pk_ab67997aa39c4296b79de441635e9a49";

    var stockAPI = "https://sandbox.iexapis.com/stable/stock/" + stockName + "/quote/2?token=" + APIKey;
    //var stockAPI = "https://cloud.iexapis.com/stable/stock/" + stockName + "/quote/2?token=" + APIKey;


    $.getJSON(stockAPI, function (response) {
        $("#stocks").append(
            `<div class="container">
            <div class="row m-3">
            <div class="col-12 card p-2">
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
            </div>
            </div>`);
    }).fail(() => {
        // We can insert an error message in the HTML
        console.log("error")
    });
}
