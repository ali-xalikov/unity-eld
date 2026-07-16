# Project Setup & Development Guide

## 🛠️ Technology Stack

### Frontend
- **React 19** - UI library
- **TypeScript 6.0** - Type safety
- **Vite 8.1** - Build tool & dev server
- **Tailwind CSS 4.3** - Styling
- **React Router 7.18** - Client-side routing
- **React Hook Form 7.81** - Form management
- **Lucide React 1.24** - Icons
- **Sonner 2.0** - Toast notifications

### Development Tools
- **ESLint 10** - Code linting
- **TypeScript ESLint** - TS linting
- **Tailwind CSS with Vite plugin** - Fast CSS compilation

## 📋 Project Structure

```
src/
├── pages/
│   ├── Login.tsx
│   └── dashboard/
│       ├── Dashboard.tsx
│       ├── Logs.tsx
│       ├── components/
│       │   ├── Sidebar.tsx
│       │   ├── TopHeader.tsx
│       │   ├── Toolbar.tsx
│       │   ├── LogsToolbar.tsx
│       │   ├── StatsBar.tsx
│       │   ├── StatsTabs.tsx
│       │   ├── DriversPanel.tsx
│       │   ├── DriversTable.tsx
│       │   ├── LogsTable.tsx
│       │   └── ... (other components)
│       ├── data/
│       │   └── drivers.ts
│       └── types/
│           └── driver.ts
├── routes/
│   └── router.tsx (HashRouter for GitHub Pages)
├── components/
│   └── ui/ (shadcn components)
├── App.tsx
├── main.tsx
└── index.css
```

## 🚀 Quick Start

### Installation
```bash
npm install
```

### Development Server
```bash
npm run dev
```
- Local: http://localhost:5173/unity-eld/
- HMR enabled for fast refresh

### Build for Production
```bash
npm run build
```
- TypeScript compilation + Vite build
- Output: `dist/` folder

### Deploy to GitHub Pages
```bash
npm run deploy
```
- Uses `gh-pages` package
- Auto-deploys `dist/` folder to `gh-pages` branch
- Live: https://ali-xalikov.github.io/unity-eld/

### Linting
```bash
npm run lint
```

## 🔐 Authentication & Routing

### Protected Routes
- All dashboard routes protected with `ProtectedRoute` component
- Checks `localStorage` for user authentication
- Redirects to login if not authenticated

### Router Configuration
- **Router Type**: `HashRouter` (for GitHub Pages compatibility)
- **URL Format**: `/#/dashboard/logs` (hash-based routing)
- **Base Path**: `/unity-eld/` (via vite.config.ts)

### Current Routes
```
/              - Login page (public)
/dashboard     - Dashboard (protected)
/dashboard/logs - Logs page (protected)
/*             - 404 page
```

## 🎨 UI Components

### Core Components
- **Sidebar**: Navigation menu with collapsible state
- **TopHeader**: Search bar, dark mode toggle, user profile
- **Toolbar**: Tab navigation and utility buttons
- **StatsBar**: Statistics display cards
- **StatsTabs**: Tab-based stats (On duty, Drive, Off duty, Sleeper)

### Dashboard Features
- **Drivers Panel**: Table with filtering, sorting, search
- **Logs Page**: Tabbed interface with validation columns
- **Table Expansion**: Dropdown for additional violation details

## 📱 Responsive Design

- Mobile-first approach with Tailwind CSS
- Sidebar collapse/expand on smaller screens
- Dark mode support across all components
- Accessible color contrasts and typography

## 🧪 Development Workflow

### Code Style
- TypeScript for type safety
- Tailwind CSS for styling (no CSS files)
- Functional components with React hooks
- Component-based architecture

### Best Practices
- Use `useState`, `useMemo`, `useCallback` for performance
- Separate concerns: components, data, types
- Keep components small and focused
- Use meaningful variable and component names

## 🐛 Debugging

### Browser DevTools
- React Developer Tools extension
- Network tab for API calls
- Console for errors/warnings

### Hot Module Replacement (HMR)
- Changes auto-refresh during `npm run dev`
- State preserved when possible
- Full page reload on critical changes

## 📦 Dependencies Management

### Update Packages
```bash
npm update
```

### Check for Vulnerabilities
```bash
npm audit
```

### Install New Package
```bash
npm install package-name
```

## 🚢 Production Checklist

- [ ] Build succeeds without warnings
- [ ] ESLint passes (`npm run lint`)
- [ ] TypeScript compilation succeeds
- [ ] GitHub Pages deployment successful
- [ ] All routes working in production
- [ ] Dark mode toggle working
- [ ] Responsive design on mobile
- [ ] No console errors/warnings

## 🔗 Useful Links

- GitHub Repository: https://github.com/ali-xalikov/unity-eld
- GitHub Pages: https://ali-xalikov.github.io/unity-eld/
- React Docs: https://react.dev
- Tailwind CSS: https://tailwindcss.com
- React Router: https://reactrouter.com
- Vite: https://vitejs.dev

## 📝 Git Workflow

### Common Commands
```bash
git add src/           # Stage source files
git commit -m "feat: description"
git push origin main
```

### Commit Message Format
- `feat:` - New feature
- `fix:` - Bug fix
- `refactor:` - Code refactoring
- `docs:` - Documentation
- `test:` - Tests
- `style:` - Code style changes

## 🤝 Contributing

1. Create feature branch: `git checkout -b feature/name`
2. Make changes and test locally
3. Commit with clear messages
4. Push to origin: `git push origin feature/name`
5. Create Pull Request on GitHub

## ⚙️ Environment Setup

### Required Software
- Node.js 18+ (for npm)
- Git
- Code Editor (VS Code recommended)

### VS Code Extensions (Recommended)
- ES7+ React/Redux/React-Native snippets
- Tailwind CSS IntelliSense
- TypeScript Vue Plugin
- ESLint
- Prettier

## 🆘 Troubleshooting

### Port 5173 Already in Use
```bash
# Kill process or use different port
npm run dev -- --port 5174
```

### GitHub Pages 404 Error
- Using `HashRouter` for SPA routing
- URL format: `https://ali-xalikov.github.io/unity-eld/#/path`
- Clear browser cache if needed

### Build Fails
```bash
# Clear cache and rebuild
rm -rf dist node_modules/.vite
npm run build
```

### TypeScript Errors
- Check `tsconfig.json` settings
- Ensure all imports are correct
- Run `npm run build` to get full error list

## 📞 Support

For issues or questions, check the GitHub repository issues page or refer to documentation links above.
