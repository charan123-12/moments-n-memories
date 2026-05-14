import { NextResponse } from "next/server";

import { db } from "../../../firebase-admin";

export async function GET(req: Request) {

  try {

    const { searchParams } =
      new URL(req.url);

    const email =
      searchParams.get("email");

    if (!email) {
      return NextResponse.json({
        success: false,
        bookings: [],
      });
    }

    const snapshot = await db
      .collection("bookings")
      .where(
        "customerEmail",
        "==",
        email
      )
      .get();

    const bookings =
      snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

    return NextResponse.json({
      success: true,
      bookings,
    });

  } catch (error) {

    console.log(
      "CLIENT BOOKINGS ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        bookings: [],
      },
      {
        status: 500,
      }
    );
  }
}