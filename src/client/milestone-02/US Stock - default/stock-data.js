document.addEventListener('DOMContentLoaded', () =>
    fetchStockData());

function fetchStockData() {
    // Note: The URL and headers below are placeholders and should be replaced with your actual API call details.
    fetch('https://api.polygon.io/v3/reference/tickers?market=stocks&date=2024-04-23&active=true&limit=5&apiKey=jRMYcO5SdtZZ_dsDfetXJcJRbHXADrOP')
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

    for (const stock of stockData) {
        const stockNode = stockTemplate.cloneNode(true);
        stockNode.querySelector('.name').textContent = await stock.name || '';
        stockNode.querySelector('.market').textContent = await stock.ticker || '';

        await new Promise(resolve => setTimeout(resolve, 12000));

        try {
            //stock price
            const ticker = stock.ticker;
            const priceDataResponse = await fetch(`https://api.polygon.io/v2/aggs/ticker/${ticker}/range/7/day/2024-04-16/2024-04-23?adjusted=true&sort=asc&limit=120&apiKey=jRMYcO5SdtZZ_dsDfetXJcJRbHXADrOP`)
            const priceData = await priceDataResponse.json();   
            stockNode.querySelector('.price').textContent = priceData.results[1].c || '';

            //Market Cap
            const curr_price = priceData.results[1].c
            const marketDataResponse = await fetch(`https://api.polygon.io/v3/reference/tickers/${ticker}?date=2024-04-23&apiKey=jRMYcO5SdtZZ_dsDfetXJcJRbHXADrOP`)
            const marketData = await marketDataResponse.json();
            stockNode.querySelector('.cap').textContent = marketData['results']['market_cap']? marketData['results']['market_cap'] : marketData['results']['share_class_shares_outstanding'] * curr_price;

            //last 7 days percentage
            const prev_price = priceData.results[0].c
            const delta = curr_price - prev_price;
            const percentage = (delta/prev_price)*100
            stockNode.querySelector('.percentage-week').textContent = percentage
        }catch (error){
            console.error('Error fetching stock data:', error);
        }
        
       
        

        



        stocksContainer.appendChild(stockNode);
    }
}

