"use client";

import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

import { ModalProvider } from "../app/context/QuickViewModalContext";
import { CartModalProvider } from "../app/context/CartSidebarModalContext";
import { ReduxProvider } from "@/redux/provider";
import { PreviewSliderProvider } from "../app/context/PreviewSliderContext";

import QuickViewModal from "@/components/Common/QuickViewModal";
import CartSidebarModal from "@/components/Common/CartSidebarModal";
import PreviewSliderModal from "@/components/Common/PreviewSlider";
import ScrollToTop from "@/components/Common/ScrollToTop";
import PreLoader from "@/components/Common/PreLoader";

export default function ClientShell({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(t);
  }, []);

  if (loading) return <PreLoader />;

  return (
    <>
      <ReduxProvider>
        <CartModalProvider>
          <ModalProvider>
            <PreviewSliderProvider>
              <Header />
              {children}
              <QuickViewModal />
              <CartSidebarModal />
              <PreviewSliderModal />
            </PreviewSliderProvider>
          </ModalProvider>
        </CartModalProvider>
      </ReduxProvider>

      <ScrollToTop />
      <Footer />
    </>
  );
}
