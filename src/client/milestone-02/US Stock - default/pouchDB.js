
import PouchDB from "pouchdb";

const db1= new PouchDB("stock"); 
const db2 = new PouchDB("user") 

export async function saveCounter_stock(name, obj) {
    await db1.put({ _id: name, obj });
}

export async function saveCounter_user(name, obj) {
    await db2.put({ _id: name, obj });
}


  
  /**
   * Asynchronously modifies an existing counter in the database. The counter
   * document must include an `_id` property that matches the counter's name in
   * the database.
   *
   * @async
   * @param {Object} doc - The counter document to be updated. Must include `_id`
   * and `count` properties.
   * @returns {Promise<void>} - A promise that resolves when the counter has been
   * successfully modified.
   * @throws {Error} - Throws an error if the operation fails, e.g., the counter
   * does not exist or database issues.
   */
  export async function modifyCounter_stock(doc) {
    await db1.put(doc);
  }

  export async function modifyCounter_user(doc) {
    await db2.put(doc);
  }
  
  /**
   * Asynchronously retrieves a counter from the database by its name.
   *
   * @async
   * @param {string} name - The name of the counter to retrieve.
   * @returns {Promise<Object>} - A promise that resolves to the counter document.
   * @throws {Error} - Throws an error if the counter cannot be found or if there
   * is a database issue.
   */
  export async function loadCounter(name) {
    const counter = await db.get(name);
    return counter;
  }
  
  /**
   * Asynchronously removes a counter from the database by its name.
   *
   * @async
   * @param {string} name - The name of the counter to be removed.
   * @returns {Promise<void>} - A promise that resolves when the counter has been
   * successfully removed.
   * @throws {Error} - Throws an error if the counter cannot be removed, e.g., it
   * does not exist or due to database issues.
   */
  export async function removeCounter(name) {
    db.remove(name);
  }
  
  /**
   * Asynchronously retrieves all counters from the database.
   *
   * @async
   * @returns {Promise<Array<Object>>} - A promise that resolves to an array of
   * counter documents.
   * @throws {Error} - Throws an error if there is a problem accessing the
   * database.
   */
  export async function loadAllCounters() {
    const result = await db.allDocs({ include_docs: true });
    return result.rows.map((row) => row.doc);
  }
  