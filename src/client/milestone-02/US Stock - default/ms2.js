document.addEventListener('DOMContentLoaded', function() {
    const landingPage = document.getElementById('landing-page');
    const viewsContainer = document.getElementById('views');
    const usStocksView = document.getElementById('USStocksView');

    // Add event listener to the logo
    document.getElementById('logo').addEventListener('click', function() {
        // Show the landing page
        document.getElementById('landing-page').style.display = 'block';

        // Hide all views
        const views = document.querySelectorAll('.view');
        views.forEach(function(view) {
            view.style.display = 'none';
        });
    });
  
    // Sample data, this should be replaced with actual data from your source
    const stocksData = [
      {
        rank: 1,
        name: 'Bitcoin',
        symbol: 'BTC',
        price: '$64,290.77',
        change1h: '+0.37%',
        change24h: '-3.03%',
        change7d: '+5.08%',
        marketCap: '$1,265,864,161,626',
        volume24h: '$29,361,064,010',
        circulatingSupply: '19,689,671 BTC'
      },
      // ... other cryptocurrencies
    ];
  
    // Create the table element
    const table = document.createElement('table');
    table.classList.add('crypto-table');
  
    // Add the table header
    const thead = document.createElement('thead');
    thead.innerHTML = `
      <tr>
        <th>#</th>
        <th>Name</th>
        <th>Price</th>
        <th>1h %</th>
        <th>24h %</th>
        <th>7d %</th>
        <th>Market Cap</th>
        <th>Volume (24h)</th>
        <th>Circulating Supply</th>
      </tr>
    `;
    table.appendChild(thead);
  
    // Create and fill the table body
    const tbody = document.createElement('tbody');
    stocksData.forEach(stock => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${stock.rank}</td>
        <td>${stock.name} ${stock.symbol}</td>
        <td>${stock.price}</td>
        <td>${stock.change1h}</td>
        <td>${stock.change24h}</td>
        <td>${stock.change7d}</td>
        <td>${stock.marketCap}</td>
        <td>${stock.volume24h}</td>
        <td>${stock.circulatingSupply}</td>
      `;
      tbody.appendChild(row);
    });
    table.appendChild(tbody);
  
    // Append the table to the USStocksView div
    usStocksView.appendChild(table);

  // Event listener for the US Stocks link
  document.getElementById('USStocksLink').addEventListener('click', function(event) {
    event.preventDefault(); // Prevent the default anchor behavior
    landingPage.style.display = 'none';
    viewsContainer.style.display = 'flex';
    viewsContainer.style.justifyContent = 'center';
    switchView('USStocksView'); // Call the function to switch views
  });

  });

// Function to hide all views and show the selected one
function switchView(viewIdToShow) {
    const views = document.querySelectorAll('.view');
    views.forEach(view => {
        view.style.display = 'none'; // Hide all views
    });

    // Show the selected view
    const viewToShow = document.getElementById(viewIdToShow);
    if (viewToShow) {
        viewToShow.style.display = 'block';
        viewToShow.style.margin = '0px';
    }
}

  
  