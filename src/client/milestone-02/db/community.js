// ---- COMMUNITY FEATURE ---


// Initialize PouchDB
var db = new PouchDB('community');


// Load existing comments when the page loads
window.onload = function() {
    loadComments();
};


// Form submission handler
document.getElementById('comment-form').onsubmit = function(e) {
    e.preventDefault();
    var commentInput = document.getElementById('comment-input');
    var comment = commentInput.value;
    var commentObj = {
        _id: new Date().toISOString(),
        comment: comment
    };


    // Save the comment to PouchDB
    db.put(commentObj).then(function () {
        commentInput.value = ''; // clear input after saving
        displayComment(commentObj); // display the new comment
    }).catch(function (err) {
        console.error(err);
    });
};


// Load comments from PouchDB and display them
function loadComments() {
    db.allDocs({include_docs: true, descending: true}, function(err, doc) {
        doc.rows.forEach(function(row) {
            displayComment(row.doc);
        });
    });
}


// Function to display a comment
function displayComment(comment) {
    var commentsContainer = document.getElementById('comments-container');
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(comment.comment));
    commentsContainer.appendChild(div);
}
