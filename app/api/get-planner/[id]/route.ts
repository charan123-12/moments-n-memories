import { NextResponse } from "next/server";

import { db } from "../../../../firebase-admin";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {

    const doc = await db
      .collection("planners")
      .doc(params.id)
      .get();

    if (!doc.exists) {
      return NextResponse.json({
        planner: null,
      });
    }

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