import { fetchStockData, stocks } from "./stock-data.js";

import {
  switchView,
  renderStockList,
  renderTV,
  renderThread,
  renderPost,
  renderThreadPost,
} from "./componentFE.js";
import { threads } from "./forumData.js";
import {
  updateThreadComments,
  saveThreadsToLocalStorage,
  getThreadsFromLocalStorage,
  initializeThreads,
  deleteAllThreads,
  saveThread,
} from "./community.js";

document.addEventListener("DOMContentLoaded", async () => {
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
  // fetchStockData(); //fetch Stock Data
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
  //   ];]
  fetchStockData();
  document
    .getElementById("USStocksLink")
    .addEventListener("click", async (event) => {
      event.preventDefault(); // Prevent the default anchor behavior
      renderStockList(usStocksView, stocks);
      switchView("USStocksView"); // Call the function to switch views
      //handle click at the ticker of stock list to render trading view
      setTimeout(() => {
        document.querySelectorAll(".clickable-ticker").forEach((ticker) => {
          ticker.addEventListener("click", (event) => {
            event.preventDefault();
            let getTicker =
              ticker.textContent;
            renderTV(getTicker);
            switchView("TradingView");
          });
        });
      }, 0);
    });

  //////////////////////////////////////////////Rebder Stock Lists//////////////////////////////////////////////////
  /////////////////////////////////////////////Trading View////////////////////////////////////////////////////////
  document.getElementById("TVLink").addEventListener("click", function (event) {
    event.preventDefault(); // Prevent the default anchor behavior
    let defaultTicker = "NVDA";
    renderTV(defaultTicker);
    switchView("TradingView");
  });
  ////////////////////////////////////////////////////COMMUNITY//////////////////////////////////////////////////////
  if (getThreadsFromLocalStorage() == null) {
    initializeThreads(threads);
  }
  document
    .getElementById("communityLink")
    .addEventListener("click", function (event) {
      event.preventDefault();
      renderPost(communityView);
      const currentThread = getThreadsFromLocalStorage();
      console.log(currentThread);
      console.log(threads);
      renderThread(currentThread);
      //after render thread, handle click any thread event
      const threadLinks = document.getElementsByClassName("thread-link");
      for (let link of threadLinks) {
        link.addEventListener("click", function (event) {
          event.preventDefault();
          // Find the thread data based on the clicked link
          const threadId = this.getAttribute("id"); // Get ID from href
          const thread = currentThread.find((t) => t.id == threadId);
          // Assuming you have an element where you want to render the thread post
          renderThreadPost(communityView, thread);
          // console.log(getThreadsFromLocalStorage());
        });
      }
      /////////////////////////////////////////////////CRUD OPERATION FOR COMMUNITY/////////////////////////////////////////////////
      // HANDLE ADD THREAD FROM USER_SPOT at post-thread button (CRUD)
      document
        .getElementById("post-thread")
        .addEventListener("click", async function (event) {
          event.preventDefault();

          const title = document.getElementById("title").value;
          const content = document.getElementById("content").value;

          const threadData = {
            id: Date.now(), // Mock ID
            title: title,
            author: "CurrentUser", // Replace with the actual username
            date: Date.now(),
            content: content,
            comments: [],
          };
          //`${URL}/threadPost?id=${threadData.id}&title=${threadData.title}&author=${threadData.author}&date=${threadData.date}&content=${threadData.content}&comments=${threadData.comments}`
          const URL = "http://localhost:3000";
          try {
            const response = await fetch(
              `${URL}/threadPost?id=${threadData.id}&title=${threadData.title}&author=${threadData.author}&date=${threadData.date}&content=${threadData.content}&comments=${threadData.comments}`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: JSON.stringify(threadData),
              }
            );
            const data = await response.json();

            if (response.ok) {
              console.log("Post oke");
              console.log(data);
              // threads.push(data);
              console.log(threads);
              // deleteAllThreads();
              // saveThreadsToLocalStorage(threads);
              saveThread(data);
              const threadsAfterPosted = getThreadsFromLocalStorage();
              console.log(threadsAfterPosted);
              document.querySelector("#threads").innerHTML = "";
              renderThread(threadsAfterPosted);
              const newthreadLinks =
                document.getElementsByClassName("thread-link");
              for (let link of newthreadLinks) {
                link.addEventListener("click", function (event) {
                  event.preventDefault();
                  // Find the thread data based on the clicked link
                  const threadId = this.getAttribute("id"); // Get ID from href
                  const thread = threadsAfterPosted.find(
                    (t) => t.id == threadId
                  );
                  // Assuming you have an element where you want to render the thread post
                  renderThreadPost(communityView, thread);
                  // console.log(getThreadsFromLocalStorage());
                  // HANDLE UPDATE COMMENTS OF A THREAD (CRUD)
                });
              }
            } else {
              console.error("Failed to post thread");
              console.log(error);
            }
          } catch (error) {
            console.error("Error:", error);
          }
        });

      // HANDLE DELETE THREAD FROM USER_SPOT at post-thread button (CRUD)
      document
        .getElementById("delete-threads")
        .addEventListener("click", async function (event) {
          event.preventDefault();
          console.log("Handling delete");
          const URL = "http://localhost:3000";
          try {
            const response = await fetch(`${URL}/deleteAllThread`, {
              method: "DELETE",
            });
            console.log(response);
            const data = await response.json();
            if (response.ok) {
              console.log("Delete oke");
              console.log(data);
              deleteAllThreads();
              console.log(getThreadsFromLocalStorage());
              document.querySelector("#threads").innerHTML = "";
            } else {
              console.error("Failed to delete thread");
              console.log(error);
            }
          } catch (error) {
            console.error("Error:", error);
          }
        });
      // HANDLE GET THREAD FROM USER_SPOT at post-thread button
      switchView("CommunityView");
    });
});
