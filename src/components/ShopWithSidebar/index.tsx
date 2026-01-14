"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Breadcrumb from "../Common/Breadcrumb";
import shopData from "../Shop/shopData";
import SingleGridItem from "../Shop/SingleGridItem";
import SingleListItem from "../Shop/SingleListItem";

/* --------------------------------
   HELPERS
--------------------------------- */
const toSlug = (text: string) =>
  text.toLowerCase().replace(/\s+/g, "-");

const fromSlug = (slug: string) =>
  slug.replace(/-/g, " ").toLowerCase();

const ShopWithSidebar = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [productStyle, setProductStyle] = useState<"grid" | "list">("grid");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [maxPrice, setMaxPrice] = useState<number | "">("");

  /* --------------------------------
     READ CATEGORY FROM URL
  --------------------------------- */
  useEffect(() => {
    const categorySlug = searchParams.get("category");

    if (categorySlug) {
      setSelectedCategory(categorySlug.toLowerCase());
    } else {
      setSelectedCategory(null);
    }
  }, [searchParams]);

  /* --------------------------------
     UNIQUE CATEGORIES
  --------------------------------- */
  const categories = Array.from(new Set(shopData.map((p) => p.category)));

  /* --------------------------------
     CATEGORY CHANGE
  --------------------------------- */
  const handleCategoryChange = (category: string) => {
    const slug = toSlug(category);

    if (selectedCategory === slug) {
      setSelectedCategory(null);
      router.push("/shop-with-sidebar");
    } else {
      setSelectedCategory(slug);
      router.push(`/shop-with-sidebar?category=${slug}`);
    }
  };

  /* --------------------------------
     FILTER PRODUCTS
  --------------------------------- */
  const filteredProducts = shopData.filter((product) => {
    const categoryMatch = selectedCategory
      ? product.category.toLowerCase() === fromSlug(selectedCategory)
      : true;

    const priceMatch =
      maxPrice !== "" ? product.price <= Number(maxPrice) : true;

    return categoryMatch && priceMatch;
  });

  return (
    <>
      <Breadcrumb
        title="All Products"
        pages={["shop", "/", "shop with sidebar"]}
      />

      <section className="bg-[#f3f4f6] pt-5 pb-20">
        <div className="max-w-[1170px] mx-auto px-4 flex gap-8">

          {/* SIDEBAR */}
          <aside className="w-full max-w-[270px] bg-white p-5 rounded">
            <h3 className="font-medium mb-4">Category</h3>

            <div className="flex flex-col gap-2 mb-6">
              {categories.map((category) => {
                const slug = toSlug(category);

                return (
                  <label
                    key={category}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={selectedCategory === slug}
                      onChange={() => handleCategoryChange(category)}
                    />
                    <span>{category}</span>
                  </label>
                );
              })}
            </div>

            <h3 className="font-medium mb-2">Max Price</h3>
            <input
              type="number"
              placeholder="Enter max price"
              className="w-full border rounded p-2 mb-4"
              value={maxPrice}
              onChange={(e) =>
                setMaxPrice(e.target.value ? Number(e.target.value) : "")
              }
            />

            <button
              onClick={() => {
                setSelectedCategory(null);
                setMaxPrice("");
                router.push("/shop-with-sidebar");
              }}
              className="w-full bg-black text-[var(--gold)] py-2 rounded"
            >
              Clear All
            </button>
          </aside>

          {/* PRODUCTS */}
          <main className="flex-1">
            <div className="bg-white p-3 rounded mb-6 flex gap-2">
              <button
                onClick={() => setProductStyle("grid")}
                className={`px-4 py-2 border rounded ${
                  productStyle === "grid" ? "bg-[#F5BE32] text-white" : ""
                }`}
              >
                Grid
              </button>

              <button
                onClick={() => setProductStyle("list")}
                className={`px-4 py-2 border rounded ${
                  productStyle === "list" ? "bg-[#F5BE32] text-white" : ""
                }`}
              >
                List
              </button>
            </div>

            <div
              className={
                productStyle === "grid"
                  ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                  : "flex flex-col gap-6"
              }
            >
              {filteredProducts.map((item) =>
                productStyle === "grid" ? (
                  <SingleGridItem key={item.id} item={item} />
                ) : (
                  <SingleListItem key={item.id} item={item} />
                )
              )}

              {filteredProducts.length === 0 && (
                <p className="text-center text-gray-500 col-span-full">
                  No products found
                </p>
              )}
            </div>
          </main>
        </div>
      </section>
    </>
  );
};

export default ShopWithSidebar;
