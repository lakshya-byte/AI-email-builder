import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const createUser = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    picture: v.string(),
    token: v.string(),
  },
  handler: async (ctx, args) => {
    try {
      const identity = await ctx.auth.getUserIdentity();
      
      if (!identity) {
        console.error("❌ Error: No identity found");
        throw new Error("Unauthorized: No identity found");
      }

      const userId = identity.subject; 

      console.log("✅ Authenticated User:", userId);

      const existingUser = await ctx.db
        .query("users")
        .filter((q) => q.eq(q.field("email"), args.email))
        .first();

      if (!existingUser) {
        const newUser = await ctx.db.insert("users", {
          name: args.name,
          email: args.email,
          picture: args.picture || "",
          credits: 3,
        //   userId: userId,
        });
        console.log("✅ New user created:", newUser);
        return newUser;
      }

      console.log("ℹ️ User already exists:", existingUser);
      return existingUser;
    } catch (error) {
      console.error("❌ Error in createUser handler:", error);
      throw error;
    }
  },
});
