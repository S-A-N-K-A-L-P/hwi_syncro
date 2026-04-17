import { NextRequest } from "next/server";
import dbConnect from "@/lib/mongodb";
import Startup from "@/models/Startup";
import User from "@/models/User";
import { getUserFromRequest } from "@/lib/api-auth";
import { sendResponse, sendError } from "@/lib/api-response";

export async function GET(req: NextRequest) {
  try {
    await dbConnect();
    const authUser = await getUserFromRequest(req);

    if (!authUser) {
      return sendError("Unauthorized", 401);
    }

    const user = await User.findById(authUser.id);
    if (!user.currentStartup) {
      return sendResponse(null, "User is not part of any startup");
    }

    const startup = await Startup.findById(user.currentStartup)
      .populate("members", "name avatar email role bio")
      .populate("createdBy", "name avatar email")
      .lean();

    if (!startup) {
      // Cleanup if startup was deleted but user still has reference
      user.currentStartup = null;
      await user.save();
      return sendResponse(null, "Startup not found, user reference cleared");
    }

    return sendResponse(startup, "Startup retrieved successfully");
  } catch (err: any) {
    console.error("GET My Startup error:", err);
    return sendError("Internal server error", 500);
  }
}
