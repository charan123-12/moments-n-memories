import { NextResponse } from "next/server";
import { db } from "../../../firebase-admin";

export async function GET() {
  try {
    const snapshot = await db
      .collection("bookings")
      .get();

    const bookings = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return NextResponse.json({
      bookings,
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json({
      bookings: [],
    });
  }
}