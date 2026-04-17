import { NextRequest } from "next/server";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { sendResponse, sendError } from "@/lib/api-response";
import { generateToken } from "@/lib/api-auth";

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const { email, password } = await req.json();

    if (!email || !password) {
      return sendError("Email and password are required", 400);
    }

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return sendError("Invalid credentials", 401);
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return sendError("Invalid credentials", 401);
    }

    const userData = {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      role: user.role,
    };

    const token = generateToken(userData);

    return sendResponse({
      token,
      user: userData
    }, "Login successful");

  } catch (err: any) {
    console.error("Login error:", err);
    return sendError("Internal server error during login", 500);
  }
}
