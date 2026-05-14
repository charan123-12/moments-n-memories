import { NextResponse } from "next/server";

import { db } from "../../../firebase-admin";

export async function POST(
  req: Request
) {

  try {

    const body =
      await req.json();

    const {
      plannerEmail,
      name,
      rating,
      review,
    } = body;

    await db
      .collection("reviews")
      .add({
        plannerEmail,
        name,
        rating,
        review,
        createdAt:
          new Date(),
      });

    return NextResponse.json({
      success: true,
    });

  } catch (error) {

    console.log(
      "CREATE REVIEW ERROR:",
      error
    );

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