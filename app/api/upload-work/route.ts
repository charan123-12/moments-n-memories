import { NextResponse } from "next/server";

import { db } from "../../../firebase-admin";

export async function POST(
  req: Request
) {

  try {

    const body =
      await req.json();

    console.log(body);

    const {
      title,
      files,
      plannerEmail,
    } = body;

    // Get first image as cover image
    const coverImage =
      files.find(
        (file: any) =>
          file.resourceType ===
          "image"
      )?.url || "";

    // Save work
    await db
      .collection("works")
      .add({
        title,
        files,
        plannerEmail,
        coverImage,
        createdAt:
          new Date().toISOString(),
      });

    // Update planner profile cover
    const plannerSnapshot =
      await db
        .collection("planners")
        .where(
          "email",
          "==",
          plannerEmail
        )
        .get();

    if (
      !plannerSnapshot.empty &&
      coverImage
    ) {

      const plannerDoc =
        plannerSnapshot.docs[0];

      await db
        .collection("planners")
        .doc(plannerDoc.id)
        .update({
          coverImage,
        });
    }

    return NextResponse.json({
      success: true,
    });

  } catch (error) {

    console.log(
      "UPLOAD ERROR:",
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