"use client";

import { useState } from "react";

import {
  auth,
  db,
  googleProvider,
} from "../../firebase";

import {
  createUserWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";

import {
  doc,
  setDoc,
} from "firebase/firestore";

import toast from "react-hot-toast";

export default function SignupPage() {

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [role, setRole] =
    useState("client");

  const [loading, setLoading] =
    useState(false);

  const handleSignup =
    async () => {

      if (!email || !password) {

        toast.error(
          "Please fill all fields."
        );

        return;
      }

      try {

        setLoading(true);

        const userCredential =
          await createUserWithEmailAndPassword(
            auth,
            email,
            password
          );

        await setDoc(
          doc(
            db,
            "users",
            userCredential.user.uid
          ),
          {
            email,
            role,
            createdAt:
              new Date().toISOString(),
          }
        );

        toast.success(
          "Account created!"
        );

        if (
          role === "planner"
        ) {

          window.location.href =
            "/create-profile";

        } else {

          window.location.href =
            "/client-dashboard";

        }

      } catch (error: any) {

        console.log(error);

        if (
          error.code ===
          "auth/email-already-in-use"
        ) {

          toast.error(
            "Account already exists. Please login."
          );

        } else if (
          error.code ===
          "auth/weak-password"
        ) {

          toast.error(
            "Password should be at least 6 characters."
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

  const handleGoogleSignup =
    async () => {

      try {

        setLoading(true);

        const result =
          await signInWithPopup(
            auth,
            googleProvider
          );

        await setDoc(
          doc(
            db,
            "users",
            result.user.uid
          ),
          {
            email:
              result.user.email,

            role,

            createdAt:
              new Date().toISOString(),
          }
        );

        toast.success(
          "Google signup successful!"
        );

        if (
          role === "planner"
        ) {

          window.location.href =
            "/create-profile";

        } else {

          window.location.href =
            "/client-dashboard";

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
          Create Account
        </h1>

        <div className="flex gap-4 mb-6">

          <button
            onClick={() =>
              setRole("client")
            }
            className={`flex-1 py-3 rounded-xl ${
              role === "client"
                ? "bg-pink-600"
                : "bg-zinc-800"
            }`}
          >
            Client
          </button>

          <button
            onClick={() =>
              setRole("planner")
            }
            className={`flex-1 py-3 rounded-xl ${
              role === "planner"
                ? "bg-pink-600"
                : "bg-zinc-800"
            }`}
          >
            Planner
          </button>

        </div>

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
          onClick={handleSignup}
          disabled={loading}
          className="w-full bg-pink-600 py-4 rounded-xl font-semibold disabled:opacity-50"
        >
          {loading
            ? "Creating..."
            : "Create Account"}
        </button>

        <button
          onClick={handleGoogleSignup}
          disabled={loading}
          className="w-full bg-white text-black py-4 rounded-xl mt-4 font-semibold disabled:opacity-50"
        >
          Continue with Google
        </button>

      </div>

    </main>
  );
}