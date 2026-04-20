import { NextRequest } from "next/server";
import { getUserFromRequest } from "@/lib/api-auth";
import dbConnect from "@/lib/mongodb";
import MembershipRequest from "@/models/MembershipRequest";
import Startup from "@/models/Startup";
import User from "@/models/User";
import { sendResponse, sendError } from "@/lib/api-response";

/**
 * Handle individual request approval/rejection
 * PATCH /api/startups/requests/[id]
 */
export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const authUser = await getUserFromRequest(req);
    if (!authUser) return sendError("Unauthorized", 401);

    const { status } = await req.json(); // "approved" or "rejected"
    if (!["approved", "rejected"].includes(status)) {
      return sendError("Invalid status", 400);
    }

    await dbConnect();
    const { id } = params;

    const membershipRequest = await MembershipRequest.findById(id);
    if (!membershipRequest) return sendError("Request not found", 404);

    const startup = await Startup.findById(membershipRequest.startupId);
    if (!startup) return sendError("Startup not found", 404);

    // Verify authUser is the leader of this startup
    if (startup.createdBy.toString() !== authUser.id) {
      return sendError("Only the Lead Architect can manage requests", 403);
    }

    if (membershipRequest.status !== "pending") {
      return sendError("Request has already been processed", 400);
    }

    if (status === "approved") {
      // 1. Add user to startup members
      if (!startup.members.includes(membershipRequest.userId)) {
        startup.members.push(membershipRequest.userId);
        await startup.save();
      }

      // 2. Update user's currentStartup and role
      await User.findByIdAndUpdate(membershipRequest.userId, {
        currentStartup: startup._id,
        role: "member"
      });

      membershipRequest.status = "approved";
    } else {
      membershipRequest.status = "rejected";
    }

    await membershipRequest.save();

    return sendResponse(membershipRequest, `Member request ${status} successfully`);
  } catch (error: any) {
    console.error("PATCH Request error:", error);
    return sendError("Internal server error", 500);
  }
}
