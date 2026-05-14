"use client";

import Link from "next/link";

import {
  useEffect,
  useState,
} from "react";

import {
  auth,
} from "../../firebase";

import {
  onAuthStateChanged,
} from "firebase/auth";

import toast from "react-hot-toast";

import ProtectedRoute from "../../components/ProtectedRoute";

type Booking = {
  id: string;
  name: string;
  phone: string;
  occasion: string;
  date: string;
  budget: string;
  message: string;
  status?: string;
};

export default function PlannerDashboard() {

  const [bookings,
    setBookings] =
    useState<Booking[]>([]);

  const [loading,
    setLoading] =
    useState(true);

  const [plannerEmail,
    setPlannerEmail] =
    useState("");

  useEffect(() => {

    const unsubscribe =
      onAuthStateChanged(
        auth,
        async (user) => {

          if (!user?.email) {

            setLoading(false);

            return;
          }

          setPlannerEmail(
            user.email
          );

          try {

            const response =
              await fetch(
                `/api/my-bookings?email=${user.email}`
              );

            const data =
              await response.json();

            setBookings(
              data.bookings || []
            );

          } catch (error) {

            console.log(error);

          }

          setLoading(false);
        }
      );

    return () =>
      unsubscribe();

  }, []);

  const updateBookingStatus =
    async (
      bookingId: string,
      status: string
    ) => {

      try {

        const response =
          await fetch(
            "/api/update-booking-status",
            {
              method: "POST",

              headers: {
                "Content-Type":
                  "application/json",
              },

              body: JSON.stringify({
                bookingId,
                status,
              }),
            }
          );

        const data =
          await response.json();

        if (data.success) {

          toast.success(
            `Booking marked as ${status}`
          );

          setBookings(
            bookings.map(
              (booking) =>
                booking.id ===
                bookingId
                  ? {
                      ...booking,
                      status,
                    }
                  : booking
            )
          );

        } else {

          toast.error(
            "Failed to update booking"
          );

        }

      } catch (error) {

        console.log(error);

        toast.error(
          "Something went wrong"
        );

      }
    };

  return (

    <ProtectedRoute>

      <main className="min-h-screen bg-black text-white p-4 md:p-10">

        <div className="max-w-7xl mx-auto">

          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-12">

            <div>

              <h1 className="text-4xl md:text-5xl font-bold">
                Planner Dashboard
              </h1>

              <p className="text-zinc-400 mt-3 break-all">
                {plannerEmail}
              </p>

            </div>

            <div className="flex flex-col sm:flex-row gap-4">

              <div className="bg-pink-600 px-6 py-4 rounded-2xl text-center">
                Total Bookings: {bookings.length}
              </div>

              <Link
                href="/upload-work"
                className="bg-white text-black px-6 py-4 rounded-2xl font-bold text-center"
              >
                Upload Work
              </Link>

            </div>

          </div>

          {/* Loading */}
          {loading ? (

            <div className="text-center py-20">
              Loading bookings...
            </div>

          ) : bookings.length === 0 ? (

            <div className="bg-zinc-900 p-10 rounded-3xl text-center border border-zinc-800">

              <h2 className="text-3xl font-bold">
                No bookings yet
              </h2>

              <p className="text-zinc-400 mt-3">
                Customer bookings will appear here.
              </p>

            </div>

          ) : (

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {bookings.map((booking) => (

                <div
                  key={booking.id}
                  className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6"
                >

                  {/* Top */}
                  <div className="flex items-start justify-between gap-4">

                    <div>

                      <h2 className="text-2xl font-bold">
                        {booking.name}
                      </h2>

                      <p className="text-zinc-400 mt-1">
                        {booking.occasion}
                      </p>

                    </div>

                    <span
                      className={`px-4 py-2 rounded-full text-sm whitespace-nowrap ${
                        booking.status ===
                        "Confirmed"
                          ? "bg-green-600"

                          : booking.status ===
                            "Rejected"
                          ? "bg-red-600"

                          : booking.status ===
                            "Awaiting Advance"
                          ? "bg-yellow-600"

                          : booking.status ===
                            "Payment Sent"
                          ? "bg-blue-600"

                          : "bg-zinc-700"
                      }`}
                    >

                      {booking.status || "Pending"}

                    </span>

                  </div>

                  {/* Details */}
                  <div className="mt-6 space-y-3 text-zinc-300">

                    <p>
                      📞 {booking.phone}
                    </p>

                    <p>
                      🎉 {booking.occasion}
                    </p>

                    <p>
                      📅 {booking.date}
                    </p>

                    <p>
                      💰 ₹{booking.budget}
                    </p>

                    <p>
                      💬 {booking.message}
                    </p>

                  </div>

                  {/* Chat */}
                  <Link
                    href={`/chat/${booking.id}`}
                    className="block mt-6 text-center bg-zinc-800 hover:bg-zinc-700 transition py-3 rounded-2xl font-semibold"
                  >
                    Open Chat
                  </Link>

                  {/* Actions */}
                  <div className="flex flex-col gap-4 mt-8">

                    <button
                      onClick={() =>
                        updateBookingStatus(
                          booking.id,
                          "Awaiting Advance"
                        )
                      }
                      className="w-full bg-yellow-600 hover:bg-yellow-700 transition py-4 rounded-2xl font-bold"
                    >
                      Accept Booking
                    </button>

                    <button
                      onClick={() =>
                        updateBookingStatus(
                          booking.id,
                          "Confirmed"
                        )
                      }
                      className="w-full bg-green-600 hover:bg-green-700 transition py-4 rounded-2xl font-bold"
                    >
                      Confirm Payment
                    </button>

                    <button
                      onClick={() =>
                        updateBookingStatus(
                          booking.id,
                          "Rejected"
                        )
                      }
                      className="w-full bg-red-600 hover:bg-red-700 transition py-4 rounded-2xl font-bold"
                    >
                      Reject Booking
                    </button>

                  </div>

                </div>

              ))}

            </div>

          )}

        </div>

      </main>

    </ProtectedRoute>
  );
}