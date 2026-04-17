import { NextRequest } from "next/server";
import dbConnect from "@/lib/mongodb";
import Startup from "@/models/Startup";
import { sendResponse, sendError } from "@/lib/api-response";

export async function GET(
  req: NextRequest,
  props: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await props.params;
    await dbConnect();

    const startup = await Startup.findById(id)
      .populate("members", "name avatar email role bio")
      .populate("createdBy", "name avatar email")
      .lean();

    if (!startup) {
      return sendError("Startup not found", 404);
    }

    return sendResponse(startup, "Startup details retrieved successfully");
  } catch (err: any) {
    console.error("GET Startup details error:", err);
    return sendError("Internal server error", 500);
  }
}
