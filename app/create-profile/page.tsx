"use client";

import { useState } from "react";

import { auth } from "../../firebase";

import toast from "react-hot-toast";

export default function CreateProfilePage() {

  const [loading,
    setLoading] =
    useState(false);

  const [qrLoading,
    setQrLoading] =
    useState(false);

  const [formData,
    setFormData] =
    useState({
      name: "",
      city: "",
      category: "",
      price: "",
      description: "",
      upiId: "",
      qrCode: "",
    });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement |
      HTMLTextAreaElement
    >
  ) => {

    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const uploadQr =
    async (
      file: File
    ) => {

      try {

        setQrLoading(true);

        const data =
          new FormData();

        data.append(
          "file",
          file
        );

        data.append(
          "upload_preset",
          "moments_unsigned"
        );

        const response =
          await fetch(
            "https://api.cloudinary.com/v1_1/daw2j54dv/image/upload",
            {
              method: "POST",
              body: data,
            }
          );

        const result =
          await response.json();

        setFormData(
          (prev) => ({
            ...prev,
            qrCode:
              result.secure_url,
          })
        );

        toast.success(
          "QR uploaded!"
        );

      } catch (error) {

        console.log(error);

        toast.error(
          "QR upload failed"
        );

      } finally {

        setQrLoading(false);

      }
    };

  const handleSubmit =
    async () => {

      try {

        setLoading(true);

        const response =
          await fetch(
            "/api/create-planner",
            {
              method: "POST",

              headers: {
                "Content-Type":
                  "application/json",
              },

              body: JSON.stringify({
                ...formData,

                email:
                  auth.currentUser
                    ?.email || "",
              }),
            }
          );

        const data =
          await response.json();

        if (
          data.success
        ) {

          toast.success(
            "Planner profile created!"
          );

          localStorage.setItem(
            "plannerId",
            data.id
          );

          setFormData({
            name: "",
            city: "",
            category: "",
            price: "",
            description: "",
            upiId: "",
            qrCode: "",
          });

        } else {

          toast.error(
            "Failed to create profile"
          );

        }

      } catch (error) {

        console.log(error);

        toast.error(
          "Something went wrong"
        );

      } finally {

        setLoading(false);

      }
    };

  return (
    <main className="min-h-screen bg-black text-white p-4 md:p-10">

      <div className="max-w-3xl mx-auto bg-zinc-900 border border-zinc-800 p-6 md:p-10 rounded-[32px]">

        <div className="mb-10">

          <div className="inline-flex items-center gap-3 bg-pink-500/10 border border-pink-500/20 text-pink-300 px-4 py-2 rounded-full text-sm mb-6">

            💳 Payment Ready Planner

          </div>

          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            Create Planner Profile
          </h1>

          <p className="text-zinc-400 mt-4 text-base md:text-lg leading-8">
            Setup your planner profile and receive direct advance payments from clients.
          </p>

        </div>

        <div className="space-y-5">

          <input
            type="text"
            name="name"
            placeholder="Planner Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-4 md:p-5 rounded-2xl bg-black border border-zinc-700 focus:border-pink-500 outline-none"
          />

          <input
            type="text"
            name="city"
            placeholder="City"
            value={formData.city}
            onChange={handleChange}
            className="w-full p-4 md:p-5 rounded-2xl bg-black border border-zinc-700 focus:border-pink-500 outline-none"
          />

          <input
            type="text"
            name="category"
            placeholder="Category"
            value={formData.category}
            onChange={handleChange}
            className="w-full p-4 md:p-5 rounded-2xl bg-black border border-zinc-700 focus:border-pink-500 outline-none"
          />

          <input
            type="text"
            name="price"
            placeholder="Starting Price"
            value={formData.price}
            onChange={handleChange}
            className="w-full p-4 md:p-5 rounded-2xl bg-black border border-zinc-700 focus:border-pink-500 outline-none"
          />

          <textarea
            name="description"
            placeholder="Describe your services..."
            rows={5}
            value={formData.description}
            onChange={handleChange}
            className="w-full p-4 md:p-5 rounded-2xl bg-black border border-zinc-700 focus:border-pink-500 outline-none"
          />

          {/* UPI */}
          <div className="bg-black border border-zinc-800 rounded-2xl p-5">

            <h2 className="text-2xl font-bold mb-4">
              Payment Details
            </h2>

            <input
              type="text"
              name="upiId"
              placeholder="Your UPI ID (example@okaxis)"
              value={formData.upiId}
              onChange={handleChange}
              className="w-full p-4 rounded-2xl bg-zinc-900 border border-zinc-700 focus:border-pink-500 outline-none"
            />

            <div className="mt-6">

              <p className="text-zinc-400 mb-4">
                Upload Payment QR Code
              </p>

              <input
                type="file"
                accept="image/*"
                onChange={(e) => {

                  const file =
                    e.target.files?.[0];

                  if (file) {

                    uploadQr(file);

                  }
                }}
                className="w-full p-4 rounded-2xl bg-zinc-900 border border-zinc-700"
              />

              {qrLoading && (

                <p className="text-yellow-400 mt-4">
                  Uploading QR...
                </p>

              )}

              {formData.qrCode && (

                <div className="mt-6">

                  <img
                    src={formData.qrCode}
                    alt="QR"
                    className="w-52 h-52 object-cover rounded-2xl border border-zinc-700"
                  />

                </div>

              )}

            </div>

          </div>

          <button
            onClick={handleSubmit}
            disabled={
              loading
            }
            className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:scale-[1.01] transition py-4 md:py-5 rounded-2xl font-bold text-lg"
          >

            {loading
              ? "Creating..."
              : "Create Profile"}

          </button>

        </div>

      </div>

    </main>
  );
}