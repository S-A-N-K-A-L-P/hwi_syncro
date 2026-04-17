import { NextRequest } from "next/server";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import { sendResponse, sendError } from "@/lib/api-response";

export async function GET(req: NextRequest) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const q = searchParams.get("q");

    if (!q) {
      return sendError("Search query 'q' is required", 400);
    }

    const users = await User.find({
      $or: [
        { name: { $regex: q, $options: "i" } },
        { skills: { $in: [new RegExp(q, "i")] } },
        { techStackPreference: { $regex: q, $options: "i" } }
      ]
    }).limit(20).lean();

    return sendResponse(users, `Search results for '${q}'`);
  } catch (err: any) {
    console.error("User search error:", err);
    return sendError("Internal server error", 500);
  }
}
