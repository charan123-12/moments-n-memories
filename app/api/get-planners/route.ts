import { NextResponse } from "next/server";

import { db } from "../../../firebase-admin";

export async function GET() {
  try {

    const snapshot = await db
      .collection("planners")
      .get();

    const planners = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return NextResponse.json({
      planners,
    });

  } catch (error) {

    console.log(error);

    return NextResponse.json({
      planners: [],
    });
  }
}