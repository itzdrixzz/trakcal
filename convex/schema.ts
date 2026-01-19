import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  user: defineTable({
    userId: v.string(),
    gender: v.optional(v.string()),
    workoutsPerWeek: v.optional(v.string()),
    age: v.optional(v.number()),
    heightCm: v.optional(v.number()),
    weightKg: v.optional(v.number()),
    goal: v.optional(v.string()),
    desiredWeightKg: v.optional(v.number()),
    lossPerWeek: v.optional(v.float64()),
  }).index("by_userId", ["userId"]),
});
