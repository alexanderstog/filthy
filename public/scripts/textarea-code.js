document.getElementById('master-code-input').addEventListener('keydown', function(e) {
    if (e.key == 'Tab') {
      e.preventDefault();
      var start = this.selectionStart;
      var end = this.selectionEnd;
  
      // set textarea value to: text before caret + tab + text after caret
      this.value = this.value.substring(0, start) +
        "\t" + this.value.substring(end);
  
      // put caret at right position again
      this.selectionStart =
        this.selectionEnd = start + 1;
    }
  });

  document.addEventListener('DOMContentLoaded', function() {
    const textarea = document.getElementById('master-code-input');

    // Function to auto-resize the textarea
    function autoResize() {
        textarea.style.height = 'auto'; // Reset the height to auto to calculate the correct scrollHeight
        textarea.style.height = Math.max(textarea.scrollHeight, 800) + 'px'; // Set height to scrollHeight or 800px, whichever is greater
    }

    // Initialize the auto-resize on page load
    autoResize();

    // Add an event listener to adjust the textarea height on input
    textarea.addEventListener('input', autoResize);
});


// poo emoji animation
document.getElementById('master-code-input').addEventListener('input', () => {
    const emojiContainer = document.querySelector('.emoji-container');
    const emoji = document.createElement('div');
    emoji.className = 'emoji';
    emoji.textContent = '💩';

    // Set a random horizontal position for the emoji
    emoji.style.left = Math.random() * 100 + 'vw';

    // Append the emoji to the container
    emojiContainer.appendChild(emoji);

    // Remove the emoji after the animation ends to prevent memory leaks
    emoji.addEventListener('animationend', () => {
        emojiContainer.removeChild(emoji);
    });
});
