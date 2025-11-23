# 🚀 How to Deploy to Vercel

Follow these simple steps to deploy your CPU Scheduler to Vercel:

## Method 1: Using Vercel Dashboard (Recommended)

### Step 1: Push to GitHub

```bash
# Navigate to your project
cd cpu-scheduler-web

# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Ready for deployment"

# Create a new repository on GitHub, then:
git remote add origin https://github.com/YOUR_USERNAME/cpu-scheduler-web.git
git branch -M main
git push -u origin main
```

### Step 2: Deploy on Vercel

1. Go to [vercel.com](https://vercel.com)
2. Sign in with GitHub
3. Click **"Add New Project"**
4. Select your `cpu-scheduler-web` repository
5. Vercel will automatically detect it's a Next.js project
6. Click **"Deploy"**
7. Wait 1-2 minutes ✨
8. Your app is live! 🎉

### Step 3: Get Your Live URL

Vercel will give you a URL like:
- `https://cpu-scheduler-web.vercel.app`
- You can customize this in Vercel dashboard settings

---

## Method 2: Using Vercel CLI

```bash
# Install Vercel CLI globally
npm install -g vercel

# Navigate to your project
cd cpu-scheduler-web

# Login to Vercel
vercel login

# Deploy (preview)
vercel

# Deploy to production
vercel --prod
```

---

## Method 3: One-Click Deploy Button

Add this to your GitHub README:

```markdown
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/YOUR_USERNAME/cpu-scheduler-web)
```

---

## ⚙️ Environment & Settings

No environment variables needed! This app runs completely on the frontend.

### Build Settings (Auto-detected)
- **Framework Preset:** Next.js
- **Build Command:** `npm run build`
- **Output Directory:** `.next`
- **Install Command:** `npm install`

---

## 🎨 Custom Domain (Optional)

1. In Vercel dashboard, go to your project
2. Click **Settings** → **Domains**
3. Add your custom domain
4. Follow Vercel's DNS configuration instructions

---

## 📊 After Deployment

Your app will be available at:
- Production: `https://your-project.vercel.app`
- Every commit to `main` branch auto-deploys
- Pull requests get preview deployments automatically

### Monitoring
- Vercel provides automatic HTTPS
- Built-in analytics
- Performance monitoring
- Real-time logs

---

## ✅ Checklist Before Deploying

- [ ] Test locally with `npm run dev`
- [ ] Build successfully with `npm run build`
- [ ] Update `README.md` with your info
- [ ] Add your GitHub username in code
- [ ] Commit all changes
- [ ] Push to GitHub

---

## 🔧 Troubleshooting

### Build Failed?
```bash
# Test the build locally first
npm run build

# If successful, commit and push again
git add .
git commit -m "Fix build"
git push
```

### Dependencies Error?
Make sure `package.json` has all dependencies:
```bash
npm install
```

---

## 📱 Features You Get on Vercel

✅ Automatic HTTPS  
✅ Global CDN  
✅ Zero-config deployment  
✅ Preview deployments for PRs  
✅ Automatic performance optimization  
✅ Free SSL certificate  
✅ 99.99% uptime  
✅ Real-time collaboration  

---

## 🌟 Next Steps After Deployment

1. Share your live URL on LinkedIn/Twitter
2. Add the link to your resume
3. Include it in your portfolio
4. Show it in your college projects

**Example:**
> "Deployed CPU Scheduling Simulator - [Live Demo](https://your-app.vercel.app)"

---

## 💡 Pro Tips

1. **Custom URL:** Go to Vercel settings to customize your URL
2. **Analytics:** Enable Vercel Analytics for visitor stats
3. **SEO:** Your metadata is already set in `layout.tsx`
4. **Updates:** Just push to GitHub - Vercel auto-deploys!

---

Need help? Check [Vercel Docs](https://vercel.com/docs) or open an issue!
