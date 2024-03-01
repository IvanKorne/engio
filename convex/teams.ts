import { v } from "convex/values";
import { query, mutation } from "./_generated/server";

// export const createTeam = {
//   args: {},
//   async handler(ctx, args) {},
// };

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
