import React, { forwardRef } from 'react';

export const UnderlineButton = forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>((props, ref) => {
  return (
    <button
      ref={ref}
      className="relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-current after:transition-all after:duration-300 hover:after:w-full"
      {...props}
    />
  );
});

UnderlineButton.displayName = 'UnderlineButton';