-- Mission Control Seed Data

-- Seed Activities
INSERT INTO activities (type, title, description, timestamp) VALUES
('system', 'System initialized', 'Mission Control dashboard started', EXTRACT(EPOCH FROM NOW() - INTERVAL '2 days') * 1000),
('agent', 'Agent task completed', 'Newsletter generation completed successfully', EXTRACT(EPOCH FROM NOW() - INTERVAL '6 hours') * 1000),
('task', 'New task created', 'Review Q1 performance metrics', EXTRACT(EPOCH FROM NOW() - INTERVAL '2 hours') * 1000);

-- Seed Calendar Events
INSERT INTO calendar_events (title, description, start_time, end_time, type, status, attendees) VALUES
('Weekly team sync', 'Discuss project status and blockers', EXTRACT(EPOCH FROM NOW() + INTERVAL '1 day') * 1000, EXTRACT(EPOCH FROM NOW() + INTERVAL '1 day 1 hour') * 1000, 'meeting', 'upcoming', ARRAY['team@example.com']),
('Product launch', 'Mission Control v1.0 release', EXTRACT(EPOCH FROM NOW() + INTERVAL '7 days') * 1000, EXTRACT(EPOCH FROM NOW() + INTERVAL '7 days 2 hours') * 1000, 'deadline', 'upcoming', NULL),
('Content review', 'Review newsletter drafts', EXTRACT(EPOCH FROM NOW() + INTERVAL '2 days') * 1000, EXTRACT(EPOCH FROM NOW() + INTERVAL '2 days 1 hour') * 1000, 'reminder', 'upcoming', NULL);

-- Seed Tasks
INSERT INTO tasks (title, description, status, priority, assignee, due_date, created_at, updated_at, tags) VALUES
('Implement agent monitoring dashboard', 'Build real-time monitoring interface for agent activities', 'in_progress', 'high', 'Agent Main', EXTRACT(EPOCH FROM NOW() + INTERVAL '3 days') * 1000, EXTRACT(EPOCH FROM NOW() - INTERVAL '5 days') * 1000, EXTRACT(EPOCH FROM NOW() - INTERVAL '2 hours') * 1000, ARRAY['development', 'dashboard']),
('Set up real-time sync', 'Configure Supabase for live data updates', 'completed', 'high', 'Agent Main', EXTRACT(EPOCH FROM NOW() - INTERVAL '1 day') * 1000, EXTRACT(EPOCH FROM NOW() - INTERVAL '6 days') * 1000, EXTRACT(EPOCH FROM NOW() - INTERVAL '1 day') * 1000, ARRAY['infrastructure']),
('Write API documentation', 'Document all API endpoints and usage', 'todo', 'medium', NULL, EXTRACT(EPOCH FROM NOW() + INTERVAL '7 days') * 1000, EXTRACT(EPOCH FROM NOW() - INTERVAL '3 days') * 1000, EXTRACT(EPOCH FROM NOW() - INTERVAL '3 days') * 1000, ARRAY['documentation']),
('Review content pipeline', 'Audit current content workflow and identify improvements', 'blocked', 'low', 'Agent Main', EXTRACT(EPOCH FROM NOW() + INTERVAL '10 days') * 1000, EXTRACT(EPOCH FROM NOW() - INTERVAL '7 days') * 1000, EXTRACT(EPOCH FROM NOW() - INTERVAL '1 day') * 1000, ARRAY['content', 'process']);

-- Seed Contacts
INSERT INTO contacts (name, email, company, role, status, last_contact, notes, tags) VALUES
('Sarah Chen', 'sarah@techcorp.com', 'TechCorp Inc', 'CTO', 'active', EXTRACT(EPOCH FROM NOW() - INTERVAL '3 days') * 1000, 'Interested in AI agent integration', ARRAY['enterprise', 'ai']),
('Mike Rodriguez', 'mike@startupxyz.io', 'StartupXYZ', 'Founder', 'lead', EXTRACT(EPOCH FROM NOW() - INTERVAL '7 days') * 1000, 'Follow up on demo request', ARRAY['startup', 'potential']),
('Emily Watson', 'emily@designco.com', 'DesignCo', 'Product Designer', 'active', EXTRACT(EPOCH FROM NOW() - INTERVAL '1 day') * 1000, 'Provided UI feedback', ARRAY['design', 'advisor']);

-- Seed Content Drafts
INSERT INTO content_drafts (title, type, status, content, author, scheduled_for, created_at, updated_at, tags) VALUES
('Mission Control Launch Announcement', 'article', 'review', 'Introducing Mission Control: The ultimate dashboard for AI agent monitoring...', 'Agent Main', EXTRACT(EPOCH FROM NOW() + INTERVAL '5 days') * 1000, EXTRACT(EPOCH FROM NOW() - INTERVAL '4 days') * 1000, EXTRACT(EPOCH FROM NOW() - INTERVAL '6 hours') * 1000, ARRAY['announcement', 'product']),
('Weekly Newsletter #42', 'newsletter', 'draft', 'This week in AI: Latest developments and trends...', 'Agent Main', EXTRACT(EPOCH FROM NOW() + INTERVAL '3 days') * 1000, EXTRACT(EPOCH FROM NOW() - INTERVAL '2 days') * 1000, EXTRACT(EPOCH FROM NOW() - INTERVAL '12 hours') * 1000, ARRAY['newsletter', 'weekly']),
('Agent Best Practices Guide', 'documentation', 'draft', 'A comprehensive guide to building and deploying AI agents...', 'Agent Main', NULL, EXTRACT(EPOCH FROM NOW() - INTERVAL '8 days') * 1000, EXTRACT(EPOCH FROM NOW() - INTERVAL '5 days') * 1000, ARRAY['documentation', 'guide']),
('Product Update: Real-time Monitoring', 'social', 'scheduled', '🚀 New feature alert! Real-time agent monitoring is now live in Mission Control.', 'Agent Main', EXTRACT(EPOCH FROM NOW() + INTERVAL '12 hours') * 1000, EXTRACT(EPOCH FROM NOW() - INTERVAL '1 day') * 1000, EXTRACT(EPOCH FROM NOW() - INTERVAL '3 hours') * 1000, ARRAY['social', 'feature']);

-- Seed Ecosystem Products
INSERT INTO ecosystem_products (name, slug, category, description, website, github, status, features, integrations, last_updated) VALUES
('OpenClaw', 'openclaw', 'ai', 'Open-source AI agent framework for building autonomous agents', 'https://openclaw.dev', 'https://github.com/openclaw/openclaw', 'active', ARRAY['Agent orchestration', 'Multi-modal support', 'Real-time monitoring'], ARRAY['Supabase', 'Vercel', 'Next.js'], EXTRACT(EPOCH FROM NOW() - INTERVAL '2 days') * 1000),
('Supabase', 'supabase', 'infrastructure', 'Open source Firebase alternative with real-time subscriptions', 'https://supabase.com', 'https://github.com/supabase/supabase', 'active', ARRAY['Real-time sync', 'PostgreSQL database', 'Built-in auth'], ARRAY['Next.js', 'React', 'TypeScript'], EXTRACT(EPOCH FROM NOW() - INTERVAL '1 day') * 1000),
('Next.js', 'nextjs', 'developer', 'The React framework for production with App Router and Server Components', 'https://nextjs.org', 'https://github.com/vercel/next.js', 'active', ARRAY['App Router', 'Server Components', 'Incremental Static Regeneration'], ARRAY['Vercel', 'Tailwind', 'TypeScript'], EXTRACT(EPOCH FROM NOW() - INTERVAL '3 days') * 1000),
('Tailwind CSS', 'tailwind', 'developer', 'A utility-first CSS framework for rapid UI development', 'https://tailwindcss.com', 'https://github.com/tailwindlabs/tailwindcss', 'active', ARRAY['Utility classes', 'JIT compiler', 'Design system'], ARRAY['Next.js', 'React', 'Vue'], EXTRACT(EPOCH FROM NOW() - INTERVAL '5 days') * 1000);
