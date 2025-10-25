import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    clerkId: v.string(),
    name: v.string(),
    email: v.string(),
    image: v.optional(v.string()),
  })
    .index("by_clerk_id", ["clerkId"])
    .searchIndex("search_email", {
      searchField: "email",
    }),

  habits: defineTable({
    userId: v.id("users"),
    name: v.string(),
    icon: v.string(),
    isActive: v.boolean(),
    createdDate: v.string(),
    description: v.string(),
  })
    .index("by_user_id_and_name", ["userId", "name"])
    .index("by_user_id", ["userId"]),

  habit_logs: defineTable({
    habitList: v.array(
      v.object({
        habitId: v.id("habits"),
        habitName: v.string(),
        icon: v.string(),
        completed: v.boolean(),
      })
    ),
    userId: v.id("users"),
    date: v.string(),
    day: v.string(),
  })
    .index("by_user_id", ["userId"])
    .index("by_user_id_and_date", ["userId", "date"])
    .index("by_date", ["date"]),

  habit_streaks: defineTable({
    habitId: v.id("habits"),
    habitName: v.string(),
    userId: v.id("users"),
    streak: v.number(),
    startDate: v.string(),
    endDate: v.string(),
  })
    .index("by_user_id", ["userId"])
    .index("by_habit_id", ["habitId"]),

  mood_logs: defineTable({
    userId: v.id("users"),
    date: v.string(),
    day: v.string(),
    mood: v.string(),
    note: v.optional(v.string()),
  })
    .index("by_user_id", ["userId"])
    .index("by_date", ["date"])
    .index("by_user_id_and_date", ["userId", "date"]),
});
