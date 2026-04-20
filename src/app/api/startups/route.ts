import { NextRequest } from "next/server";
import dbConnect from "@/lib/mongodb";
import Startup from "@/models/Startup";
import User from "@/models/User";
import { getUserFromRequest } from "@/lib/api-auth";
import { sendResponse, sendError } from "@/lib/api-response";

export async function GET(req: NextRequest) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("query");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const skip = (page - 1) * limit;

    let filter: any = { visibility: "public" };
    if (query) {
      filter = { 
        ...filter, 
        $or: [
          { name: { $regex: query, $options: "i" } },
          { techStack: { $in: [new RegExp(query, "i")] } }
        ]
      };
    }

    const startups = await Startup.find(filter)
      .populate("createdBy", "name avatar")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    const total = await Startup.countDocuments(filter);

    return sendResponse({
      startups,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit)
      }
    }, "Startups retrieved successfully");
  } catch (error: any) {
    console.error("GET Startups error:", error);
    return sendError("Internal server error", 500);
  }
}

export async function POST(req: NextRequest) {
  try {
    const authUser = await getUserFromRequest(req);
    if (!authUser) {
      return sendError("Unauthorized", 401);
    }

    const { name, description, techStack, primaryTechnology, requiredRoles, logo } = await req.json();

    if (!name || !description || !techStack || !primaryTechnology) {
      return sendError("Missing required fields (name, description, techStack, primaryTechnology)", 400);
    }

    await dbConnect();

    // Check if user already has a startup
    const userDoc = await User.findById(authUser.id);
    if (userDoc.currentStartup) {
      return sendError("You are already leading or part of a startup. Leave it first.", 400);
    }

    // Generate unique slug
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-");

    // Generate unique invite code
    const inviteCode = `HWI-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

    const startup = await Startup.create({
      name,
      slug,
      description,
      techStack: Array.isArray(techStack) ? techStack : techStack.split(",").map((s: string) => s.trim()),
      primaryTechnology,
      requiredRoles: Array.isArray(requiredRoles) ? requiredRoles : requiredRoles.split(",").map((s: string) => s.trim()),
      createdBy: authUser.id,
      inviteCode,
      members: [authUser.id],
      logo: logo || "",
    });

    // Update user role to leader and set currentStartup
    await User.findByIdAndUpdate(authUser.id, {
      role: "leader",
      currentStartup: startup._id,
    });

    return sendResponse(startup, "Startup registered successfully", 201);
  } catch (error: any) {
    console.error("POST Startups error:", error);
    if (error.code === 11000) {
      return sendError("Startup name already exists", 400);
    }
    return sendError("Internal server error", 500);
  }
}
