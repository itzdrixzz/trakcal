import { v } from "convex/values";
import { mutation, query } from "../_generated/server";

export const getUser = query({
    args: { userId: v.string()},
    handler: async (ctx, args) => {
        return await ctx.db.query("user").withIndex("by_userId", (q) => q.eq("userId", args.userId)).unique();
    },
});

export const addUser = mutation({
    args: {userId: v.string()},
    handler: async (ctx, args) => {
        const user = await ctx.db.insert("user", {
            userId: args.userId,
        });
    },
});

export const addAge = mutation({
    args: { 
        age: v.number(),
        userId: v.string(),
    },

    handler: async ( ctx, args ) => {
        const user = await ctx.db.query("user").withIndex("by_userId", (q) => q.eq("userId", args.userId)).unique();

        if (!user){
            console.log("User not found");
            return;
        };

        await ctx.db.patch(user._id, {
            age: args.age,
        })
    },
});

