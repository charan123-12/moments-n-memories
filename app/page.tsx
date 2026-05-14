"use client";

import Link from "next/link";

export default function HomePage() {

  return (
    <main className="min-h-screen bg-black text-white overflow-hidden">

      {/* HERO */}
      <section className="relative">

        {/* Glow Effects */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-pink-500/20 blur-[180px] rounded-full" />

        <div className="absolute top-40 right-0 w-[400px] h-[400px] bg-purple-500/20 blur-[150px] rounded-full" />

        <div className="max-w-7xl mx-auto px-4 md:px-6 pt-24 md:pt-32 pb-20 relative z-10">

          <div className="max-w-4xl">

            {/* Badge */}
            <div className="inline-flex items-center gap-3 bg-white/5 border border-white/10 backdrop-blur-xl px-5 py-3 rounded-full text-sm text-zinc-300 mb-8">

              ✨ India's Modern Event Marketplace

            </div>

            {/* Heading */}
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black leading-[1.05]">

              Create
              {" "}

              <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">

                unforgettable

              </span>

              {" "}
              moments.

            </h1>

            {/* Subtext */}
            <p className="mt-8 text-lg md:text-2xl text-zinc-400 leading-9 max-w-3xl">

              Discover planners, decorators,
              surprise creators and celebration experts
              for birthdays, proposals, weddings,
              anniversaries and unforgettable memories.

            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-5 mt-12">

              <Link
                href="/planners"
                className="bg-gradient-to-r from-pink-500 to-purple-600 hover:scale-[1.02] transition px-8 py-5 rounded-2xl text-lg font-bold text-center"
              >
                Explore Planners
              </Link>

              <Link
                href="/create-profile"
                className="border border-zinc-700 hover:border-zinc-500 hover:bg-white/5 transition px-8 py-5 rounded-2xl text-lg font-bold text-center"
              >
                Become a Planner
              </Link>

            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mt-20">

              <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-6">

                <h3 className="text-4xl font-black">
                  100+
                </h3>

                <p className="text-zinc-400 mt-2">
                  Verified Planners
                </p>

              </div>

              <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-6">

                <h3 className="text-4xl font-black">
                  500+
                </h3>

                <p className="text-zinc-400 mt-2">
                  Events Managed
                </p>

              </div>

              <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-6">

                <h3 className="text-4xl font-black">
                  50+
                </h3>

                <p className="text-zinc-400 mt-2">
                  Cities Covered
                </p>

              </div>

              <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-6">

                <h3 className="text-4xl font-black">
                  4.9★
                </h3>

                <p className="text-zinc-400 mt-2">
                  Average Rating
                </p>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* FEATURED CATEGORIES */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 py-24">

        <div className="flex items-center justify-between mb-14">

          <div>

            <p className="text-pink-400 font-semibold mb-3">
              CATEGORIES
            </p>

            <h2 className="text-4xl md:text-6xl font-black">
              Explore Celebrations
            </h2>

          </div>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

          {[
            {
              title:
                "Birthday Surprises",
              emoji: "🎂",
            },

            {
              title:
                "Wedding Planning",
              emoji: "💍",
            },

            {
              title:
                "Proposals",
              emoji: "❤️",
            },

            {
              title:
                "Decorations",
              emoji: "✨",
            },
          ].map((item) => (

            <div
              key={item.title}
              className="group bg-zinc-900 border border-zinc-800 hover:border-pink-500/40 rounded-[32px] p-8 transition overflow-hidden relative"
            >

              <div className="absolute inset-0 bg-gradient-to-br from-pink-500/0 to-purple-500/0 group-hover:from-pink-500/10 group-hover:to-purple-500/10 transition" />

              <div className="relative z-10">

                <div className="text-6xl mb-8">
                  {item.emoji}
                </div>

                <h3 className="text-3xl font-bold leading-tight">
                  {item.title}
                </h3>

                <p className="text-zinc-400 mt-5 leading-7">

                  Find top-rated experts to create
                  unforgettable experiences.

                </p>

              </div>

            </div>

          ))}

        </div>

      </section>

      {/* HOW IT WORKS */}
      <section className="bg-zinc-950 border-y border-zinc-900">

        <div className="max-w-7xl mx-auto px-4 md:px-6 py-24">

          <div className="text-center mb-20">

            <p className="text-pink-400 font-semibold mb-4">
              SIMPLE PROCESS
            </p>

            <h2 className="text-4xl md:text-6xl font-black">
              How It Works
            </h2>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

            {[
              {
                step: "01",
                title:
                  "Find Your Planner",
                text:
                  "Browse verified planners and discover experts for every celebration.",
              },

              {
                step: "02",
                title:
                  "Book & Chat",
                text:
                  "Send booking requests and discuss ideas directly through realtime chat.",
              },

              {
                step: "03",
                title:
                  "Celebrate",
                text:
                  "Confirm payments, plan your event and create unforgettable memories.",
              },
            ].map((item) => (

              <div
                key={item.step}
                className="bg-black border border-zinc-800 rounded-[32px] p-8"
              >

                <div className="text-pink-500 text-6xl font-black">
                  {item.step}
                </div>

                <h3 className="text-3xl font-bold mt-8">
                  {item.title}
                </h3>

                <p className="text-zinc-400 mt-5 text-lg leading-8">

                  {item.text}

                </p>

              </div>

            ))}

          </div>

        </div>

      </section>

      {/* TESTIMONIALS */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 py-24">

        <div className="text-center mb-20">

          <p className="text-pink-400 font-semibold mb-4">
            TESTIMONIALS
          </p>

          <h2 className="text-4xl md:text-6xl font-black">
            Loved By Customers
          </h2>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {[
            {
              name: "Aarav",
              text:
                "The proposal setup was absolutely magical. Everything was handled perfectly.",
            },

            {
              name: "Priya",
              text:
                "Booking a birthday planner was super easy and the decorations were amazing.",
            },

            {
              name: "Rahul",
              text:
                "Realtime chat and payment flow made the entire experience smooth.",
            },
          ].map((review) => (

            <div
              key={review.name}
              className="bg-zinc-900 border border-zinc-800 rounded-[32px] p-8"
            >

              <div className="text-yellow-400 text-2xl mb-6">
                ⭐⭐⭐⭐⭐
              </div>

              <p className="text-zinc-300 text-lg leading-8">

                "{review.text}"

              </p>

              <div className="mt-8">

                <h3 className="text-2xl font-bold">
                  {review.name}
                </h3>

              </div>

            </div>

          ))}

        </div>

      </section>

      {/* FINAL CTA */}
      <section className="relative overflow-hidden">

        <div className="absolute inset-0 bg-gradient-to-r from-pink-500/20 to-purple-500/20 blur-[120px]" />

        <div className="max-w-5xl mx-auto px-4 md:px-6 py-24 relative z-10">

          <div className="bg-zinc-900/80 border border-zinc-800 backdrop-blur-2xl rounded-[40px] p-10 md:p-16 text-center">

            <h2 className="text-4xl md:text-6xl font-black leading-tight">

              Ready to create
              unforgettable memories?

            </h2>

            <p className="text-zinc-400 text-lg md:text-2xl leading-9 mt-8">

              Discover planners, book experiences,
              and celebrate life’s most special moments.

            </p>

            <div className="flex flex-col sm:flex-row gap-5 justify-center mt-12">

              <Link
                href="/planners"
                className="bg-gradient-to-r from-pink-500 to-purple-600 px-8 py-5 rounded-2xl text-lg font-bold"
              >
                Explore Planners
              </Link>

              <Link
                href="/signup"
                className="border border-zinc-700 hover:bg-white/5 transition px-8 py-5 rounded-2xl text-lg font-bold"
              >
                Get Started
              </Link>

            </div>

          </div>

        </div>

      </section>

    </main>
  );
}