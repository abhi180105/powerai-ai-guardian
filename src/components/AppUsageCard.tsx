import React from 'react';
import { Smartphone, TrendingUp } from 'lucide-react';

interface AppUsageData {
  name: string;
  percentage: number;
  icon: string;
  batteryUsage: number;
}

interface AppUsageCardProps {
  apps: AppUsageData[];
}

const AppUsageCard: React.FC<AppUsageCardProps> = ({ apps }) => {
  return (
    <div className="gradient-card rounded-3xl p-6 shadow-elevation-1 animate-fade-in">
      <div className="flex items-center gap-3 mb-4">
        <div className="bg-primary/20 p-2 rounded-xl">
          <TrendingUp size={20} className="text-primary" />
        </div>
        <div>
          <h3 className="text-title text-foreground">High Usage Apps</h3>
          <p className="text-caption">Last hour analysis</p>
        </div>
      </div>

      <div className="space-y-3">
        {apps.map((app, index) => (
          <div 
            key={app.name} 
            className="flex items-center justify-between p-3 bg-secondary/30 rounded-2xl hover:bg-secondary/50 transition-colors duration-200"
          >
            <div className="flex items-center gap-3">
              <div className="text-2xl">{app.icon}</div>
              <div>
                <div className="text-sm font-medium text-foreground">{app.name}</div>
                <div className="text-xs text-muted-foreground">
                  {app.batteryUsage}% battery usage
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm font-semibold text-primary">{app.percentage}%</div>
              <div className="w-16 h-1.5 bg-secondary rounded-full mt-1">
                <div 
                  className="h-full bg-primary rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${app.percentage}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 p-3 bg-primary/10 rounded-2xl border border-primary/20">
        <div className="flex items-center gap-2">
          <Smartphone size={16} className="text-primary" />
          <span className="text-sm text-primary font-medium">
            Optimize these apps to extend battery life
          </span>
        </div>
      </div>
    </div>
  );
};

export default AppUsageCard;