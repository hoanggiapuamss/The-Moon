function highlightKeyword() {
  const keyword = document.querySelector('#keyword').value.trim();
  if (!keyword) {
      alert('Please enter a keyword to highlight.');
      return;
  }

  // Function to safely wrap text matches in a span without affecting HTML tags
  function wrapMatchesInSpan(textNode, keyword) {
      const span = document.createElement('span');
      span.className = 'highlight';
      const match = textNode.data.match(new RegExp(keyword, 'i')); // 'i' for case-insensitive
      if (match) {
          const highlightedText = document.createTextNode(match[0]);
          span.appendChild(highlightedText);

          const afterMatch = textNode.data.substring(match.index + match[0].length);
          textNode.data = textNode.data.substring(0, match.index);

          if (textNode.parentNode) {
              textNode.parentNode.insertBefore(span, textNode.nextSibling);
              if (afterMatch.length > 0) {
                  const afterTextNode = document.createTextNode(afterMatch);
                  textNode.parentNode.insertBefore(afterTextNode, span.nextSibling);
                  return afterTextNode; // Return the node to continue the search
              }
          }
      }
      return null; // No more matches in this node
  }

  // Recursive function to search text nodes and highlight matches
  function searchAndHighlight(node, keyword) {
      if (node.nodeType === 3) { // Text node
          while (node && node.data && node.data.toLowerCase().includes(keyword.toLowerCase())) {
              node = wrapMatchesInSpan(node, keyword);
          }
      } else if (node.nodeType === 1 && !['SCRIPT', 'STYLE', 'SPAN'].includes(node.tagName)) { // Element node, but skip certain tags
          Array.from(node.childNodes).forEach(child => searchAndHighlight(child, keyword));
      }
  }

  // Removing existing highlights of the same keyword
  document.querySelectorAll('span.highlight').forEach(span => {
      if (span.textContent.toLowerCase() === keyword.toLowerCase()) {
          const parent = span.parentNode;
          if (parent) {
              parent.replaceChild(document.createTextNode(span.textContent), span);
              parent.normalize(); // Merges adjacent text nodes
          }
      }
  });

  // Apply highlighting
  searchAndHighlight(document.body, keyword);
}

let buttonHighlight = document.querySelector("#event-highlights");
buttonHighlight.addEventListener("click", highlightKeyword);
