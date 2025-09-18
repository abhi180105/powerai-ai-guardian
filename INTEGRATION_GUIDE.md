# PowerAI Frontend-Backend Integration Guide

This guide explains how to integrate the improved React frontend with the Android Kotlin backend.

## Architecture Overview

```
┌─────────────────┐    HTTP/WebSocket    ┌──────────────────┐
│  React Frontend │ ◄─────────────────► │ Android Backend  │
│  (TypeScript)   │                     │   (Kotlin)       │
└─────────────────┘                     └──────────────────┘
        │                                        │
        │                                        │
   ┌────▼────┐                              ┌────▼────┐
   │ Web UI  │                              │ Native  │
   │ Browser │                              │ Android │
   └─────────┘                              └─────────┘
```

## Integration Methods

### Method 1: WebView Integration (Recommended)

Embed the React frontend directly in the Android app using WebView:

#### Android Side (MainActivity.kt):
```kotlin
import android.webkit.WebView
import android.webkit.WebViewClient

class MainActivity : AppCompatActivity() {
    private lateinit var webView: WebView
    
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        
        webView = WebView(this)
        webView.settings.javaScriptEnabled = true
        webView.settings.domStorageEnabled = true
        webView.webViewClient = WebViewClient()
        
        // Add JavaScript interface for communication
        webView.addJavascriptInterface(PowerAIBridge(), "PowerAI")
        
        // Load the React app
        webView.loadUrl("file:///android_asset/www/index.html")
        setContentView(webView)
    }
    
    inner class PowerAIBridge {
        @JavascriptInterface
        fun getBatteryLevel(): Int {
            return getCurrentBatteryLevel()
        }
        
        @JavascriptInterface
        fun optimizeBattery(): Boolean {
            return performOptimization()
        }
        
        @JavascriptInterface
        fun sendChatMessage(message: String): String {
            return AIInsightGenerator.getChatbotResponse(message, getBatteryLevel(), getPrediction())
        }
    }
}
```

#### Frontend Side (api.ts):
```typescript
// Check if running in Android WebView
const isAndroidWebView = typeof (window as any).PowerAI !== 'undefined';

class PowerAIService {
    async getBatteryData(): Promise<BatteryData> {
        if (isAndroidWebView) {
            // Call Android native methods
            const level = (window as any).PowerAI.getBatteryLevel();
            return {
                level,
                isCharging: false, // Get from Android
                health: 'Good',
                temperature: 25,
                prediction: '8h 30m',
                insight: 'Battery operating normally'
            };
        } else {
            // Fallback to simulation for web browser
            return this.simulateBatteryData();
        }
    }
}
```

### Method 2: HTTP Server Integration

Run a local HTTP server in the Android app:

#### Android Side:
```kotlin
import fi.iki.elonen.NanoHTTPD

class PowerAIServer : NanoHTTPD(8080) {
    override fun serve(session: IHTTPSession): Response {
        val uri = session.uri
        
        return when {
            uri == "/api/battery" -> {
                val batteryData = getBatteryData()
                newFixedLengthResponse(Response.Status.OK, "application/json", batteryData.toJson())
            }
            uri == "/api/optimize" && session.method == Method.POST -> {
                val success = optimizeBattery()
                newFixedLengthResponse(Response.Status.OK, "application/json", """{"success": $success}""")
            }
            else -> newFixedLengthResponse(Response.Status.NOT_FOUND, "text/plain", "Not found")
        }
    }
}
```

#### Frontend Side:
```typescript
class PowerAIService {
    private baseUrl = 'http://localhost:8080/api';
    
    async getBatteryData(): Promise<BatteryData> {
        const response = await fetch(`${this.baseUrl}/battery`);
        return await response.json();
    }
    
    async optimizeBattery(): Promise<boolean> {
        const response = await fetch(`${this.baseUrl}/optimize`, { method: 'POST' });
        const result = await response.json();
        return result.success;
    }
}
```

## Setup Instructions

### Step 1: Build React Frontend
```bash
cd powerai-ai-guardian
npm install
npm run build
```

### Step 2: Copy to Android Assets
```bash
# Copy built files to Android assets
cp -r dist/* ../Samsung-AI-Challenge/src/app/src/main/assets/www/
```

### Step 3: Update Android Manifest
```xml
<!-- Add internet permission for HTTP communication -->
<uses-permission android:name="android.permission.INTERNET" />
<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
```

### Step 4: Configure WebView (if using Method 1)
```kotlin
// In MainActivity.onCreate()
webView.settings.apply {
    javaScriptEnabled = true
    domStorageEnabled = true
    allowFileAccess = true
    allowContentAccess = true
    mixedContentMode = WebSettings.MIXED_CONTENT_ALWAYS_ALLOW
}
```

## Data Flow Examples

### Battery Monitoring
```
React Frontend → Android WebView → MainActivity.batteryReceiver → TensorFlow Lite → AI Prediction → React UI
```

### Chat Assistant
```
User Input → React Chat → PowerAI.sendChatMessage() → AIInsightGenerator.getChatbotResponse() → Response → React UI
```

### Travel Guardian
```
Destination Input → React Travel → PowerAI.calculateRoute() → TravelActivity.calculateBatteryBudget() → Prediction → React UI
```

### Emergency Alerts
```
Battery < 5% → Android BatteryReceiver → EmergencyActivity → SMS Manager → Contacts Notified → React Emergency UI
```

## Testing Integration

### 1. Test WebView Communication:
```javascript
// In browser console
if (typeof PowerAI !== 'undefined') {
    console.log('Battery Level:', PowerAI.getBatteryLevel());
    console.log('Optimization:', PowerAI.optimizeBattery());
}
```

### 2. Test HTTP Server:
```bash
# Test API endpoints
curl http://localhost:8080/api/battery
curl -X POST http://localhost:8080/api/optimize
```

### 3. Test Emergency Features:
```kotlin
// Simulate low battery in Android
val testIntent = Intent(Intent.ACTION_BATTERY_CHANGED)
testIntent.putExtra(BatteryManager.EXTRA_LEVEL, 4)
testIntent.putExtra(BatteryManager.EXTRA_SCALE, 100)
sendBroadcast(testIntent)
```

## Troubleshooting

### Common Issues:

1. **CORS Errors**: Add CORS headers to Android HTTP server
2. **WebView Not Loading**: Check file paths and permissions
3. **JavaScript Interface Not Working**: Ensure `@JavascriptInterface` annotation
4. **Battery Data Not Updating**: Verify BroadcastReceiver registration

### Debug Tips:

1. Enable WebView debugging:
```kotlin
if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.KITKAT) {
    WebView.setWebContentsDebuggingEnabled(true)
}
```

2. Add logging to both sides:
```kotlin
Log.d("PowerAI", "Battery level: $batteryLevel")
```

```javascript
console.log('Frontend battery data:', batteryData);
```

## Performance Considerations

1. **Battery Efficiency**: Minimize WebView updates
2. **Memory Usage**: Optimize React re-renders
3. **Network Usage**: Cache API responses
4. **UI Responsiveness**: Use async operations

## Security Notes

1. Validate all data from WebView
2. Sanitize user inputs
3. Use HTTPS for production
4. Implement proper error handling
5. Protect sensitive battery data

This integration provides a seamless experience between the modern React frontend and the powerful Android backend, leveraging the best of both platforms.