import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const addGoal = mutation({
  args: {
    title: v.string(),
    description: v.string(),
    date: v.string(),
    progress: v.number(),
    active: v.boolean(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Unauthorized");
    }
    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject))
      .first();
    if (!user) {
      throw new Error("User not found");
    }
    const goal = await ctx.db.insert("goals", {
      userId: user._id,
      title: args.title,
      description: args.description,
      date: args.date,
      progress: args.progress,
      active: args.active,
    });
    return goal;
  },
});

export const getAllGoals = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Unauthorized");
    }

    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject))
      .first();
    if (!user) {
      throw new Error("User not found");
    }
    return await ctx.db
      .query("goals")
      .withIndex("by_user_id", (q) => q.eq("userId", user._id))
      .collect();
  },
});

export const deleteGoal = mutation({
  args: {
    goalId: v.id("goals"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Unauthorized");
    }
    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject))
      .first();
    if (!user) {
      throw new Error("User not found");
    }
    return await ctx.db.delete(args.goalId);
  },
});

export const updateGoal = mutation({
  args: {
    goalId: v.id("goals"),
    title: v.string(),
    description: v.string(),
    progress: v.number(),
    active: v.boolean(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Unauthorized");
    }
    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject))
      .first();
    if (!user) {
      throw new Error("User not found");
    }
    const goal = await ctx.db.get(args.goalId);
    if (!goal) {
      throw new Error("Goal not found");
    }
    if (goal.userId !== user._id) {
      throw new Error("Unauthorized");
    }
    return await ctx.db.patch(args.goalId, {
      title: args.title,
      description: args.description,
      progress: args.progress,
      active: args.active,
    });
  },
});
