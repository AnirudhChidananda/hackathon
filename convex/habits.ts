import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const addHabit = mutation({
  args: {
    name: v.string(),
    icon: v.string(),
    description: v.string(),
    createdDate: v.string(),
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

    const existingHabit = await ctx.db
      .query("habits")
      .withIndex("by_user_id_and_name", (q) => q.eq("userId", user._id).eq("name", args.name))
      .first();

    if (existingHabit) {
      throw new Error("Habit already exists");
    }
    return await ctx.db.insert("habits", {
      userId: user._id,
      isActive: true,
      icon: args.icon,
      name: args.name,
      description: args.description,
      createdDate: args.createdDate,
    });
  },
});

export const getHabits = query({
  args: {},
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
      .query("habits")
      .withIndex("by_user_id", (q) => q.eq("userId", user._id))
      .collect();
  },
});

export const deleteHabit = mutation({
  args: {
    habitId: v.id("habits"),
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

    // const existingHabit = await ctx.db
    // .query("habits")
    // .withIndex("by_user_id_and_name", (q) => q.eq("userId", user._id).eq("name", args.name))
    // .first();

    return await ctx.db.delete(args.habitId);
  },
});

export const updateHabit = mutation({
  args: {
    habitId: v.id("habits"),
    name: v.string(),
    icon: v.string(),
    description: v.string(),
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
    return await ctx.db.patch(args.habitId, { name: args.name, icon: args.icon, description: args.description });
  },
});
