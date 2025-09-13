import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { 
  Zap, 
  MapPin, 
  MessageSquare, 
  Shield, 
  Phone,
  Navigation,
  Bot,
  AlertTriangle,
  Users
} from 'lucide-react';

import Header from '../components/Header';
import BatteryCard from '../components/BatteryCard';
import AppUsageCard from '../components/AppUsageCard';
import ActionButton from '../components/ActionButton';

// Mock data for demonstration
const mockApps = [
  { name: 'Instagram', percentage: 78, icon: '📷', batteryUsage: 23 },
  { name: 'Chrome', percentage: 65, icon: '🌐', batteryUsage: 18 },
  { name: 'Spotify', percentage: 52, icon: '🎵', batteryUsage: 15 },
  { name: 'WhatsApp', percentage: 38, icon: '💬', batteryUsage: 12 },
];

const PowerAIDashboard = () => {
  const [batteryLevel, setBatteryLevel] = useState(73);
  const [isCharging, setIsCharging] = useState(false);
  const [currentScreen, setCurrentScreen] = useState('dashboard');

  // Simulate battery level changes
  useEffect(() => {
    const interval = setInterval(() => {
      setBatteryLevel(prev => {
        const change = Math.random() > 0.7 ? (Math.random() > 0.5 ? 1 : -1) : 0;
        return Math.max(0, Math.min(100, prev + change));
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getAIPrediction = (level: number) => {
    if (level > 80) return "8h 45m remaining";
    if (level > 60) return "6h 30m remaining";
    if (level > 40) return "4h 15m remaining";
    if (level > 20) return "2h 10m remaining";
    return "1h 5m remaining";
  };

  const getSmartInsight = (level: number) => {
    if (level > 80) return "Battery health is excellent. Consider enabling power-saving mode for extended usage.";
    if (level > 60) return "Good battery level. Close Instagram to extend battery life by 2 hours.";
    if (level > 40) return "Moderate usage detected. Enable battery saver or find a charger soon.";
    if (level > 20) return "Low battery warning. Close heavy apps and reduce screen brightness.";
    return "Critical battery level! Enable emergency mode and contact emergency contacts.";
  };

  const aiPrediction = getAIPrediction(batteryLevel);
  const insight = getSmartInsight(batteryLevel);

  const renderDashboard = () => (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="px-6 space-y-6 pb-8">
        {/* Battery Card */}
        <BatteryCard 
          batteryLevel={batteryLevel}
          aiPrediction={aiPrediction}
          insight={insight}
          isCharging={isCharging}
        />
        
        {/* App Usage Analytics */}
        <AppUsageCard apps={mockApps} />
        
        {/* Action Buttons */}
        <div className="space-y-4">
          <ActionButton
            title="Optimize Apps"
            description="AI-powered battery optimization"
            icon={Zap}
            variant="primary"
            onClick={() => {/* Optimization logic */}}
          />
          
          <ActionButton
            title="Travel Guardian Mode"
            description="Offline navigation with battery optimization"
            icon={Navigation}
            onClick={() => setCurrentScreen('travel')}
          />
          
          <ActionButton
            title="Virtual Assistant"
            description="AI-powered battery guidance"
            icon={Bot}
            onClick={() => setCurrentScreen('assistant')}
          />
          
          <ActionButton
            title="Emergency Contacts"
            description="Critical battery alert contacts"
            icon={Users}
            onClick={() => setCurrentScreen('contacts')}
          />
        </div>
      </div>
    </div>
  );

  const renderTravelGuardian = () => (
    <div className="min-h-screen bg-background">
      <div className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <button 
            onClick={() => setCurrentScreen('dashboard')}
            className="p-2 rounded-xl bg-secondary/50 hover:bg-secondary/80"
          >
            ←
          </button>
          <div>
            <h1 className="text-headline text-foreground">Travel Guardian</h1>
            <p className="text-caption">Offline navigation & battery optimization</p>
          </div>
        </div>

        <div className="space-y-6">
          {/* Map placeholder */}
          <div className="gradient-card rounded-3xl p-8 shadow-elevation-2 text-center">
            <MapPin size={48} className="text-primary mx-auto mb-4" />
            <h3 className="text-title mb-2">Offline Map Ready</h3>
            <p className="text-caption mb-4">
              Battery-optimized routing available for 50km radius
            </p>
            <ActionButton
              title="Start Navigation"
              icon={Navigation}
              variant="primary"
            />
          </div>

          <div className="gradient-card rounded-3xl p-6 shadow-elevation-1">
            <h3 className="text-title mb-4">Travel Settings</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-secondary/30 rounded-2xl">
                <span className="text-sm">Battery Saver Mode</span>
                <div className="w-12 h-6 bg-primary rounded-full flex items-center justify-end pr-1">
                  <div className="w-5 h-5 bg-white rounded-full"></div>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 bg-secondary/30 rounded-2xl">
                <span className="text-sm">Offline Maps</span>
                <div className="w-12 h-6 bg-primary rounded-full flex items-center justify-end pr-1">
                  <div className="w-5 h-5 bg-white rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderVirtualAssistant = () => (
    <div className="min-h-screen bg-background">
      <div className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <button 
            onClick={() => setCurrentScreen('dashboard')}
            className="p-2 rounded-xl bg-secondary/50 hover:bg-secondary/80"
          >
            ←
          </button>
          <div>
            <h1 className="text-headline text-foreground">Virtual Assistant</h1>
            <p className="text-caption">AI-powered battery guidance</p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="gradient-card rounded-3xl p-6 shadow-elevation-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                <Bot size={24} className="text-white" />
              </div>
              <div>
                <h3 className="text-title">PowerAI Assistant</h3>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-battery-green rounded-full animate-pulse"></div>
                  <span className="text-caption">Online & Ready</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-primary/10 p-4 rounded-2xl border-l-4 border-primary">
                <p className="text-sm text-foreground">
                  "Based on your current usage pattern, I recommend closing Instagram and enabling battery saver mode to extend your battery life by approximately 2 hours."
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button className="p-3 bg-secondary/50 rounded-2xl text-sm hover:bg-secondary/80 transition-colors">
                  Battery Tips
                </button>
                <button className="p-3 bg-secondary/50 rounded-2xl text-sm hover:bg-secondary/80 transition-colors">
                  Usage Analysis
                </button>
                <button className="p-3 bg-secondary/50 rounded-2xl text-sm hover:bg-secondary/80 transition-colors">
                  Power Settings
                </button>
                <button className="p-3 bg-secondary/50 rounded-2xl text-sm hover:bg-secondary/80 transition-colors">
                  Emergency Help
                </button>
              </div>
            </div>
          </div>

          <div className="gradient-card rounded-3xl p-6 shadow-elevation-1">
            <h3 className="text-title mb-4">Voice Commands</h3>
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">• "Hey PowerAI, optimize my battery"</div>
              <div className="text-sm text-muted-foreground">• "Show me battery-heavy apps"</div>
              <div className="text-sm text-muted-foreground">• "Enable travel mode"</div>
              <div className="text-sm text-muted-foreground">• "How long until empty?"</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderEmergencyContacts = () => (
    <div className="min-h-screen bg-background">
      <div className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <button 
            onClick={() => setCurrentScreen('dashboard')}
            className="p-2 rounded-xl bg-secondary/50 hover:bg-secondary/80"
          >
            ←
          </button>
          <div>
            <h1 className="text-headline text-foreground">Emergency Contacts</h1>
            <p className="text-caption">Critical battery alert contacts</p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="gradient-card rounded-3xl p-6 shadow-elevation-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-destructive rounded-full flex items-center justify-center">
                <AlertTriangle size={24} className="text-white" />
              </div>
              <div>
                <h3 className="text-title">Emergency Alert Settings</h3>
                <p className="text-caption">Auto-alert at 5% battery</p>
              </div>
            </div>
            
            <div className="bg-destructive/10 p-4 rounded-2xl border border-destructive/20">
              <p className="text-sm text-destructive font-medium">
                Critical battery alerts will be sent when battery drops below 5%
              </p>
            </div>
          </div>

          <div className="gradient-card rounded-3xl p-6 shadow-elevation-1">
            <h3 className="text-title mb-4">Emergency Contacts</h3>
            
            <div className="space-y-3">
              {[
                { name: 'John Smith', relation: 'Emergency Contact', phone: '+1 (555) 123-4567' },
                { name: 'Sarah Johnson', relation: 'Family', phone: '+1 (555) 987-6543' },
                { name: 'Mike Wilson', relation: 'Friend', phone: '+1 (555) 456-7890' }
              ].map((contact, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-secondary/30 rounded-2xl">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                      <Users size={20} className="text-primary" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-foreground">{contact.name}</div>
                      <div className="text-xs text-muted-foreground">{contact.relation}</div>
                    </div>
                  </div>
                  <button className="p-2 rounded-xl bg-primary/20 hover:bg-primary/30">
                    <Phone size={16} className="text-primary" />
                  </button>
                </div>
              ))}
            </div>

            <ActionButton
              title="Add Emergency Contact"
              icon={Users}
              variant="primary"
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderEmergencyMode = () => (
    <div className="min-h-screen bg-destructive text-white">
      <div className="p-6 text-center">
        <div className="animate-pulse mb-8">
          <AlertTriangle size={80} className="mx-auto mb-4 text-white" />
          <h1 className="text-4xl font-bold mb-2">EMERGENCY MODE</h1>
          <p className="text-xl">Critical Battery: {batteryLevel}%</p>
        </div>

        <div className="bg-black/30 rounded-3xl p-8 mb-8">
          <h2 className="text-2xl font-bold mb-4">🔋 POWER SAVING ACTIVE</h2>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="bg-white/20 p-3 rounded-xl">
              <div className="font-semibold">Screen</div>
              <div>Minimum Brightness</div>
            </div>
            <div className="bg-white/20 p-3 rounded-xl">
              <div className="font-semibold">Network</div>
              <div>Emergency Only</div>
            </div>
            <div className="bg-white/20 p-3 rounded-xl">
              <div className="font-semibold">Apps</div>
              <div>Essential Only</div>
            </div>
            <div className="bg-white/20 p-3 rounded-xl">
              <div className="font-semibold">Location</div>
              <div>GPS Disabled</div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <button className="w-full p-4 bg-white text-destructive rounded-3xl font-bold text-lg">
            📞 CALL EMERGENCY CONTACT
          </button>
          <button className="w-full p-4 bg-white/20 text-white rounded-3xl font-medium">
            📍 SEND LOCATION TO CONTACTS
          </button>
          <button className="w-full p-4 bg-white/20 text-white rounded-3xl font-medium">
            🔦 FLASHLIGHT
          </button>
          <button 
            onClick={() => setCurrentScreen('dashboard')}
            className="w-full p-4 bg-white/10 text-white rounded-3xl font-medium border border-white/30"
          >
            EXIT EMERGENCY MODE
          </button>
        </div>

        <div className="mt-8 p-4 bg-black/30 rounded-3xl">
          <p className="text-sm">
            Emergency contacts have been automatically notified of your critical battery status and current location.
          </p>
        </div>
      </div>
    </div>
  );

  // Screen routing with emergency mode trigger
  const renderCurrentScreen = () => {
    // Auto-trigger emergency mode at 5% battery
    if (batteryLevel <= 5) {
      return renderEmergencyMode();
    }
    
    switch (currentScreen) {
      case 'travel':
        return renderTravelGuardian();
      case 'assistant':
        return renderVirtualAssistant();
      case 'contacts':
        return renderEmergencyContacts();
      case 'emergency':
        return renderEmergencyMode();
      default:
        return renderDashboard();
    }
  };

  return renderCurrentScreen();
};

export default PowerAIDashboard;
