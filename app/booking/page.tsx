"use client";

import { useSearchParams } from "next/navigation";

import { useState } from "react";

import { auth } from "../../firebase";

import toast from "react-hot-toast";

export default function BookingPage() {

  const searchParams = useSearchParams();

  const planner =
    searchParams.get("planner");

  const [loading, setLoading] =
    useState(false);

  const [name, setName] =
    useState("");

  const [phone, setPhone] =
    useState("");

  const [occasion, setOccasion] =
    useState("");

  const [date, setDate] =
    useState("");

  const [budget, setBudget] =
    useState("");

  const [message, setMessage] =
    useState("");

  const handleBooking = async () => {

    if (
      !name ||
      !phone ||
      !occasion ||
      !date ||
      !budget
    ) {

      toast.error(
        "Please fill all required fields."
      );

      return;
    }

    try {

      setLoading(true);

      const response = await fetch(
        "/api/create-booking",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            plannerEmail: planner,

            customerEmail:
              auth.currentUser?.email || "",

            name,
            phone,
            occasion,
            date,
            budget,
            message,

            status: "Pending",
          }),
        }
      );

      const data =
        await response.json();

      if (data.success) {

        toast.success(
          "Booking request sent!"
        );

        setName("");
        setPhone("");
        setOccasion("");
        setDate("");
        setBudget("");
        setMessage("");

      } else {

        toast.error(
          "Booking failed"
        );

      }

    } catch (error) {

      console.log(error);

      toast.error(
        "Something went wrong"
      );

    }

    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-black text-white overflow-hidden">

      {/* Hero */}
      <section className="relative border-b border-zinc-800 overflow-hidden">

        <div className="absolute inset-0 bg-gradient-to-b from-pink-500/10 to-transparent" />

        <div className="relative max-w-7xl mx-auto px-4 md:px-6 py-16 md:py-24">

          <div className="max-w-4xl">

            <div className="inline-flex items-center gap-3 bg-pink-500/10 border border-pink-500/20 text-pink-300 px-4 md:px-5 py-2 md:py-3 rounded-full mb-6 md:mb-8 text-sm md:text-base">

              <span className="w-3 h-3 bg-pink-400 rounded-full" />

              Premium Event Booking

            </div>

            <h1 className="text-4xl md:text-7xl font-bold leading-tight">
              Create An
              <span className="bg-gradient-to-r from-pink-400 to-purple-500 bg-clip-text text-transparent">
                {" "}Unforgettable Memory
              </span>
            </h1>

            <p className="mt-6 md:mt-8 text-zinc-400 text-base md:text-xl leading-8 md:leading-9 max-w-3xl">
              Book premium surprise planners,
              decorators and creators for your
              special occasion.
            </p>

          </div>

        </div>

      </section>

      {/* Booking Form */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 py-16 md:py-20">

        <div className="grid lg:grid-cols-2 gap-10 md:gap-16">

          {/* Left */}
          <div>

            <div className="sticky top-24 md:top-32">

              <div className="rounded-[32px] md:rounded-[40px] overflow-hidden border border-zinc-800">

                <div className="h-[300px] md:h-[500px] bg-gradient-to-br from-pink-600 to-purple-700 flex items-center justify-center text-6xl md:text-8xl font-bold">
                  ✨
                </div>

              </div>

              <div className="mt-8 md:mt-10 space-y-6">

                <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-5 md:p-6">

                  <h3 className="text-xl md:text-2xl font-bold">
                    Why Book With Us?
                  </h3>

                  <div className="mt-5 md:mt-6 space-y-4 md:space-y-5 text-zinc-400 text-sm md:text-base">

                    <p>
                      ✅ Verified planners
                    </p>

                    <p>
                      ⚡ Fast responses
                    </p>

                    <p>
                      💖 Personalized surprises
                    </p>

                    <p>
                      🎉 Premium event experiences
                    </p>

                  </div>

                </div>

              </div>

            </div>

          </div>

          {/* Right */}
          <div>

            <div className="bg-zinc-900 border border-zinc-800 rounded-[32px] md:rounded-[40px] p-6 md:p-10">

              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-8 md:mb-10">

                <div>

                  <h2 className="text-3xl md:text-5xl font-bold leading-tight">
                    Booking Details
                  </h2>

                  <p className="text-zinc-400 mt-3 md:mt-4 text-sm md:text-base break-all">
                    Planner: {planner}
                  </p>

                </div>

                <div className="bg-green-500/10 border border-green-500/20 px-4 md:px-5 py-2 md:py-3 rounded-full text-green-300 text-sm md:text-base w-fit">
                  Available
                </div>

              </div>

              <div className="space-y-5 md:space-y-6">

                <input
                  type="text"
                  placeholder="Your Full Name"
                  value={name}
                  onChange={(e) =>
                    setName(e.target.value)
                  }
                  className="w-full bg-black border border-zinc-800 focus:border-pink-500 transition p-4 md:p-5 rounded-2xl outline-none text-sm md:text-base"
                />

                <input
                  type="text"
                  placeholder="Phone Number"
                  value={phone}
                  onChange={(e) =>
                    setPhone(e.target.value)
                  }
                  className="w-full bg-black border border-zinc-800 focus:border-pink-500 transition p-4 md:p-5 rounded-2xl outline-none text-sm md:text-base"
                />

                <select
                  value={occasion}
                  onChange={(e) =>
                    setOccasion(
                      e.target.value
                    )
                  }
                  className="w-full bg-black border border-zinc-800 focus:border-pink-500 transition p-4 md:p-5 rounded-2xl outline-none text-sm md:text-base"
                >

                  <option value="">
                    Select Occasion
                  </option>

                  <option>
                    Birthday
                  </option>

                  <option>
                    Proposal
                  </option>

                  <option>
                    Anniversary
                  </option>

                  <option>
                    Baby Shower
                  </option>

                  <option>
                    Romantic Surprise
                  </option>

                </select>

                <input
                  type="date"
                  value={date}
                  onChange={(e) =>
                    setDate(e.target.value)
                  }
                  className="w-full bg-black border border-zinc-800 focus:border-pink-500 transition p-4 md:p-5 rounded-2xl outline-none text-sm md:text-base"
                />

                <input
                  type="text"
                  placeholder="Estimated Budget"
                  value={budget}
                  onChange={(e) =>
                    setBudget(e.target.value)
                  }
                  className="w-full bg-black border border-zinc-800 focus:border-pink-500 transition p-4 md:p-5 rounded-2xl outline-none text-sm md:text-base"
                />

                <textarea
                  placeholder="Describe your dream surprise..."
                  value={message}
                  onChange={(e) =>
                    setMessage(
                      e.target.value
                    )
                  }
                  className="w-full bg-black border border-zinc-800 focus:border-pink-500 transition p-4 md:p-5 rounded-2xl h-36 md:h-40 outline-none text-sm md:text-base"
                />

                <button
                  onClick={handleBooking}
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:scale-[1.02] transition py-4 md:py-5 rounded-2xl font-bold text-base md:text-lg disabled:opacity-50"
                >

                  {loading
                    ? "Sending Request..."
                    : "Send Booking Request"}

                </button>

                <p className="text-center text-zinc-500 text-xs md:text-sm leading-6">
                  Secure booking flow. Payments coming soon.
                </p>

              </div>

            </div>

          </div>

        </div>

      </section>

    </main>
  );
}