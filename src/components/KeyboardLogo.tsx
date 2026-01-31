interface KeyboardLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const KeyboardLogo = ({ size = 'md', className = '' }: KeyboardLogoProps) => {
  const sizeClasses = {
    sm: 'text-sm px-2 py-1',
    md: 'text-base px-3 py-2', 
    lg: 'text-lg px-4 py-3',
    xl: 'text-2xl px-6 py-4'
  };

  const spacing = {
    sm: 'space-x-1',
    md: 'space-x-2',
    lg: 'space-x-3', 
    xl: 'space-x-4'
  };

  return (
    <div className={`flex items-center ${spacing[size]} ${className}`}>
      <div className={`keyboard-key font-mono font-bold ${sizeClasses[size]} animate-pulse-glow`}>
        Ctrl
      </div>
      <div className={`keyboard-key font-mono font-bold ${sizeClasses[size]} animate-pulse-glow`} 
           style={{ animationDelay: '0.2s' }}>
        Alt
      </div>
      <div className={`keyboard-key font-mono font-bold ${sizeClasses[size]} animate-pulse-glow`}
           style={{ animationDelay: '0.4s' }}>
        Crew
      </div>
    </div>
  );
};

export default KeyboardLogo;