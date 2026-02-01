import { v } from "convex/values";
import { query } from "../_generated/server";

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
