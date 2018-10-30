
var stockList = [
    {
        ticker : 'GE',
        name : 'GE'
    },
    {
        ticker : 'UA',
        name : 'Under Armour'
    },
    {
        ticker : 'MSFT',
        name : 'Microsoft'
    },
    {
        ticker : 'FB',
        name : 'Facebook'
    },
    {
        ticker : 'AAPL',
        name : 'Apple'
    },
    {
        ticker : 'OKTA',
        name : 'Okta'
    },
    {
        ticker : 'NOW',
        name : 'ServiceNow'
    }
];

stockList.forEach(stock => {
    var ticker = stock.ticker.toLowerCase();
    $('#stock-list').append(`<li class="my-2"><button id="${ticker}">${stock.name}</button></li>`);
    $(`#${ticker}`).on('click', function(){
        $.get(`https://api.iextrading.com/1.0/stock/${ticker}/logo`, function(response){
            console.log();
            $('#logo').attr('src', response.url);
            $('#logo').show();
        });
    });
});

// https://api.iextrading.com/1.0/stock/aapl/batch?types=quote,news,chart&range=1m&last=10


