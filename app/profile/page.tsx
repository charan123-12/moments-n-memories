"use client";

import { useEffect, useState } from "react";

import { auth } from "../../firebase";

type UserData = {
  name: string;
  email: string;
  role: string;
  createdAt: string;
};

export default function ProfilePage() {
  const [userData, setUserData] =
    useState<UserData | null>(null);

  useEffect(() => {
    const unsubscribe =
      auth.onAuthStateChanged((user) => {
        if (user) {
          setUserData({
            name:
              user.displayName || "User",
            email: user.email || "",
            role: "client",
            createdAt:
              "Joined recently",
          });
        }
      });

    return () => unsubscribe();
  }, []);

  return (
    <main className="min-h-screen bg-black text-white p-10">
      <div className="max-w-3xl mx-auto bg-zinc-900 p-8 rounded-3xl">

        <div className="flex items-center gap-5">

          <div className="w-24 h-24 rounded-full bg-pink-600 flex items-center justify-center text-3xl font-bold">
            {userData?.name
              ?.charAt(0)
              ?.toUpperCase()}
          </div>

          <div>
            <h1 className="text-4xl font-bold">
              {userData?.name}
            </h1>

            <p className="text-zinc-400 mt-2">
              {userData?.email}
            </p>

            <div className="mt-3 inline-block bg-pink-600 px-4 py-2 rounded-full text-sm capitalize">
              {userData?.role}
            </div>
          </div>

        </div>

        <div className="mt-10 grid md:grid-cols-2 gap-6">

          <div className="bg-black p-6 rounded-2xl border border-zinc-800">
            <h2 className="text-xl font-bold mb-3">
              Account Info
            </h2>

            <p className="text-zinc-400">
              Email Verified User
            </p>
          </div>

          <div className="bg-black p-6 rounded-2xl border border-zinc-800">
            <h2 className="text-xl font-bold mb-3">
              Joined
            </h2>

            <p className="text-zinc-400">
              {userData?.createdAt}
            </p>
          </div>

        </div>
      </div>
    </main>
  );
}