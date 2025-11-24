import jwt from "jsonwebtoken";
import { FastifyRequest } from "fastify";
import { env } from "./env";

type TokenPayload = { sub: string; email: string };

export function signToken(payload: TokenPayload) {
  return jwt.sign(payload, env.JWT_SECRET, { expiresIn: "7d" });
}

export function verifyToken(token: string): TokenPayload | null {
  try {
    return jwt.verify(token, env.JWT_SECRET) as TokenPayload;
  } catch {
    return null;
  }
}

export function getUserIdFromRequest(request: FastifyRequest): TokenPayload | null {
  const authHeader = request.headers.authorization;
  if (!authHeader?.startsWith("Bearer ")) return null;
  const token = authHeader.slice("Bearer ".length);
  return verifyToken(token);
}
