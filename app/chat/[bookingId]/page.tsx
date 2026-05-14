"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  useParams,
} from "next/navigation";

import {
  auth,
  db,
} from "../../../firebase";

import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";

import toast from "react-hot-toast";

import ProtectedRoute from "../../../components/ProtectedRoute";

type Message = {
  id: string;
  text: string;
  sender: string;
  createdAt?: any;
};

export default function ChatPage() {

  const params =
    useParams();

  const bookingId =
    params.bookingId as string;

  const [messages,
    setMessages] =
    useState<Message[]>([]);

  const [message,
    setMessage] =
    useState("");

  const [sending,
    setSending] =
    useState(false);

  useEffect(() => {

    const q = query(
      collection(
        db,
        "chats",
        bookingId,
        "messages"
      ),
      orderBy(
        "createdAt",
        "asc"
      )
    );

    const unsubscribe =
      onSnapshot(
        q,
        (snapshot) => {

          const msgs =
            snapshot.docs.map(
              (doc) => ({
                id: doc.id,
                ...doc.data(),
              })
            ) as Message[];

          setMessages(
            msgs
          );
        }
      );

    return () =>
      unsubscribe();

  }, [bookingId]);

  const sendMessage =
    async () => {

      if (
        !message.trim()
      ) {
        return;
      }

      try {

        setSending(true);

        await addDoc(
          collection(
            db,
            "chats",
            bookingId,
            "messages"
          ),
          {
            text: message,

            sender:
              auth.currentUser
                ?.email || "",

            createdAt:
              serverTimestamp(),
          }
        );

        setMessage("");

      } catch (error) {

        console.log(error);

        toast.error(
          "Failed to send message"
        );

      } finally {

        setSending(false);

      }
    };

  return (

    <ProtectedRoute>

      <main className="min-h-screen bg-black text-white flex flex-col">

        {/* Header */}
        <div className="border-b border-zinc-800 px-6 py-5">

          <h1 className="text-3xl font-bold">
            Booking Chat
          </h1>

          <p className="text-zinc-400 mt-2 break-all">
            Booking ID: {bookingId}
          </p>

        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 md:px-8 py-6 space-y-5">

          {messages.length === 0 ? (

            <div className="h-full flex items-center justify-center text-zinc-500">

              No messages yet.

            </div>

          ) : (

            messages.map(
              (msg) => {

                const isMine =
                  msg.sender ===
                  auth.currentUser
                    ?.email;

                return (

                  <div
                    key={msg.id}
                    className={`flex ${
                      isMine
                        ? "justify-end"
                        : "justify-start"
                    }`}
                  >

                    <div
                      className={`max-w-[85%] md:max-w-md px-5 py-4 rounded-3xl ${
                        isMine
                          ? "bg-gradient-to-r from-pink-500 to-purple-600"

                          : "bg-zinc-900 border border-zinc-800"
                      }`}
                    >

                      <p className="text-sm opacity-70 mb-2 break-all">
                        {msg.sender}
                      </p>

                      <p className="text-lg break-words">
                        {msg.text}
                      </p>

                    </div>

                  </div>
                );
              }
            )

          )}

        </div>

        {/* Input */}
        <div className="border-t border-zinc-800 p-4 md:p-6">

          <div className="max-w-5xl mx-auto flex gap-4">

            <input
              type="text"
              placeholder="Type your message..."
              value={message}
              onChange={(e) =>
                setMessage(
                  e.target.value
                )
              }
              className="flex-1 bg-zinc-900 border border-zinc-700 rounded-2xl px-5 py-4 outline-none focus:border-pink-500"
            />

            <button
              onClick={
                sendMessage
              }
              disabled={
                sending
              }
              className="bg-gradient-to-r from-pink-500 to-purple-600 px-8 py-4 rounded-2xl font-bold"
            >

              {sending
                ? "Sending..."
                : "Send"}

            </button>

          </div>

        </div>

      </main>

    </ProtectedRoute>
  );
}