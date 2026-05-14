"use client";

import Link from "next/link";

import {
  useEffect,
  useState,
} from "react";

import {
  Menu,
  X,
  LogOut,
} from "lucide-react";

import {
  auth,
  db,
} from "../firebase";

import {
  onAuthStateChanged,
  signOut,
  User,
} from "firebase/auth";

import {
  doc,
  getDoc,
} from "firebase/firestore";

import toast from "react-hot-toast";

export default function Navbar() {

  const [mobileMenu,
    setMobileMenu] =
    useState(false);

  const [user,
    setUser] =
    useState<User | null>(
      null
    );

  const [role,
    setRole] =
    useState("");

  // FIXED AUTH LOADING
  const [authLoading,
    setAuthLoading] =
    useState(true);

  useEffect(() => {

    const unsubscribe =
      onAuthStateChanged(
        auth,
        async (
          currentUser
        ) => {

          setUser(
            currentUser
          );

          if (
            currentUser
          ) {

            try {

              const userDoc =
                await getDoc(
                  doc(
                    db,
                    "users",
                    currentUser.uid
                  )
                );

              const userData =
                userDoc.data();

              setRole(
                userData?.role || ""
              );

            } catch (error) {

              console.log(error);

            }

          } else {

            setRole("");

          }

          // IMPORTANT
          setAuthLoading(
            false
          );
        }
      );

    return () =>
      unsubscribe();

  }, []);

  const handleLogout =
    async () => {

      try {

        await signOut(
          auth
        );

        toast.success(
          "Logged out successfully"
        );

      } catch (error) {

        console.log(error);

        toast.error(
          "Logout failed"
        );

      }
    };

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-800 bg-black/80 backdrop-blur-xl">

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-5 flex items-center justify-between">

        {/* Logo */}
        <Link
          href="/"
          className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent"
        >
          Moments & Memories
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-4">

          <Link
            href="/planners"
            className="text-zinc-300 hover:text-white transition"
          >
            Explore
          </Link>

          {/* WAIT FOR AUTH */}
          {authLoading ? null : user ? (

            <>

              {/* Dashboard */}
              <Link
                href={
                  role ===
                  "planner"
                    ? "/planner-dashboard"
                    : "/client-dashboard"
                }
                className="text-zinc-300 hover:text-white transition"
              >
                Dashboard
              </Link>

              {/* Profile Avatar */}
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 flex items-center justify-center font-bold text-lg">

                {user.email
                  ?.charAt(0)
                  .toUpperCase()}

              </div>

              {/* Logout */}
              <button
                onClick={
                  handleLogout
                }
                className="bg-red-600 hover:bg-red-700 transition px-5 py-3 rounded-xl font-semibold flex items-center gap-2"
              >

                <LogOut size={18} />

                Logout

              </button>

            </>

          ) : (

            <>

              {/* Login */}
              <Link
                href="/login"
                className="text-zinc-300 hover:text-white transition"
              >
                Login
              </Link>

              {/* Signup */}
              <Link
                href="/signup"
                className="bg-pink-600 hover:bg-pink-700 transition px-5 py-2 rounded-xl font-semibold"
              >
                Signup
              </Link>

            </>

          )}

        </nav>

        {/* Mobile Button */}
        <button
          onClick={() =>
            setMobileMenu(
              !mobileMenu
            )
          }
          className="md:hidden"
        >

          {mobileMenu ? (

            <X size={30} />

          ) : (

            <Menu size={30} />

          )}

        </button>

      </div>

      {/* Mobile Menu */}
      {mobileMenu && (

        <div className="md:hidden border-t border-zinc-800 bg-black px-6 py-6 space-y-5">

          <Link
            href="/planners"
            className="block text-lg text-zinc-300"
            onClick={() =>
              setMobileMenu(
                false
              )
            }
          >
            Explore
          </Link>

          {/* WAIT FOR AUTH */}
          {authLoading ? null : user ? (

            <>

              {/* Dashboard */}
              <Link
                href={
                  role ===
                  "planner"
                    ? "/planner-dashboard"
                    : "/client-dashboard"
                }
                className="block text-lg text-zinc-300"
                onClick={() =>
                  setMobileMenu(
                    false
                  )
                }
              >
                Dashboard
              </Link>

              {/* User */}
              <div className="flex items-center gap-4 bg-zinc-900 border border-zinc-800 p-4 rounded-2xl">

                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 flex items-center justify-center font-bold text-lg">

                  {user.email
                    ?.charAt(0)
                    .toUpperCase()}

                </div>

                <div className="text-sm break-all">

                  {user.email}

                </div>

              </div>

              {/* Logout */}
              <button
                onClick={
                  handleLogout
                }
                className="w-full bg-red-600 hover:bg-red-700 transition py-3 rounded-xl font-semibold flex items-center justify-center gap-2"
              >

                <LogOut size={18} />

                Logout

              </button>

            </>

          ) : (

            <>

              {/* Login */}
              <Link
                href="/login"
                className="block text-lg text-zinc-300"
                onClick={() =>
                  setMobileMenu(
                    false
                  )
                }
              >
                Login
              </Link>

              {/* Signup */}
              <Link
                href="/signup"
                className="block bg-pink-600 text-center py-3 rounded-xl font-semibold"
                onClick={() =>
                  setMobileMenu(
                    false
                  )
                }
              >
                Signup
              </Link>

            </>

          )}

        </div>

      )}

    </header>
  );
}