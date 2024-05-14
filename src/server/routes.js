import express, { response } from "express";
import PouchDB from "pouchdb";
import cors from "cors";
import Database from "./database.js";
import path from "path";
import { fileURLToPath } from "url";
import * as url from "url";
import { dirname } from "path";
import { promises as fs } from "fs";
// import {
//   updateThreadComments,
//   saveThreadsToLocalStorage,
//   getThreadsFromLocalStorage,
//   initializeThreads,
// } from "../client/milestone-02/db/community.js";

const app = express();
const port = 3000;

// Get the current directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Use CORS middleware
app.use(cors());

// Middleware to parse JSON bodies
app.use(express.json());

// Serve static files from the 'client' directory
app.use(express.static("src/client/milestone-02/main"));
// POST route to create a new thread
app.route("/threadPost").post(async (req, res) => {
  const threadData = req.body;
  console.log(threadData);

  // Create a new database instance.
  const database = await Database("TheMoon");

  try {
    const saveResult = await database.saveThread(
      threadData.id,
      threadData.title,
      threadData.author,
      threadData.date,
      threadData.content,
      threadData.comments
    );
    const db = new PouchDB("TheMoon");
    console.log("database after post thread");
    console.log(await db.get("threads"));
    const postedData = await database.getThread(threadData.id);
    if (saveResult.status === "success") {
      if(postedData.status === "success"){
        res.status(200).json(postedData.data);
      }
    } else {
      res.status(404).json({ message: saveResult.message });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE route to delete a thread by ID
app.route("/deleteAllThread").delete(async (req, res) => {
  // Create a new database instance.
  const database = await Database("TheMoon");
  try {
    const deleteResult = await database.deleteAllThread();
    if (deleteResult.status === "success") {
      const db = new PouchDB("TheMoon");
      console.log("database after delete all threads");
      console.log(await db.get("threads"));
      res.status(200).json({message: "All threads deleted in the database"});
    } else {
      res.status(404).json({ message: deleteResult.message });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// app.route("*").all(async (request, response) => {
//   response.sendFile(path.resolve('src/client/milestone-02/main/ms2.html'));
// });
// A general purpose route to serve any static file with the correct content type
app.route("*").all( async (req, res) => {
  console.log(__dirname);
  const file = req.path === "/" ? "ms2.html" : req.path;
  console.log(file);
  const filePath = path.join(path.dirname(url.fileURLToPath(import.meta.url)),"..", "client", "milestone-02", "main", file);
  console.log(filePath);
  // console.log(req)
  try {
    const data = await fs.readFile(filePath, { encoding: "utf8" });
    const ext = path.extname(req.path).toLowerCase();
    console.log(ext);

    switch (ext) {
      case "":
      case "/":
        res.type('html').send(data);
        break;
      case ".html":
        res.type('html').write(data);
        break;
      case ".css":
        res.type('css').sendFile(data);
        break;
      case ".js":
        res.type('javascript').sendFile(data);
        break;
      case ".json":
        res.type('json').sendFile(data);
        break;
      default:
        res.type('text/plain').send(data);
        break;
    }
  } catch (error) {
    res.status(404).send("Not found");
  }
});

// Start the server on the specified port
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
