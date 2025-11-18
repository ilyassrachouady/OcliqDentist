# 🚀 DentalFlow - Vercel Deployment Guide

## Pre-Deployment Checklist

### ✅ Prerequisites
- [ ] Node.js 18+ installed
- [ ] Vercel CLI installed (`npm i -g vercel`)
- [ ] Git repository setup
- [ ] Environment variables configured

### ✅ Build Verification
```bash
# Clean and build for production
npm run clean
npm run build:production

# Test build locally
npm run preview
```

## 🔧 Environment Configuration

### Required Environment Variables
Copy `.env.example` to `.env.local` and configure:

```env
VITE_APP_TITLE=DentalFlow - Cabinet Dentaire
VITE_APP_DESCRIPTION=Système de gestion pour cabinets dentaires au Maroc
VITE_API_URL=https://your-api-domain.com
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
VITE_ENVIRONMENT=production
```

### Vercel Dashboard Configuration
1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Import your GitHub repository
3. Add environment variables in Project Settings

## 🌍 Deployment Options

### Option 1: Automatic Deployment (Recommended)
```bash
# Connect repository to Vercel
vercel --prod

# Future deployments will be automatic on git push
```

### Option 2: Manual Deployment
```bash
# Build locally and deploy
npm run build:production
vercel --prebuilt --prod
```

### Option 3: GitHub Integration
1. Connect repository to Vercel
2. Auto-deploy on push to `main` branch
3. Preview deployments on pull requests

## 🎯 Production Optimizations

### Performance Features
- ✅ **Code Splitting** - Vendor/UI/Utils chunks
- ✅ **Asset Caching** - 1 year cache for static assets
- ✅ **Minification** - Terser for JS, native for CSS
- ✅ **Tree Shaking** - Dead code elimination
- ✅ **Security Headers** - XSS, CSRF protection

### Vercel Edge Network
- ✅ **Global CDN** - Deployed to France/Europe regions
- ✅ **SPA Routing** - All routes redirect to index.html
- ✅ **Compression** - Automatic gzip/brotli compression

## 🔍 Post-Deployment Testing

### Manual Tests
- [ ] Homepage loads correctly
- [ ] All routes work (booking, dashboard, auth)
- [ ] Mobile responsiveness
- [ ] Form submissions
- [ ] Appointment booking flow

### Performance Tests
```bash
# Lighthouse CI (optional)
npx lighthouse https://your-app.vercel.app --view

# Core Web Vitals check
# Use Google PageSpeed Insights
```

## 🛡️ Security Configuration

### Headers Applied
```json
{
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
  "X-XSS-Protection": "1; mode=block",
  "Referrer-Policy": "strict-origin-when-cross-origin"
}
```

### Content Security Policy (Future)
Consider adding CSP headers for enhanced security:
```json
{
  "Content-Security-Policy": "default-src 'self'; img-src 'self' data: https:; style-src 'self' 'unsafe-inline'"
}
```

## 🌐 Custom Domain Setup

### Add Custom Domain
1. In Vercel dashboard → Project → Settings → Domains
2. Add your domain: `dentistes.ma` or `cabinet-dentaire.ma`
3. Configure DNS records as instructed
4. SSL certificate will be auto-generated

### Domain Configuration
```bash
# Add domain via CLI
vercel domains add dentistes.ma
vercel domains ls
```

## 📊 Monitoring & Analytics

### Built-in Vercel Analytics
- Enable in Project Settings → Analytics
- Real-time performance monitoring
- Core Web Vitals tracking

### Custom Analytics Setup
```typescript
// Add to main.tsx if needed
if (import.meta.env.VITE_ENABLE_ANALYTICS) {
  // Initialize analytics
}
```

## 🔄 CI/CD Pipeline

### GitHub Actions (Optional)
```yaml
# .github/workflows/deploy.yml
name: Deploy to Vercel
on: [push]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Install dependencies
        run: npm ci
      - name: Build project
        run: npm run build:production
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
```

## 🚨 Troubleshooting

### Common Issues
1. **404 on routes** - Check vercel.json rewrites
2. **Build fails** - Run `npm run typecheck` locally
3. **Environment variables** - Ensure they start with `VITE_`
4. **Large bundle** - Check chunk analysis

### Debug Commands
```bash
# Check build locally
npm run build
npm run preview

# Analyze bundle size
npm run build -- --mode=analyze

# Vercel logs
vercel logs your-deployment-url
```

## ✅ Go Live Checklist

### Final Verification
- [ ] All environment variables set
- [ ] Build passes without errors
- [ ] All routes accessible
- [ ] Mobile/desktop responsive
- [ ] Forms work correctly
- [ ] Performance score > 90
- [ ] Security headers present
- [ ] Custom domain configured (if needed)
- [ ] Analytics enabled
- [ ] Error monitoring setup

## 🎉 Success!

Your DentalFlow app is now live on Vercel! 

**Production URL**: https://your-app.vercel.app
**Dashboard**: https://vercel.com/dashboard

---

*🇲🇦 Optimized for Moroccan dental practices with MAD currency and French localization.*