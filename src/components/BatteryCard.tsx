import React from 'react';
import { Battery, Zap, Brain } from 'lucide-react';

interface BatteryCardProps {
  batteryLevel: number;
  aiPrediction: string;
  insight: string;
  isCharging?: boolean;
}

const BatteryCard: React.FC<BatteryCardProps> = ({ 
  batteryLevel, 
  aiPrediction, 
  insight, 
  isCharging = false 
}) => {
  const getBatteryColor = (level: number) => {
    if (level <= 15) return 'battery-red';
    if (level <= 30) return 'battery-orange';
    if (level <= 60) return 'battery-yellow';
    return 'battery-green';
  };

  const getBatteryIcon = (level: number) => {
    if (level <= 15) return '🔴';
    if (level <= 30) return '🟠';
    if (level <= 60) return '🟡';
    return '🟢';
  };

  const batteryColor = getBatteryColor(batteryLevel);
  const batteryIcon = getBatteryIcon(batteryLevel);

  return (
    <div className="gradient-card rounded-3xl p-6 shadow-elevation-2 animate-fade-in">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`relative ${isCharging ? 'animate-battery-pulse' : ''}`}>
            <Battery 
              size={48} 
              className={`${batteryColor} ${isCharging ? 'battery-glow' : ''}`}
              fill="currentColor"
            />
            {isCharging && (
              <Zap size={20} className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white" />
            )}
          </div>
          <div className="text-4xl">{batteryIcon}</div>
        </div>
        <div className="text-right">
          <div className={`text-5xl font-bold ${batteryColor} leading-none`}>
            {batteryLevel}%
          </div>
          {isCharging && (
            <div className="text-sm text-muted-foreground mt-1">Charging</div>
          )}
        </div>
      </div>
      
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Brain size={16} className="text-primary" />
          <span className="text-sm font-medium text-primary">AI Prediction:</span>
          <span className="text-sm text-foreground">{aiPrediction}</span>
        </div>
        
        <div className="bg-secondary/50 rounded-2xl p-3">
          <div className="flex items-start gap-2">
            <div className="text-accent text-sm">💡</div>
            <div>
              <div className="text-sm font-medium text-accent mb-1">Smart Insight</div>
              <div className="text-sm text-muted-foreground leading-relaxed">{insight}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BatteryCard;