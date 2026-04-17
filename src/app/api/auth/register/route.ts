import { NextRequest } from "next/server";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { sendResponse, sendError } from "@/lib/api-response";

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const body = await req.json();
    const { name, email, password, role, universityName, enrollmentNumber, techStackPreference } = body;

    if (!name || !email || !password) {
      return sendError("Name, email and password are required", 400);
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return sendError("User with this email already exists", 400);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role: role || "member",
      universityName: universityName || "HWI Participant",
      enrollmentNumber: enrollmentNumber || "N/A",
      techStackPreference: techStackPreference || "None",
    });

    const userData = {
      id: newUser._id.toString(),
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
    };

    return sendResponse(userData, "Registration successful", 201);
  } catch (err: any) {
    console.error("Registration error:", err);
    return sendError("Internal server error during registration", 500);
  }
}
