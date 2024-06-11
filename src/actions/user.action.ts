"use server";

import User from "@/db/models/user.model";
import {
  loginSchema,
  registerSchema,
  TLogin,
  TRegister,
} from "@/validators/user.validator";
import { comparePassword } from "@/helpers/bcrypt";
import { signToken } from "@/helpers/jwt";
import { cookies } from "next/headers";
import { z } from "zod";
import { MongoServerError } from "mongodb";
import {
  Action,
  LoginSuccessAction,
  RegisterSuccessAction,
} from "@/types/app.type";
import { COOKIE_NAME } from "@/constants";

export const login: Action<TLogin, LoginSuccessAction> = async (body) => {
  try {
    const data = await loginSchema.parseAsync(body);

    const user = await User.findByEmail(data.email);
    if (!user) {
      return {
        ok: false,
        status: 400,
        data: { message: "Invalid email/password" },
      };
    }

    const isPasswordValid = comparePassword(data.password, user.password);
    if (!isPasswordValid) {
      return {
        ok: false,
        status: 400,
        data: { message: "Invalid email/password" },
      };
    }
    const cookieStore = cookies();
    const token = signToken({ id: user._id });
    cookieStore.set(COOKIE_NAME.AUTH, `Bearer ${token}`, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7,
    });
    return {
      ok: true,
      status: 200,
      data: { message: "Login Success" },
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

export const register: Action<TRegister, RegisterSuccessAction> = async (body) => {
  try {
    const result = await registerSchema.parseAsync(body);
    const user = await User.create(result);

    return {
      ok: true,
      status: 201,
      data: { id: user._id, username: user.username, message: "Register Success"},
    };
  } catch (err) {
    if (err instanceof z.ZodError) {
      return {
        ok: false,
        status: 400,
        data: { message: err.errors[0].message },
      };
    } else if (err instanceof MongoServerError) {
      if (err.code === 11000) {
        const key = Object.keys(err.keyValue)[0];
        return {
          ok: false,
          status: 400,
          data: { message: `${key} already exists` },
        };
      }
    }
    return {
      ok: false,
      status: 500,
      data: { message: "Internal Server Error" },
    };
  }
};

export const logout: Action = async () => {
  try {
    const cookieStore = cookies();
    cookieStore.delete(COOKIE_NAME.AUTH);
    return { ok: true, status: 200, data: { message: "Logout Success" } };
  } catch (err) {
    return { ok: false, status: 400, data: { message: "Logout Failed" } };
  }
};
