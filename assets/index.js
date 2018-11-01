
// Declare stockList array.
var stockList = [
    {
        ticker: 'GE',
        name: 'GE'
    },
    {
        ticker: 'UA',
        name: 'Under Armour'
    },
    {
        ticker: 'MSFT',
        name: 'Microsoft'
    },
    {
        ticker: 'FB',
        name: 'Facebook'
    },
    {
        ticker: 'AAPL',
        name: 'Apple'
    }
];

/*
Declare validationList array.
It'll have ticker and name attributes just like stockList.
It's used for checking the user input later.
*/
var validationList = [];

// Declare populatePage function
function populatePage() {
    // Empty #stock-list (nav menu).
    $('#stock-list').empty();
    // For each stock in stockList, make the ticker lowercase (for the element id).
    stockList.forEach(stock => {
        var ticker = stock.ticker.toLowerCase();
        // Append the new stock to the nav menu.
        $('#stock-list').append(`<li class="nav-options"><a href="#" role="button" id="${ticker}">${stock.name}</a></li>`);
        // Create the event listener for the nav menu item.
        $(`#${ticker}`).on('click', function () {
            // Hide the background image.
            $('#background').hide();
            // Toggle showing and hiding the nav menu with each click of the menu icon.
            $('li').toggle('display');
            // Get stock data from the API.
            $.get(`https://api.iextrading.com/1.0/stock/${ticker}/batch?types=logo,quote,news,chart&range=1m&last=10`, function (response) {
                // Declaring html string and articles array variables.
                let html = '', articles = [];
                // Populate the logo element with the image and show it.
                $('#logo').attr('src', response.logo.url);
                $('#logo').show();
                // Populate the company name.
                $('.co-name').text(response.quote.companyName);
                // Populate the stock price.
                $('.price').text(`Price: $${response.quote.latestPrice}`);
                // Populate the articles array with the response from the API (for simplicity later).
                articles = response.news;
                // For each article in articles, create the news card in the html string variable.
                for (let i = 0; i < articles.length; i++) {
                    html += '<div class="card my-3">';
                    html += `<div class="card-header"><b>${i + 1}. ${articles[i].headline}</b></div>`;
                    html += `<div class="card-body"><p>Source: ${articles[i].source}<br>Date: ${articles[i].datetime}</p>`;
                    html += `<p>Summary: ${articles[i].summary}</p>`;
                    html += '</div>';
                    html += `<div class="card-footer"><a href="${articles[i].url}" target="_blank">Read more</a></div>`;
                    html += '</div>';
                };
                // Populate the page with the cards in html string variable.
                $('.news').html(html);
            });
        });
    });
}
// Run populatePage on page load.
populatePage();

// Get list of available stock symbols from API on page load and store them in validationList array.
$.get('https://api.iextrading.com/1.0/ref-data/symbols', function (response) {
    response.forEach(element => {
        validationList.push({
            'ticker': element.symbol.toUpperCase(),
            'name': element.name
        });
    });
});

// When add is clicked, search validationList array using user input.
$('#add').on('click', function(){
    let userInput = $('#addTicker').val().toUpperCase();
    validationList.forEach(stock => {
        // If userInput matches validationList item, push the item to the stockList array.
        if(userInput === stock.ticker){
            stockList.push({
                ticker : stock.ticker,
                name : stock.name
            });
            // Run populatePage again and alert the user that their ticker has been added to the list.
            populatePage();
            alert(userInput + ' has been added to the navigation menu.');
        }
    });
    // Reset the userInput field.
    $('#addTicker').val('');
});

// When nav menu icon is clicked, toggle displaying the stock items.
$('#icon').on('click', function(){
    $('li').toggle('display');
});
