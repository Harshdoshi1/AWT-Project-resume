import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  sparkColor?: string
  sparkSize?: number
  sparkRadius?: number
  sparkCount?: number
  sparkDuration?: number
  disableSpark?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    className, 
    variant, 
    size, 
    asChild = false, 
    sparkColor = "#D8E9A8", 
    sparkSize = 6, 
    sparkRadius = 15, 
    sparkCount = 8, 
    sparkDuration = 400,
    disableSpark = false,
    onClick,
    ...props 
  }, ref) => {
    const Comp = asChild ? Slot : "button"
    const canvasRef = React.useRef<HTMLCanvasElement>(null);
    const sparksRef = React.useRef<Array<{x: number, y: number, angle: number, startTime: number}>>([]);
    const containerRef = React.useRef<HTMLDivElement>(null);
    const [isAnimating, setIsAnimating] = React.useState(false);

    React.useEffect(() => {
      if (!canvasRef.current || disableSpark) return;
      
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const container = containerRef.current;
      if (!container) return;
      
      // Update canvas size to match container
      const updateCanvasSize = () => {
        const rect = container.getBoundingClientRect();
        canvas.width = rect.width;
        canvas.height = rect.height;
      };
      
      updateCanvasSize();
      
      // Observe container size changes
      const resizeObserver = new ResizeObserver(() => {
        updateCanvasSize();
      });
      
      resizeObserver.observe(container);
      
      return () => {
        resizeObserver.disconnect();
      };
    }, [disableSpark]);

    React.useEffect(() => {
      if (!canvasRef.current || !isAnimating || disableSpark) return;
      
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      
      let animationFrameId: number;
      let lastTimestamp = 0;
      
      const draw = (timestamp: number) => {
        if (!lastTimestamp) lastTimestamp = timestamp;
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        sparksRef.current = sparksRef.current.filter(spark => {
          const elapsed = timestamp - spark.startTime;
          if (elapsed >= sparkDuration) return false;
          
          const progress = elapsed / sparkDuration;
          const eased = 1 - Math.pow(1 - progress, 3); // Ease out cubic
          
          const distance = eased * sparkRadius;
          const lineLength = sparkSize * (1 - eased);
          
          const x1 = spark.x + distance * Math.cos(spark.angle);
          const y1 = spark.y + distance * Math.sin(spark.angle);
          const x2 = spark.x + (distance + lineLength) * Math.cos(spark.angle);
          const y2 = spark.y + (distance + lineLength) * Math.sin(spark.angle);
          
          ctx.strokeStyle = sparkColor;
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(x1, y1);
          ctx.lineTo(x2, y2);
          ctx.stroke();
          
          return true;
        });
        
        if (sparksRef.current.length > 0) {
          animationFrameId = requestAnimationFrame(draw);
        } else {
          setIsAnimating(false);
        }
      };
      
      animationFrameId = requestAnimationFrame(draw);
      
      return () => {
        cancelAnimationFrame(animationFrameId);
      };
    }, [isAnimating, sparkColor, sparkSize, sparkRadius, sparkDuration, disableSpark]);

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (disableSpark) {
        onClick?.(e);
        return;
      }

      const container = containerRef.current;
      const canvas = canvasRef.current;
      
      if (container && canvas) {
        const rect = container.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const now = performance.now();
        const newSparks = Array.from({ length: sparkCount }, (_, i) => ({
          x,
          y,
          angle: (2 * Math.PI * i) / sparkCount,
          startTime: now,
        }));
        
        sparksRef.current = [...sparksRef.current, ...newSparks];
        setIsAnimating(true);
      }
      
      onClick?.(e);
    };

    if (disableSpark) {
      return (
        <Comp
          className={cn(buttonVariants({ variant, size, className }))}
          ref={ref}
          onClick={handleClick}
          {...props}
        />
      )
    }

    return (
      <div
        ref={containerRef}
        className="relative inline-block"
        style={{ cursor: 'pointer' }}
      >
        <canvas
          ref={canvasRef}
          className="absolute inset-0 pointer-events-none"
          style={{ zIndex: 10 }}
        />
        <Comp
          className={cn(buttonVariants({ variant, size, className }))}
          ref={ref}
          onClick={handleClick}
          {...props}
        />
      </div>
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
