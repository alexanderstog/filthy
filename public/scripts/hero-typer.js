const typingText = document.getElementById('typing-text');
        const saveButton = document.getElementById('save-button');

        // Function to reset and restart the animation
        function resetAnimation() {
            typingText.style.width = '0'; // Reset the typing container width
            typingText.style.animation = 'none'; // Stop the current animation
            saveButton.classList.remove('clicked'); // Remove the clicked class
            saveButton.textContent = "Save";

            // Restart the animation after a short delay to ensure it's properly reset
            setTimeout(() => {
                typingText.style.animation = ''; // Reset animation to default
                void typingText.offsetWidth; // Trigger a reflow to ensure the animation restarts
                typingText.style.animation = 'typing 4s steps(40, end) forwards, blink-caret 0.75s step-end infinite';
            }, 100); // A short delay to allow the reset to take effect
        }

        // After typing animation ends, allow the animation to reset
        typingText.addEventListener('animationend', () => {
            saveButton.click();
            saveButton.textContent = "Saved ✅";
            // Restart the animation after a short pause
            setTimeout(resetAnimation, 3000); // Adjust timing to match your animation duration
        });

        // Add a click event listener to add a class to the button when clicked
        saveButton.addEventListener('click', () => {
            console.log("save button clicked");
            saveButton.classList.add('clicked');
            console.log('Save button clicked!'); // Trigger any other action here
        });

        // Trigger the animation initially
        resetAnimation();