import { HEADER_NAME } from "@/constants";
import Wishlist from "@/db/models/wishlist.model";
import { TWishlist, wishlistSchema } from "@/validators/wishlist.validator";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export const GET = async () => {
  const userId = headers().get(HEADER_NAME.USER_ID)!;
  const wishlists = await Wishlist.findAllByUserId(userId);
  return NextResponse.json(wishlists);
}

export const POST = async (request: NextRequest) => {
  try {
    const userId = headers().get(HEADER_NAME.USER_ID)!;
    const body: Partial<TWishlist> = await request.json();
    body.userId = userId;

    const data = await wishlistSchema.parseAsync(body);
    await Wishlist.create(data);
    return NextResponse.json({
      ok: true,
      status: 201,
      data: {
        message: "Wishlist created",
      },
    });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({
        ok: false,
        status: 400,
        data: { message: err.errors[0].message },
      });
    }

    return NextResponse.json({
      ok: false,
      status: 500,
      data: { message: "Internal Server Error" },
    });
  }
};
