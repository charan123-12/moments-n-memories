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
        planner: null,
      });

    }

    const snapshot = await db
      .collection("planners")
      .where("email", "==", email)
      .limit(1)
      .get();

    if (snapshot.empty) {

      return NextResponse.json({
        planner: null,
      });

    }

    const doc = snapshot.docs[0];

    return NextResponse.json({
      planner: {
        id: doc.id,
        ...doc.data(),
      },
    });

  } catch (error) {

    console.log(error);

    return NextResponse.json({
      planner: null,
    });

  }
}