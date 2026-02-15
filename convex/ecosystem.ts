import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const list = query({
  args: {},
  handler: async (ctx: any) => {
    return await ctx.db.query("ecosystemProducts").order("desc").collect();
  },
});

export const bySlug = query({
  args: {
    slug: v.string(),
  },
  handler: async (ctx: any, args: any) => {
    const product = await ctx.db
      .query("ecosystemProducts")
      .filter((q: any) => q.eq(q.field("slug"), args.slug))
      .first();
    return product;
  },
});

export const create = mutation({
  args: {
    name: v.string(),
    slug: v.string(),
    category: v.string(),
    description: v.string(),
    website: v.optional(v.string()),
    github: v.optional(v.string()),
    status: v.string(),
    features: v.optional(v.array(v.string())),
    integrations: v.optional(v.array(v.string())),
  },
  handler: async (ctx: any, args: any) => {
    return await ctx.db.insert("ecosystemProducts", {
      ...args,
      lastUpdated: Date.now(),
    });
  },
});
