import React from 'react';
import { Loader2 } from 'lucide-react';

interface UIProps {
  children?: React.ReactNode;
  className?: string;
  onClick?: () => void;
  key?: React.Key;
}

export const ClayCard = ({ children, className = '', onClick }: UIProps) => (
  <div 
    onClick={onClick}
    className={`bg-white border-3 border-neo-black shadow-neo p-6 transition-all hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-neo-lg ${className}`}
  >
    {children}
  </div>
);

export const ClayButton = ({ children, onClick, variant = 'primary', className = '', disabled = false, isLoading = false }: UIProps & { variant?: 'primary' | 'secondary' | 'accent' | 'danger', disabled?: boolean, isLoading?: boolean }) => {
  
  const variants = {
    primary: "bg-neo-blue text-white hover:bg-blue-600",
    secondary: "bg-white text-neo-black hover:bg-gray-100",
    accent: "bg-neo-yellow text-neo-black hover:bg-yellow-400",
    danger: "bg-neo-pink text-neo-black hover:bg-pink-400"
  };

  return (
    <button 
      onClick={onClick} 
      disabled={disabled || isLoading}
      className={`
        relative px-6 py-3 font-bold uppercase tracking-wider border-3 border-neo-black shadow-neo 
        transition-all active:shadow-neo-pressed active:translate-x-[4px] active:translate-y-[4px]
        flex items-center justify-center gap-2
        ${variants[variant]} 
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''} 
        ${className}
      `}
    >
      {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
      {children}
    </button>
  );
};

export const GoldHeading = ({ children, size = 'xl', className = '' }: UIProps & { size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' }) => {
  const sizes = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
    xl: 'text-4xl',
    '2xl': 'text-6xl'
  };

  return (
    <h1 className={`font-display font-black text-neo-black uppercase leading-tight ${sizes[size]} ${className}`}>
      {children}
    </h1>
  );
};

export const Badge = ({ children, color = 'yellow' }: { children?: React.ReactNode, color?: 'yellow' | 'blue' | 'pink' }) => {
  const colors = {
    yellow: 'bg-neo-yellow text-black',
    blue: 'bg-neo-blue text-white',
    pink: 'bg-neo-pink text-black'
  };
  return (
    <span className={`px-3 py-1 text-xs font-bold border-2 border-neo-black shadow-neo-sm uppercase tracking-widest ${colors[color]}`}>
      {children}
    </span>
  );
};

export const Input = (props: React.InputHTMLAttributes<HTMLInputElement>) => (
  <input 
    {...props}
    className="w-full bg-white border-3 border-neo-black p-3 font-mono text-neo-black placeholder-gray-500 focus:outline-none focus:shadow-neo transition-all"
  />
);

export const ScratchPad = ({ onReveal }: { onReveal: (won: boolean) => void }) => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const [isRevealed, setIsRevealed] = React.useState(false);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Neo Brutalist scratch cover
    ctx.fillStyle = '#C0C0C0'; // Silver
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Pattern
    ctx.fillStyle = '#A0A0A0';
    for(let i=0; i<100; i++) {
        ctx.fillRect(Math.random() * canvas.width, Math.random() * canvas.height, 5, 5);
    }
    
    // Text
    ctx.fillStyle = '#000000';
    ctx.font = '700 24px Archivo Black';
    ctx.fillText("SCRATCH ME", 60, 85);

    let isDrawing = false;

    const getPos = (e: MouseEvent | TouchEvent) => {
        const rect = canvas.getBoundingClientRect();
        let clientX, clientY;
        if ('touches' in e) {
            clientX = e.touches[0].clientX;
            clientY = e.touches[0].clientY;
        } else {
            clientX = (e as MouseEvent).clientX;
            clientY = (e as MouseEvent).clientY;
        }
        return {
            x: clientX - rect.left,
            y: clientY - rect.top
        };
    };

    const scratch = (e: MouseEvent | TouchEvent) => {
      if (!isDrawing) return;
      e.preventDefault();
      const pos = getPos(e);
      ctx.globalCompositeOperation = 'destination-out';
      ctx.beginPath();
      ctx.arc(pos.x, pos.y, 20, 0, Math.PI * 2);
      ctx.fill();

      // Check percentage cleared
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const pixels = imageData.data;
      let clearCount = 0;
      for (let i = 3; i < pixels.length; i += 4) {
        if (pixels[i] === 0) clearCount++;
      }
      
      if (clearCount / (pixels.length / 4) > 0.4 && !isRevealed) {
        setIsRevealed(true);
        onReveal(Math.random() > 0.5); // Random win/loss for demo
      }
    };

    const start = () => isDrawing = true;
    const end = () => isDrawing = false;

    canvas.addEventListener('mousedown', start);
    canvas.addEventListener('mousemove', scratch);
    canvas.addEventListener('mouseup', end);
    canvas.addEventListener('touchstart', start);
    canvas.addEventListener('touchmove', scratch);
    canvas.addEventListener('touchend', end);

    return () => {
        canvas.removeEventListener('mousedown', start);
        canvas.removeEventListener('mousemove', scratch);
        canvas.removeEventListener('mouseup', end);
        canvas.removeEventListener('touchstart', start);
        canvas.removeEventListener('touchmove', scratch);
        canvas.removeEventListener('touchend', end);
    };
  }, [isRevealed, onReveal]);

  return (
    <div className="relative w-[300px] h-[150px] mx-auto overflow-hidden border-3 border-neo-black shadow-neo bg-white">
       <div className="absolute inset-0 flex items-center justify-center bg-neo-yellow text-neo-black font-display text-2xl uppercase">
           {isRevealed ? "YOU WON!" : "NO LUCK"}
       </div>
       <canvas 
        ref={canvasRef} 
        width={300} 
        height={150} 
        className={`absolute inset-0 cursor-pointer transition-opacity duration-1000 ${isRevealed ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
       />
    </div>
  );
};