import { fetchStockData, stocks } from "./stock-data.js";
import {switchView, renderStockList, renderTV, renderThread, renderPost, renderThreadPost} from "./componentFE.js";
import {threads} from "./forumData.js";
import {updateThreadComments, saveThreadsToLocalStorage, getThreadsFromLocalStorage, initializeThreads} from "../db/community.js";

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
  fetchStockData(); //fetch Stock Data
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
  if(!getThreadsFromLocalStorage()){
    initializeThreads(threads);
  }
  //threads filer
  threads.forEach((element)=>{
    if(!element.id){
      threads.pop(element);
    }
  })
  saveThreadsToLocalStorage(threads);

  document
    .getElementById("communityLink")
    .addEventListener("click", function (event) {
      event.preventDefault();
      renderPost(communityView);
      const currentThread = getThreadsFromLocalStorage();
      console.log(currentThread);
      renderThread(currentThread);
      //after render thread, handle click any thread event
      const threadLinks = document.getElementsByClassName('thread-link');
      for (let link of threadLinks) {
        link.addEventListener('click', function(event) {
          event.preventDefault();
          // Find the thread data based on the clicked link
          const threadId = this.getAttribute('id'); // Get ID from href
          const thread = currentThread.find(t => t.id == threadId);
          // Assuming you have an element where you want to render the thread post
          renderThreadPost(communityView,thread);
          // console.log(getThreadsFromLocalStorage());
        });
      }
      switchView("CommunityView");
    });
});
