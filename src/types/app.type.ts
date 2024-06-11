import { COMMAND } from "@/constants";
import { TWishlist } from "@/validators/wishlist.validator";
import { ObjectId, WithId } from "mongodb";

export enum DB_COLLECTION {
  USER = "users",
  PRODUCT = "products",
  WISHLIST = "wishlist"
}

export type Product = {
  name: string;
  slug: string;
  description: string;
  excerpt: string;
  price: number;
  tags: string[];
  thumbnail: string;
  images: string[];
  wishlist?: WithId<TWishlist>;
  createdAt: Date;
  updatedAt: Date;
};

export type TProduct = WithId<Product>;

export type RegisterForm = {
  name: string;
  username: string;
  email: string;
  password: string;
};

export type LoginForm = Pick<RegisterForm, "email" | "password">;
export type FailedAction = {
  ok: false;
  status: 400 | 401 | 403 | 404 | 500;
  data: {
    message: string;
  };
};

export type SuccessAction<T = { message: string }> = {
  ok: true;
  status: 200 | 201;
  data: T;
};

export type RegisterSuccessAction = SuccessAction<{
  id: ObjectId;
  username: string;
  message: string;
}>;
export type LoginSuccessAction = SuccessAction;
export type Action<PT = any, RT extends SuccessAction = SuccessAction> = (
  body?: PT
) => Promise<RT | FailedAction>;

export type WishlistSuccessAction = SuccessAction<{
  wishlist: WithId<TWishlist>[];
  message: string;
}>;


export type FindAllOptions = {
  search?: string;
  page: {
    number: number;
    size: number;
  };
  userId?: string | ObjectId;
  command?: COMMAND
};

export type Wishlist = WithId<
  TWishlist & {
    product: WithId<Omit<Product, "wishlist">>;
  }
>;