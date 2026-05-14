import { NextResponse } from "next/server";

import { db } from "../../../firebase-admin";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const email = searchParams.get("email");

    if (!email) {
      return NextResponse.json({
        bookings: [],
      });
    }

    // find planner by email
    const plannerSnapshot = await db
      .collection("planners")
      .where("email", "==", email)
      .get();

    if (plannerSnapshot.empty) {
      return NextResponse.json({
        bookings: [],
      });
    }

    const plannerDoc = plannerSnapshot.docs[0];

    const plannerId = plannerDoc.id;

    // get bookings for this planner
    const bookingsSnapshot = await db
      .collection("bookings")
      .where("plannerId", "==", plannerId)
      .get();

    const bookings = bookingsSnapshot.docs.map(
      (doc) => ({
        id: doc.id,
        ...doc.data(),
      })
    );

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