
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

stockList.forEach(stock => {
    var ticker = stock.ticker.toLowerCase();
    $('#stock-list').append(`<li class="my-2"><button id="${ticker}">${stock.name}</button></li>`);
    $(`#${ticker}`).on('click', function () {
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



