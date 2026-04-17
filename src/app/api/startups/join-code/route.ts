import { NextRequest } from "next/server";
import dbConnect from "@/lib/mongodb";
import Startup from "@/models/Startup";
import User from "@/models/User";
import { getUserFromRequest } from "@/lib/api-auth";
import { sendResponse, sendError } from "@/lib/api-response";

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const authUser = await getUserFromRequest(req);
    if (!authUser) {
      return sendError("Unauthorized", 401);
    }

    const { code } = await req.json();
    if (!code) {
      return sendError("Invite code is required", 400);
    }

    const startup = await Startup.findOne({ inviteCode: code.toUpperCase() });
    if (!startup) {
      return sendError("Invalid invite code", 404);
    }

    const user = await User.findById(authUser.id);
    if (user.currentStartup) {
      if (user.currentStartup.toString() === startup._id.toString()) {
        return sendError("You are already a member of this startup", 400);
      }
      return sendError("You are already part of another startup. Leave it first.", 400);
    }

    // Join startup
    startup.members.push(user._id);
    await startup.save();

    user.currentStartup = startup._id;
    await user.save();

    return sendResponse({
      startupId: startup._id,
      name: startup.name
    }, "Successfully joined the startup");

  } catch (err: any) {
    console.error("Join by code error:", err);
    return sendError("Internal server error during join process", 500);
  }
}
