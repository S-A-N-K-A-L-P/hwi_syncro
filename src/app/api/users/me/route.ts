import { NextRequest } from "next/server";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import { getUserFromRequest } from "@/lib/api-auth";
import { sendResponse, sendError } from "@/lib/api-response";

export async function GET(req: NextRequest) {
  try {
    await dbConnect();
    const authUser = await getUserFromRequest(req);
    if (!authUser) return sendError("Unauthorized", 401);

    const user = await User.findById(authUser.id).lean();
    return sendResponse(user, "Profile retrieved");
  } catch (err: any) {
    return sendError("Internal server error", 500);
  }
}

export async function PUT(req: NextRequest) {
  try {
    await dbConnect();
    const authUser = await getUserFromRequest(req);
    if (!authUser) return sendError("Unauthorized", 401);

    const body = await req.json();
    const { name, bio, skills, location, techStackPreference } = body;

    const updatedUser = await User.findByIdAndUpdate(
      authUser.id,
      { 
        $set: { 
          name, 
          bio, 
          skills: Array.isArray(skills) ? skills : skills?.split(",").map((s: string) => s.trim()), 
          location,
          techStackPreference
        } 
      },
      { new: true, runValidators: true }
    ).lean();

    return sendResponse(updatedUser, "Profile updated successfully");
  } catch (err: any) {
    console.error("PUT Profile error:", err);
    return sendError("Internal server error during update", 500);
  }
}
