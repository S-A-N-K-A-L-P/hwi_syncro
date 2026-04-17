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

    const user = await User.findById(authUser.id);
    if (!user.currentStartup) {
      return sendError("You are not part of any startup", 400);
    }

    const startup = await Startup.findById(user.currentStartup);
    if (!startup) {
      user.currentStartup = null;
      await user.save();
      return sendResponse(null, "Reference cleared (startup didn't exist)");
    }

    // If leader, we might need special logic (e.g. transfer leadership or disband)
    // For now, let's just allow leaving, but if they created it, they can't leave without disbanding?
    // Let's check session role or createdBy
    const isLeader = startup.createdBy.toString() === authUser.id;
    if (isLeader) {
       return sendError("As the founder, you cannot leave your own startup. You must disband it instead.", 400);
    }

    // Remove member from startup
    startup.members = startup.members.filter((m: any) => m.toString() !== authUser.id);
    await startup.save();

    // Remove startup from user
    user.currentStartup = null;
    await user.save();

    return sendResponse(null, "Successfully left the startup team");

  } catch (err: any) {
    console.error("Leave startup error:", err);
    return sendError("Internal server error", 500);
  }
}
