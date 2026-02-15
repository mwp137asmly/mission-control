-- Mission Control Database Schema for Supabase

-- Activities table
CREATE TABLE IF NOT EXISTS activities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  timestamp BIGINT NOT NULL,
  agent_id TEXT,
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_activities_timestamp ON activities(timestamp DESC);
CREATE INDEX IF NOT EXISTS idx_activities_type ON activities(type);

-- Calendar Events table
CREATE TABLE IF NOT EXISTS calendar_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  start_time BIGINT NOT NULL,
  end_time BIGINT NOT NULL,
  type TEXT NOT NULL,
  status TEXT NOT NULL,
  attendees TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_calendar_events_start_time ON calendar_events(start_time);
CREATE INDEX IF NOT EXISTS idx_calendar_events_status ON calendar_events(status);

-- Tasks table
CREATE TABLE IF NOT EXISTS tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  status TEXT NOT NULL,
  priority TEXT NOT NULL,
  assignee TEXT,
  due_date BIGINT,
  created_at BIGINT NOT NULL,
  updated_at BIGINT NOT NULL,
  tags TEXT[]
);

CREATE INDEX IF NOT EXISTS idx_tasks_status ON tasks(status);
CREATE INDEX IF NOT EXISTS idx_tasks_priority ON tasks(priority);
CREATE INDEX IF NOT EXISTS idx_tasks_due_date ON tasks(due_date);

-- Contacts table
CREATE TABLE IF NOT EXISTS contacts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT,
  company TEXT,
  role TEXT,
  status TEXT NOT NULL,
  last_contact BIGINT,
  notes TEXT,
  tags TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_contacts_status ON contacts(status);
CREATE INDEX IF NOT EXISTS idx_contacts_name ON contacts(name);

-- Content Drafts table
CREATE TABLE IF NOT EXISTS content_drafts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  type TEXT NOT NULL,
  status TEXT NOT NULL,
  content TEXT,
  author TEXT,
  scheduled_for BIGINT,
  created_at BIGINT NOT NULL,
  updated_at BIGINT NOT NULL,
  tags TEXT[]
);

CREATE INDEX IF NOT EXISTS idx_content_drafts_status ON content_drafts(status);
CREATE INDEX IF NOT EXISTS idx_content_drafts_type ON content_drafts(type);

-- Ecosystem Products table
CREATE TABLE IF NOT EXISTS ecosystem_products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  category TEXT NOT NULL,
  description TEXT NOT NULL,
  website TEXT,
  github TEXT,
  status TEXT NOT NULL,
  features TEXT[],
  integrations TEXT[],
  last_updated BIGINT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_ecosystem_products_slug ON ecosystem_products(slug);
CREATE INDEX IF NOT EXISTS idx_ecosystem_products_category ON ecosystem_products(category);
CREATE INDEX IF NOT EXISTS idx_ecosystem_products_status ON ecosystem_products(status);

-- Enable Row Level Security
ALTER TABLE activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE calendar_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE content_drafts ENABLE ROW LEVEL SECURITY;
ALTER TABLE ecosystem_products ENABLE ROW LEVEL SECURITY;

-- Create policies (allow all for now - adjust based on auth requirements)
CREATE POLICY "Allow all for activities" ON activities FOR ALL USING (true);
CREATE POLICY "Allow all for calendar_events" ON calendar_events FOR ALL USING (true);
CREATE POLICY "Allow all for tasks" ON tasks FOR ALL USING (true);
CREATE POLICY "Allow all for contacts" ON contacts FOR ALL USING (true);
CREATE POLICY "Allow all for content_drafts" ON content_drafts FOR ALL USING (true);
CREATE POLICY "Allow all for ecosystem_products" ON ecosystem_products FOR ALL USING (true);
