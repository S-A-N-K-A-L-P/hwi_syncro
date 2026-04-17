import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import dbConnect from "@/lib/mongodb";
import Startup from "@/models/Startup";
import User from "@/models/User";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { inviteCode, startupId } = await req.json();

    if (!inviteCode && !startupId) {
      return NextResponse.json({ message: "Invite code or startup ID is required" }, { status: 400 });
    }

    await dbConnect();

    let startup;
    if (inviteCode) {
      startup = await Startup.findOne({ inviteCode: inviteCode.toUpperCase() });
    } else {
      startup = await Startup.findById(startupId);
    }

    if (!startup) {
      return NextResponse.json({ message: "Startup not found" }, { status: 404 });
    }

    // Check if user is already a member
    if (startup.members.includes(session.user.id)) {
      return NextResponse.json({ message: "You are already a member of this startup" }, { status: 400 });
    }

    // Add user to startup members
    startup.members.push(session.user.id);
    await startup.save();

    // Update user's startupId and role (if not leader)
    const user = await User.findById(session.user.id);
    if (user) {
      user.startupId = startup._id;
      if (user.role !== "leader") {
        user.role = "member";
      }
      await user.save();
    }

    return NextResponse.json({ message: "Joined successfully", startup });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
