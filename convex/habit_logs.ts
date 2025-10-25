import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const addHabitLog = mutation({
  args: {
    habitList: v.array(
      v.object({
        habitId: v.id("habits"),
        habitName: v.string(),
        icon: v.string(),
        completed: v.boolean(),
      })
    ),
    date: v.string(),
    day: v.string(),
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

    return await ctx.db.insert("habit_logs", { ...args, userId: user._id });
  },
});

export const updateHabitLog = mutation({
  args: {
    habitLogId: v.id("habit_logs"),
    habitList: v.array(
      v.object({
        habitId: v.id("habits"),
        habitName: v.string(),
        icon: v.string(),
        completed: v.boolean(),
      })
    ),
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

    const habitLog = await ctx.db.get(args.habitLogId);
    if (!habitLog) {
      throw new Error("Habit log not found");
    }

    if (habitLog.userId !== user._id) {
      throw new Error("Unauthorized");
    }

    return await ctx.db.patch(args.habitLogId, { habitList: args.habitList });
  },
});

export const getHabitLogs = query({
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
      .query("habit_logs")
      .withIndex("by_user_id", (q) => q.eq("userId", user._id))
      .collect();
  },
});

export const getTodayHabitLogs = query({
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
      .query("habit_logs")
      .withIndex("by_user_id_and_date", (q) => q.eq("userId", user._id).eq("date", args.date))
      .first();
  },
});
