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
  plannerEmail: string;
  occasion: string;
  date: string;
  budget: string;
  message: string;
  status?: string;
};

type Planner = {
  upiId?: string;
  qrCode?: string;
};

export default function ClientDashboard() {

  const [bookings,
    setBookings] =
    useState<Booking[]>([]);

  const [plannerPayments,
    setPlannerPayments] =
    useState<{
      [key: string]:
        Planner;
    }>({});

  const [loading,
    setLoading] =
    useState(true);

  const [clientEmail,
    setClientEmail] =
    useState("");

  const [reviewBooking,
    setReviewBooking] =
    useState<string | null>(
      null
    );

  const [rating,
    setRating] =
    useState(5);

  const [reviewText,
    setReviewText] =
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

          setClientEmail(
            user.email
          );

          fetchBookings(
            user.email
          );
        }
      );

    return () =>
      unsubscribe();

  }, []);

  const fetchBookings =
    async (
      email: string
    ) => {

      try {

        const response =
          await fetch(
            `/api/client-bookings?email=${email}`
          );

        const data =
          await response.json();

        const bookingsData =
          data.bookings || [];

        setBookings(
          bookingsData
        );

        for (const booking of bookingsData) {

          const plannerResponse =
            await fetch(
              `/api/get-planner-payment?email=${booking.plannerEmail}`
            );

          const plannerData =
            await plannerResponse.json();

          setPlannerPayments(
            (prev) => ({
              ...prev,
              [
                booking.plannerEmail
              ]:
                plannerData.planner,
            })
          );
        }

      } catch (error) {

        console.log(error);

      }

      setLoading(false);
    };

  const markAsPaid =
    async (
      bookingId: string
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
                status:
                  "Payment Sent",
              }),
            }
          );

        const data =
          await response.json();

        if (
          data.success
        ) {

          toast.success(
            "Payment marked as sent!"
          );

          setBookings(
            bookings.map(
              (booking) =>
                booking.id ===
                bookingId
                  ? {
                      ...booking,
                      status:
                        "Payment Sent",
                    }
                  : booking
            )
          );

        }

      } catch (error) {

        console.log(error);

      }
    };

  const submitReview =
    async (
      plannerEmail: string
    ) => {

      try {

        const response =
          await fetch(
            "/api/create-review",
            {
              method: "POST",

              headers: {
                "Content-Type":
                  "application/json",
              },

              body: JSON.stringify({
                plannerEmail,
                name:
                  auth.currentUser
                    ?.email || "",
                rating,
                review:
                  reviewText,
              }),
            }
          );

        const data =
          await response.json();

        if (
          data.success
        ) {

          toast.success(
            "Review submitted!"
          );

          setReviewBooking(
            null
          );

          setRating(5);

          setReviewText("");

        }

      } catch (error) {

        console.log(error);

      }
    };

  return (

    <ProtectedRoute>

      <main className="min-h-screen bg-black text-white p-4 md:p-10">

        <div className="max-w-6xl mx-auto">

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-12">

            <div>

              <h1 className="text-4xl md:text-5xl font-bold">
                Client Dashboard
              </h1>

              <p className="text-zinc-400 mt-3 break-all">
                {clientEmail}
              </p>

            </div>

            <div className="bg-pink-600 px-6 py-4 rounded-2xl text-center">

              Total Bookings:
              {" "}
              {bookings.length}

            </div>

          </div>

          {loading ? (

            <div className="text-center py-20">
              Loading bookings...
            </div>

          ) : bookings.length === 0 ? (

            <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-10 text-center">

              <h2 className="text-3xl font-bold">
                No bookings yet
              </h2>

            </div>

          ) : (

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {bookings.map(
                (booking) => {

                  const planner =
                    plannerPayments[
                      booking
                        .plannerEmail
                    ];

                  return (

                    <div
                      key={booking.id}
                      className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6"
                    >

                      <div className="flex items-start justify-between gap-4">

                        <div>

                          <h2 className="text-2xl font-bold break-all">

                            {
                              booking.plannerEmail
                            }

                          </h2>

                          <p className="text-zinc-400 mt-1">

                            {
                              booking.occasion
                            }

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

                          {
                            booking.status ||
                            "Pending"
                          }

                        </span>

                      </div>

                      <div className="mt-6 space-y-3 text-zinc-300">

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

                      <Link
                        href={`/chat/${booking.id}`}
                        className="block mt-6 text-center bg-zinc-800 hover:bg-zinc-700 transition py-3 rounded-2xl font-semibold"
                      >
                        Open Chat
                      </Link>

                      {booking.status ===
                        "Awaiting Advance" && (

                        <div className="mt-8 space-y-5">

                          {planner?.qrCode && (

                            <div className="flex justify-center">

                              <img
                                src={
                                  planner.qrCode
                                }
                                alt="QR"
                                className="w-64 h-64 rounded-3xl border border-zinc-700"
                              />

                            </div>

                          )}

                          {planner?.upiId && (

                            <div className="bg-black border border-zinc-800 rounded-2xl p-4 text-center">

                              <p className="text-zinc-400 mb-2">
                                UPI ID
                              </p>

                              <p className="text-xl font-bold break-all">

                                {
                                  planner.upiId
                                }

                              </p>

                            </div>

                          )}

                          <button
                            onClick={() =>
                              markAsPaid(
                                booking.id
                              )
                            }
                            className="w-full bg-gradient-to-r from-pink-500 to-purple-600 py-4 rounded-2xl font-bold"
                          >
                            I Have Paid
                          </button>

                        </div>

                      )}

                      {booking.status ===
                        "Payment Sent" && (

                        <div className="mt-8 bg-blue-500/10 border border-blue-500/20 text-blue-300 rounded-2xl p-4 text-center">

                          Waiting for planner verification.

                        </div>

                      )}

                      {booking.status ===
                        "Confirmed" && (

                        <div className="mt-8 space-y-5">

                          <div className="bg-green-500/10 border border-green-500/20 text-green-300 rounded-2xl p-4 text-center">

                            Booking confirmed successfully.

                          </div>

                          <button
                            onClick={() =>
                              setReviewBooking(
                                booking.id
                              )
                            }
                            className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 py-4 rounded-2xl font-bold"
                          >
                            Leave Review
                          </button>

                          {reviewBooking ===
                            booking.id && (

                            <div className="bg-black border border-zinc-800 rounded-3xl p-5 space-y-5">

                              <select
                                value={rating}
                                onChange={(e) =>
                                  setRating(
                                    Number(
                                      e.target
                                        .value
                                    )
                                  )
                                }
                                className="w-full bg-zinc-900 border border-zinc-700 rounded-2xl p-4"
                              >

                                <option value={5}>
                                  ⭐⭐⭐⭐⭐
                                </option>

                                <option value={4}>
                                  ⭐⭐⭐⭐
                                </option>

                                <option value={3}>
                                  ⭐⭐⭐
                                </option>

                                <option value={2}>
                                  ⭐⭐
                                </option>

                                <option value={1}>
                                  ⭐
                                </option>

                              </select>

                              <textarea
                                placeholder="Write your review..."
                                value={
                                  reviewText
                                }
                                onChange={(e) =>
                                  setReviewText(
                                    e.target
                                      .value
                                  )
                                }
                                className="w-full bg-zinc-900 border border-zinc-700 rounded-2xl p-4 h-32"
                              />

                              <button
                                onClick={() =>
                                  submitReview(
                                    booking.plannerEmail
                                  )
                                }
                                className="w-full bg-gradient-to-r from-pink-500 to-purple-600 py-4 rounded-2xl font-bold"
                              >
                                Submit Review
                              </button>

                            </div>

                          )}

                        </div>

                      )}

                    </div>
                  );
                }
              )}

            </div>

          )}

        </div>

      </main>

    </ProtectedRoute>
  );
}