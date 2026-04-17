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

    const startup: any = await Startup.findById(id)
      .populate("members", "name avatar email role bio skills currentStartup")
      .select("members")
      .lean();

    if (!startup) {
      return sendError("Startup not found", 404);
    }

    return sendResponse(startup.members, "Startup members retrieved successfully");
  } catch (err: any) {
    console.error("GET Startup members error:", err);
    return sendError("Internal server error", 500);
  }
}
