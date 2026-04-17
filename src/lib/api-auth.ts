import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";

export async function getUserFromRequest(req: NextRequest) {
  // 1. Try Bearer Token (for Flutter / Postman)
  const authHeader = req.headers.get("authorization");
  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.split(" ")[1];
    try {
      const decoded = jwt.verify(token, process.env.NEXTAUTH_SECRET!) as any;
      if (decoded && decoded.id) {
        return {
          id: decoded.id,
          name: decoded.name,
          email: decoded.email,
          role: decoded.role,
        };
      }
    } catch (err) {
      console.error("JWT Verification failed:", err);
      return null;
    }
  }

  // 2. Try NextAuth Session (for Dashboard/Web)
  const session = await getServerSession(authOptions);
  if (session && session.user) {
    return {
      id: (session.user as any).id,
      name: session.user.name,
      email: session.user.email,
      role: (session.user as any).role,
    };
  }

  return null;
}

export function generateToken(payload: any) {
  return jwt.sign(payload, process.env.NEXTAUTH_SECRET!, {
    expiresIn: "7d",
  });
}
