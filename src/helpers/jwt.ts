import jwt from 'jsonwebtoken';
import * as jose from 'jose';

const SECRET_KEY = process.env.JWT_SECRET ?? "secret";
const secret = new TextEncoder().encode(SECRET_KEY);

export const signToken = (payload: any) => {
  return jwt.sign(payload, SECRET_KEY, {
    expiresIn: "1d",
  });
};

export const verifyTokenJose = async <T>(jwt: string) => { 
  return await jose.jwtVerify<T>(jwt, secret);
}