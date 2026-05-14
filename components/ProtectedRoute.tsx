"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  useRouter,
} from "next/navigation";

import {
  auth,
} from "../firebase";

import {
  onAuthStateChanged,
} from "firebase/auth";

export default function ProtectedRoute({
  children,
}: {
  children:
    React.ReactNode;
}) {

  const router =
    useRouter();

  const [loading,
    setLoading] =
    useState(true);

  useEffect(() => {

    const unsubscribe =
      onAuthStateChanged(
        auth,
        (user) => {

          if (!user) {

            router.push(
              "/login"
            );

          } else {

            setLoading(
              false
            );

          }
        }
      );

    return () =>
      unsubscribe();

  }, [router]);

  if (loading) {

    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center text-2xl font-bold">

        Loading...

      </div>
    );
  }

  return children;
}