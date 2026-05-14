"use client";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

type Planner = {
  id: string;
  name: string;
  city: string;
  category: string;
  price: string;
  description: string;
};

export default function PlannersPage() {

  const [planners,
    setPlanners] =
    useState<Planner[]>([]);

  const [loading,
    setLoading] =
    useState(true);

  const [search,
    setSearch] =
    useState("");

  const [cityFilter,
    setCityFilter] =
    useState("");

  const [categoryFilter,
    setCategoryFilter] =
    useState("");

  useEffect(() => {

    fetch(
      "/api/get-planners"
    )
      .then((res) =>
        res.json()
      )
      .then((data) => {

        setPlanners(
          data.planners || []
        );

        setLoading(false);
      });

  }, []);

  // Unique values
  const cities =
    useMemo(() => {

      return [
        ...new Set(
          planners.map(
            (p) => p.city
          )
        ),
      ];

    }, [planners]);

  const categories =
    useMemo(() => {

      return [
        ...new Set(
          planners.map(
            (p) =>
              p.category
          )
        ),
      ];

    }, [planners]);

  // Filtering
  const filteredPlanners =
    planners.filter(
      (planner) => {

        const matchesSearch =
          planner.name
            .toLowerCase()
            .includes(
              search.toLowerCase()
            ) ||

          planner.description
            .toLowerCase()
            .includes(
              search.toLowerCase()
            );

        const matchesCity =
          cityFilter
            ? planner.city ===
              cityFilter
            : true;

        const matchesCategory =
          categoryFilter
            ? planner.category ===
              categoryFilter
            : true;

        return (
          matchesSearch &&
          matchesCity &&
          matchesCategory
        );
      }
    );

  return (
    <main className="min-h-screen bg-black text-white p-4 md:p-10">

      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-12">

          <div className="inline-flex items-center gap-3 bg-pink-500/10 border border-pink-500/20 text-pink-300 px-4 py-2 rounded-full text-sm mb-6">

            ✨ Discover Event Experts

          </div>

          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            Find Your Perfect Planner
          </h1>

          <p className="text-zinc-400 text-lg mt-5 max-w-3xl leading-8">

            Browse verified planners, decorators,
            surprise creators and celebration experts.

          </p>

        </div>

        {/* Filters */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-5 md:p-6 mb-10">

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

            {/* Search */}
            <input
              type="text"
              placeholder="Search planners..."
              value={search}
              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }
              className="bg-black border border-zinc-700 rounded-2xl px-5 py-4 outline-none focus:border-pink-500"
            />

            {/* City */}
            <select
              value={cityFilter}
              onChange={(e) =>
                setCityFilter(
                  e.target.value
                )
              }
              className="bg-black border border-zinc-700 rounded-2xl px-5 py-4 outline-none focus:border-pink-500"
            >

              <option value="">
                All Cities
              </option>

              {cities.map(
                (city) => (

                  <option
                    key={city}
                    value={city}
                  >
                    {city}
                  </option>

                )
              )}

            </select>

            {/* Category */}
            <select
              value={
                categoryFilter
              }
              onChange={(e) =>
                setCategoryFilter(
                  e.target.value
                )
              }
              className="bg-black border border-zinc-700 rounded-2xl px-5 py-4 outline-none focus:border-pink-500"
            >

              <option value="">
                All Categories
              </option>

              {categories.map(
                (
                  category
                ) => (

                  <option
                    key={
                      category
                    }
                    value={
                      category
                    }
                  >
                    {category}
                  </option>

                )
              )}

            </select>

            {/* Reset */}
            <button
              onClick={() => {

                setSearch("");

                setCityFilter("");

                setCategoryFilter("");

              }}
              className="bg-gradient-to-r from-pink-500 to-purple-600 rounded-2xl font-bold"
            >
              Reset Filters
            </button>

          </div>

        </div>

        {/* Results */}
        <div className="flex items-center justify-between mb-8">

          <h2 className="text-2xl md:text-3xl font-bold">

            {filteredPlanners.length}
            {" "}
            planners found

          </h2>

        </div>

        {/* Loading */}
        {loading ? (

          <div className="text-center py-20">
            Loading planners...
          </div>

        ) : filteredPlanners.length === 0 ? (

          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-12 text-center">

            <h2 className="text-3xl font-bold">
              No planners found
            </h2>

            <p className="text-zinc-400 mt-4">
              Try changing your filters.
            </p>

          </div>

        ) : (

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">

            {filteredPlanners.map(
              (planner) => (

                <div
                  key={planner.id}
                  className="bg-zinc-900 border border-zinc-800 rounded-[32px] p-6 hover:border-pink-500/40 transition"
                >

                  {/* Avatar */}
                  <div className="w-20 h-20 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 flex items-center justify-center text-3xl font-bold mb-6">

                    {
                      planner.name
                        ?.charAt(0)
                    }

                  </div>

                  {/* Name */}
                  <h2 className="text-3xl font-bold">
                    {planner.name}
                  </h2>

                  {/* Meta */}
                  <div className="mt-5 space-y-3 text-zinc-300">

                    <p>
                      📍 {planner.city}
                    </p>

                    <p>
                      🎉 {planner.category}
                    </p>

                    <p>
                      💰 Starting from ₹
                      {planner.price}
                    </p>

                  </div>

                  {/* Description */}
                  <p className="mt-6 text-zinc-400 leading-7 line-clamp-3">

                    {
                      planner.description
                    }

                  </p>

                  {/* CTA */}
                  <a
                    href={`/planner/${planner.id}`}
                    className="block text-center mt-8 bg-gradient-to-r from-pink-500 to-purple-600 py-4 rounded-2xl font-bold"
                  >
                    View Profile
                  </a>

                </div>

              )
            )}

          </div>

        )}

      </div>

    </main>
  );
}