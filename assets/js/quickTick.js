// eslint-disable-next-line no-undef
$(document).ready(function() {

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

});