export type Activity = {
  id: string;
  type: string;
  title: string;
  description?: string;
  timestamp: number;
  agent_id?: string;
  metadata?: any;
  created_at: string;
};

export type CalendarEvent = {
  id: string;
  title: string;
  description?: string;
  start_time: number;
  end_time: number;
  type: string;
  status: string;
  attendees?: string[];
  created_at: string;
};

export type Task = {
  id: string;
  title: string;
  description?: string;
  status: string;
  priority: string;
  assignee?: string;
  due_date?: number;
  created_at: number;
  updated_at: number;
  tags?: string[];
};

export type Contact = {
  id: string;
  name: string;
  email?: string;
  company?: string;
  role?: string;
  status: string;
  last_contact?: number;
  notes?: string;
  tags?: string[];
  created_at: string;
};

export type ContentDraft = {
  id: string;
  title: string;
  type: string;
  status: string;
  content?: string;
  author?: string;
  scheduled_for?: number;
  created_at: number;
  updated_at: number;
  tags?: string[];
};

export type EcosystemProduct = {
  id: string;
  name: string;
  slug: string;
  category: string;
  description: string;
  website?: string;
  github?: string;
  status: string;
  features?: string[];
  integrations?: string[];
  last_updated: number;
  created_at: string;
};
