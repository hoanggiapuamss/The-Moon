import { fetchStockData, stocks} from "./stock-data.js";

document.addEventListener("DOMContentLoaded", function () {
  const usStocksView = document.getElementById("USStocksView");
  const tradingView = document.getElementById("TradingView");
  const communityView = document.getElementById("CommunityView");

  /////////////////////////////////////////////Logo Landing Page////////////////////////////////////////////////////
  // Add event listener to the logo
  document.getElementById("logo").addEventListener("click", function () {
    // Show the landing page
    document.getElementById("landing-page").style.display = "flex";

    // Hide all views
    const views = document.querySelectorAll(".view");
    views.forEach(function (view) {
      view.style.display = "none";
    });
  });

  /////////////////////////////////////////////Rebder Stock Lists//////////////////////////////////////////////////
  // Sample data, this should be replaced with actual data from your source
//   const stocksData = [
//     {
//       name: "Bitcoin",
//       symbol: "BTC",
//       price: "$64,290.77",
//       change1h: "+0.37%",
//       change24h: "-3.03%",
//       change7d: "+5.08%",
//       marketCap: "$1,265,864,161,626",
//       volume24h: "$29,361,064,010",
//     },
//   ];

  document
    .getElementById("USStocksLink")
    .addEventListener("click", async (event) => {
      event.preventDefault(); // Prevent the default anchor behavior
      await fetchStockData();
      console.log(stocks);
      renderStockList(usStocksView, stocks);
      switchView("USStocksView"); // Call the function to switch views
    });
  //////////////////////////////////////////////Rebder Stock Lists//////////////////////////////////////////////////
  /////////////////////////////////////////////Trading View////////////////////////////////////////////////////////
  document.getElementById("TVLink").addEventListener("click", function (event) {
    event.preventDefault(); // Prevent the default anchor behavior
    renderTV();
    switchView("TradingView");
  });
  ////////////////////////////////////////////////////COMMUNITY//////////////////////////////////////////////////////
  document
    .getElementById("communityLink")
    .addEventListener("click", function (event) {
      event.preventDefault();
      renderUserInput(communityView);
      const samplePost = {
        username: "Guncel Kripto",
        handle: "@GuncelKripto...",
        time: "20h",
        content: "#BTC\nBitcoin is creating a massive ASCENDING TRIANGLE!🔥🔝",
        // Add other post properties such as the image URL, likes, comments, etc.
      };

      renderPost(communityView, samplePost);
      switchView("CommunityView");
    });
});
// Function to hide all views and show the selected one
function switchView(viewIdToShow) {
  const views = document.querySelectorAll(".view");
  views.forEach((view) => {
    view.style.display = "none"; // Hide all views
  });

  // Show the selected view
  const viewToShow = document.getElementById(viewIdToShow);
  if (viewToShow) {
    viewToShow.style.display = "block";
    viewToShow.style.margin = "0px";
    document.getElementById("landing-page").style.display = "none";
    document.getElementById("views").style.display = "flex";
    document.getElementById("views").style.justifyContent = "center";
  }
}
//render stock list
function renderStockList(element, stocksData) {
  let table = element.querySelector("table");
  let tbody;

  // Check if the table already exists
  if (!table) {
    // Create the table element if it doesn't exist
    table = document.createElement("table");
    table.classList.add("crypto-table");

    // Add the table header
    const thead = document.createElement("thead");
    thead.innerHTML = `
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Price</th>
            <th>7d %</th>
            <th>Market Cap</th>
            <th>Volume (24h)</th>
          </tr>
        `;
    table.appendChild(thead);

    // Create the table body
    tbody = document.createElement("tbody");
    table.appendChild(tbody);

    // Append the new table to the provided element
    element.appendChild(table);
  } else {
    // If the table exists, select the existing tbody
    tbody = table.querySelector("tbody");
  }

  // Add new data to the tbody
  stocksData.forEach((stock, i) => {
    const row = document.createElement("tr");
    row.innerHTML = `
          <td>${i + 1}</td>
          <td>${stock.name} ${stock.ticker}</td>
          <td>${stock.price}</td>
          <td>${stock.change7d}</td>
          <td>${stock.marketCap}</td>
          <td>${stock.volume24h}</td>
        `;
    tbody.appendChild(row);
  });
}

//render trading view (render with symbol)
function renderTV() {
  new TradingView.widget({
    autosize: true,
    symbol: "NASDAQ:AAL",
    interval: "240",
    timezzone: "Etc/Utc",
    theme: "dark",
    style: "1",
    locale: "en",
    toolbar_bg: "#f1f3f6",
    enable_publishing: false,
    withdateranges: true,
    hide_side_toolbar: false,
    allow_symbol_change: true,
    details: true,
    hotlist: true,
    calendar: true,
    studies: ["STD;SMA"],
    container_id: "chart",
    show_popup_button: true,
    popup_width: "1000",
    popup_height: "650",
    support_host: "https://www.tradingview.com",
  });
}

////////////////////////////////////////////////////COMMUNITY////////////////////////////////////////////////////////
//community render user post
function renderUserInput(element) {
  // User input container
  const userInputContainer = document.createElement("div");
  userInputContainer.classList.add("user-input-container");

  // Profile icon
  const profileIcon = document.createElement("div");
  profileIcon.classList.add("profile-icon");
  userInputContainer.appendChild(profileIcon);

  // Input for the post
  const inputContainer = document.createElement("div");
  inputContainer.classList.add("input-container");

  const textInput = document.createElement("input");
  textInput.type = "text";
  textInput.placeholder =
    "How do you feel about the markets today? Share your ideas here!";
  textInput.classList.add("text-input");

  inputContainer.appendChild(textInput);
  userInputContainer.appendChild(inputContainer);

  // Sentiment buttons
  const sentimentContainer = document.createElement("div");
  sentimentContainer.classList.add("sentiment-container");

  const bullishButton = document.createElement("button");
  bullishButton.textContent = "Bullish";
  bullishButton.classList.add("bullish-button");

  const bearishButton = document.createElement("button");
  bearishButton.textContent = "Bearish";
  bearishButton.classList.add("bearish-button");

  const sentimentIcon = document.createElement("div");
  sentimentIcon.classList.add("sentiment-icon");

  sentimentContainer.appendChild(bullishButton);
  sentimentContainer.appendChild(bearishButton);
  sentimentContainer.appendChild(sentimentIcon);

  userInputContainer.appendChild(sentimentContainer);

  // Post button
  const postButton = document.createElement("button");
  postButton.textContent = "Post";
  postButton.classList.add("post-button");
  userInputContainer.appendChild(postButton);

  // Append everything to the main element
  element.appendChild(userInputContainer);
}

//community render other users posts
function renderPost(element, post) {
  // Main post container
  const postContainer = document.createElement("div");
  postContainer.classList.add("post-container");

  // User info and post header
  const postHeader = document.createElement("div");
  postHeader.classList.add("post-header");

  const userAvatar = document.createElement("div");
  userAvatar.classList.add("user-avatar");
  // Add avatar image as a background image or an img tag inside userAvatar

  const userName = document.createElement("div");
  userName.classList.add("user-name");
  userName.textContent = post.username; // Replace with actual data

  const userHandle = document.createElement("div");
  userHandle.classList.add("user-handle");
  userHandle.textContent = post.handle; // Replace with actual data

  const postAge = document.createElement("div");
  postAge.classList.add("post-age");
  postAge.textContent = post.time; // Replace with actual data

  postHeader.appendChild(userAvatar);
  postHeader.appendChild(userName);
  postHeader.appendChild(userHandle);
  postHeader.appendChild(postAge);

  // Post content
  const postContent = document.createElement("div");
  postContent.classList.add("post-content");
  postContent.textContent = post.content; // Replace with actual data

  // Post image
  const postImage = document.createElement("div");
  postImage.classList.add("post-image");
  // Add the post image as a background image or an img tag inside postImage

  // Interaction icons (likes, comments, etc.)
  const interactionIcons = document.createElement("div");
  interactionIcons.classList.add("interaction-icons");
  // Add buttons or icons for each interaction type

  // Social interaction stats (likes, comments, retweets)
  const socialStats = document.createElement("div");
  socialStats.classList.add("social-stats");
  socialStats.textContent = `${post.likes} Likes • ${post.comments} Comments • ${post.retweets} Retweets`; // Replace with actual data

  postContainer.appendChild(postHeader);
  postContainer.appendChild(postContent);
  postContainer.appendChild(postImage);
  postContainer.appendChild(interactionIcons);
  postContainer.appendChild(socialStats);

  element.appendChild(postContainer);
}
