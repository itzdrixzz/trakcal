import { v } from "convex/values";
import { mutation, query } from "../_generated/server";

export const getUser = query({
  args: { userId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("user")
      .withIndex("by_userId", (q) => q.eq("userId", args.userId))
      .unique();
  },
});

export const addUser = mutation({
  args: {
    userId: v.string(),
    age: v.float64(),
    desiredWeightKg: v.float64(),
    gender: v.string(),
    goal: v.string(),
    heightCm: v.float64(),
    lossPerWeek: v.float64(),
    weightKg: v.float64(),
    workoutsPerWeek: v.string(),
    firstName: v.string(),
    lastName: v.string(),
    username: v.string(),
    steps: v.number(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db.insert("user", {
      userId: args.userId,
      age: args.age,
      desiredWeightKg: args.desiredWeightKg,
      gender: args.gender,
      goal: args.goal,
      heightCm: args.heightCm,
      lossPerWeek: args.lossPerWeek,
      weightKg: args.weightKg,
      workoutsPerWeek: args.workoutsPerWeek,
      firstName: args.firstName,
      lastName: args.lastName,
      username: args.username,
      steps: args.steps,
    });
    return user;
  },
});
