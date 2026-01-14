"use client";

import React, { useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import Breadcrumb from "../Common/Breadcrumb";
import SingleGridItem from "../Shop/SingleGridItem";
import SingleListItem from "../Shop/SingleListItem";
import CustomSelect from "../ShopWithSidebar/CustomSelect";
import shopData from "../Shop/shopData";

const ShopWithoutSidebar = () => {
  const [productStyle, setProductStyle] = useState("grid");
  const searchParams = useSearchParams();
  const category = searchParams.get("category"); // 👈 get category

  const filteredProducts = useMemo(() => {
    if (!category) return shopData;
    return shopData.filter(
      (item) => item.category?.toLowerCase() === category.toLowerCase()
    );
  }, [category]);

  return (
    <>
      <Breadcrumb
        title={"All Products"}
        pages={["shop", "/"]}
      />

      <section className="overflow-hidden relative pb-20 pt-5 lg:pt-20 xl:pt-28 bg-[#f3f4f6]">
        <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
          <div className="w-full">
            {/* Products */}
            <div
              className={`${
                productStyle === "grid"
                  ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-7.5 gap-y-9"
                  : "flex flex-col gap-7.5"
              }`}
            >
              {filteredProducts.length > 0 ? (
                filteredProducts.map((item, key) =>
                  productStyle === "grid" ? (
                    <SingleGridItem item={item} key={key} />
                  ) : (
                    <SingleListItem item={item} key={key} />
                  )
                )
              ) : (
                <p className="col-span-full text-center text-gray-500">
                  No products found in this category
                </p>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ShopWithoutSidebar;
