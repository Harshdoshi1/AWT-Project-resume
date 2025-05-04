import React, { useState, useRef, useEffect } from 'react';
import './Button.css';
import ClickSpark from './ClickSpark';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'accent';
}

export default function Button({ children, variant = 'primary', ...props }: ButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [sparks, setSparks] = useState<Array<{x: number, y: number, id: number}>>([]);
  
  const getVariantColor = () => {
    switch(variant) {
      case 'secondary': return '#4E9F3D';
      case 'accent': return '#B4BDFF';
      default: return '#191A19';
    }
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      // Create 5-8 sparks at random positions near the click
      const newSparks = Array.from({length: Math.floor(Math.random() * 4) + 5}, (_, i) => ({
        x,
        y,
        id: Date.now() + i
      }));
      
      setSparks([...sparks, ...newSparks]);
    }
    
    if (props.onClick) {
      props.onClick(e);
    }
  };

  return (
    <ClickSpark 
      sparkCount={variant === 'accent' ? 12 : 8}
      sparkSize={variant === 'accent' ? 5 : 4}
    >
      <button 
        ref={buttonRef}
        {...props} 
        onClick={handleClick}
        className={`relative overflow-hidden px-6 py-3 rounded-md font-medium transition-all ${props.className || ''}`}
        style={{
          backgroundColor: variant === 'accent' ? '#4E9F3D' : '#191A19',
          color: variant === 'accent' ? '#191A19' : '#D8E9A8',
          ...props.style
        }}
      >
        {children}
        {sparks.map(spark => (
          <span 
            key={spark.id}
            className="absolute w-1 h-1 rounded-full bg-white pointer-events-none"
            style={{
              left: `${spark.x}px`,
              top: `${spark.y}px`,
              transform: 'scale(0)',
              animation: 'sparkAnimation 0.6s forwards'
            }}
          />
        ))}
      </button>
    </ClickSpark>
  );
}
