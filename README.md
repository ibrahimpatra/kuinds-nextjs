# Kuwait India Driving School — Next.js App

## 📁 File Structure (18 files total — clean and simple)

```
driving-school/
├── pages/
│   ├── _document.js       ← SEO meta, structured data (server-rendered)
│   ├── _app.js            ← App wrapper
│   ├── index.js           ← Home page
│   ├── blog.js            ← Blog list
│   ├── blog/[slug].js     ← Blog detail
│   ├── login.js           ← Admin login (triple-click logo to access)
│   └── admin/
│       ├── index.js       ← Blog dashboard
│       └── editor.js      ← Create/edit blog post
├── components/
│   ├── Navbar.js
│   ├── Footer.js
│   ├── Hero.js
│   ├── About.js
│   ├── Services.js
│   ├── Testimonials.js
│   ├── Contact.js
│   ├── FAQs.js
│   ├── TrainerInfo.js
│   ├── Locations.js
│   ├── LoadingScreen.js
│   └── WhatsAppFAB.js
├── lib/
│   ├── firebase.js        ← Firebase config
│   └── AuthContext.js     ← Auth state
├── data/
│   └── mockData.js        ← Services & FAQs data
├── styles/
│   └── globals.css
├── .env.local.example     ← Copy to .env.local and fill in credentials
├── next.config.js
├── tailwind.config.js
└── package.json
```

---

## 🚀 Setup & Run

```bash
# 1. Install dependencies
npm install

# 2. Copy env file and fill in your Firebase credentials
cp .env.local.example .env.local
# Edit .env.local with your actual Firebase values

# 3. Run development server
npm run dev
# Open http://localhost:3000

# 4. Build for production
npm run build
npm start
```

---

## 🔑 Firebase Setup

1. Go to [console.firebase.google.com](https://console.firebase.google.com)
2. Create a project → Add Web App
3. Copy the config values to `.env.local`
4. Enable **Authentication** → Email/Password → Create admin user
5. Enable **Firestore Database** → Start in production mode
6. Add Firestore security rules:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /blogs/{blog} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

---

## 🌐 Deploy to Vercel (Free, Best for Next.js)

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# Add environment variables in Vercel Dashboard:
# Project Settings → Environment Variables → add all from .env.local
```

Or connect your GitHub repo at [vercel.com](https://vercel.com) — auto-deploys on every push.

---

## 🔍 Google SEO Indexing (Step-by-Step)

### Step 1 — Add your domain to Google Search Console
1. Go to [search.google.com/search-console](https://search.google.com/search-console)
2. Click "Add Property" → enter your domain
3. Verify ownership:
   - In `pages/_document.js`, uncomment and fill in:
     ```html
     <meta name="google-site-verification" content="YOUR_CODE" />
     ```

### Step 2 — Generate a sitemap (auto-updates with new blog posts)
```bash
npm install next-sitemap
```

Create `next-sitemap.config.js`:
```js
module.exports = {
  siteUrl: 'https://kuwaitindiadriving.com',
  generateRobotsTxt: true,
};
```

Add to `package.json` scripts:
```json
"postbuild": "next-sitemap"
```

### Step 3 — Submit sitemap to Google
In Search Console → Sitemaps → Enter `sitemap.xml` → Submit

### Step 4 — Google Business Profile (LOCAL SEO — most important!)
1. Go to [business.google.com](https://business.google.com)
2. Create your free profile for "Kuwait India Driving School"
3. Add address, phone, hours, photos
4. This makes you show up on Google Maps

### Step 5 — Wait & Monitor
- Google indexes new sites in 1–4 weeks
- Check Search Console for crawl errors and keyword rankings
- Write blog posts targeting keywords like:
  - "how to pass Kuwait driving test"
  - "driving school Kuwait price"
  - "driving lessons Kuwait Indians"

---

## 🔐 Admin Access

- URL: `/login` (or triple-click the logo on the homepage)
- After login you're redirected to `/admin`
- Create/edit blog posts at `/admin/editor`
