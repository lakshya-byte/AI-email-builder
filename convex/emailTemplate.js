import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const SaveTemplate = mutation({
  args: {
    tid: v.string(),
    design: v.any(),
    email: v.string(),
  },
  handler: async (ctx, args) => {
    try {
      await ctx.db.insert("emailTemplates", {
        tid: args.tid,
        design: args.design,
        email: args.email,
      });
    } catch (error) {
      console.error("Error saving template:", error);
    }
  },
});

export const GetTemplateDesign = query({
  args: {
    email: v.string(),
    tid: v.string(),
  },
  handler: async (ctx, args) => {
    const result = await ctx.db
      .query("emailTemplates")
      .filter((q) => q.eq(q.field("email"), args.email))
      .filter((q) => q.eq(q.field("tid"), args.tid))
      .collect();
    return result[0];
  },
});

export const UpdateTemplateDesign = mutation({
  args: {
    tid: v.string(),
    design: v.any(),
  },
  handler: async (ctx, args) => {
    const result = await ctx.db
      .query("emailTemplates")
      .filter((q) => q.eq(q.field("tid"), args.tid))
      .collect();

    const docId = result[0]._id;

    await ctx.db.patch(docId, {
      design: args.design,
    });
  },
});

export const GetAllUserTemplates = query({
  args: {
    email: v.string(),
  },
  handler: async (ctx, args) => {
    const result = await ctx.db
      .query("emailTemplates")
      .filter((q) => q.eq(q.field("email"), args.email))
      .collect();
    return result;
  },
});

export const deleteTemplate = mutation({
  args: {
    tid: v.string(),
  },
  handler: async (ctx, args) => {
    const result = await ctx.db
      .query("emailTemplates")
      .filter((q) => q.eq(q.field("tid"), args.tid))
      .collect();
    
      
    if (result.length === 0) {
        throw new Error("Template not found!");
      }
  
      await ctx.db.delete(result[0]._id)
  },
});

