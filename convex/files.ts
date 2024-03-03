import { v } from "convex/values";
import { query, mutation } from "./_generated/server";

// Create file with following parameters
export const createFile = mutation({
  args: {
    fileName: v.string(),
    teamId: v.string(),
    createdBy: v.string(),
    archive: v.boolean(),
    document: v.string(),
    whiteboard: v.string(),
  },
  async handler(ctx, args) {
    const result = await ctx.db.insert("files", args);
    return result;
  },
});

// Query for file in user table
export const getFiles = query({
  args: {
    teamId: v.string(),
  },
  async handler(ctx, args) {
    const result = await ctx.db
      .query("files")
      .filter((q) => q.eq(q.field("teamId"), args.teamId))
      .collect();
    return result;
  },
});
