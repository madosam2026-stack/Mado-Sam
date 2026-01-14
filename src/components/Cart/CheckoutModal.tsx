"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { removeAllItemsFromCart } from "@/redux/features/cart-slice";
import { useAppDispatch } from "@/redux/hooks";
import type { CartItem } from "@/redux/features/cart-slice";

type Props = {
  onClose: () => void;
  cartItems: CartItem[];
  totalPrice: number;
};

const CheckoutModal = ({ onClose, cartItems, totalPrice }: Props) => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    address1: "",
    address2: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (loading) return;

    if (!form.firstName || !form.lastName || !form.phone || !form.address1) {
      alert("Please fill all required fields");
      return;
    }

    setLoading(true);

    const payload = {
      customer: form,
      items: cartItems.map((item) => ({
        name: item.title,
        quantity: item.quantity,
        unitWeight: item.gm,
        price: item.discountedPrice,
        subtotal: item.discountedPrice * item.quantity,
      })),
      totalPrice,
    };

    try {
      const res = await fetch("/api/send-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (data.success) {
        // ✅ Navigate FIRST
        router.replace("/mail-success");

        // ✅ Delay modal unmount & cart clear
        setTimeout(() => {
          dispatch(removeAllItemsFromCart());
          onClose();
        }, 150);
      } else {
        alert("Failed to send order");
        setLoading(false);
      }
    } catch (err) {
      console.error(err);
      alert("Error sending order");
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4 ">
      <div className="bg-white w-full max-w-lg rounded-lg p-6 relative shadow-2xl">
        <h2 className="text-xl font-semibold mb-4">Checkout Details</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <input
              name="firstName"
              placeholder="First Name*"
              value={form.firstName}
              onChange={handleChange}
              className="border rounded px-3 py-2 w-full"
              required
            />
            <input
              name="lastName"
              placeholder="Last Name*"
              value={form.lastName}
              onChange={handleChange}
              className="border rounded px-3 py-2 w-full"
              required
            />
          </div>

          <input
            name="phone"
            placeholder="Phone Number*"
            value={form.phone}
            onChange={handleChange}
            className="border rounded px-3 py-2 w-full"
            required
          />

          <input
            name="address1"
            placeholder="Address Line 1 *"
            value={form.address1}
            onChange={handleChange}
            className="border rounded px-3 py-2 w-full"
            required
          />

          <input
            name="address2"
            placeholder="Address Line 2 (optional)"
            value={form.address2}
            onChange={handleChange}
            className="border rounded px-3 py-2 w-full"
          />

          <textarea
            name="message"
            placeholder="Message (optional)"
            value={form.message}
            onChange={handleChange}
            className="border rounded px-3 py-2 w-full h-24"
          />

          <div className="flex justify-between items-center pt-4">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="px-4 py-2 border rounded text-gray-600 disabled:opacity-60"
            >
              Close
            </button>

            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-[#F5BE32] text-white rounded hover:bg-[var(--gold)] disabled:opacity-60"
            >
              {loading ? "Sending..." : "Send Order"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CheckoutModal;
