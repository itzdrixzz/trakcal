import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    user: defineTable({
        userId: v.string(),
        gender: v.optional(v.string()),
        workoutsPerWeek: v.optional(v.string()),
        age: v.optional(v.number()),
        heightFeet: v.optional(v.string()),
        heightInches: v.optional(v.string()),
        weight: v.optional(v.string()),
        goal: v.optional(v.string()),
        desiredWeight: v.optional(v.number()),
        lossPerWeek: v.optional(v.float64()),
    }).index("by_userId", ["userId"]),
});