"use client";

import { useState } from "react";

import { auth } from "../../firebase";

import toast from "react-hot-toast";

import ProtectedRoute from "../../components/ProtectedRoute";

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

        // GET SIGNATURE
        const signatureResponse =
          await fetch(
            "/api/upload-signature",
            {
              method: "POST",
            }
          );

        const signatureData =
          await signatureResponse.json();

        const data =
          new FormData();

        data.append(
          "file",
          file
        );

        data.append(
          "api_key",
          signatureData.apiKey
        );

        data.append(
          "timestamp",
          signatureData.timestamp
        );

        data.append(
          "signature",
          signatureData.signature
        );

        const response =
          await fetch(
            `https://api.cloudinary.com/v1_1/${signatureData.cloudName}/image/upload`,
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
          "QR uploaded securely!"
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

    <ProtectedRoute>

      <main className="min-h-screen bg-black text-white p-6 md:p-10">

        <div className="max-w-3xl mx-auto bg-zinc-900 border border-zinc-800 p-10 rounded-3xl">

          <div className="inline-flex items-center gap-3 bg-pink-500/10 border border-pink-500/20 text-pink-300 px-4 py-2 rounded-full text-sm mb-6">

            ✨ Become A Planner

          </div>

          <h1 className="text-5xl font-bold mb-4">
            Create Planner Profile
          </h1>

          <p className="text-zinc-400 text-lg leading-8 mb-10">

            Setup your public planner profile,
            receive bookings and collect advance
            payments directly from customers.

          </p>

          <div className="space-y-6">

            {/* Name */}
            <div>

              <label className="block text-zinc-400 mb-3">
                Planner Name
              </label>

              <input
                type="text"
                name="name"
                placeholder="Dream Events"
                value={formData.name}
                onChange={handleChange}
                className="w-full bg-black border border-zinc-700 focus:border-pink-500 outline-none p-4 rounded-2xl"
              />

            </div>

            {/* City */}
            <div>

              <label className="block text-zinc-400 mb-3">
                City
              </label>

              <input
                type="text"
                name="city"
                placeholder="Hyderabad"
                value={formData.city}
                onChange={handleChange}
                className="w-full bg-black border border-zinc-700 focus:border-pink-500 outline-none p-4 rounded-2xl"
              />

            </div>

            {/* Category */}
            <div>

              <label className="block text-zinc-400 mb-3">
                Category
              </label>

              <input
                type="text"
                name="category"
                placeholder="Birthday Planner"
                value={formData.category}
                onChange={handleChange}
                className="w-full bg-black border border-zinc-700 focus:border-pink-500 outline-none p-4 rounded-2xl"
              />

            </div>

            {/* Price */}
            <div>

              <label className="block text-zinc-400 mb-3">
                Starting Price
              </label>

              <input
                type="text"
                name="price"
                placeholder="5000"
                value={formData.price}
                onChange={handleChange}
                className="w-full bg-black border border-zinc-700 focus:border-pink-500 outline-none p-4 rounded-2xl"
              />

            </div>

            {/* Description */}
            <div>

              <label className="block text-zinc-400 mb-3">
                Description
              </label>

              <textarea
                name="description"
                placeholder="Describe your services..."
                rows={5}
                value={formData.description}
                onChange={handleChange}
                className="w-full bg-black border border-zinc-700 focus:border-pink-500 outline-none p-4 rounded-2xl"
              />

            </div>

            {/* UPI */}
            <div>

              <label className="block text-zinc-400 mb-3">
                UPI ID
              </label>

              <input
                type="text"
                name="upiId"
                placeholder="example@upi"
                value={formData.upiId}
                onChange={handleChange}
                className="w-full bg-black border border-zinc-700 focus:border-pink-500 outline-none p-4 rounded-2xl"
              />

            </div>

            {/* QR Upload */}
            <div>

              <label className="block text-zinc-400 mb-3">
                Upload QR Code
              </label>

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
                className="w-full bg-black border border-zinc-700 focus:border-pink-500 outline-none p-4 rounded-2xl"
              />

            </div>

            {/* Preview */}
            {formData.qrCode && (

              <div className="flex justify-center">

                <img
                  src={formData.qrCode}
                  alt="QR Preview"
                  className="w-64 rounded-3xl border border-zinc-700"
                />

              </div>

            )}

            {/* Submit */}
            <button
              onClick={handleSubmit}
              disabled={
                loading ||
                qrLoading
              }
              className="w-full bg-gradient-to-r from-pink-500 to-purple-600 py-4 rounded-2xl font-bold text-lg"
            >

              {loading
                ? "Creating..."
                : qrLoading
                ? "Uploading QR..."
                : "Create Profile"}

            </button>

          </div>

        </div>

      </main>

    </ProtectedRoute>
  );
}