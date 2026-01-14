"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Breadcrumb from "../Common/Breadcrumb";
import Link from "next/link";

const MailSuccess = () => {
  const router = useRouter(); // ✅ hook inside component
  const [orderId, setOrderId] = useState<string | null>(null);

  useEffect(() => {
    const success = sessionStorage.getItem("orderSuccess");

    // if (!success) {
    //   router.replace("/");
    //   return;
    // }

    const id = sessionStorage.getItem("orderId");
    if (id) setOrderId(id);

    sessionStorage.removeItem("orderSuccess");
    sessionStorage.removeItem("orderId");
  }, [router]);

  return (
    <>
      <Breadcrumb title="Order Success" pages={["Order Success"]} />

      <section className="overflow-hidden py-20 bg-gray-2">
        <div className="max-w-[1170px] w-full mx-auto px-4">
          <div className="bg-white rounded-xl shadow-1 px-6 py-16 text-center">
           

            <h3 className="font-medium text-dark text-2xl mb-3">
              Your order was sent successfully
            </h3>
            
            <p className="max-w-[500px] mx-auto mb-8 text-gray-700">
              Thank you for choosing Mado-Sam! Your order is now being processed, and we’ll 
              contact you shortly to confirm the details. We appreciate your trust in us 
              and hope you enjoy your sweets.
            </p>

            <Link
              href="/"
              className="inline-flex items-center gap-2 font-medium text-white bg-[#F5BE32] py-3 px-6 rounded-md hover:bg-[var(--gold)] transition"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default MailSuccess;
