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
  Users,
  Settings,
  ChevronLeft,
  Mic,
  Heart,
  Star,
  Clock,
  TrendingUp,
  Award,
  Smartphone,
  Wifi,
  Volume2,
  Bell
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
      
      <div className="px-4 sm:px-6 space-y-4 sm:space-y-6 pb-8">
        {/* Battery Card */}
        <BatteryCard 
          batteryLevel={batteryLevel}
          aiPrediction={aiPrediction}
          insight={insight}
          isCharging={isCharging}
        />
        
        {/* Quick Stats Row */}
        <div className="grid grid-cols-3 gap-3">
          <div className="gradient-card rounded-2xl p-4 text-center">
            <Clock size={20} className="text-primary mx-auto mb-2" />
            <div className="text-xs text-muted-foreground">Screen Time</div>
            <div className="text-sm font-semibold text-foreground">4h 23m</div>
          </div>
          <div className="gradient-card rounded-2xl p-4 text-center">
            <TrendingUp size={20} className="text-battery-green mx-auto mb-2" />
            <div className="text-xs text-muted-foreground">Efficiency</div>
            <div className="text-sm font-semibold text-foreground">87%</div>
          </div>
          <div className="gradient-card rounded-2xl p-4 text-center">
            <Award size={20} className="text-battery-yellow mx-auto mb-2" />
            <div className="text-xs text-muted-foreground">Score</div>
            <div className="text-sm font-semibold text-foreground">92</div>
          </div>
        </div>
        
        {/* App Usage Analytics */}
        <AppUsageCard apps={mockApps} />
        
        {/* Action Buttons Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <ActionButton
            title="Optimize Apps"
            description="AI-powered optimization"
            icon={Zap}
            variant="primary"
            onClick={() => {/* Optimization logic */}}
          />
          
          <ActionButton
            title="Travel Guardian"
            description="Offline navigation"
            icon={Navigation}
            onClick={() => setCurrentScreen('travel')}
          />
          
          <ActionButton
            title="AI Assistant"
            description="Voice-powered guidance"
            icon={Bot}
            onClick={() => setCurrentScreen('assistant')}
          />
          
          <ActionButton
            title="Emergency Hub"
            description="Critical alerts & contacts"
            icon={Shield}
            onClick={() => setCurrentScreen('contacts')}
          />
        </div>
        
        {/* Bottom Quick Actions */}
        <div className="grid grid-cols-4 gap-2 mt-6">
          <button className="flex flex-col items-center p-3 rounded-2xl bg-secondary/30 hover:bg-secondary/50 transition-colors">
            <Settings size={20} className="text-muted-foreground mb-1" />
            <span className="text-xs text-muted-foreground">Settings</span>
          </button>
          <button className="flex flex-col items-center p-3 rounded-2xl bg-secondary/30 hover:bg-secondary/50 transition-colors">
            <Smartphone size={20} className="text-muted-foreground mb-1" />
            <span className="text-xs text-muted-foreground">Device</span>
          </button>
          <button className="flex flex-col items-center p-3 rounded-2xl bg-secondary/30 hover:bg-secondary/50 transition-colors">
            <Bell size={20} className="text-muted-foreground mb-1" />
            <span className="text-xs text-muted-foreground">Alerts</span>
          </button>
          <button className="flex flex-col items-center p-3 rounded-2xl bg-secondary/30 hover:bg-secondary/50 transition-colors">
            <Star size={20} className="text-muted-foreground mb-1" />
            <span className="text-xs text-muted-foreground">Premium</span>
          </button>
        </div>
      </div>
    </div>
  );

  const renderTravelGuardian = () => (
    <div className="min-h-screen bg-background">
      <div className="p-4 sm:p-6">
        <div className="flex items-center gap-3 mb-6">
          <button 
            onClick={() => setCurrentScreen('dashboard')}
            className="p-3 rounded-2xl bg-secondary/50 hover:bg-secondary/80 transition-all active:scale-95"
          >
            <ChevronLeft size={20} className="text-foreground" />
          </button>
          <div className="flex-1">
            <h1 className="text-headline text-foreground flex items-center gap-2">
              <Navigation size={24} className="text-primary" />
              Travel Guardian
            </h1>
            <p className="text-caption">Offline navigation & battery optimization</p>
          </div>
        </div>

        <div className="space-y-4 sm:space-y-6">
          {/* Map placeholder */}
          <div className="gradient-card rounded-3xl p-6 sm:p-8 shadow-elevation-2 text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-primary/20 rounded-full flex items-center justify-center">
              <MapPin size={32} className="text-primary" />
            </div>
            <h3 className="text-title mb-2">Offline Map Ready</h3>
            <p className="text-caption mb-6">
              Battery-optimized routing available for 50km radius
            </p>
            <div className="grid grid-cols-2 gap-3 mb-6">
              <div className="bg-secondary/30 rounded-2xl p-3 text-center">
                <Wifi size={20} className="text-battery-green mx-auto mb-1" />
                <div className="text-xs text-muted-foreground">Offline Ready</div>
              </div>
              <div className="bg-secondary/30 rounded-2xl p-3 text-center">
                <Zap size={20} className="text-battery-yellow mx-auto mb-1" />
                <div className="text-xs text-muted-foreground">Power Saving</div>
              </div>
            </div>
            <ActionButton
              title="Start Navigation"
              icon={Navigation}
              variant="primary"
            />
          </div>

          <div className="gradient-card rounded-3xl p-4 sm:p-6 shadow-elevation-1">
            <h3 className="text-title mb-4 flex items-center gap-2">
              <Settings size={20} className="text-primary" />
              Travel Settings
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-4 bg-secondary/30 rounded-2xl hover:bg-secondary/50 transition-colors">
                <div className="flex items-center gap-3">
                  <Zap size={16} className="text-battery-green" />
                  <span className="text-sm font-medium">Battery Saver Mode</span>
                </div>
                <div className="w-12 h-6 bg-primary rounded-full flex items-center justify-end pr-1 transition-all">
                  <div className="w-5 h-5 bg-white rounded-full shadow-md"></div>
                </div>
              </div>
              <div className="flex items-center justify-between p-4 bg-secondary/30 rounded-2xl hover:bg-secondary/50 transition-colors">
                <div className="flex items-center gap-3">
                  <MapPin size={16} className="text-primary" />
                  <span className="text-sm font-medium">Offline Maps</span>
                </div>
                <div className="w-12 h-6 bg-primary rounded-full flex items-center justify-end pr-1 transition-all">
                  <div className="w-5 h-5 bg-white rounded-full shadow-md"></div>
                </div>
              </div>
              <div className="flex items-center justify-between p-4 bg-secondary/30 rounded-2xl hover:bg-secondary/50 transition-colors">
                <div className="flex items-center gap-3">
                  <Volume2 size={16} className="text-battery-yellow" />
                  <span className="text-sm font-medium">Voice Navigation</span>
                </div>
                <div className="w-12 h-6 bg-secondary rounded-full flex items-center justify-start pl-1 transition-all">
                  <div className="w-5 h-5 bg-muted-foreground rounded-full shadow-md"></div>
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
      <div className="p-4 sm:p-6">
        <div className="flex items-center gap-3 mb-6">
          <button 
            onClick={() => setCurrentScreen('dashboard')}
            className="p-3 rounded-2xl bg-secondary/50 hover:bg-secondary/80 transition-all active:scale-95"
          >
            <ChevronLeft size={20} className="text-foreground" />
          </button>
          <div className="flex-1">
            <h1 className="text-headline text-foreground flex items-center gap-2">
              <Bot size={24} className="text-primary" />
              AI Assistant
            </h1>
            <p className="text-caption">Voice-powered battery guidance</p>
          </div>
          <button className="p-3 rounded-2xl bg-primary/20 hover:bg-primary/30 transition-all active:scale-95">
            <Mic size={20} className="text-primary" />
          </button>
        </div>

        <div className="space-y-4 sm:space-y-6">
          <div className="gradient-card rounded-3xl p-4 sm:p-6 shadow-elevation-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center shadow-lg">
                <Bot size={24} className="text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-title">PowerAI Assistant</h3>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-battery-green rounded-full animate-pulse"></div>
                  <span className="text-caption">Online & Ready</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-battery-green/20 rounded-full flex items-center justify-center">
                  <Heart size={16} className="text-battery-green" />
                </div>
                <span className="text-xs text-muted-foreground">92%</span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-gradient-to-r from-primary/10 to-primary/5 p-4 rounded-2xl border-l-4 border-primary relative overflow-hidden">
                <div className="absolute top-0 right-0 w-16 h-16 bg-primary/10 rounded-full -translate-y-4 translate-x-4"></div>
                <div className="flex items-start gap-3">
                  <Bot size={16} className="text-primary mt-1 flex-shrink-0" />
                  <p className="text-sm text-foreground leading-relaxed">
                    "Based on your current usage pattern, I recommend closing Instagram and enabling battery saver mode to extend your battery life by approximately 2 hours."
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button className="flex items-center gap-2 p-3 bg-secondary/50 rounded-2xl text-sm hover:bg-secondary/80 transition-all active:scale-95">
                  <Zap size={16} className="text-battery-yellow" />
                  Battery Tips
                </button>
                <button className="flex items-center gap-2 p-3 bg-secondary/50 rounded-2xl text-sm hover:bg-secondary/80 transition-all active:scale-95">
                  <TrendingUp size={16} className="text-primary" />
                  Usage Analysis
                </button>
                <button className="flex items-center gap-2 p-3 bg-secondary/50 rounded-2xl text-sm hover:bg-secondary/80 transition-all active:scale-95">
                  <Settings size={16} className="text-muted-foreground" />
                  Power Settings
                </button>
                <button className="flex items-center gap-2 p-3 bg-secondary/50 rounded-2xl text-sm hover:bg-secondary/80 transition-all active:scale-95">
                  <AlertTriangle size={16} className="text-destructive" />
                  Emergency Help
                </button>
              </div>
            </div>
          </div>

          <div className="gradient-card rounded-3xl p-4 sm:p-6 shadow-elevation-1">
            <h3 className="text-title mb-4 flex items-center gap-2">
              <Mic size={20} className="text-primary" />
              Voice Commands
            </h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-secondary/30 rounded-2xl hover:bg-secondary/50 transition-colors">
                <Volume2 size={16} className="text-primary" />
                <span className="text-sm text-foreground">"Hey PowerAI, optimize my battery"</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-secondary/30 rounded-2xl hover:bg-secondary/50 transition-colors">
                <Volume2 size={16} className="text-primary" />
                <span className="text-sm text-foreground">"Show me battery-heavy apps"</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-secondary/30 rounded-2xl hover:bg-secondary/50 transition-colors">
                <Volume2 size={16} className="text-primary" />
                <span className="text-sm text-foreground">"Enable travel mode"</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-secondary/30 rounded-2xl hover:bg-secondary/50 transition-colors">
                <Volume2 size={16} className="text-primary" />
                <span className="text-sm text-foreground">"How long until empty?"</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderEmergencyContacts = () => (
    <div className="min-h-screen bg-background">
      <div className="p-4 sm:p-6">
        <div className="flex items-center gap-3 mb-6">
          <button 
            onClick={() => setCurrentScreen('dashboard')}
            className="p-3 rounded-2xl bg-secondary/50 hover:bg-secondary/80 transition-all active:scale-95"
          >
            <ChevronLeft size={20} className="text-foreground" />
          </button>
          <div className="flex-1">
            <h1 className="text-headline text-foreground flex items-center gap-2">
              <Shield size={24} className="text-destructive" />
              Emergency Hub
            </h1>
            <p className="text-caption">Critical battery alert management</p>
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
