"use client";

import { useEffect, useState } from "react";

import { auth } from "../../firebase";

export default function DashboardPage() {

  const [bookings, setBookings] = useState<any[]>([]);

  useEffect(() => {

    const fetchBookings = async () => {

      const email = auth.currentUser?.email;

      if (!email) return;

      const plannerResponse = await fetch(
        `/api/get-planner?email=${email}`
      );

      const plannerData =
        await plannerResponse.json();

      const planner = plannerData.planner;

      if (!planner) return;

      const bookingResponse = await fetch(
        `/api/my-bookings?plannerId=${planner.id}`
      );

      const bookingData =
        await bookingResponse.json();

      setBookings(bookingData.bookings || []);
    };

    fetchBookings();

  }, []);

  return (
    <main className="min-h-screen bg-black text-white p-10">

      <h1 className="text-4xl font-bold mb-8">
        My Bookings
      </h1>

      <div className="space-y-6">

        {bookings.map((booking) => (

          <div
            key={booking.id}
            className="bg-zinc-900 p-6 rounded-3xl border border-zinc-800"
          >

            <h2 className="text-2xl font-bold">
              {booking.name}
            </h2>

            <div className="mt-4 space-y-2 text-zinc-300">

              <p>📞 {booking.phone}</p>

              <p>🎉 {booking.occasion}</p>

              <p>📅 {booking.date}</p>

              <p>💰 ₹{booking.budget}</p>

              <p>💬 {booking.message}</p>

            </div>

          </div>

        ))}

      </div>

    </main>
  );
}