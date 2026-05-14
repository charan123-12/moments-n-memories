"use client";

import { useEffect, useState } from "react";

import { auth } from "../../firebase";

import {
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

import { useRouter } from "next/navigation";

export default function AdminPage() {
  const router = useRouter();

  const [planner, setPlanner] = useState<any>(null);

  const [bookings, setBookings] = useState<any[]>([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      async (user) => {
        if (!user) {
          router.push("/login");
          return;
        }

        setPlanner(user);

        const res = await fetch("/api/get-bookings");

        const data = await res.json();

        setBookings(data.bookings || []);
      }
    );

    return () => unsubscribe();
  }, [router]);

  const handleLogout = async () => {
    await signOut(auth);

    router.push("/login");
  };

  return (
    <main className="min-h-screen bg-black text-white p-10">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-4xl font-bold">
            Planner Dashboard
          </h1>

          <p className="text-zinc-400 mt-2">
            {planner?.email}
          </p>
        </div>

        <button
          onClick={handleLogout}
          className="bg-red-600 px-6 py-3 rounded-xl"
        >
          Logout
        </button>
      </div>

      <div className="grid gap-6">
        {bookings.map((booking) => (
          <div
            key={booking.id}
            className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800"
          >
            <h2 className="text-2xl font-bold mb-2">
              {booking.name}
            </h2>

            <p>📞 {booking.phone}</p>
            <p>🎉 {booking.occasion}</p>
            <p>📅 {booking.date}</p>
            <p>💰 ₹{booking.budget}</p>
            <p>💬 {booking.message}</p>
          </div>
        ))}
      </div>
    </main>
  );
}