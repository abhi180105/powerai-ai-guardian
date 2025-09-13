import React from 'react';
import { Shield, Settings, User } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <div className="flex items-center justify-between p-6 pb-2">
      <div>
        <h1 className="text-display text-foreground font-bold tracking-tight">
          Power<span className="text-primary">AI</span>
        </h1>
        <p className="text-body text-muted-foreground mt-1">
          Your intelligent battery guardian
        </p>
      </div>
      
      <div className="flex items-center gap-3">
        <button className="p-2 rounded-xl bg-secondary/50 hover:bg-secondary/80 transition-colors duration-200">
          <Settings size={20} className="text-muted-foreground" />
        </button>
        <button className="p-2 rounded-xl bg-secondary/50 hover:bg-secondary/80 transition-colors duration-200">
          <User size={20} className="text-muted-foreground" />
        </button>
      </div>
    </div>
  );
};

export default Header;