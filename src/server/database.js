import PouchDB from "pouchdb";

/**
 * Initializes a PouchDB database with specified collections if they do not
 * exist.
 *
 * This function creates a new PouchDB instance with the given database name. It
 * attempts to retrieve collections for 'threads' and 'stocks'. If these
 * collections do not exist, it creates them with initial empty arrays.
 *
 * @param {string} dbname - The name of the database to initialize.
 */
const initdb = async (dbname) => {
  // Initialize the database if it doesn't exist
  const db = new PouchDB(dbname);

  // Get the words collection. If it doesn't exist, create it.
  try {
    const threads = await db.get("threads");
  } catch (e) {
    await db.put({ _id: "threads", threads: [] });
  }

  // Get the games collection. If it doesn't exist, create it.
  try {
    const stocks = await db.get("stocks");
  } catch (e) {
    await db.put({ _id: "stocks", games: [] });
  }

  // Close the database connection
  await db.close();
};

/**
 * Factory function to create a database instance using PouchDB for managing
 * threads and stocks.
 *
 * This function initializes a database with the given name if it does not
 * already exist. It provides methods to save threads,stocks and retrieve relevant search for threads, stocks. The database is re-instantiated with each method call to
 * ensure that the most recent data is used.
 *
 * @param {string} dbname - The name of the database to initialize and use.
 * @returns {object} An object containing methods to interact with the word and
 * game scores stored in the database.
 */
const Database = async (dbname) => {
  // Initialize the database
  await initdb(dbname);

  /**
   * Helper function to create a new PouchDB instance.
   * @returns {PouchDB} A new PouchDB instance connected to the specified
   * database.
   */
  const getDB = () => new PouchDB(dbname);

  const obj = {
    /**
     * Asynchronously saves a score for a specific word into the database. This
     * method handles database connection, data retrieval, data modification,
     * and error handling.
     *
     * @param {number} id - thread id
     * saved.
     * @param {string} title - title of the thread
     * saved.
     * @param {string} author - author of the thread
     * saved.
     * @param {number} date - thread posted time
     * @param {string} content - thread contents
     * @param {Array of object} comments - comments of other user has the form {author, date, content}
     * @returns {Promise<object>} A promise that resolves to an object
     *                            indicating the result of the operation. If
     *                            successful, returns an object with `{ status:
     *                            'success' }`. If an error occurs, returns an
     *                            object with `{ status: 'error', message:
     *                            'Failed to save thread', error: <error
     *                            message> }`.
     */
    saveThread: async (id, title, author,date,content,comments) => {
      try {
        const db = getDB();
        const data = await db.get("threads");
        data.threads.push({ id, title, author,date,content,comments });
        await db.put(data);
        await db.close();
        return { status: "success" };
      } catch (e) {
        return {
          status: "error",
          message: "Failed to save thread",
          error: e.message,
        };
      }
    },

    /**
     * Asynchronously retrieves the top 10 word scores from the database. This
     * function handles the process of connecting to the database, fetching the
     * words data, sorting the scores from highest to lowest, and returning the
     * top 10 entries.
     *
     * @returns {Promise<object>} A promise that resolves to an object
     *                            indicating the result of the operation. If
     *                            successful, returns an object with `{ status:
     *                            'success', data: Array }` where `data`
     *                            contains the top 10 scores as an array of
     *                            objects. If an error occurs, returns an object
     *                            with `{ status: 'error', message: 'Failed to
     *                            retrieve word scores', error: <error message>
     *                            }`.
     */
    threadRetrieve: async (keyword) => {
      // TASK #8: Implement top10WordScores
      try {
        const db = getDB();
        const data = await db.get("threads");
        // Sort the scores from highest to lowest
        const threadsRetrieved = data.threads.filter(thread => {
            return thread.title.includes(keyword) ||
                   thread.content.includes(keyword) ||
                   thread.author.includes(keyword) ||
                   thread.comments.some(comment => comment.content.includes(keyword) || comment.author.includes(keyword));
          });

        await db.close();
        // Return the top 10 word scores as an array of objects
        return {
          status: "success",
          data: threadsRetrieved,
        };
      } catch (e) {
        return {
          status: "error",
          message: "Failed to retrieve threads",
          error: error.message,
        };
      }
    },
  };

  return obj;
};

/**
 * Exports the Database factory function which sets up and manages a database
 * tailored for storing and retrieving game and word scores. This module
 * provides a set of operations including saving scores, fetching top scores,
 * and initializing necessary database structures.
 *
 * The exported Database function ensures each call initializes or connects to a
 * specific database instance identified by the given database name.
 *
 * @module Database
 * @function
 * @param {string} dbname - The name of the database for which the instance is
 * created and managed.
 * @returns {Object} An object containing methods for database operations like
 * saving scores and retrieving top scores.
 */
export default Database;
