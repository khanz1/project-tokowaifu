import { ObjectId } from "mongodb";
import { z } from "zod";

export const wishlistSchema = z.object({
  userId: z.string({ message: "User required" }),
  productId: z.string({ message: "Product required" }),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export type TWishlist = z.infer<typeof wishlistSchema>;
export type TWishlistWithObjectId = Omit<TWishlist, "userId" | "productId"> & {
  userId: ObjectId;
  productId: ObjectId;
};