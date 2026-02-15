import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const list = query({
  args: {},
  handler: async (ctx: any) => {
    return await ctx.db.query("contentDrafts").order("desc").collect();
  },
});

export const byStatus = query({
  args: {
    status: v.string(),
  },
  handler: async (ctx: any, args: any) => {
    return await ctx.db
      .query("contentDrafts")
      .filter((q: any) => q.eq(q.field("status"), args.status))
      .collect();
  },
});

export const create = mutation({
  args: {
    title: v.string(),
    type: v.string(),
    status: v.string(),
    content: v.optional(v.string()),
    author: v.optional(v.string()),
    scheduledFor: v.optional(v.number()),
    tags: v.optional(v.array(v.string())),
  },
  handler: async (ctx: any, args: any) => {
    const now = Date.now();
    return await ctx.db.insert("contentDrafts", {
      ...args,
      createdAt: now,
      updatedAt: now,
    });
  },
});

export const updateStatus = mutation({
  args: {
    id: v.id("contentDrafts"),
    status: v.string(),
  },
  handler: async (ctx: any, args: any) => {
    await ctx.db.patch(args.id, {
      status: args.status,
      updatedAt: Date.now(),
    });
  },
});
