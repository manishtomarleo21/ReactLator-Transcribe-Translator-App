import React, { useEffect } from 'react';
import '../index.css'; // Import the CSS for the stars

const StarryBackground = () => {
  useEffect(() => {
    // Generate stars on mount
    const numberOfStars = 200; // Change this for more or fewer stars
    const container = document.getElementById('starry-background');
    
    // Set fixed position with lower z-index to place stars behind content
    container.style.position = 'absolute';
    container.style.top = '0';
    container.style.left = '0';
    container.style.width = '100%';
    container.style.height = '100%';
    container.style.zIndex = '-1'; // Ensure stars are behind all content

    for (let i = 0; i < numberOfStars; i++) {
      const star = document.createElement('div');
      const size = Math.random() * 4 + 2; // Random size for each star
      const positionX = Math.random() * window.innerWidth;
      const positionY = Math.random() * window.innerHeight;
      const animationDuration = Math.random() * 20 + 10; // Random speed for animation

      star.classList.add('star');
      star.style.left = `${positionX}px`;
      star.style.top = `${positionY}px`;
      star.style.animationDuration = `${animationDuration}s`;
      star.style.animationDelay = `${Math.random() * 5}s`; // Random delay

      // Randomize star size (small, medium, large)
      if (size < 3) {
        star.classList.add('small');
      } else if (size < 5) {
        star.classList.add('medium');
      } else {
        star.classList.add('large');
      }

      container.appendChild(star);
    }
  }, []);

  return (
    <div id="starry-background">
      {/* Stars will be added here dynamically */}
    </div>
  );
};

export default StarryBackground;
