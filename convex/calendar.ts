import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const list = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("calendarEvents").order("asc").collect();
  },
});

export const upcoming = query({
  args: {
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const limit = args.limit ?? 10;
    const now = Date.now();
    const events = await ctx.db
      .query("calendarEvents")
      .filter((q) => q.gte(q.field("startTime"), now))
      .order("asc")
      .take(limit);
    return events;
  },
});

export const create = mutation({
  args: {
    title: v.string(),
    description: v.optional(v.string()),
    startTime: v.number(),
    endTime: v.number(),
    type: v.string(),
    status: v.string(),
    attendees: v.optional(v.array(v.string())),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("calendarEvents", args);
  },
});
