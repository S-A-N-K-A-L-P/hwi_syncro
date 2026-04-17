import { NextRequest } from "next/server";
import dbConnect from "@/lib/mongodb";
import Startup from "@/models/Startup";
import { sendResponse, sendError } from "@/lib/api-response";

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const { code } = await req.json();

    if (!code) {
      return sendError("Code is required", 400);
    }

    const startup = await Startup.findOne({ inviteCode: code.toUpperCase() })
      .select("name description techStack status")
      .lean();

    if (!startup) {
      return sendError("Invalid invite code", 404);
    }

    return sendResponse(startup, "Code is valid");
  } catch (err: any) {
    return sendError("Internal server error", 500);
  }
}
