# Mission Control

> Real-time dashboard for OpenClaw agent monitoring with Supabase real-time backend

A Next.js 15 application featuring a JARVIS/Bloomberg terminal aesthetic with glass morphism design and real-time data subscriptions.

## Features

- **8 Main Pages:**
  - **Home** - Dashboard overview with system health and metrics
  - **Ops** - Operations, tasks, and calendar management (3 tabs)
  - **Agents** - Agent and model monitoring (2 tabs)
  - **Chat** - Interactive chat and command interface (2 tabs)
  - **Content** - Content pipeline kanban board
  - **Comms** - Communications and CRM (2 tabs)
  - **Knowledge** - Documentation and ecosystem products (2 tabs + detail pages)
  - **Code** - Repository monitoring and activity

- **Real-time Updates** - Supabase real-time subscriptions for instant data sync
- **Dark Mode Only** - JARVIS-inspired terminal aesthetic
- **Glass Morphism** - Premium UI with backdrop blur effects
- **Responsive** - Mobile-first design tested at 320px
- **Animations** - Framer Motion for smooth transitions
- **Tab Navigation** - URL-based tab state management

## Tech Stack

- **Next.js 15** (App Router)
- **Supabase** (Real-time PostgreSQL backend)
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

2. **Environment Variables:**
   Create `.env.local` with:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://pjmovqesvyrpenekpvfo.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
   ```

3. **Database Setup:**
   The schema and seed data have been created in Supabase:
   - `activities` - System and agent activity logs
   - `calendar_events` - Meetings, deadlines, reminders
   - `tasks` - Task management with statuses
   - `contacts` - CRM contacts
   - `content_drafts` - Content pipeline
   - `ecosystem_products` - Product ecosystem catalog

4. **Run development server:**
   ```bash
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
│   └── providers.tsx      # React context providers
├── components/            # React components
│   ├── nav.tsx           # Top navigation
│   ├── tab-bar.tsx       # Tab navigation component
│   └── ui/               # ShadCN UI components
├── lib/                  # Utilities
│   └── supabase/        # Supabase client & hooks
│       ├── client.ts    # Browser client
│       ├── hooks.ts     # Real-time query hooks
│       └── types.ts     # TypeScript types
├── supabase-schema.sql  # Database schema
└── supabase-seed.sql    # Seed data
```

## Real-time Features

Mission Control uses Supabase real-time subscriptions for live updates:

```typescript
// Example: Real-time tasks subscription
const tasks = useTasks(); // Auto-updates on database changes
```

All data hooks automatically subscribe to changes and re-fetch when:
- New records are inserted
- Existing records are updated
- Records are deleted

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

### GitHub
Repository: `https://github.com/mwp137asmly/mission-control`

### Vercel

Deploy with the existing token:
```bash
npx vercel --prod --yes --token="YOUR_VERCEL_TOKEN"
```

Set environment variables in Vercel:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## Supabase Integration

### Using the SQL API
For remote SQL execution:
```bash
curl -X POST "https://web-kappa-navy-37.vercel.app/api/admin/sql" \
  -H "Content-Type: application/json" \
  -d '{"secret": "cosmo-sql-x7k9m2", "sql": "YOUR SQL HERE"}'
```

### Real-time Subscriptions
Tables have real-time enabled with RLS policies allowing full access.

## Development

### Adding New Features
1. Create database tables in Supabase
2. Add TypeScript types in `lib/supabase/types.ts`
3. Create hooks in `lib/supabase/hooks.ts`
4. Build components with real-time data

### Custom Hooks Pattern
```typescript
export function useYourData() {
  const [data, setData] = useState(null);
  const supabase = createClient();

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await supabase.from('table').select('*');
      setData(data);
    };
    
    fetchData();
    
    const channel = supabase
      .channel('changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'table' }, fetchData)
      .subscribe();
      
    return () => supabase.removeChannel(channel);
  }, []);
  
  return data;
}
```

## License

MIT

---

Built with ❤️ for OpenClaw using Supabase real-time
