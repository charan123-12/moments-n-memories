"use client";

import toast from "react-hot-toast";
import { useState } from "react";
import { useParams } from "next/navigation";

export default function BookingPage() {

  const params = useParams();

  const slug = params.slug as string;

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    occasion: "Birthday",
    date: "",
    budget: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (loading) return;

    setLoading(true);

    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          plannerId: slug,
        }),
      });

      const data = await response.json();

      if (data.success) {
        toast.success("Booking Submitted Successfully!");

        setFormData({
          name: "",
          phone: "",
          occasion: "Birthday",
          date: "",
          budget: "",
          message: "",
        });
      } else {
        toast.error("Failed to submit booking");
      }

    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }

    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-black px-6 py-16 text-white">
      <div className="mx-auto max-w-2xl rounded-3xl border border-white/10 bg-white/5 p-10">

        <h1 className="text-5xl font-bold">
          Book Your Surprise
        </h1>

        <p className="mt-4 text-gray-400">
          Fill in your details and our planner will contact you shortly.
        </p>

        <form onSubmit={handleSubmit} className="mt-10 space-y-6">

          <div>
            <label className="mb-2 block text-sm text-gray-300">
              Full Name
            </label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              className="w-full rounded-2xl border border-white/10 bg-black px-5 py-4 outline-none focus:border-pink-500"
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-gray-300">
              Phone Number
            </label>

            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter your phone number"
              className="w-full rounded-2xl border border-white/10 bg-black px-5 py-4 outline-none focus:border-pink-500"
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-gray-300">
              Occasion
            </label>

            <select
              name="occasion"
              value={formData.occasion}
              onChange={handleChange}
              className="w-full rounded-2xl border border-white/10 bg-black px-5 py-4 outline-none focus:border-pink-500"
            >
              <option>Birthday</option>
              <option>Proposal</option>
              <option>Anniversary</option>
              <option>Surprise Party</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm text-gray-300">
              Event Date
            </label>

            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full rounded-2xl border border-white/10 bg-black px-5 py-4 outline-none focus:border-pink-500"
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-gray-300">
              Budget
            </label>

            <input
              type="text"
              name="budget"
              value={formData.budget}
              onChange={handleChange}
              placeholder="Your budget"
              className="w-full rounded-2xl border border-white/10 bg-black px-5 py-4 outline-none focus:border-pink-500"
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-gray-300">
              Message
            </label>

            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={5}
              placeholder="Tell us about your surprise..."
              className="w-full rounded-2xl border border-white/10 bg-black px-5 py-4 outline-none focus:border-pink-500"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-2xl bg-gradient-to-r from-pink-500 to-purple-600 py-4 font-semibold disabled:opacity-50"
          >
            {loading ? "Submitting..." : "Submit Booking"}
          </button>

        </form>
      </div>
    </main>
  );
}