import { NextResponse } from "next/server";

import { db } from "../../../firebase-admin";

export async function POST(
  req: Request
) {

  try {

    const body =
      await req.json();

    const {
      bookingId,
      status,
    } = body;

    await db
      .collection("bookings")
      .doc(bookingId)
      .update({
        status,
      });

    return NextResponse.json({
      success: true,
    });

  } catch (error) {

    console.log(error);

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