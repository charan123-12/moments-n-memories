import { NextResponse } from "next/server";
import { db } from "../../../firebase-admin";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const docRef = await db.collection("planners").add({
      ...body,
      createdAt: new Date(),
    });

    return NextResponse.json({
      success: true,
      id: docRef.id,
    });
  } catch (error) {
    console.log("CREATE PLANNER ERROR:", error);

    return NextResponse.json(
      {
        success: false,
      },
      {
        status: 500,
      }
    );
  }
}