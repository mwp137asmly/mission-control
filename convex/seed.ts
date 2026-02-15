import { mutation } from "./_generated/server";

export const seedData = mutation({
  args: {},
  handler: async (ctx: any) => {
    // Clear existing data
    const tables = ["activities", "calendarEvents", "tasks", "contacts", "contentDrafts", "ecosystemProducts"];
    for (const table of tables) {
      const items = await ctx.db.query(table as any).collect();
      for (const item of items) {
        await ctx.db.delete(item._id);
      }
    }

    const now = Date.now();
    const hourMs = 60 * 60 * 1000;
    const dayMs = 24 * hourMs;

    // Seed Activities
    await ctx.db.insert("activities", {
      type: "system",
      title: "System initialized",
      description: "Mission Control dashboard started",
      timestamp: now - dayMs * 2,
    });

    await ctx.db.insert("activities", {
      type: "agent",
      title: "Agent task completed",
      description: "Newsletter generation completed successfully",
      timestamp: now - hourMs * 6,
      agentId: "agent-1",
    });

    await ctx.db.insert("activities", {
      type: "task",
      title: "New task created",
      description: "Review Q1 performance metrics",
      timestamp: now - hourMs * 2,
    });

    // Seed Calendar Events
    await ctx.db.insert("calendarEvents", {
      title: "Weekly team sync",
      description: "Discuss project status and blockers",
      startTime: now + dayMs * 1,
      endTime: now + dayMs * 1 + hourMs,
      type: "meeting",
      status: "upcoming",
      attendees: ["team@example.com"],
    });

    await ctx.db.insert("calendarEvents", {
      title: "Product launch",
      description: "Mission Control v1.0 release",
      startTime: now + dayMs * 7,
      endTime: now + dayMs * 7 + hourMs * 2,
      type: "deadline",
      status: "upcoming",
    });

    await ctx.db.insert("calendarEvents", {
      title: "Content review",
      description: "Review newsletter drafts",
      startTime: now + dayMs * 2,
      endTime: now + dayMs * 2 + hourMs,
      type: "reminder",
      status: "upcoming",
    });

    // Seed Tasks
    await ctx.db.insert("tasks", {
      title: "Implement agent monitoring dashboard",
      description: "Build real-time monitoring interface for agent activities",
      status: "in_progress",
      priority: "high",
      assignee: "Agent Main",
      dueDate: now + dayMs * 3,
      createdAt: now - dayMs * 5,
      updatedAt: now - hourMs * 2,
      tags: ["development", "dashboard"],
    });

    await ctx.db.insert("tasks", {
      title: "Set up Convex real-time sync",
      description: "Configure Convex for live data updates",
      status: "completed",
      priority: "high",
      assignee: "Agent Main",
      dueDate: now - dayMs * 1,
      createdAt: now - dayMs * 6,
      updatedAt: now - dayMs * 1,
      tags: ["infrastructure"],
    });

    await ctx.db.insert("tasks", {
      title: "Write API documentation",
      description: "Document all API endpoints and usage",
      status: "todo",
      priority: "medium",
      dueDate: now + dayMs * 7,
      createdAt: now - dayMs * 3,
      updatedAt: now - dayMs * 3,
      tags: ["documentation"],
    });

    await ctx.db.insert("tasks", {
      title: "Review content pipeline",
      description: "Audit current content workflow and identify improvements",
      status: "blocked",
      priority: "low",
      assignee: "Agent Main",
      dueDate: now + dayMs * 10,
      createdAt: now - dayMs * 7,
      updatedAt: now - dayMs * 1,
      tags: ["content", "process"],
    });

    // Seed Contacts
    await ctx.db.insert("contacts", {
      name: "Sarah Chen",
      email: "sarah@techcorp.com",
      company: "TechCorp Inc",
      role: "CTO",
      status: "active",
      lastContact: now - dayMs * 3,
      notes: "Interested in AI agent integration",
      tags: ["enterprise", "ai"],
    });

    await ctx.db.insert("contacts", {
      name: "Mike Rodriguez",
      email: "mike@startupxyz.io",
      company: "StartupXYZ",
      role: "Founder",
      status: "lead",
      lastContact: now - dayMs * 7,
      notes: "Follow up on demo request",
      tags: ["startup", "potential"],
    });

    await ctx.db.insert("contacts", {
      name: "Emily Watson",
      email: "emily@designco.com",
      company: "DesignCo",
      role: "Product Designer",
      status: "active",
      lastContact: now - dayMs * 1,
      notes: "Provided UI feedback",
      tags: ["design", "advisor"],
    });

    // Seed Content Drafts
    await ctx.db.insert("contentDrafts", {
      title: "Mission Control Launch Announcement",
      type: "article",
      status: "review",
      content: "Introducing Mission Control: The ultimate dashboard for AI agent monitoring...",
      author: "Agent Main",
      scheduledFor: now + dayMs * 5,
      createdAt: now - dayMs * 4,
      updatedAt: now - hourMs * 6,
      tags: ["announcement", "product"],
    });

    await ctx.db.insert("contentDrafts", {
      title: "Weekly Newsletter #42",
      type: "newsletter",
      status: "draft",
      content: "This week in AI: Latest developments and trends...",
      author: "Agent Main",
      scheduledFor: now + dayMs * 3,
      createdAt: now - dayMs * 2,
      updatedAt: now - hourMs * 12,
      tags: ["newsletter", "weekly"],
    });

    await ctx.db.insert("contentDrafts", {
      title: "Agent Best Practices Guide",
      type: "documentation",
      status: "draft",
      content: "A comprehensive guide to building and deploying AI agents...",
      author: "Agent Main",
      createdAt: now - dayMs * 8,
      updatedAt: now - dayMs * 5,
      tags: ["documentation", "guide"],
    });

    await ctx.db.insert("contentDrafts", {
      title: "Product Update: Real-time Monitoring",
      type: "social",
      status: "scheduled",
      content: "🚀 New feature alert! Real-time agent monitoring is now live in Mission Control.",
      author: "Agent Main",
      scheduledFor: now + hourMs * 12,
      createdAt: now - dayMs * 1,
      updatedAt: now - hourMs * 3,
      tags: ["social", "feature"],
    });

    // Seed Ecosystem Products
    await ctx.db.insert("ecosystemProducts", {
      name: "OpenClaw",
      slug: "openclaw",
      category: "ai",
      description: "Open-source AI agent framework for building autonomous agents",
      website: "https://openclaw.dev",
      github: "https://github.com/openclaw/openclaw",
      status: "active",
      features: ["Agent orchestration", "Multi-modal support", "Real-time monitoring"],
      integrations: ["Convex", "Vercel", "Supabase"],
      lastUpdated: now - dayMs * 2,
    });

    await ctx.db.insert("ecosystemProducts", {
      name: "Convex",
      slug: "convex",
      category: "infrastructure",
      description: "Real-time backend-as-a-service with instant reactivity",
      website: "https://convex.dev",
      github: "https://github.com/get-convex/convex-backend",
      status: "active",
      features: ["Real-time sync", "Serverless functions", "Built-in database"],
      integrations: ["Next.js", "React", "TypeScript"],
      lastUpdated: now - dayMs * 1,
    });

    await ctx.db.insert("ecosystemProducts", {
      name: "Next.js",
      slug: "nextjs",
      category: "developer",
      description: "The React framework for production with App Router and Server Components",
      website: "https://nextjs.org",
      github: "https://github.com/vercel/next.js",
      status: "active",
      features: ["App Router", "Server Components", "Incremental Static Regeneration"],
      integrations: ["Vercel", "Tailwind", "TypeScript"],
      lastUpdated: now - dayMs * 3,
    });

    await ctx.db.insert("ecosystemProducts", {
      name: "Tailwind CSS",
      slug: "tailwind",
      category: "developer",
      description: "A utility-first CSS framework for rapid UI development",
      website: "https://tailwindcss.com",
      github: "https://github.com/tailwindlabs/tailwindcss",
      status: "active",
      features: ["Utility classes", "JIT compiler", "Design system"],
      integrations: ["Next.js", "React", "Vue"],
      lastUpdated: now - dayMs * 5,
    });

    return { success: true, message: "Seed data created successfully" };
  },
});
