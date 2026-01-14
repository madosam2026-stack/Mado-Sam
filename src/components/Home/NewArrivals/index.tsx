"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import ProductItem from "@/components/Common/ProductItem";
import shopData from "@/components/Shop/shopData";

const categories = [
  "All",
  "Chocolate",
  "Dates",
  "Stuffed Dates",
  "Sweets",
  "Nuts",
  "Cookies",
];

const ITEMS_PER_PAGE = 8;

const NewArrival = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);

  // ✅ Filter products by category
  const filteredProducts =
    activeCategory === "All"
      ? shopData
      : shopData.filter((item) => item.category === activeCategory);

  // ✅ Reset to 6 when category changes
  useEffect(() => {
    setVisibleCount(ITEMS_PER_PAGE);
  }, [activeCategory]);

  // ✅ Products to display
  const visibleProducts = filteredProducts.slice(0, visibleCount);

  return (
    <section id="menu" className="overflow-hidden pt-15 bg-[#1E1E1E]">
      <div className="max-w-[1170px] w-full mx-auto pb-10 px-4 sm:px-8 xl:px-0">

        {/* Header */}
        <div className="mb-7 flex flex-col gap-6">
          <div className="flex flex-col lg:flex-center items-center lg:items-center justify-between gap-5">

            {/* Category Buttons */}
            <div className="flex flex-wrap gap-3">
              {categories.map((cat) => (
              <button
  key={cat}
  onClick={() => setActiveCategory(cat)}
  style={{
    fontFamily: "Cinzel",
    borderRadius: "2px",
  }}
  className={`relative inline-flex items-center mt-8 px-8 py-3 transition-all duration-300
    ${
      activeCategory === cat
        ? "bg-[#F5BE32] text-[#000]"
        : "text-white"
    }
    before:absolute
    before:left-0
    before:bottom-0
    before:h-[2px]
    before:w-0
    before:bg-[var(--gold)]
    before:transition-all
    before:duration-300
    hover:before:w-full
  `}
>
  {cat}
</button>

              ))}
            </div>

          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-7.5 gap-y-9">
          {visibleProducts.map((item, key) => (
            <ProductItem item={item} key={key} />
          ))}
        </div>

        {/* Show More Button */}
        {visibleCount < filteredProducts.length && (
          <div className="flex justify-center mt-12 pb-10">
            <button
              onClick={() => setVisibleCount((prev) => prev + ITEMS_PER_PAGE)}
              className="px-10 py-3 border border-gray-600 text-white rounded-md font-semibold hover:bg-[var(--gold)] hover:text-black hover:border-[var(--gold)]  transition"
            >
              Show More
            </button>
          </div>
        )}

      </div>
    </section>
  );
};

export default NewArrival;
