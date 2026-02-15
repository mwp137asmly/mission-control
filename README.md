# Mission Control

> Real-time dashboard for OpenClaw agent monitoring and management

A Next.js 15 application with Convex real-time backend, featuring a JARVIS/Bloomberg terminal aesthetic with glass morphism design.

## Features

- **8 Main Pages:**
  - **Home** - Dashboard overview with system health and metrics
  - **Ops** - Operations, tasks, and calendar management
  - **Agents** - Agent and model monitoring
  - **Chat** - Interactive chat and command interface
  - **Content** - Content pipeline kanban board
  - **Comms** - Communications and CRM
  - **Knowledge** - Documentation and ecosystem products
  - **Code** - Repository monitoring and activity

- **Real-time Updates** - Convex backend for instant data sync
- **Dark Mode Only** - JARVIS-inspired terminal aesthetic
- **Glass Morphism** - Premium UI with backdrop blur effects
- **Responsive** - Mobile-first design tested at 320px
- **Animations** - Framer Motion for smooth transitions
- **Tab Navigation** - URL-based tab state management

## Tech Stack

- **Next.js 15** (App Router)
- **Convex** (Real-time backend)
- **Tailwind CSS v4**
- **Framer Motion**
- **ShadCN UI**
- **Lucide Icons**
- **TypeScript**

## Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up Convex:**
   ```bash
   # Run Convex dev server (first terminal)
   npm run convex
   
   # Follow the prompts to create/login to account
   # Or run locally without account
   ```

3. **Seed the database:**
   ```bash
   npm run seed
   ```

4. **Run development server:**
   ```bash
   # In second terminal
   npm run dev
   ```

5. **Open the app:**
   ```
   http://localhost:3000
   ```

## Project Structure

```
mission-control/
├── app/                    # Next.js App Router pages
│   ├── agents/            # Agents page
│   ├── chat/              # Chat page
│   ├── code/              # Code repositories page
│   ├── comms/             # Communications page
│   ├── content/           # Content pipeline page
│   ├── knowledge/         # Knowledge base & ecosystem
│   │   └── ecosystem/[slug]/  # Ecosystem detail pages
│   ├── ops/               # Operations page
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   ├── providers.tsx      # Convex provider
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── nav.tsx           # Top navigation
│   ├── tab-bar.tsx       # Tab navigation component
│   └── ui/               # ShadCN UI components
├── convex/               # Convex backend
│   ├── activities.ts     # Activity functions
│   ├── calendar.ts       # Calendar functions
│   ├── contacts.ts       # Contact functions
│   ├── content.ts        # Content functions
│   ├── ecosystem.ts      # Ecosystem functions
│   ├── tasks.ts          # Task functions
│   ├── schema.ts         # Database schema
│   └── seed.ts           # Seed data
└── lib/                  # Utilities
```

## Design System

### Colors
- Background: `#0a0a0a`
- Glass cards: `bg-white/[0.03]` with `backdrop-blur-xl`
- Borders: `border-white/[0.06]`
- Text: `text-white` with opacity variants

### Components
- **Glass Cards:** `.glass-card` utility class
- **Rounded Corners:** 16-20px
- **Custom Scrollbars:** Minimal dark theme
- **Fluid Typography:** `clamp()` for responsive text

### Animations
- Page transitions with Framer Motion
- Stagger animations (0.05s delay)
- Spring physics for smooth interactions
- layoutId transitions for tabs

## Deployment

### Vercel

1. **Push to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/mwp137asmly/mission-control.git
   git push -u origin main
   ```

2. **Deploy to Vercel:**
   ```bash
   npx vercel --prod --yes --token="YOUR_VERCEL_TOKEN"
   ```

3. **Set up Convex production:**
   - Run `npx convex deploy` to create production deployment
   - Update `NEXT_PUBLIC_CONVEX_URL` in Vercel environment variables

## API Integration

The dashboard is designed to read from the OpenClaw workspace:

```
~/.openclaw/workspace/
```

Future API routes will:
- Read system state files
- Monitor agent logs
- Track cron job health
- Aggregate metrics

## Development

### Adding New Pages
1. Create page in `app/[name]/page.tsx`
2. Add route to `components/nav.tsx`
3. Follow existing patterns for layout and animations

### Adding Convex Tables
1. Define table in `convex/schema.ts`
2. Create functions in `convex/[table].ts`
3. Generate types: `npx convex dev`
4. Use in components: `useQuery(api.[table].list)`

### Styling Guidelines
- Use `glass-card` for containers
- Fluid text sizing with `text-fluid-*`
- Animations with Framer Motion
- Mobile-first responsive design

## License

MIT

---

Built with ❤️ for OpenClaw
