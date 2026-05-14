import { NextRequest, NextResponse } from "next/server";

import { db } from "@/firebase-admin";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { email, role } = body;

    const docRef = await db.collection("users").add({
      email,
      role,
      createdAt: new Date().toISOString(),
    });

    return NextResponse.json({
      success: true,
      id: docRef.id,
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json({
      success: false,
    });
  }
}