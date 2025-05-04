import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface ClickSparkProps {
  colors: string[];
  children: React.ReactNode;
}

export const ClickSpark = ({ colors, children }: ClickSparkProps) => {
  const sparkRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sparkElement = sparkRef.current;
    if (!sparkElement) return;

    const handleClick = (e: MouseEvent) => {
      const rect = sparkElement.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      for (let i = 0; i < 5; i++) {
        const spark = document.createElement('div');
        spark.style.position = 'absolute';
        spark.style.width = '4px';
        spark.style.height = '4px';
        spark.style.borderRadius = '50%';
        spark.style.backgroundColor = colors[i % colors.length];
        spark.style.left = `${x}px`;
        spark.style.top = `${y}px`;
        sparkElement.appendChild(spark);

        gsap.to(spark, {
          x: (Math.random() - 0.5) * 100,
          y: (Math.random() - 0.5) * 100,
          opacity: 0,
          duration: 0.5,
          onComplete: () => {
            sparkElement.removeChild(spark);
          },
        });
      }
    };

    sparkElement.addEventListener('click', handleClick);
    return () => {
      sparkElement.removeEventListener('click', handleClick);
    };
  }, [colors]);

  return (
    <div ref={sparkRef} style={{ position: 'relative', display: 'inline-block' }}>
      {children}
    </div>
  );
};
