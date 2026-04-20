import { NextRequest, NextResponse } from "next/server";
import { getUserFromRequest } from "@/lib/api-auth";
import dbConnect from "@/lib/mongodb";
import Startup from "@/models/Startup";
import MembershipRequest from "@/models/MembershipRequest";
import { sendResponse, sendError } from "@/lib/api-response";

export async function POST(req: NextRequest) {
  try {
    const authUser = await getUserFromRequest(req);
    if (!authUser) {
      return sendError("Unauthorized", 401);
    }

    const { inviteCode, startupId, role, message } = await req.json();

    if (!inviteCode && !startupId) {
      return sendError("Invite code or startup ID is required", 400);
    }

    if (!role) {
      return sendError("Role is required", 400);
    }

    await dbConnect();

    let startup;
    if (inviteCode) {
      startup = await Startup.findOne({ inviteCode: inviteCode.toUpperCase() });
    } else {
      startup = await Startup.findById(startupId);
    }

    if (!startup) {
      return sendError("Startup not found", 404);
    }

    // Check if user is already a member
    if (startup.members.some((m: any) => m.toString() === authUser.id)) {
      return sendError("You are already a member of this startup", 400);
    }

    // Check if there is already a pending request
    const existingRequest = await MembershipRequest.findOne({
      userId: authUser.id,
      startupId: startup._id,
      status: "pending"
    });

    if (existingRequest) {
      return sendError("You already have a pending request for this startup", 400);
    }

    // Create a membership request instead of adding immediately
    const request = await MembershipRequest.create({
      userId: authUser.id,
      startupId: startup._id,
      role,
      message: message || "I want to join your team!",
      status: "pending"
    });

    return sendResponse(request, "Join request submitted successfully. Waiting for Admin approval.", 201);
  } catch (error: any) {
    console.error("Join Startup Request error:", error);
    return sendError(error.message || "Internal server error", 500);
  }
}
