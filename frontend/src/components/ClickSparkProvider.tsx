import React, { useEffect } from 'react';
import ClickSpark from './ClickSpark';

// Theme colors from project memory
const themeColors = ["#191A19", "#4E9F3D", "#B4BDFF", "#D8E9A8"];

const ClickSparkProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  useEffect(() => {
    // Function to find all buttons after the component mounts and re-render them
    const applyClickSparkToExistingButtons = () => {
      // Select all buttons that don't have clickspark already applied
      const buttons = document.querySelectorAll('button:not([data-clickspark])');
      
      buttons.forEach(button => {
        // Mark the button to avoid re-applying the effect
        button.setAttribute('data-clickspark', 'true');
        
        button.addEventListener('click', (event) => {
          createSparkEffect(event as MouseEvent, button as HTMLElement);
        });
        
        // Ensure position is relative for absolute positioning of sparks
        if (window.getComputedStyle(button).position === 'static') {
          (button as HTMLElement).style.position = 'relative';
        }
        (button as HTMLElement).style.overflow = 'hidden';
      });
    };

    const createSparkEffect = (event: MouseEvent, button: HTMLElement) => {
      const rect = button.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      // Create multiple sparks
      for (let i = 0; i < 8; i++) {
        const spark = document.createElement('div');
        spark.style.position = 'absolute';
        spark.style.left = `${x}px`;
        spark.style.top = `${y}px`;
        spark.style.width = '4px';
        spark.style.height = '4px';
        spark.style.borderRadius = '50%';
        spark.style.backgroundColor = themeColors[Math.floor(Math.random() * themeColors.length)];
        spark.style.transform = 'scale(0)';
        spark.style.opacity = '1';
        spark.style.pointerEvents = 'none';
        
        // Random direction for each spark
        const angle = Math.random() * Math.PI * 2;
        const distance = 20 + Math.random() * 30;
        const translateX = Math.cos(angle) * distance;
        const translateY = Math.sin(angle) * distance;
        
        spark.style.transition = 'all 0.5s cubic-bezier(0.165, 0.84, 0.44, 1)';
        
        button.appendChild(spark);

        // Apply the animation
        requestAnimationFrame(() => {
          spark.style.transform = `translate(${translateX}px, ${translateY}px) scale(2)`;
          spark.style.opacity = '0';
        });

        // Remove the spark after animation
        setTimeout(() => {
          if (button.contains(spark)) {
            button.removeChild(spark);
          }
        }, 600);
      }
    };

    // Apply effect to buttons when component mounts
    applyClickSparkToExistingButtons();

    // Set up a mutation observer to watch for new buttons added to the DOM
    const observer = new MutationObserver((mutations) => {
      mutations.forEach(mutation => {
        if (mutation.type === 'childList' && mutation.addedNodes.length) {
          // Check if we need to apply the effect to newly added buttons
          setTimeout(applyClickSparkToExistingButtons, 100);
        }
      });
    });

    // Start observing the document with the configured parameters
    observer.observe(document.body, { childList: true, subtree: true });

    // Cleanup
    return () => {
      observer.disconnect();
      // Remove event listeners if component unmounts
      document.querySelectorAll('button[data-clickspark]').forEach(button => {
        button.removeAttribute('data-clickspark');
      });
    };
  }, []);

  return <>{children}</>;
};

export default ClickSparkProvider;
