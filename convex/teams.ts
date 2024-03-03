import { v } from "convex/values";
import { query, mutation } from "./_generated/server";

// Create a team in teams db
export const createTeam = mutation({
  args: { teamName: v.string(), createdBy: v.string() },
  async handler(ctx, args) {
    const res = await ctx.db.insert("teams", args);
    return res;
  },
});

// Retrieve a team in teams db
export const getTeam = query({
  args: {
    email: v.string(),
  },
  async handler(ctx, args) {
    const result = await ctx.db
      .query("teams")
      .filter((q) => q.eq(q.field("createdBy"), args.email))
      .collect();
    return result;
  },
});
