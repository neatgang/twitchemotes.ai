import { v } from "convex/values" 

import { mutation, query } from "./_generated/server"


const images = [
    "/peepopainter.png"
]

export const create = mutation({
    args: {
        orgId: v.string(),
        title: v.string(),
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();

        if (!identity) {
            throw new Error("Unauthorized")
        }

        const randomImage = images[Math.floor(Math.random() * images.length)]

        const board = await ctx.db.insert("boards", {
            title: args.title,
            orgId: args.orgId,
            authorId: identity.subject,
            authorName: identity.name!,
            imageUrl: randomImage,
        });

        return board;
    }
})

export const remove = mutation({
    args: {
        id: v.id("boards")
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();

        if (!identity) {
            throw new Error("Unauthorized")
        }

        // Check later to delete favorite relation

        await ctx.db.delete(args.id);
    }
})

export const get = query({
    args: {
        id: v.id("boards")
    },
    handler: async (ctx, args) => {
        const board = ctx.db.get(args.id);

        return board;
    }   
})

export const update = mutation({
    args: { id: v.id("boards"), title: v.string() },
    handler: async (ctx, args) => {
      const identity = await ctx.auth.getUserIdentity();
  
      if (!identity) {
        throw new Error("Unauthorized");
      }
  
      const title = args.title.trim();
  
      if (!title) {
        throw new Error("Title is required");
      }
  
      if (title.length > 60) {
        throw new Error("Title cannot be longer than 60 characters")
      }
  
      const board = await ctx.db.patch(args.id, {
        title: args.title,
      });
  
      return board;
    },
  });