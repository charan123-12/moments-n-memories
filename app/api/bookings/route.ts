import { NextResponse } from "next/server";
import { db } from "../../../firebase-admin";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    console.log("BODY:", body);

    const docRef = await db.collection("bookings").add({
      ...body,
      createdAt: new Date().toISOString(),
    });

    console.log("SUCCESS:", docRef.id);

    return NextResponse.json({
      success: true,
      id: docRef.id,
    });
  } catch (error) {
    console.error("ERROR:", error);

    return NextResponse.json({
      success: false,
    });
  }
}