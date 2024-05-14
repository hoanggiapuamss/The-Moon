# Project: The Moon Website

# Description

The Moon is a modern, interactive, server-side rendering website designed to provide users with financial insights, market data, and a community platform. This project's structure is built to support web standards and ensure easy navigation and maintenance.

# Tech Stack
- Frontend: HTML, JS, CSS, Tailwindcss
- Backend: Node.js, Express.js
- Database: PouchDB, LocalStorage

# Main Feature:
- View Stock List
- View Trading View by Clicking clicker or go to Trading View page
- Stock Community to exchange informations

Project Structure

# The project directory is organized as follows:

- In this project, we organized all the source code in src folder that contain client/milestone-02/main directory to run client side and /server folder to run server. the client side has the main file to run is ms2.html.

# Back-end Implementation Details:
- Most of backend implementions are in Community, where we have succesfully use GET, POST, DELETE CRUD method (PUT method we try to change the comments of user but it seems to be difficult for us without authentication, so we leave it to the future feature). 

- Firstly, we set up the database by creating a database.js file in /server folder. This file will contain operation function that we want to interact with database to send to client to render frontend. Useful methods are saveThread and deleteAllThreads helps in handling routers of POST and DELETE methods. This file try to import a class "Database" which contains all the helpful method and automatically initiate DB to do operations.

- Secondly, we set up the routers using Express.js by creating routers.js file in /server folder. This file will handle CRUD operation and maintaining the server is running well. For easier implementation, we import some useful package such as "path", "url", "express","fs","cors", and never forget to import Database from database.js to do CRUD operation. We also have to put some middlewarefunction to make the response and request format then easier, avoid promising issues, and set up folder static. Those useful package help the code to be more dynamic and make sure when server receive request from client type extension on browser including "js","html","css","text/plain" will not fail to be implemented. The action above is handling static file by get request from client, server reading file from local, and send file back to client to showcase the website. Those are handling file so I have to use "fs" package. Those action above are handling static file when server does not receive specified path but the file name, then we do GET operation from server to send back to client.

- Thirdly, after set up routers and handling static file, we handle some specific routes by Express.js like "/threadPost" and "/deleteAllThread". There are also some other pathname to handle which is "/threadRetrieve", "/modifyThread", and so many other pathnames we want to put but the frontend works seems very exshaustive and need more time so we put it on future features.

- Specifically on handling: "/threadPost" and "/deleteAllThread"

- "/threadPost": we try to do POST operation to post thread on community. Here is the flow: In the client side, when user click to button Post in community page, the button will triggering handling event in ms2.js file and do fetch with method: POST to server on port 3000 with specified request (with title and content input value in frontend, but author need to be hardcode for simplicity and without authentication). This fetch action request to server and the router file identify the pathname to handle which is "/threadPost". With specified request, the handle will call the function saveThread() of Database then save the new thread in the database in categories or id "threads". Save the result in pouchDB and check if the resut.ok then we send response to client the newly added thread. when the client receive the response which is the new thread, it will then save to LocalStorage and then my code will get "threads" form LocalStorage to test the database of frontend side. Also from client side, I also create community.js as function to handle LocalStorage to handle frontend database. Then I get the newly thread from LocalStorage and render the new thread to frontend by function renderThrea() from componentFE.js file. Now I have new thread posted on the client side.

- "/deleteAllThread": we try to do DELETE opertion to delete all thread on community. Here is the flow: In the client side, when user click to button Delete in community page, the button will triggering the handling event in ms2.hs file and do fetch with method: DELETE to server on port 3000 with no request. This fech action requet to server and router file identify the pathname to handle whichi is "/deleteAllThread". The handle of this pathname is doing DELETE operation by calling the function deleteAllThread() of Database to pop all threads in Database. After finish succesfully the DELETE operation, server will send response to client with a message "All threads deleted in the database" and notify that the client receive the response with status response.ok = true to do the next step. Then we will try to delete all the data have id "threads" in LocalStorage by function deleteAllThreads() from community.js (make sure now the database no longer store threads), then simply remove all thread in client side by innerHTML = "". Mow the community is beautifully remove all threads.

- The reason behind using databse at server and client back and forth is because to remain the state change after reload, and also ensure data stored correctly in database.

# Getting Started
git clone https://github.com/hoanggiapuamss/The-Moon
Navigate into the project directory:

# Run Project Server
npm start


