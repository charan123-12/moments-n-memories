import { db } from "../../../firebase-admin";

async function getPlanner(id: string) {

  const doc = await db
    .collection("planners")
    .doc(id)
    .get();

  if (!doc.exists) {

    return null;

  }

  return {
    id: doc.id,
    ...doc.data(),
  };
}

async function getWorks(email: string) {

  const snapshot = await db
    .collection("works")
    .where(
      "plannerEmail",
      "==",
      email
    )
    .get();

  return snapshot.docs.map(
    (doc) => ({
      id: doc.id,
      ...doc.data(),
    })
  );
}

async function getReviews(email: string) {

  const snapshot = await db
    .collection("reviews")
    .where(
      "plannerEmail",
      "==",
      email
    )
    .orderBy(
      "createdAt",
      "desc"
    )
    .get();

  return snapshot.docs.map(
    (doc) => ({
      id: doc.id,
      ...doc.data(),
    })
  );
}

export default async function PlannerProfile({
  params,
}: {
  params: Promise<{ id: string }>;
}) {

  const { id } =
    await params;

  const planner: any =
    await getPlanner(id);

  if (!planner) {

    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center text-3xl">
        Planner not found
      </div>
    );
  }

  const works: any =
    await getWorks(
      planner.email
    );

  const reviews: any =
    await getReviews(
      planner.email
    );

  // Average rating
  const averageRating =
    reviews.length > 0
      ? (
          reviews.reduce(
            (
              total: number,
              review: any
            ) =>
              total +
              review.rating,
            0
          ) /
          reviews.length
        ).toFixed(1)
      : null;

  return (
    <main className="min-h-screen bg-black text-white">

      {/* Hero */}
      <section className="relative border-b border-zinc-800">

        <div className="max-w-6xl mx-auto px-4 md:px-6 py-16 md:py-20">

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-12">

            {/* Left */}
            <div>

              <div className="inline-flex items-center gap-3 bg-pink-500/10 border border-pink-500/20 text-pink-300 px-4 py-2 rounded-full text-sm mb-6">

                ✨ Verified Planner

              </div>

              <h1 className="text-5xl md:text-7xl font-bold leading-tight">

                {planner.name}

              </h1>

              {/* Meta */}
              <div className="mt-8 space-y-4 text-zinc-300 text-lg">

                <p>
                  📍 {planner.city}
                </p>

                <p>
                  🎉 {planner.category}
                </p>

                <p>
                  💰 Starting from ₹
                  {planner.price}
                </p>

                {/* Ratings */}
                {averageRating && (

                  <p>
                    ⭐ {averageRating}
                    {" "}
                    ({reviews.length} reviews)
                  </p>

                )}

              </div>

              {/* Description */}
              <p className="mt-8 text-zinc-400 max-w-2xl text-lg leading-8">

                {planner.description}

              </p>

              {/* CTA */}
              <a
                href={`/booking?planner=${planner.email}`}
                className="inline-block mt-10 bg-gradient-to-r from-pink-500 to-purple-600 hover:scale-[1.02] transition px-8 py-4 rounded-2xl font-bold text-lg"
              >
                Book This Planner
              </a>

            </div>

            {/* Avatar */}
            <div className="w-56 h-56 md:w-72 md:h-72 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 flex items-center justify-center text-7xl md:text-8xl font-bold shadow-2xl">

              {
                planner.name
                  ?.charAt(0)
              }

            </div>

          </div>

        </div>

      </section>

      {/* Portfolio */}
      <section className="max-w-6xl mx-auto px-4 md:px-6 py-16 md:py-20">

        <div className="flex items-center justify-between mb-10">

          <h2 className="text-4xl md:text-5xl font-bold">
            Portfolio
          </h2>

          <div className="text-zinc-400">
            {works.length} uploads
          </div>

        </div>

        {works.length === 0 ? (

          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-10 text-center">

            <p className="text-zinc-400 text-lg">
              No portfolio uploaded yet.
            </p>

          </div>

        ) : (

          <div className="space-y-12">

            {works.map((work: any) => (

              <div
                key={work.id}
                className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6"
              >

                <h3 className="text-3xl font-bold mb-8">
                  {work.title}
                </h3>

                <div className="grid md:grid-cols-3 gap-6">

                  {work.files?.map(
                    (
                      file: any,
                      index: number
                    ) => (

                      <div
                        key={index}
                        className="overflow-hidden rounded-2xl bg-black border border-zinc-800"
                      >

                        {file.resourceType ===
                        "video" ? (

                          <video
                            controls
                            className="w-full h-80 object-cover"
                          >

                            <source
                              src={file.url}
                            />

                          </video>

                        ) : (

                          <img
                            src={file.url}
                            alt="Portfolio"
                            className="w-full h-80 object-cover"
                          />

                        )}

                      </div>
                    )
                  )}

                </div>

              </div>

            ))}

          </div>

        )}

      </section>

      {/* Reviews */}
      <section className="max-w-6xl mx-auto px-4 md:px-6 pb-20">

        <div className="flex items-center justify-between mb-10">

          <h2 className="text-4xl md:text-5xl font-bold">
            Reviews
          </h2>

          <div className="text-zinc-400">
            {reviews.length} reviews
          </div>

        </div>

        {reviews.length === 0 ? (

          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-10 text-center">

            <p className="text-zinc-400 text-lg">
              No reviews yet.
            </p>

          </div>

        ) : (

          <div className="grid md:grid-cols-2 gap-6">

            {reviews.map(
              (review: any) => (

                <div
                  key={review.id}
                  className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6"
                >

                  <div className="flex items-center justify-between mb-5">

                    <h3 className="text-2xl font-bold">
                      {review.name}
                    </h3>

                    <div className="text-yellow-400 text-xl">
                      {"⭐".repeat(
                        review.rating
                      )}
                    </div>

                  </div>

                  <p className="text-zinc-400 leading-7">

                    {review.review}

                  </p>

                </div>

              )
            )}

          </div>

        )}

      </section>

    </main>
  );
}