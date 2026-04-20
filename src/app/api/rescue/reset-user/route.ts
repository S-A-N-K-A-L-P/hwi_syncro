import { NextRequest } from "next/server";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import Startup from "@/models/Startup";
import { getUserFromRequest } from "@/lib/api-auth";
import { sendResponse, sendError } from "@/lib/api-response";

export async function GET(req: NextRequest) {
  try {
    await dbConnect();
    const authUser = await getUserFromRequest(req);
    
    if (!authUser) return sendError("Unauthorized access", 401);
    
    const user = await User.findById(authUser.id);
    if (!user) return sendError("Target user not identified", 404);

    const oldStartupId = user.currentStartup;
    
    // Mission Reset Logic
    user.currentStartup = undefined;
    if (user.role === "leader") user.role = "member";
    await user.save();

    console.log(`Rescue Operation: Cleared venture association for ${user.name}`);

    return sendResponse({ 
      user: user.name, 
      resetSuccess: true, 
      previousVenture: oldStartupId 
    }, "System association successfully cleared. You may now initiate a new venture.");
  } catch (error: any) {
    console.error("Rescue Failure:", error);
    return sendError("Internal System Fault: " + error.message, 500);
  }
}
