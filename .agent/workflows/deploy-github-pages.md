---
description: Deploy the project to GitHub Pages so you can share the mockup via a public URL
---

# Deploy to GitHub Pages

## Prerequisites
- You need a GitHub repository for this project
- The repository must be public (or you need GitHub Pro for private Pages)

## Steps

### 1. Initialize Git (if not already done)
```bash
cd d:\codeProjects\webdev\mockup-redstonebench
git init
```

### 2. Create GitHub Repository
Go to https://github.com/new and create a new repository (e.g. `mockup-redstonebench`). Do NOT initialize with README.

### 3. Add the remote
```bash
git remote add origin https://github.com/YOUR_USERNAME/mockup-redstonebench.git
```

### 4. Set the base path in vite.config.js
Update `vite.config.js` to set the base path to your repo name:
```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 4000,
  },
  base: '/mockup-redstonebench/',
})
```
> **Important:** Replace `mockup-redstonebench` with your actual repository name if different.

### 5. Create the GitHub Actions workflow file
// turbo
Create the file `.github/workflows/deploy.yml` with the following content:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: ['main']
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: 'pages'
  cancel-in-progress: true

jobs:
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'
      - name: Install dependencies
        run: npm ci
      - name: Build
        run: npm run build
      - name: Setup Pages
        uses: actions/configure-pages@v5
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: './dist'
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

### 6. Commit and push
```bash
git add .
git commit -m "Initial commit with GitHub Pages deployment"
git branch -M main
git push -u origin main
```

### 7. Enable GitHub Pages
1. Go to your repository on GitHub
2. Navigate to **Settings** → **Pages**
3. Under **Source**, select **GitHub Actions**
4. The workflow will run automatically on push

### 8. Access your site
After the workflow completes (~1-2 minutes), your site will be live at:
```
https://YOUR_USERNAME.github.io/mockup-redstonebench/
```

## Redeploying
Any push to the `main` branch will automatically trigger a new deployment.
