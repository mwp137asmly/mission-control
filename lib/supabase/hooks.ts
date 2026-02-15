"use client";

import { useEffect, useState } from 'react';
import { createClient } from './client';
import type { Activity, CalendarEvent, Task, Contact, ContentDraft, EcosystemProduct } from './types';

export function useActivities(limit = 50) {
  const [data, setData] = useState<Activity[] | null>(null);
  const supabase = createClient();

  useEffect(() => {
    // Initial fetch
    const fetchData = async () => {
      const { data, error } = await supabase
        .from('activities')
        .select('*')
        .order('timestamp', { ascending: false })
        .limit(limit);
      
      if (!error) setData(data);
    };

    fetchData();

    // Real-time subscription
    const channel = supabase
      .channel('activities-changes')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'activities' },
        () => fetchData()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [limit]);

  return data;
}

export function useTasks() {
  const [data, setData] = useState<Task[] | null>(null);
  const supabase = createClient();

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from('tasks')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (!error) setData(data);
    };

    fetchData();

    const channel = supabase
      .channel('tasks-changes')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'tasks' },
        () => fetchData()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return data;
}

export function useCalendarEvents() {
  const [data, setData] = useState<CalendarEvent[] | null>(null);
  const supabase = createClient();

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from('calendar_events')
        .select('*')
        .order('start_time', { ascending: true });
      
      if (!error) setData(data);
    };

    fetchData();

    const channel = supabase
      .channel('calendar-changes')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'calendar_events' },
        () => fetchData()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return data;
}

export function useContacts() {
  const [data, setData] = useState<Contact[] | null>(null);
  const supabase = createClient();

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from('contacts')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (!error) setData(data);
    };

    fetchData();

    const channel = supabase
      .channel('contacts-changes')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'contacts' },
        () => fetchData()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return data;
}

export function useContentDrafts() {
  const [data, setData] = useState<ContentDraft[] | null>(null);
  const supabase = createClient();

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from('content_drafts')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (!error) setData(data);
    };

    fetchData();

    const channel = supabase
      .channel('content-changes')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'content_drafts' },
        () => fetchData()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return data;
}

export function useEcosystemProducts() {
  const [data, setData] = useState<EcosystemProduct[] | null>(null);
  const supabase = createClient();

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from('ecosystem_products')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (!error) setData(data);
    };

    fetchData();

    const channel = supabase
      .channel('ecosystem-changes')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'ecosystem_products' },
        () => fetchData()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return data;
}

export function useEcosystemProduct(slug: string) {
  const [data, setData] = useState<EcosystemProduct | null>(null);
  const supabase = createClient();

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from('ecosystem_products')
        .select('*')
        .eq('slug', slug)
        .single();
      
      if (!error) setData(data);
    };

    fetchData();
  }, [slug]);

  return data;
}
