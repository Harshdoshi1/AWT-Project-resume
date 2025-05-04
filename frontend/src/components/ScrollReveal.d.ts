declare module 'components/ScrollReveal' {
  import { ReactNode } from 'react';
  interface ScrollRevealProps {
    children: ReactNode;
    scrollContainerRef?: React.RefObject<HTMLElement>;
    enableBlur?: boolean;
    baseOpacity?: number;
    baseRotation?: number;
    blurStrength?: number;
    containerClassName?: string;
    textClassName?: string;
    rotationEnd?: string;
    wordAnimationEnd?: string;
  }
  const ScrollReveal: (props: ScrollRevealProps) => JSX.Element;
  export default ScrollReveal;
}
