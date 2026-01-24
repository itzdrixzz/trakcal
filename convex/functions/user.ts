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

export const updateProfile = mutation(
  async (
    ctx,
    {
      userId,
      firstName,
      lastName,
      username,
    }: {
      userId: string;
      firstName: string;
      lastName: string;
      username: string;
    },
  ) => {
    const user = await ctx.db
      .query("user")
      .filter((q) => q.eq(q.field("userId"), userId))
      .collect();

    if (user.length === 0) {
      throw new Error("User not found");
    }

    const docId = user[0]._id;

    await ctx.db.patch(docId, { firstName, lastName, username });

    return null;
  },
);

export const addUser = mutation({
  args: {
    userId: v.string(),
    age: v.float64(),
    desiredWeight: v.float64(),
    gender: v.string(),
    goal: v.string(),
    heightCm: v.float64(),
    lossPerWeek: v.float64(),
    weight: v.float64(),
    workoutsPerWeek: v.string(),
    firstName: v.string(),
    lastName: v.string(),
    username: v.string(),
    steps: v.number(),
    bmi: v.number(),
    bmr: v.number(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db.insert("user", {
      userId: args.userId,
      age: args.age,
      desiredWeight: args.desiredWeight,
      gender: args.gender,
      goal: args.goal,
      heightCm: args.heightCm,
      lossPerWeek: args.lossPerWeek,
      weight: args.weight,
      workoutsPerWeek: args.workoutsPerWeek,
      firstName: args.firstName,
      lastName: args.lastName,
      username: args.username,
      steps: args.steps,
      bmi: args.bmi,
      bmr: args.bmr,
    });
    return user;
  },
});
