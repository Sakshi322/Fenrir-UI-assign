# APS – Security Platform

> Expert level Cybersecurity in hours, not weeks.

A production-grade B2B SaaS security scanning dashboard built with React and Vite. Implements three fully connected screens — Login, Dashboard, and Active Scan Detail — with dark/light mode, responsive layout, and realistic mock data.

---

## Live Demo

> Deploy to Vercel or Netlify and paste your URL here.

---

## Screenshots

| Login | Dashboard | Scan Detail |
|-------|-----------|-------------|
| Sign-up form with gradient background | Scan table with severity counters | Live console with finding log |

---

## Tech Stack

| Layer | Technology | Version | Why |
|-------|-----------|---------|-----|
| Framework | React | 18 | Component model, hooks-based state |
| Build Tool | Vite | 5 | Fast HMR, ESM-native bundler |
| Language | JavaScript (JSX) | ES2022 | No extra compile step |
| Styling | Inline styles + CSS-in-JS | — | Zero dependency, theme-aware at runtime |
| Fonts | DM Sans (Google Fonts) | — | Clean, professional sans-serif |
| State | React useState | built-in | No external state library needed |
| Routing | Manual screen state | built-in | 3 screens only, no router overhead |
| Data | Hardcoded JSON (mockData.js) | — | No backend required |
| Deployment | Vercel / Netlify | — | Static site, no server needed |

---

## Project Structure

```
aps-security/
├── index.html                        # Entry HTML, Google Fonts import
├── vite.config.js                    # Vite config (default)
├── package.json
├── README.md
└── src/
    ├── main.jsx                      # React DOM root mount
    ├── App.jsx                       # Root component, screen router, global state
    ├── theme.js                      # Dark/light token objects
    ├── data/
    │   └── mockData.js               # SCANS, LOGS, FINDINGS arrays
    ├── components/
    │   ├── Sidebar.jsx               # Collapsible nav sidebar
    │   ├── TopBar.jsx                # Breadcrumb + action buttons
    │   └── atoms/
    │       ├── Badge.jsx             # Severity badge (Critical/High/Medium/Low)
    │       ├── Chip.jsx              # Status chip (Completed/Scheduled/Failed)
    │       ├── VulnBadges.jsx        # Colored vulnerability count badges
    │       ├── ProgressBar.jsx       # Scan progress bar
    │       ├── Button.jsx            # Reusable button (primary/outline/danger)
    │       └── Toast.jsx             # Auto-dismiss toast notification
    └── pages/
        ├── Login.jsx                 # Screen 1 – Sign-up page
        ├── Dashboard.jsx             # Screen 2 – Scan list overview
        ├── ScanDetail.jsx            # Screen 3 – Active scan console
        └── NewScanModal.jsx          # New scan creation modal
```

---

## Setup Instructions

### Prerequisites

Make sure you have the following installed:

- **Node.js** v18 or higher — [Download](https://nodejs.org)
- **npm** v9 or higher (comes with Node.js)

Verify with:

```bash
node --version   # should print v18.x.x or higher
npm --version    # should print 9.x.x or higher
```

---

### Installation

**Step 1 — Create a new Vite + React project**

```bash
npm create vite@latest aps-security -- --template react
cd aps-security
```

**Step 2 — Install dependencies**

```bash
npm install
```

**Step 3 — Replace the default source files**

Delete everything inside the `src/` folder, then create the following files and paste the provided code into each one:

```
src/theme.js
src/main.jsx
src/App.jsx
src/data/mockData.js
src/components/Sidebar.jsx
src/components/TopBar.jsx
src/components/atoms/Badge.jsx
src/components/atoms/Chip.jsx
src/components/atoms/VulnBadges.jsx
src/components/atoms/ProgressBar.jsx
src/components/atoms/Button.jsx
src/components/atoms/Toast.jsx
src/pages/Login.jsx
src/pages/Dashboard.jsx
src/pages/ScanDetail.jsx
src/pages/NewScanModal.jsx
```

Also replace `index.html` in the project root with the provided version.

**Step 4 — Start the development server**

```bash
npm run dev
```

Open your browser at **http://localhost:5173**

---

### Build for Production

```bash
npm run build
```

This outputs a `dist/` folder with static files ready to deploy.

Preview the production build locally:

```bash
npm run preview
```

---

## Deployment

### Deploy to Netlify

**Option A — Drag and drop (fastest)**
1. Run `npm run build`
2. Go to [app.netlify.com/drop](https://app.netlify.com/drop)
3. Drag the `dist/` folder onto the page
4. Your site is live instantly

**Option B — CLI**
```bash
npm install -g netlify-cli
netlify login
npm run build
netlify deploy --prod --dir=dist
```

---

### Deploy to Vercel

**Option A — CLI**
```bash
npm install -g vercel
vercel login
vercel --prod
```

**Option B — GitHub**
1. Push this repo to GitHub
2. Go to [vercel.com/new](https://vercel.com/new)
3. Import your repository
4. Vercel auto-detects Vite — click **Deploy**

---

## Navigation Guide

| Action | Result |
|--------|--------|
| Fill form + check Terms box + click **Create account** | Navigate to Dashboard |
| Click any **scan row** in the table | Navigate to Scan Detail |
| Click **Private Assets** in the breadcrumb | Go back to Dashboard |
| Click **☀ Light Mode / ☾ Dark Mode** | Toggle theme globally |
| Click **‹** at bottom of sidebar | Collapse/expand sidebar |
| Click **+ New scan** | Open new scan modal |
| Click **Export Report** | Toast notification |
| Click **Stop Scan** | Toast notification |
| Click **Activity Log / Verification Loops** tabs | Switch console tab |

---

## Features

### Implemented
- **3 fully connected screens** — Login → Dashboard → Scan Detail
- **Dark mode and light mode** — togglable globally, persists across navigation
- **Collapsible sidebar** — collapses to icon-only mode
- **Scan table** — search by name/type, pagination (15 per page)
- **Interactive elements** — tabs, modal, toast notifications, hover states
- **Severity system** — Critical (red), High (orange), Medium (amber), Low (green)
- **Status chips** — Completed (green), Scheduled (gray), Failed (red)
- **Vulnerability badges** — colored count badges per severity
- **Progress bars** — teal for healthy, red for failed scans
- **Live console** — Activity Log tab with colored inline syntax highlights
- **Finding log** — vulnerability cards with severity, endpoint, description
- **Status bar** — sub-agents, parallel executions, operations, per-severity counts
- **New scan modal** — name, target URL, scan type fields
- **Responsive sidebar** — collapses on smaller viewports
- **Form validation** — login form validates all fields before submission

### Mock Data
All data is hardcoded in `src/data/mockData.js`. No API calls are made. To add more scans, simply add entries to the `SCANS` array.

---

## Known Limitations

### No Backend / Persistence
- All data is mock/static. Refreshing the page resets all state.
- There is no authentication — the login form accepts any valid-looking input.
- Created scans via the modal are not added to the scan table (toast only).
- Scan progress does not animate or update in real time.

### Routing
- Navigation uses React `useState` instead of React Router. Browser back/forward buttons do not work between screens.
- Deep linking is not supported (e.g., directly visiting `/dashboard` will not work on a deployed static site without redirect rules).

### Responsiveness
- The layout is optimised for desktop (1280px+) and a collapsed sidebar on smaller screens.
- On screens below 768px, the scan table columns may overflow — horizontal scrolling is enabled but the experience is not fully restructured for mobile.
- The login page split layout stacks awkwardly below ~600px width.

### Theme
- Theme preference is not persisted to `localStorage` — refreshing the page resets to dark mode.

### Scan Detail
- The circular progress indicator always shows 0% (static mock).
- The step tracker always shows "Spidering" as the active step.
- The console log does not stream new entries in real time.
- The Finding Log always shows the same 3 findings regardless of which scan is clicked.

### Accessibility
- ARIA labels are partially implemented. Full keyboard navigation and screen reader support is not complete.
- Focus trapping inside the modal is not implemented.

### Browser Support
- Tested on Chrome and Firefox (latest).
- Internet Explorer is not supported.

---

## Customisation

### Change the color theme
Edit `src/theme.js` — swap out any token values. The primary accent color `#0CC8A8` (teal) is used throughout for active states, CTAs, and progress indicators.

### Add more scans
Open `src/data/mockData.js` and add objects to the `SCANS` array following this shape:

```js
{
  id: 16,
  name: 'My New Scan',
  type: 'Greybox',       // 'Greybox' | 'Blackbox' | 'Whitebox'
  status: 'Completed',   // 'Completed' | 'Scheduled' | 'Failed'
  progress: 100,         // 0–100
  vuln: [3, 8, 12, 5],  // [critical, high, medium, low]
  last: '1d ago',
}
```

### Add real routing
Install React Router:

```bash
npm install react-router-dom
```

Then replace the `screen` state logic in `App.jsx` with `<BrowserRouter>`, `<Routes>`, and `<Route>` components.

---

## Author

Built as part of the Fenrir Security Frontend Design Challenge.