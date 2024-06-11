import Wishlist from "@/db/models/wishlist.model";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const deleteSchema = z.object({
  _id: z.string(),
});

type DeleteParam = {
  params: { _id: string }
}

export const DELETE = async (_: NextRequest, { params }: DeleteParam) => {
  try {
    const validatedData = await deleteSchema.parseAsync({
      _id: params._id,
    });
    await Wishlist.delete(validatedData._id);
    return NextResponse.json({
      ok: true,
      status: 200,
      data: {
        message: "Wishlist deleted",
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
