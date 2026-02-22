import { v } from "convex/values";
import { mutation, query } from "../_generated/server";

export const listByDateRange = query({
  args: {
    userId: v.string(),
    fromDate: v.string(),
    toDate: v.string(),
  },
  handler: async (ctx, args) => {
    const logs = await ctx.db
      .query("dailyLogs")
      .withIndex("by_userId", (q) => q.eq("userId", args.userId))
      .collect();

    return logs
      .filter((l) => l.date >= args.fromDate && l.date <= args.toDate)
      .sort((a, b) => a.date.localeCompare(b.date));
  },
});

export const getDailyLogByDate = query({
  args: {
    userId: v.string(),
    date: v.string(),
  },
  handler: async (ctx, args) => {
    const log = await ctx.db
      .query("dailyLogs")
      .withIndex("by_userId_date", (q) =>
        q.eq("userId", args.userId).eq("date", args.date),
      )
      .unique();

    return log;
  },
});

export const addDailyLog = mutation({
  args: {
    userId: v.string(),
    date: v.string(),
    calories: v.number(),
    protienGrams: v.number(),
    fatGrams: v.number(),
    carbsGrams: v.number(),
    fiberGrams: v.number(),
    sugarGrams: v.optional(v.number()),
    sodiumMg: v.optional(v.number()),

    steps: v.optional(v.number()),
    water: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const dailyLogs = await ctx.db.insert("dailyLogs", {
      userId: args.userId,
      date: args.date,
      calories: args.calories,
      protienGrams: args.protienGrams,
      fatGrams: args.fatGrams,
      carbsGrams: args.carbsGrams,
      fiberGrams: args.fatGrams,
      sugarGrams: args.sugarGrams,
      sodiumMg: args.sodiumMg,

      steps: args.steps,
      water: args.water,
    });
    return dailyLogs;
  },
});

export const addFoodEntry = mutation({
  args: {
    userId: v.string(),
    dayId: v.id("dailyLogs"),

    name: v.string(),
    meal: v.string(),
    servings: v.number(),
    grams: v.optional(v.number()),

    calories: v.number(),
    protienGrams: v.number(),
    fatGrams: v.number(),
    carbsGrams: v.number(),
    fiberGrams: v.optional(v.number()),
    sugarGrams: v.number(),
    sodiumMg: v.number(),

    createdAt: v.number(),
  },
  handler: async (ctx, args) => {
    const foodEntryId = await ctx.db.insert("foodEntries", {
      userId: args.userId,
      dayId: args.dayId,

      name: args.name,
      meal: args.meal,
      servings: args.servings,
      grams: args.grams,

      calories: args.calories,
      protienGrams: args.protienGrams,
      fatGrams: args.fatGrams,
      carbsGrams: args.carbsGrams,
      fiberGrams: args.fiberGrams,
      sugarGrams: args.sugarGrams,
      sodiumMg: args.sodiumMg,

      createdAt: args.createdAt,
    });

    return foodEntryId;
  },
});

export const addFavoriteFood = mutation({
  args: {
    userId: v.string(),
    productId: v.string(),
  },
  handler: async (ctx, args) => {
    const foodEntryId = await ctx.db.insert("favorites", {
      userId: args.userId,
      productId: args.productId,
    });

    return foodEntryId;
  },
});

export const deleteFavoriteFood = mutation({
  args: {
    userId: v.string(),
    productId: v.string(),
  },
  handler: async (ctx, args) => {
    const favorite = await ctx.db
      .query("favorites")
      .filter((q) =>
        q.and(
          q.eq(q.field("userId"), args.userId),
          q.eq(q.field("productId"), args.productId),
        ),
      )
      .first();

    if (!favorite) {
      return null;
    }

    await ctx.db.delete(favorite._id);

    return favorite._id;
  },
});

export const updateDailyLog = mutation(
  async (
    ctx,
    {
      userId,
      date,
      calories,
      protienGrams,
      fatGrams,
      carbsGrams,
      fiberGrams,
      sugarGrams,
      sodiumMg,

      steps,
      water,
    }: {
      userId: string;
      date: string;
      calories: number;
      protienGrams: number;
      fatGrams: number;
      carbsGrams: number;
      fiberGrams: number;
      sugarGrams: number;
      sodiumMg: number;
      steps: number;
      water: number;
    },
  ) => {
    const user = await ctx.db
      .query("dailyLogs")
      .filter((q) => q.eq(q.field("date"), date))
      .collect();

    const docId = user[0]._id;

    await ctx.db.patch(docId, {
      userId,
      date,
      calories,
      protienGrams,
      fatGrams,
      carbsGrams,
      fiberGrams,
      sugarGrams,
      sodiumMg,
    });

    return null;
  },
);
