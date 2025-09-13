import React from 'react';
import { LucideIcon } from 'lucide-react';

interface ActionButtonProps {
  title: string;
  description?: string;
  icon: LucideIcon;
  variant?: 'primary' | 'secondary';
  onClick?: () => void;
  disabled?: boolean;
}

const ActionButton: React.FC<ActionButtonProps> = ({
  title,
  description,
  icon: Icon,
  variant = 'secondary',
  onClick,
  disabled = false
}) => {
  const baseClasses = "w-full p-4 rounded-3xl font-medium transition-all duration-200 ease-out shadow-elevation-1 hover:shadow-elevation-2 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variantClasses = {
    primary: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-glow",
    secondary: "bg-card text-card-foreground hover:bg-card/80 border border-border"
  };

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${disabled ? '' : 'hover:scale-[1.02]'}`}
      onClick={onClick}
      disabled={disabled}
    >
      <div className="flex items-center gap-4">
        <div className={`p-2 rounded-xl ${variant === 'primary' ? 'bg-white/20' : 'bg-primary/20'}`}>
          <Icon size={24} className={variant === 'primary' ? 'text-white' : 'text-primary'} />
        </div>
        <div className="flex-1 text-left">
          <div className="text-base font-semibold">{title}</div>
          {description && (
            <div className="text-sm text-muted-foreground mt-1">{description}</div>
          )}
        </div>
      </div>
    </button>
  );
};

export default ActionButton;