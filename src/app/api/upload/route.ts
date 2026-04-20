import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import cloudinary from "@/lib/cloudinary";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await req.formData();
    const file = formData.get("file") as File;
    const folder = (formData.get("folder") as string) || "avatars";

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Upload to Cloudinary
    const result = await new Promise((resolve, reject) => {
      console.log(`Starting Cloudinary stream upload to folder: syncro/${folder}`);
      cloudinary.uploader.upload_stream(
        { folder: `syncro/${folder}` },
        (error, result) => {
          if (error) {
            console.error("Cloudinary upload error details:", error);
            reject(error);
          } else {
            console.log("Cloudinary upload successful:", result?.secure_url);
            resolve(result);
          }
        }
      ).end(buffer);
    });

    return NextResponse.json(result);
  } catch (err: any) {
    console.error("Upload API Route error:", err);
    return NextResponse.json({ 
      error: "Upload failed", 
      details: err.message,
      code: err.code || "UNKNOWN_ERROR" 
    }, { status: 500 });
  }
}
