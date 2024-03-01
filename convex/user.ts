import { v } from "convex/values";
import { query, mutation } from "./_generated/server";

// Create user with following parameters
export const createUser = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    image: v.string(),
  },
  async handler(ctx, args) {
    return await ctx.db.insert("user", args);
  },
});

// Query for user in user table
export const getUser = query({
  args: {
    email: v.string(),
  },
  async handler(ctx, args) {
    const result = await ctx.db
      .query("user")
      .filter((q) => q.eq(q.field("email"), args.email))
      .collect();
    return result;
  },
});
