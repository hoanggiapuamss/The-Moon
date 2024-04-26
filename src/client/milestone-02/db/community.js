/**
 * Updates the comments for a specific thread by its ID.
 * @param {number} threadId - The ID of the thread to update.
 * @param {Object} newComment - The new comment object to be added.
 */
export function updateThreadComments(threadId, newComment) {
  // Retrieve the existing threads from local storage
  console.log("I am currently in the update Thread function");
  let threads = JSON.parse(localStorage.getItem("threads")) || [];
  console.log(threads);

  if (threads) {
    threads.forEach((element) => {
      if (element.id === threadId) {
        element.comments.push(newComment);
      }
    });
  }
  console.log(threads);

  // Save the updated threads back to local storage
  localStorage.setItem("threads", JSON.stringify(threads));
}

//   /**
//    * Example usage of updateThreadComments function.
//    */
//   updateThreadComments(1, {
//     author: "New User",
//     date: Date.now(),
//     content: "This is a new comment"
//   });

export function saveThreadsToLocalStorage(threads) {
  localStorage.setItem("threads", JSON.stringify(threads));
}

export function getThreadsFromLocalStorage() {
  const storedThreads = localStorage.getItem("threads");
  return storedThreads ? JSON.parse(storedThreads) : null;
}

export function initializeThreads(threads) {
  if (!getThreadsFromLocalStorage()) {
    saveThreadsToLocalStorage(threads);
  }
}

/**
 * Deletes a thread by its ID from the local storage.
 * @param {number} threadId - The ID of the thread to delete.
 */
export function deleteThreadById(threadId) {
  // Retrieve the existing threads from local storage
  let threads = JSON.parse(localStorage.getItem("threads")) || [];

  // Filter out the thread with the given ID
  threads = threads.filter((thread) => thread.id !== threadId);

  // Update the local storage with the new threads array
  localStorage.setItem("threads", JSON.stringify(threads));
}

/**
 * Deletes all threads from the local storage.
 */
export function deleteAllThreads() {
    // Remove the 'threads' item from local storage
    localStorage.removeItem('threads');
  }
