//stocks fetched (mocking)
export let stocks = [
  {
    "name": "Microsoft Corporation",
    "ticker": "MSFT",
    "price": 406.32,
    "volume24h": "29.695M",
    "change7d": "+1.82%",
    "marketCap": "3.019 T USD"
  },
  {
    "name": "Apple Inc.",
    "ticker": "AAPL",
    "price": 169.30,
    "volume24h": "44.838 M",
    "change7d": "-0.35%",
    "marketCap": "2.614 T USD"
  },
  {
    "name": "NVIDIA Corporation",
    "ticker": "NVDA",
    "price": 877.35,
    "volume24h": "55.1 M",
    "change7d": "+6.18%",
    "marketCap": "2.193 T USD"
  },
  {
    "name": "Alphabet Inc.",
    "ticker": "GOOG",
    "price": 174.69,
    "volume24h": "56.501M",
    "change7d": "+9.97%",
    "marketCap": "2.145 T USD"
  },
  {
    "name": "Amazon.com, Inc.",
    "ticker": "AMZN",
    "price": 179.62,
    "volume24h": "29.695M",
    "change7d": "+1.82%",
    "marketCap": "3.019 T USD"
  },
  {
    "name": "Meta Plartforms, Inc.",
    "ticker": "META",
    "price": 443.29,
    "volume24h": "29.695M",
    "change7d": "+1.82%",
    "marketCap": "3.019 T USD"
  },
  {
    "name": "Tesla, Inc.",
    "ticker": "TSLA",
    "price": 168.29,
    "volume24h": "29.695M",
    "change7d": "+1.82%",
    "marketCap": "3.019 T USD"
  },
  {
    "name": "Adobe Inc.",
    "ticker": "ADBE",
    "price": 300.23,
    "volume24h": "10.695M",
    "change7d": "-182%",
    "marketCap": "2.038 T USD"
  },
  {
    "name": "Shimmick Construction Co., Inc.",
    "ticker": "SHIM",
    "price": 180.33,
    "volume24h": "15.123",
    "change7d": "+5.23%",
    "marketCap": "1.567 T USD"
  },
  {
    "name": "Intel Corporation",
    "ticker": "INTC",
    "price": 31.05,
    "volume24h": "47.672M",
    "change7d": "+1.77%",
    "marketCap": "131.18 T USD"
  },
];

// export async function fetchStockData() {
//     let today = new Date();
//     const url = `https://api.polygon.io/v3/reference/tickers?type=CS&market=stocks&date=${today.toISOString().split("T")[0]}&active=true&limit=5&sort=cik&apiKey=jRMYcO5SdtZZ_dsDfetXJcJRbHXADrOP`;
  
//     try {
//       const response = await fetch(url);  // Await the fetch request
//       const data = await response.json(); // Await the JSON parsing of the response
//       const stock_data = data["results"];
//       populateStockData1(stock_data);     // Assuming this function is synchronous
//     } catch (error) {
//       console.error("Error fetching stock data:", error);
//     }
//   }
  

// async function populateStockData1(stockData) {
//   let today = new Date();
//   let dateTd = today.toISOString().split("T")[0];
//   //yesterday
//   let today1 = new Date();
//   today1.setDate(today1.getDate() - 1); // Subtract one day from the current date
//   let yesterday = today1.toISOString().split("T")[0];
//   //1 week ago
//   let today2 = new Date();
//   today2.setDate(today2.getDate() - 7); // Subtract one day from the current date
//   let a_week = today2.toISOString().split("T")[0];

//   for (const stock of stockData) {
//     //stock object of each stock has name, ticker, stock price, %1h, %24h, %7d, marketcap, volume(24h)
//     const stockObj = {};
//     stockObj.name = (await stock.name);
//     stockObj.ticker = (await stock.ticker) ;

//     await new Promise((resolve) => setTimeout(resolve, 60000));
//     try {
      
//       //stock price (make this change dynametically every 12 secs (cache)) (hazard data structure)
//       const ticker = stock.ticker;
//       const priceRealTime = await fetch(
//         `https://api.polygon.io/v2/aggs/ticker/${ticker}/range/1/day/${yesterday}/${yesterday}?adjusted=true&sort=asc&limit=60&apiKey=jRMYcO5SdtZZ_dsDfetXJcJRbHXADrOP`
//       );
//       const priceDataRTJSON = await priceRealTime.json();
//       const priceDataRealTime = priceDataRTJSON.results[0].c ;
//       console.log(priceDataRealTime);
//       stockObj.price = priceDataRealTime;

//       //1h%
//     //   const price1Hour = await fetch(
//     //     `https://api.polygon.io/v2/aggs/ticker/${ticker}/range/3/day/${yesterday}/${dateTd}?adjusted=true&sort=asc&limit=60&apiKey=jRMYcO5SdtZZ_dsDfetXJcJRbHXADrOP`
//     //   );
//     //   const priceData1HJSON = await price1Hour.json();
//     //   const priceData1H = priceData1HJSON.results[0].c ;
//     //   stockObj.change1h =
//     //     ((priceData1H - priceDataRealTime) / priceDataRealTime) * 100 ;

//       //24h%
//     //   const price24Hour = await fetch(
//     //     `https://api.polygon.io/v2/aggs/ticker/${ticker}/range/3/day/${yesterday}/${dateTd}?adjusted=true&sort=asc&limit=60&apiKey=jRMYcO5SdtZZ_dsDfetXJcJRbHXADrOP`
//     //   );
//     //   const priceData24HJSON = await price24Hour.json();
//     //   const priceData24H = priceData24HJSON.results[0].c ;
//     //   stockObj.change24h =
//     //     ((priceData24H - priceDataRealTime) / priceDataRealTime) * 100 ;

//       //Volumne (24h)
//       stockObj.volume24h = priceDataRTJSON.results[0].v ;

//       //7day%
//       const price1week = await fetch(
//         `https://api.polygon.io/v2/aggs/ticker/${ticker}/range/7/day/${a_week}/${dateTd}?adjusted=true&sort=asc&limit=60&apiKey=jRMYcO5SdtZZ_dsDfetXJcJRbHXADrOP`
//       );
//       const priceData1weekJSON = await price1week.json();
//       const priceData1week = priceData1weekJSON.results[0].c ;
//       stockObj.change7d =
//         ((priceData1week - priceDataRealTime) / priceData1week) * 100 ;

//       //Market Cap (OK)
//       const curr_price = priceDataRealTime.results[0].c;
//       const marketDataResponse = await fetch(
//         `https://api.polygon.io/v3/reference/tickers/${ticker}?date=${yesterday}&apiKey=jRMYcO5SdtZZ_dsDfetXJcJRbHXADrOP`
//       );
//       const marketData = await marketDataResponse.json();
//       stockObj.marketCap = marketData["results"]["market_cap"]
//         ? marketData["results"]["market_cap"]
//         : marketData["results"]["share_class_shares_outstanding"] * curr_price;
//     } catch (error) {
//       console.error("Error fetching stock data:", error);
//     }
//     console.log(stockObj);
//     stocks.push(stockObj);
//   }
// }

export async function fetchStockData() {
    //yesterday
    let today1 = new Date();
    today1.setDate(today1.getDate() - 1); // Subtract one day from the current date
    let yesterday = today1.toISOString().split("T")[0];

    const url = `https://api.polygon.io/v3/reference/tickers?market=stocks&date=${yesterday}&active=true&limit=10&apiKey=jRMYcO5SdtZZ_dsDfetXJcJRbHXADrOP`
    try {
      const response = await fetch(url);  // Await the fetch request
      const data = await response.json(); // Await the JSON parsing of the response
      const stock_data = data["results"];
      populateStockData1(stock_data);     // Assuming this function is synchronous
    } catch (error) {
      console.error("Error fetching stock data:", error);
    }
  }
  

async function populateStockData1(stockData) {
  
  //yesterday
  let today1 = new Date();
  today1.setDate(today1.getDate() - 1); // Subtract one day from the current date
  let yesterday = today1.toISOString().split("T")[0];
  //1 week ago
  let today2 = new Date();
  today2.setDate(today2.getDate() - 8); // Subtract one day from the current date
  let a_week = today2.toISOString().split("T")[0];

  for (const stock of stockData) {
    //stock object of each stock has name, ticker, stock price, %1h, %24h, %7d, marketcap, volume(24h)
    const stockObj = {};
    stockObj.name = (await stock.name);
    stockObj.ticker = (await stock.ticker) ;

    await new Promise((resolve) => setTimeout(resolve, 60000));
    try {
      
      //stock price (make this change dynametically every 12 secs (cache)) (hazard data structure)
      const ticker = stock.ticker;
      const priceRealTime = await fetch(
        `https://api.polygon.io/v2/aggs/ticker/${ticker}/range/7/day/${a_week}/${yesterday}?adjusted=true&sort=asc&limit=120&apiKey=jRMYcO5SdtZZ_dsDfetXJcJRbHXADrOP`
      );
      const priceDataRTJSON = await priceRealTime.json();
      const priceDataRealTime = priceDataRTJSON.results[0].c || priceDataRTJSON.results[1].c;
      console.log(priceDataRealTime);
      stockObj.price = priceDataRealTime;

      //7day%
      
      const priceData1week = priceDataRTJSON.results[0].c ;
      
      let percent = ((priceDataRealTime - priceData1week) / priceData1week) * 100 ;
      if (percent === 0){
        //mock data between -6 and 6 
        stockObj.change7d = Math.random()*12 - 6 
      }else{  
        stockObj.change7d = percent
      }

      //Market Cap (OK)
      const curr_price = priceDataRTJSON.results[0].c || priceDataRTJSON.results[1].c;
      const marketDataResponse = await fetch(
        `https://api.polygon.io/v3/reference/tickers/${ticker}?date=${yesterday}&apiKey=jRMYcO5SdtZZ_dsDfetXJcJRbHXADrOP`
      );
      const marketData = await marketDataResponse.json();

      if (marketData['results']['market_cap']){
        stockObj.marketCap = marketData['results']['market_cap']
      }else{
        if(marketData['results']['share_class_shares_outstanding']){
          stockObj.marketCap =  marketData["results"]["share_class_shares_outstanding"] * curr_price
        }else{
          // mock data between 40 millions and 100 millions
          const min = 40000000;
          const max = 100000000;
          stockObj.marketCap = Math.floor(Math.random() * (max - min + 1)) + min;
        }
      }


      //volume
      //mock data again because the 1 percentage rate wasn't available
      const per = Math.random()*2 -1; 
      const vol = curr_price*per;
      stock.volume24h = vol || "N/A";
    } catch (error) {
      console.error("Error fetching stock data:", error);
    }
    console.log(stockObj);
    stocks.push(stockObj);
  }
}
