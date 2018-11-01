
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
    },
    {
        ticker: 'OKTA',
        name: 'Okta'
    },
    {
        ticker: 'NOW',
        name: 'ServiceNow'
    }
];

var validationList = [];

function populatePage() {
    $('#stock-list').empty();
    stockList.forEach(stock => {
        var ticker = stock.ticker.toLowerCase();
        $('#stock-list').append(`<li class="nav-options"><a href="#" role="button" id="${ticker}">${stock.name}</a></li>`);
        $(`#${ticker}`).on('click', function () {
            $('li').toggle('display');
            $.get(`https://api.iextrading.com/1.0/stock/${ticker}/batch?types=logo,quote,news,chart&range=1m&last=10`, function (response) {
                let html = '', articles = [];
                $('#logo').attr('src', response.logo.url);
                $('#logo').show();
                $('.co-name').text(response.quote.companyName);
                $('.price').text(`$${response.quote.latestPrice}`);
                articles = response.news;
                for (let i = 0; i < articles.length; i++) {
                    html += '<div class="card my-3">';
                    html += `<div class="card-header"><b>${i + 1}. ${articles[i].headline}</b></div>`;
                    html += `<div class="card-body"><p>Source: ${articles[i].source}<br>Date: ${articles[i].datetime}</p>`;
                    html += `<p>Summary: ${articles[i].summary}</p>`;
                    html += '</div>';
                    html += `<div class="card-footer"><a href="${articles[i].url}" target="_blank">Read more</a></div>`;
                    html += '</div>';
                };
                $('.news').html(html);
            });
        });
    });
}
populatePage();

$.get('https://api.iextrading.com/1.0/ref-data/symbols', function (response) {
    response.forEach(element => {
        validationList.push({
            'ticker': element.symbol.toUpperCase(),
            'name': element.name
        });
    });
});

$('#add').on('click', function(){
    let userInput = $('#addTicker').val().toUpperCase();
    validationList.forEach(stock => {
        if(userInput === stock.ticker){
            stockList.push({
                ticker : stock.ticker,
                name : stock.name
            });
            populatePage();
        }
    });
    $('#addTicker').val('');
});

$('#icon').on('click', function(){
    $('li').toggle('display');
});
