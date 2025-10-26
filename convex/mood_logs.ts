import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const addMoodLog = mutation({
  args: {
    date: v.string(),
    day: v.string(),
    mood: v.string(),
    note: v.optional(v.string()),
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

    return await ctx.db.insert("mood_logs", {
      ...args,
      userId: user._id,
    });
  },
});

export const updateMoodLog = mutation({
  args: {
    userId: v.id("users"),
    moodLogId: v.id("mood_logs"),
    mood: v.string(),
    note: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Mood log not found");
    }

    if (args.userId !== identity.subject) {
      throw new Error("Unauthorized");
    }

    const moodLog = await ctx.db.get(args.moodLogId);
    if (!moodLog) {
      throw new Error("Mood log not found");
    }

    if (moodLog.userId !== args.userId) {
      throw new Error("Unauthorized");
    }

    return await ctx.db.patch(args.moodLogId, { mood: args.mood, note: args.note });
  },
});

export const getTodayMoodLogs = query({
  args: {
    date: v.string(),
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

    return await ctx.db
      .query("mood_logs")
      .withIndex("by_user_id_and_date", (q) => q.eq("userId", user._id).eq("date", args.date))
      .first();
  },
});

export const getAllMoodLogs = query({
  args: {},
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

    return await ctx.db
      .query("mood_logs")
      .withIndex("by_user_id", (q) => q.eq("userId", user._id))
      .collect();
  },
});
