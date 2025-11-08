# Mobile App Environment Configuration Guide

## ✅ Dynamic Server URL Configuration Implemented!

Your mobile app now automatically switches between development and production server URLs based on the `__DEV__` environment variable.

---

## 📁 Configuration Files Created/Updated

### 1. **`config/keys.js`** (NEW - Environment Switcher)

```javascript
// Environment-based configuration for React Native/Expo
// This file switches between dev and prod configs based on __DEV__

let keys

if (__DEV__) {
  // Development mode (Expo dev server, npx expo start)
  keys = require('./keys_dev').keys
} else {
  // Production mode (Expo production build, EAS Build)
  keys = require('./keys_prod').keys
}

module.exports = keys
```

### 2. **`config/keys_dev.js`** (UPDATED - Development)

```javascript
const keys = {
  serverUrl: 'https://a313ba306717.ngrok-free.app', // Development server (ngrok)
  cloudinary: {
    uploadVideoUrl: 'https://api.cloudinary.com/v1_1/cv-cloud/video/upload',
    uploadPdfUrl: 'https://api.cloudinary.com/v1_1/cv-cloud/raw/upload',
    uploadImageUrl: 'https://api.cloudinary.com/v1_1/cv-cloud/image/upload',
  },
}

exports.keys = keys
```

### 3. **`config/keys_prod.js`** (NEW - Production)

```javascript
const keys = {
  serverUrl: 'https://cv-cloud-server-v25-d7d4ce152279.herokuapp.com', // Production server
  cloudinary: {
    uploadVideoUrl: 'https://api.cloudinary.com/v1_1/cv-cloud/video/upload',
    uploadPdfUrl: 'https://api.cloudinary.com/v1_1/cv-cloud/raw/upload',
    uploadImageUrl: 'https://api.cloudinary.com/v1_1/cv-cloud/image/upload',
  },
}

exports.keys = keys
```

---

## 🔧 Files Updated with Dynamic URLs

### 1. **`src/api/ngrok.js`** ✅

**Before:**

```javascript
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'

const instance = axios.create({
  baseURL: 'https://a313ba306717.ngrok-free.app',
  // baseURL: 'https://cv-cloud-api.herokuapp.com',
})
```

**After:**

```javascript
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import keys from '../../config/keys'

const instance = axios.create({
  baseURL: keys.serverUrl,
})
```

---

## 🎯 How It Works

### Development (Expo Dev Server)

When running locally with `npx expo start`:

- `__DEV__` is `true`
- Uses `config/keys_dev.js`
- Server URL: `https://a313ba306717.ngrok-free.app`

### Production (EAS Build / App Store / Play Store)

When building for production with `eas build`:

- `__DEV__` is `false`
- Uses `config/keys_prod.js`
- Server URL: `https://cv-cloud-server-v25-d7d4ce152279.herokuapp.com`

---

## 🚀 Testing & Deployment

### Testing Development Mode

```bash
cd /home/nicorapelas/Workspace/cv-cloud/rebuild/mobile
npx expo start --clear
```

- Press `i` for iOS simulator
- Press `a` for Android emulator
- Scan QR code with Expo Go app on physical device

**Expected:** Should connect to ngrok development server

### Testing Production Mode (Preview)

You can test production mode without publishing by using Expo's development client:

```bash
# Build a development client with production environment
eas build --profile preview --platform ios
eas build --profile preview --platform android
```

### Building for Production

```bash
# Build for iOS
eas build --profile production --platform ios

# Build for Android
eas build --profile production --platform android

# Build for both
eas build --profile production --platform all
```

**Expected:** Will connect to Heroku production server

---

## 🔍 Verification

### Check Current Environment

Add this temporarily to see which environment is active:

```javascript
// In any component
console.log('Environment:', __DEV__ ? 'DEVELOPMENT' : 'PRODUCTION')
console.log('Server URL:', keys.serverUrl)
```

### Verify API Calls

All API calls now automatically use the correct server:

- **Development:** `https://a313ba306717.ngrok-free.app/api/...`
- **Production:** `https://cv-cloud-server-v25-d7d4ce152279.herokuapp.com/api/...`

---

## 📋 What Changed

### Before:

- ❌ Hardcoded `baseURL` in `ngrok.js`
- ❌ Manual URL switching via comments
- ❌ Risk of deploying with wrong server URL

### After:

- ✅ Automatic environment detection
- ✅ No more manual URL switching
- ✅ Cloudinary URLs also included in config
- ✅ Same pattern as web app for consistency

---

## 🔄 Updating ngrok URL

When your ngrok URL changes (it changes on every restart):

1. **Update ONLY `config/keys_dev.js`:**

```javascript
const keys = {
  serverUrl: 'https://YOUR-NEW-NGROK-URL.ngrok-free.app',
  // ...
}
```

2. **Reload the app:**

```bash
# In Expo dev tools, press 'r' to reload
# Or close and restart: npx expo start --clear
```

---

## 🌐 Environment Variables (Optional Advanced Setup)

If you want even more flexibility, you can use Expo's environment variables:

### Create `eas.json` configuration:

```json
{
  "build": {
    "development": {
      "developmentClient": true,
      "env": {
        "API_URL": "https://a313ba306717.ngrok-free.app"
      }
    },
    "preview": {
      "env": {
        "API_URL": "https://cv-cloud-server-v25-d7d4ce152279.herokuapp.com"
      }
    },
    "production": {
      "env": {
        "API_URL": "https://cv-cloud-server-v25-d7d4ce152279.herokuapp.com"
      }
    }
  }
}
```

---

## 📱 Platform-Specific Notes

### iOS

- Development builds work with ngrok URLs
- Production builds require HTTPS (Heroku URL is fine)
- No additional configuration needed

### Android

- ngrok URLs work fine in development
- Production requires HTTPS
- Network security config allows all secure connections

---

## 🆘 Troubleshooting

### Issue: "Network request failed" in development

**Solution:** Make sure ngrok is running and URL in `keys_dev.js` is up to date

### Issue: App connects to wrong server

**Solution:**

1. Clear Metro bundler cache: `npx expo start --clear`
2. Verify `__DEV__` value in console logs
3. Check `keys.serverUrl` is correct

### Issue: Production build still uses development URL

**Solution:**

- Ensure you're using `eas build --profile production`
- `__DEV__` is automatically `false` in production builds
- Check `config/keys_prod.js` has correct URL

---

## ✅ Benefits

1. **No more manual URL switching** - Just code and deploy!
2. **Consistency with web app** - Same pattern across platforms
3. **Safer deployments** - Can't accidentally ship with wrong URL
4. **Easier onboarding** - New developers don't need to know about URL switching
5. **Centralized configuration** - All URLs in one place per environment

---

## 📝 Summary

### URLs in Use:

- **Development:** `https://a313ba306717.ngrok-free.app`
- **Production:** `https://cv-cloud-server-v25-d7d4ce152279.herokuapp.com`

### Files Changed:

- ✅ `config/keys.js` - Created (environment switcher)
- ✅ `config/keys_dev.js` - Updated (added serverUrl)
- ✅ `config/keys_prod.js` - Created (production config)
- ✅ `src/api/ngrok.js` - Updated (uses dynamic config)

---

## 🎉 Ready to Go!

Your mobile app is now configured to automatically use the correct server URL based on the environment. No more manual switching needed! 🚀

### Quick Commands:

```bash
# Development
npx expo start --clear

# Production Build
eas build --profile production --platform all

# Check current environment in code
console.log('ENV:', __DEV__ ? 'DEV' : 'PROD');
console.log('Server:', keys.serverUrl);
```
