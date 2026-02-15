import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  activities: defineTable({
    type: v.string(), // "system" | "agent" | "user" | "task"
    title: v.string(),
    description: v.optional(v.string()),
    timestamp: v.number(),
    agentId: v.optional(v.string()),
    metadata: v.optional(v.any()),
  }),
  
  calendarEvents: defineTable({
    title: v.string(),
    description: v.optional(v.string()),
    startTime: v.number(),
    endTime: v.number(),
    type: v.string(), // "meeting" | "deadline" | "reminder"
    status: v.string(), // "upcoming" | "completed" | "cancelled"
    attendees: v.optional(v.array(v.string())),
  }),
  
  tasks: defineTable({
    title: v.string(),
    description: v.optional(v.string()),
    status: v.string(), // "todo" | "in_progress" | "completed" | "blocked"
    priority: v.string(), // "low" | "medium" | "high" | "urgent"
    assignee: v.optional(v.string()),
    dueDate: v.optional(v.number()),
    createdAt: v.number(),
    updatedAt: v.number(),
    tags: v.optional(v.array(v.string())),
  }),
  
  contacts: defineTable({
    name: v.string(),
    email: v.optional(v.string()),
    company: v.optional(v.string()),
    role: v.optional(v.string()),
    status: v.string(), // "active" | "lead" | "archived"
    lastContact: v.optional(v.number()),
    notes: v.optional(v.string()),
    tags: v.optional(v.array(v.string())),
  }),
  
  contentDrafts: defineTable({
    title: v.string(),
    type: v.string(), // "article" | "newsletter" | "social" | "documentation"
    status: v.string(), // "draft" | "review" | "scheduled" | "published"
    content: v.optional(v.string()),
    author: v.optional(v.string()),
    scheduledFor: v.optional(v.number()),
    createdAt: v.number(),
    updatedAt: v.number(),
    tags: v.optional(v.array(v.string())),
  }),
  
  ecosystemProducts: defineTable({
    name: v.string(),
    slug: v.string(),
    category: v.string(), // "ai" | "developer" | "productivity" | "infrastructure"
    description: v.string(),
    website: v.optional(v.string()),
    github: v.optional(v.string()),
    status: v.string(), // "active" | "deprecated" | "beta"
    features: v.optional(v.array(v.string())),
    integrations: v.optional(v.array(v.string())),
    lastUpdated: v.number(),
  }),
});
