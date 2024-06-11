"use server"

import Wishlist from "@/db/models/wishlist.model";
import { Action, SuccessAction, WishlistSuccessAction } from "@/types/app.type";
import { TWishlist, wishlistSchema } from "@/validators/wishlist.validator"
import { z } from "zod";

export const createWishlist: Action<Pick<TWishlist, "productId">, SuccessAction> = async (body) => {
  try {
    const data = await wishlistSchema.parseAsync(body);
    await Wishlist.create(data);
    return {
      ok: true,
      status: 201,
      data: {
        message: "Wishlist created",
      },
    };
  } catch (err) {
    if (err instanceof z.ZodError) {
      return {
        ok: false,
        status: 400,
        data: { message: err.errors[0].message },
      };
    }

    return {
      ok: false,
      status: 500,
      data: { message: "Internal Server Error" },
    };
  }
};