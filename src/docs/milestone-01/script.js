function highlightKeyword() {
    const keyword = document.getElementById('keyword').value;
    if (!keyword) {
      alert('Please enter a keyword to highlight.');
      return;
    }
  
    const content = document.body.innerHTML;
    const regExp = new RegExp(`(${keyword})`, 'gi');
    const replacement = `<span class="highlight">$1</span>`;
  
    // Replace and ignore any existing <span> tags to avoid nested highlights
    const cleanContent = content.replace(/<span class="highlight">|<\/span>/g, '');
    const highlightedContent = cleanContent.replace(regExp, replacement);
  
    document.body.innerHTML = highlightedContent;
  }
let buttonHighlight = document.getElementById("event-highlights");
buttonHighlight.addEventListener("click", highlightKeyword);