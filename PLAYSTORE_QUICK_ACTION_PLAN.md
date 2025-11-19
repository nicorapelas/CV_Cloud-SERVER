# 🚀 Google Play Store - Quick Action Plan

## Current Status: Creating App Listing

**Date Started:** November 11, 2025  
**App Name:** CV Cloud  
**Package:** com.cvcloud.app  
**Version:** 2.0.0

---

## ✅ IMMEDIATE ACTIONS (Do Now)

### 1. Complete Create App Form ⏳ IN PROGRESS

Fill in the dialog:

- **App name:** CV Cloud
- **Default language:** English (United Kingdom)
- **Type:** App
- **Free or paid:** Free
- Check both compliance boxes
- Click "Create app"

---

## 📝 NEXT STEPS (After App Created)

### Step 2: Dashboard Setup

After clicking "Create app," you'll see the dashboard with tasks. Complete them in this order:

#### A. Set Up Your App (Required before testing)

1. **App access** ✅

   ```
   Select: All functionality is available without special access
   (OR provide test account if login required)
   ```

2. **Ads** ✅

   ```
   Select: No, my app does not contain ads
   (OR Yes if you have ads)
   ```

3. **Content rating** ✅

   ```
   - Start questionnaire
   - App category: Business/Productivity
   - Answer "No" to violence, sexual content, etc.
   - Expected rating: Everyone / PEGI 3
   - Save questionnaire
   ```

4. **Target audience** ✅

   ```
   - Age group: 18+ (or 13+ for teens)
   - Target audience: Professionals, job seekers
   ```

5. **Store listing** ⭐ MOST IMPORTANT

   ```
   See detailed instructions below
   ```

6. **Data safety** ⚠️ CRITICAL
   ```
   See detailed instructions below
   ```

---

## 📱 STORE LISTING - Complete Details

### Required Information

**App name:** (Already set: CV Cloud)

**Short description** (80 characters max):

```
Professional CV builder. Create stunning CVs in minutes with modern templates
```

**Full description** (up to 4000 characters):

```
CV Cloud - Your Professional CV Builder

Create, customize, and share professional CVs in minutes with CV Cloud.
Perfect for job seekers, freelancers, and professionals looking to stand out.

KEY FEATURES:
• 10 Modern CV Templates - Choose from professional, creative, and tech-focused designs
• Video Introduction - Record a 30-second video introduction to stand out
• Easy Editing - Intuitive forms for all CV sections
• Document Management - Upload certificates, supporting documents
• Professional Photo - Capture or upload your professional headshot
• Multiple Languages - Add language proficiency levels
• Skills & Proficiencies - Showcase your expertise with visual indicators
• Share Instantly - Email or share your CV directly from the app
• Cloud Sync - Access your CV from mobile and web
• Privacy Controls - Make your CV public or private

PERFECT FOR:
• Job seekers looking for their next opportunity
• Graduates entering the job market
• Freelancers building their portfolio
• Professionals updating their CV
• Anyone wanting a modern, professional CV

WHY CV CLOUD?
✓ Quick Setup - Create your first CV in under 5 minutes
✓ Professional Templates - Designed by HR professionals
✓ Mobile-First - Built specifically for mobile convenience
✓ Free to Use - No hidden fees or subscriptions
✓ Secure & Private - Your data is encrypted and protected

Start building your professional CV today with CV Cloud!
```

**App icon:** 512x512 PNG (required)

- Location: `/mobile/assets/icon.png` (may need resizing to 512x512)

**Feature graphic:** 1024x500 PNG (required)

- ⚠️ **NEED TO CREATE** - High-quality promotional banner

**Phone screenshots:** 2-8 required (JPEG or PNG)

- ⚠️ **NEED TO CREATE** - Screenshots of app in action
- Recommended: 5-8 screenshots showing:
  1. Login/Welcome screen
  2. Dashboard
  3. CV template selection
  4. Editing a CV section
  5. Preview of completed CV
  6. Sharing options

**Category:**

```
Primary: Business
```

**Tags:** (Optional, up to 5)

```
cv, resume, job, career, professional
```

**Contact details:**

```
Email: support@cvcloud.app (or your email)
Website: https://www.cvcloud.app (optional)
Phone: (optional)
```

**Privacy Policy:**

```
URL: https://www.cvcloud.app/privacy
⚠️ MUST be publicly accessible before submission!
```

---

## 🔒 DATA SAFETY SECTION

⚠️ **CRITICAL:** This is mandatory and heavily scrutinized

### Data Collection

**Does your app collect or share user data?**

```
☑ YES
```

**Data types collected:**

1. **Personal info**

   - Name ☑
   - Email address ☑
   - Phone number ☑
   - User IDs ☑

   **Purpose:** App functionality, Account management
   **Is this data shared?** NO
   **Is collection optional?** NO (required for CV)
   **Is data encrypted in transit?** YES
   **Can users request data deletion?** YES

2. **Photos and videos**

   - Photos ☑
   - Videos ☑

   **Purpose:** App functionality (CV profile photo, video intro)
   **Is this data shared?** NO
   **Is collection optional?** YES
   **Is data encrypted in transit?** YES
   **Can users request data deletion?** YES

3. **Files and docs**

   - Files and docs ☑

   **Purpose:** App functionality (CV documents, certificates)
   **Is this data shared?** NO
   **Is collection optional?** YES
   **Is data encrypted in transit?** YES
   **Can users request data deletion?** YES

**Security practices:**

- ☑ Data is encrypted in transit (HTTPS/TLS)
- ☑ Users can request that data be deleted
- ☑ Data is not shared with third parties
- ☑ You follow the Families Policy (if targeting children - probably NO)

**Privacy policy:**

```
URL: https://www.cvcloud.app/privacy
```

---

## 🎨 ASSETS TO CREATE

### Priority 1: MUST HAVE (Before Submission)

1. **App Icon** - 512x512 PNG

   - Current: `/mobile/assets/icon.png` (check size)
   - If wrong size, create new at 512x512

2. **Feature Graphic** - 1024x500 PNG

   - Create promotional banner with app name and tagline
   - Should look professional, eye-catching

3. **Screenshots** - Minimum 2, recommended 5-8
   - Take from actual app
   - Show key features
   - Can add text overlays to explain features

### Priority 2: NICE TO HAVE

4. **Promotional Video** (30 seconds - 2 minutes)
   - Optional but increases conversion
   - Show app in action

---

## 🛠️ CREATING ASSETS

### Option 1: Generate Screenshots

```bash
# Run your app in development
cd /home/nicorapelas/Workspace/cv-cloud/rebuild/mobile
npx expo start

# Take screenshots on your device:
# - Android: Power + Volume Down
# - iOS: Side button + Volume Up

# Or use emulator screen capture
```

### Option 2: Design Feature Graphic

Tools:

- Canva (easiest, has templates)
- Figma (free, professional)
- GIMP (free, powerful)
- Photoshop (if you have it)

**Feature Graphic Template:**

- Size: 1024 x 500 pixels
- Include: App icon, app name, tagline
- Style: Match your app's branding
- No borders, transparency OK

### Option 3: Optimize App Icon

```bash
# Check current icon size
file /home/nicorapelas/Workspace/cv-cloud/rebuild/mobile/assets/icon.png

# If not 512x512, resize using ImageMagick:
convert icon.png -resize 512x512 icon-512.png
```

---

## 🚀 BUILD & SUBMIT

### Step 1: Build Production APK

```bash
cd /home/nicorapelas/Workspace/cv-cloud/rebuild/mobile

# Build production AAB (App Bundle)
eas build --platform android --profile production

# This will take 10-20 minutes
# You'll get a download link when done
```

### Step 2: Submit to Internal Testing

```bash
# Submit to internal track (safest first step)
eas submit --platform android --track internal
```

OR manually upload in Play Console:

1. Go to Testing → Internal testing
2. Create new release
3. Upload AAB file
4. Add release notes
5. Save and review
6. Start rollout

### Step 3: Add Internal Testers

1. Go to Testing → Internal testing → Testers tab
2. Create email list
3. Add test users (your email, colleagues)
4. Save

### Step 4: Test for 1-2 Days

- Install via Play Store link
- Test all features
- Check for crashes
- Fix any issues

### Step 5: Promote to Production

When ready:

1. Go to Testing → Internal testing
2. Click "Promote release"
3. Select "Production"
4. Review and confirm

---

## ⏱️ TIMELINE

**Day 1:** (TODAY)

- ✅ Create app in Play Console
- ⏳ Complete all required sections
- ⏳ Create/upload assets

**Day 2-3:**

- Build production APK
- Submit to internal testing
- Test thoroughly

**Day 4-5:**

- Fix any issues
- Submit to production
- Wait for review (1-7 days)

**Day 6-14:**

- App review by Google
- Respond to any review questions
- App published! 🎉

---

## 🆘 HELP NEEDED?

### Missing Assets?

- **Feature graphic:** I can help create one using design tools
- **Screenshots:** Run app and capture screens
- **Privacy policy:** Need URL hosted on your website

### Technical Issues?

- **Build fails:** Check eas.json configuration
- **Upload fails:** Verify bundle ID matches
- **Review rejection:** Read carefully and fix issues

### Questions?

- Read: `APP_STORE_SUBMISSION_GUIDE.md` for detailed info
- Google Play Help: https://support.google.com/googleplay/android-developer

---

## 📋 CHECKLIST

Before submitting:

- [ ] App icon uploaded (512x512)
- [ ] Feature graphic uploaded (1024x500)
- [ ] At least 2 screenshots uploaded
- [ ] Short description written (80 chars)
- [ ] Full description written
- [ ] Privacy policy URL added and working
- [ ] Data safety section completed
- [ ] Content rating completed
- [ ] App access explained
- [ ] Production build created
- [ ] Tested on real device

---

**Let's get CV Cloud on the Play Store! 🚀**
