import express from 'express';
import cors from 'cors';
import Database from './database.js';

const app = express();
const port = 3000;

// Use CORS middleware
app.use(cors());

// Middleware to parse JSON bodies
app.use(express.json());

// POST route to create a new thread
app.post('/threadPost', async (req, res) => {
  const threadData = req.body;

  // Create a new database instance.
  const database =  await Database("TheMoon");

  try {
    const saveResult = await database.saveThread(
      threadData.id,
      threadData.title,
      threadData.author,
      threadData.date,
      threadData.content,
      threadData.comments
    );
    if (saveResult.status === "success") {
      res.status(200).json(threadData);
    } else {
      res.status(404).json({ message: saveResult.message });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET route to retrieve threads based on a keyword
app.get('/threadRetrieve', async (req, res) => {
  const keyword = req.query.keyword;

  // Create a new database instance.
  const database = await Database("TheMoon");

  try {
    const threadReceived = await database.threadRetrieve(keyword);
    if (threadReceived.status === "success") {
      res.status(200).json(threadReceived.data);
    } else {
      res.status(404).json({ message: threadReceived.message });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE route to delete a thread by ID
app.delete('/deleteThread', async (req, res) => {
  const threadId = parseInt(req.query.id);

  // Create a new database instance.
  const database = await Database("TheMoon");

  try {
    const deleteResult = await database.deleteThread(threadId);
    if (deleteResult.status === "success") {
      res.status(200).end();
    } else {
      res.status(404).json({ message: deleteResult.message });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT route to modify an existing thread
app.put('/modifyThread', async (req, res) => {
  const threadData = req.body;

  // Create a new database instance.
  const database = await Database("TheMoon");

  try {
    const modifyResult = await database.modifyThread(
      threadData.id,
      threadData.title,
      threadData.author,
      threadData.date,
      threadData.content,
      threadData.comments
    );
    if (modifyResult.status === "success") {
      res.status(200).end();
    } else {
      res.status(404).json({ message: modifyResult.message });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Serve static files from the 'client' directory

app.use(express.static("src/client/milestone-02/main/ms2.html"));

// Start the server on the specified port
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
