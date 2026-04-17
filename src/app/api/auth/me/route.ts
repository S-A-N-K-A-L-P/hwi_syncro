import { NextRequest } from "next/server";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import { sendResponse, sendError } from "@/lib/api-response";
import { getUserFromRequest } from "@/lib/api-auth";

export async function GET(req: NextRequest) {
  try {
    await dbConnect();
    const authUser = await getUserFromRequest(req);

    if (!authUser) {
      return sendError("Unauthorized", 401);
    }

    const user = await User.findById(authUser.id).lean();
    if (!user) {
      return sendError("User not found", 404);
    }

    return sendResponse(user, "User profile retrieved successfully");
  } catch (err: any) {
    console.error("Auth Me error:", err);
    return sendError("Internal server error", 500);
  }
}
