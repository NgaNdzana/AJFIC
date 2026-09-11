# AJFIC

Connects legal and fiscal professionals in Cameroon by providing news, resources, event updates, and streamlined membership registration with secure document upload and payment.

## Tech Stack

- **React 19** - UI library
- **Vite 8** - Build tool and dev server
- **Tailwind CSS v4** - Styling
- **TypeScript 5.7** - Type safety

## Development

### Prerequisites

- Node.js (version specified in `.mise.toml`)
- pnpm package manager

### Installation

```bash
pnpm install
```

### Development Server

```bash
pnpm dev
```

The development server runs on port 8443 by default.

### Build

```bash
pnpm build
```

### Preview Production Build

```bash
pnpm preview
```

## Deployment

### Vercel Deployment

This project is configured for Vercel deployment:

1. **Create a GitHub repository** (if you haven't already)
   - Go to GitHub.com and create a new repository
   - Copy the repository URL

2. **Add the remote to your local git repository**:
   ```bash
   git remote add origin <your-github-repository-url>
   git push -u origin master
   ```

3. **Deploy to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New Project"
   - Import your GitHub repository
   - Vercel will automatically detect the configuration from `vercel.json`
   - Click "Deploy"

The `vercel.json` configuration file includes:
- Build command: `pnpm build`
- Output directory: `dist`
- Install command: `pnpm install`
- Framework: Vite
- SPA routing support via rewrites

### Manual Deployment

If you prefer manual deployment:

```bash
pnpm build
```

Upload the contents of the `dist/` directory to your hosting provider.

## Project Structure

- `src/App.tsx` - Main application component
- `src/main.tsx` - React entry point
- `src/index.css` - Global styles and Tailwind CSS import
- `public/` - Static assets (including favicon)
- `.figma/make/site.json` - Site configuration (metadata, SEO, etc.)
- `vite.config.ts` - Vite configuration with Figma Make plugins

## Configuration

### Site Metadata

Edit `.figma/make/site.json` to configure:
- Site title and description
- Favicon and social images
- SEO settings
- Google Analytics ID
- Custom scripts

### Favicon

The favicon is configured in `.figma/make/site.json` and located at `public/favicon.png`.