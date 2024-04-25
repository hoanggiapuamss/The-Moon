document.addEventListener('DOMContentLoaded', () =>
    fetchStockData());

function fetchStockData() {
    // Note: The URL and headers below are placeholders and should be replaced with your actual API call details.
    fetch('https://api.polygon.io/v3/reference/tickers?market=stocks&date=2024-04-23&active=true&limit=1&apiKey=jRMYcO5SdtZZ_dsDfetXJcJRbHXADrOP')
    .then(response => response.json())
    .then(data => {
        const stock_data = data['results']
        populateStockData1(stock_data);
    })
    .catch(error => console.error('Error fetching stock data:', error));
}

async function populateStockData1(stockData) {
    const stocksContainer = document.getElementById('stocks-container');
    const stockTemplate = document.getElementById('stock-template').content;

    stockData.forEach(async (stock) => {
        const stockNode = stockTemplate.cloneNode(true);
        stockNode.querySelector('.name').textContent = await stock.ticker || '';
        stockNode.querySelector('.market').textContent = await stock.market || '';
      
        // Handle the price chart and country similarly
        //Handle Market Cap 
        const ticker = stock.ticker;
        fetch (`https://api.polygon.io/v2/aggs/ticker/${ticker}/range/1/day/2024-04-23/2024-04-23?adjusted=true&sort=asc&limit=123&apiKey=jRMYcO5SdtZZ_dsDfetXJcJRbHXADrOP`)
        .then(response => response.json())
        .then((data) => {
            stockNode.querySelector('.price').textContent = data.results[0].c || '';
        })
        .catch(error => console.error('Error fetching stock data:', error));
        await stocksContainer.appendChild(stockNode);
    });



    for (const stock of stockData) {
        const stockNode = stockTemplate.cloneNode(true);
        stockNode.querySelector('.name').textContent = await stock.ticker || '';
        stockNode.querySelector('.market').textContent = await stock.market || '';

        const ticker = stock.ticker;
        const priceDataResponse = await 
    }
}

