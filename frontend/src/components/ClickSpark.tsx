import React, { forwardRef, useRef, useEffect, useState } from 'react';

type ClickSparkProps = {
  colors?: string[];
  sparkCount?: number;
  sparkSize?: number;
  animationDuration?: number;
  children: React.ReactNode;
};

const defaultColors = ["#191A19", "#4E9F3D", "#B4BDFF", "#D8E9A8"];

const ClickSpark = forwardRef<HTMLButtonElement, ClickSparkProps>(({ 
  colors = defaultColors, 
  sparkCount = 8,
  sparkSize = 4,
  animationDuration = 500,
  children 
}, ref) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [isHovering, setIsHovering] = useState(false);

  const createSpark = (event: MouseEvent) => {
    const button = buttonRef.current;
    if (!button) return;

    const rect = button.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    for (let i = 0; i < sparkCount; i++) {
      const spark = document.createElement('div');
      spark.style.position = 'absolute';
      spark.style.left = `${x}px`;
      spark.style.top = `${y}px`;
      spark.style.width = `${sparkSize}px`;
      spark.style.height = `${sparkSize}px`;
      spark.style.borderRadius = '50%';
      spark.style.background = 'radial-gradient(#B4BDFF, #4E9F3D)';
      spark.style.transform = 'scale(0)';
      spark.style.transition = `all ${animationDuration}ms cubic-bezier(0.165, 0.84, 0.44, 1)`;
      
      const angle = Math.random() * Math.PI * 2;
      const distance = 20 + Math.random() * 30;
      const translateX = Math.cos(angle) * distance;
      const translateY = Math.sin(angle) * distance;
      
      button.appendChild(spark);

      requestAnimationFrame(() => {
        spark.style.transform = `translate(${translateX}px, ${translateY}px) scale(2)`;
        spark.style.opacity = '0';
      });

      setTimeout(() => {
        if (button.contains(spark)) {
          button.removeChild(spark);
        }
      }, animationDuration);
    }
  };

  useEffect(() => {
    const button = buttonRef.current;
    if (!button) return;

    const handleClick = (event: MouseEvent) => createSpark(event);
    
    button.addEventListener('click', handleClick);
    button.addEventListener('mouseenter', () => setIsHovering(true));
    button.addEventListener('mouseleave', () => setIsHovering(false));
    button.style.position = 'relative';
    button.style.overflow = 'hidden';
    button.style.transition = 'transform 0.2s ease';

    return () => {
      button.removeEventListener('click', handleClick);
      button.removeEventListener('mouseenter', () => setIsHovering(true));
      button.removeEventListener('mouseleave', () => setIsHovering(false));
    };
  }, [sparkCount, sparkSize, animationDuration]);

  return React.cloneElement(children as React.ReactElement, { 
    ref: (node) => {
      buttonRef.current = node;
      if (typeof ref === 'function') {
        ref(node);
      } else if (ref) {
        ref.current = node;
      }
    },
    style: {
      ...(children as React.ReactElement).props.style,
      transform: isHovering ? 'scale(1.02)' : 'scale(1)'
    }
  });
});

ClickSpark.displayName = 'ClickSpark';

export default ClickSpark;
