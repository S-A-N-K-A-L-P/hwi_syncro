import { NextResponse } from "next/server";

export function sendResponse(
  data: any = null,
  message: string = "",
  status: number = 200,
  success: boolean = true
) {
  return NextResponse.json(
    {
      success,
      data,
      message,
    },
    { status }
  );
}

export function sendError(message: string, status: number = 400) {
  return sendResponse(null, message, status, false);
}
