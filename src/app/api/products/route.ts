import { COMMAND, HEADER_NAME } from "@/constants";
import Product from "@/db/models/product.model";
import { FindAllOptions } from "@/types/app.type";
import { headers } from "next/headers";
import { NextRequest } from "next/server";

export type GetProps = {
  params: {};
  queryParams: {};
};

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;

  const userId = headers().get(HEADER_NAME.USER_ID);
  const options: FindAllOptions = {
    page: {
      number: Number(searchParams.get("page.number")) || 1,
      size: Number(searchParams.get("page.size")) || 3,
    },
    userId: userId ?? undefined,
    command: searchParams.get("command") as COMMAND ?? undefined,
  };

  if (searchParams.has("search")) {
    options.search = searchParams.get("search") ?? "";
  }

  const products = await Product.findAll(options);

  return Response.json(products, { status: 200 });
}
