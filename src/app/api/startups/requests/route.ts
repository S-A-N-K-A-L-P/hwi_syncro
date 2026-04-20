import { NextRequest } from "next/server";
import { getUserFromRequest } from "@/lib/api-auth";
import dbConnect from "@/lib/mongodb";
import MembershipRequest from "@/models/MembershipRequest";
import Startup from "@/models/Startup";
import { sendResponse, sendError } from "@/lib/api-response";

/**
 * List all membership requests for the user's startup
 * GET /api/startups/requests
 */
export async function GET(req: NextRequest) {
  try {
    const authUser = await getUserFromRequest(req);
    if (!authUser) return sendError("Unauthorized", 401);

    await dbConnect();

    // Find the startup led by this user
    const startup = await Startup.findOne({ createdBy: authUser.id });
    if (!startup) {
      return sendResponse([], "No startup found for this user");
    }

    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status") || "pending";

    const requests = await MembershipRequest.find({
      startupId: startup._id,
      status
    })
    .populate("userId", "name email avatar skills")
    .sort({ createdAt: -1 })
    .lean();

    return sendResponse(requests, "Membership requests retrieved successfully");
  } catch (error: any) {
    console.error("GET Requests error:", error);
    return sendError("Internal server error", 500);
  }
}
