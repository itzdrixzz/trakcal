import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  user: defineTable({
    userId: v.string(),
    gender: v.optional(v.string()),
    workoutsPerWeek: v.optional(v.string()),
    age: v.optional(v.number()),
    heightCm: v.optional(v.number()),
    weight: v.optional(v.number()),
    goal: v.optional(v.string()),
    desiredWeight: v.optional(v.number()),
    lossPerWeek: v.optional(v.float64()),
    firstName: v.optional(v.string()),
    lastName: v.optional(v.string()),
    username: v.optional(v.string()),
    steps: v.optional(v.number()),
    bmi: v.optional(v.number()),
    bmr: v.optional(v.number()),
    tdee: v.optional(v.number()),
    calorieDeficit: v.optional(v.number()),
    protienGrams: v.optional(v.number()),
    fatGrams: v.optional(v.number()),
    carbsGrams: v.optional(v.number()),
    fiberTarget: v.optional(v.number()),
    sugarLimit: v.optional(v.number()),
    sodiumLimit: v.optional(v.number()),
  }).index("by_userId", ["userId"]),
});
