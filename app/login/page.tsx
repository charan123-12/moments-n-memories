"use client";

import { useState } from "react";

import {
  auth,
  db,
  googleProvider,
} from "../../firebase";

import {
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";

import {
  doc,
  getDoc,
} from "firebase/firestore";

import toast from "react-hot-toast";

export default function LoginPage() {

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const redirectUser =
    async (uid: string) => {

      try {

        const userDoc =
          await getDoc(
            doc(db, "users", uid)
          );

        const userData =
          userDoc.data();

        if (!userData) {

          toast.error(
            "No account found. Please sign up first."
          );

          return false;
        }

        if (
          userData.role ===
          "planner"
        ) {

          window.location.href =
            "/planner-dashboard";

        } else {

          window.location.href =
            "/client-dashboard";

        }

        return true;

      } catch (error) {

        console.log(error);

        toast.error(
          "Failed to redirect user."
        );

        return false;
      }
    };

  const handleLogin =
    async () => {

      if (!email || !password) {

        toast.error(
          "Please fill all fields."
        );

        return;
      }

      try {

        setLoading(true);

        const result =
          await signInWithEmailAndPassword(
            auth,
            email,
            password
          );

        const success =
          await redirectUser(
            result.user.uid
          );

        if (success) {

          toast.success(
            "Login successful!"
          );

        }

      } catch (error: any) {

        console.log(error);

        if (
          error.code ===
          "auth/user-not-found"
        ) {

          toast.error(
            "No account found. Please sign up first."
          );

        } else if (
          error.code ===
          "auth/wrong-password"
        ) {

          toast.error(
            "Incorrect password."
          );

        } else if (
          error.code ===
          "auth/invalid-credential"
        ) {

          toast.error(
            "Invalid email or password."
          );

        } else {

          toast.error(
            error.message
          );

        }

      } finally {

        setLoading(false);

      }
    };

  const handleGoogleLogin =
    async () => {

      try {

        setLoading(true);

        const result =
          await signInWithPopup(
            auth,
            googleProvider
          );

        const success =
          await redirectUser(
            result.user.uid
          );

        if (success) {

          toast.success(
            "Google login successful!"
          );

        }

      } catch (error: any) {

        console.log(error);

        toast.error(
          error.message
        );

      } finally {

        setLoading(false);

      }
    };

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center p-6">

      <div className="w-full max-w-md bg-zinc-900 p-8 rounded-3xl">

        <h1 className="text-4xl font-bold mb-8">
          Login
        </h1>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          className="w-full p-4 rounded-xl bg-black border border-zinc-700 mb-4"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          className="w-full p-4 rounded-xl bg-black border border-zinc-700 mb-6"
        />

        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full bg-pink-600 py-4 rounded-xl font-semibold disabled:opacity-50"
        >
          {loading
            ? "Logging in..."
            : "Login"}
        </button>

        <button
          onClick={handleGoogleLogin}
          disabled={loading}
          className="w-full bg-white text-black py-4 rounded-xl mt-4 font-semibold disabled:opacity-50"
        >
          Continue with Google
        </button>

      </div>

    </main>
  );
}