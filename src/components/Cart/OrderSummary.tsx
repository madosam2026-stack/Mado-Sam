"use client";

import React, { useState, useEffect } from "react";
import CheckoutModal from "./CheckoutModal";
import { useAppSelector } from "@/redux/hooks";
import { selectTotalPrice } from "@/redux/features/cart-slice";
import { useSearchParams } from "next/navigation";

const OrderSummary = () => {
  const cartItems = useAppSelector((state) => state.cartReducer.items);
  const totalPrice = useAppSelector(selectTotalPrice);

  const searchParams = useSearchParams();
  const [open, setOpen] = useState(false);

  // ✅ AUTO OPEN MODAL WHEN COMING FROM CART SIDEBAR
  useEffect(() => {
    if (searchParams.get("openCheckout") === "true") {
      setOpen(true);
    }
  }, [searchParams]);

  return (
    <>
      <div className="lg:max-w-[455px] w-full">
        <div className="bg-white shadow-1 rounded-[10px]">
          <div className="border-b border-gray-3 py-5 px-4 sm:px-8.5">
            <h3 className="font-medium text-xl text-dark">Order Summary</h3>
          </div>

          <div className="pt-2.5 pb-8.5 px-4 sm:px-8.5">
            <div className="flex items-center justify-between py-5 border-b border-gray-3">
              <h4 className="font-medium text-dark">Product</h4>
              <h4 className="font-medium text-dark text-right">Subtotal</h4>
            </div>

            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between py-5 border-b border-gray-3"
              >
                <p className="text-dark">{item.title}</p>
                <p className="text-dark text-right">
                  AED {item.discountedPrice * item.quantity}
                </p>
              </div>
            ))}

            <div className="flex items-center justify-between pt-5">
              <p className="font-medium text-lg text-dark">Total</p>
              <p className="font-medium text-lg text-dark text-right">
                AED {totalPrice}
              </p>
            </div>

            <button
              type="button"
              onClick={() => setOpen(true)}
              className="w-full flex justify-center font-medium text-white bg-[#F5BE32] py-3 px-6 rounded-md mt-7.5 hover:bg-[var(--gold)]"
            >
              Process to Checkout
            </button>
          </div>
        </div>
      </div>

      {/* ✅ Checkout Modal */}
      {open && (
        <CheckoutModal
          onClose={() => setOpen(false)}
          cartItems={cartItems}
          totalPrice={totalPrice}
        />
      )}
    </>
  );
};

export default OrderSummary;
