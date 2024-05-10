import {
  updateThreadComments,
  saveThreadsToLocalStorage,
  getThreadsFromLocalStorage,
  initializeThreads,
} from "../db/community.js";

export function switchView(viewIdToShow) {
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
export function renderStockList(element, stocksData) {
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
              <th>Price (USD)</th>
              <th>change %</th>
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
    tbody.innerHTML = "";
  }

  // Add new data to the tbody
  stocksData.forEach((stock, i) => {
    console.log(stock.marketCap);
    const row = document.createElement("tr");
    row.innerHTML = `
            <td>${i + 1}</td>
            <td>${stock.name} <span class="clickable-ticker">${stock.ticker}</span></td>
            <td>${stock.price}</td>
            <td>${stock.change7d}</td>
            <td>${stock.marketCap}</td>
            <td>${stock.volume24h}</td>
          `;
    tbody.appendChild(row);
  });
}

//render trading view (render with symbol)
export function renderTV(ticker) {
  new TradingView.widget({
    autosize: true,
    symbol: `NASDAQ:${ticker}`,
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
export function renderPost(element) {
  const postHTML = `
  <div class="top-bar bg-blue-300 font-sans">
    <h1>The Moon Forum</h1>
  </div>

  <div id="user-spot" class="p-4">
  <h2 class="text-xl mb-4">Create a New Thread</h2>
  <div id="thread-form" class="space-y-4">
    <div>
      <label for="title" class="block text-sm font-medium text-gray-700">Title</label>
      <textarea type="text" id="title" name="title" class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm" required></textarea>
    </div>
    <div>
      <label for="content" class="block text-sm font-medium text-gray-700">Content</label>
      <textarea id="content" name="content" rows="4" class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm" required></textarea>
    </div>
    <button id="post-thread" class="bg-blue-500 text-white px-4 py-2 rounded-md">Submit</button>
  </div>
</div>

  <div class="main">
    <div id="threads" class="grid grid-cols-3">
    </div>
</div>
  `;
  element.innerHTML = "";
  element.innerHTML += postHTML;
}

function addComment(comment) {
  return `
    <div class="comment">
    <div class="top-comment">
        <p class="user">${comment.author}</p>
        <p class="comment-ts">${new Date(comment.date).toLocaleString()}</p>
    </div>
    <div class="comment-content">
        ${comment.content}
    </div>
    </div>
`;
}

export function renderThreadPost(element, thread) {
  const threadHTML = `
    <div class="top-bar">
        <h1>The Moon Forum</h1>
    </div>
    <div class="main>
        <div class="header>
            <h4 class="title">${thread.title}</h4>
            <div class="bottom">
                <p class="timestamp">${new Date(thread.date).toLocaleString()}</p>
                <p class="comment-count">${thread.comments.length} comments</p>
            </div>
        </div>
        <textarea></textarea>
        <button id="add-comment">add comment</button>
        <div class="comments">
            <div class="comment">
                <div class="top-comment">
                    <p class="user">4 ZAP</p>
                    <p class="comment-ts">04/25/2024</p>
                </div>
                <p class="comment-content">Comment text here</p>
            </div>
        </div>
    </div>
    `;

  element.innerHTML = "";
  element.innerHTML += threadHTML;

  //show comments
  var comments = document.querySelector(".comments");
  comments.innerHTML = "";
  console.log(thread.comments);
  for (let comment of thread.comments) {
    // element.insertAdjacentElement("beforeend", addComment(comment));
    comments.innerHTML += addComment(comment);
  }

  //add comment
  var btn = document.querySelector("#add-comment"); // Selects the first button element
  btn.addEventListener("click", function () {
    var txt = document.querySelector("textarea"); // Selects the first textarea element
    var newComment = {
      content: txt.value,
      date: Date.now(),
      author: "Aaron",
    };

    comments.innerHTML += addComment(newComment);
    txt.value = "";
    // Update the local storage
    updateThreadComments(thread.id, newComment);
  });
}

export function renderThread(threadData) {
  var container = document.querySelector("#threads");
  for (let thread of threadData) {
    var html = `
          <div class="row">
            <a id="${thread.id}" class="thread-link">
              <h4 class="title italic hover:not-italic">${thread.title}</h4>
            </a>
            <div class="bottom">
              <p class="timestamp">${new Date(thread.date).toLocaleString()}</p>
              <p class="comment-count">${thread.comments.length} comments</p>
            </div>
          </div>
        `;
    container.insertAdjacentHTML("beforeend", html);
  }
}
