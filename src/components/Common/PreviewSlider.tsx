"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { useCallback, useRef } from "react";
import "swiper/css";
import "swiper/css/navigation";
import Image from "next/image";

import { usePreviewSlider } from "@/app/context/PreviewSliderContext";
import { useAppSelector } from "@/redux/hooks";

const PreviewSliderModal = () => {
  const { closePreviewModal, isModalPreviewOpen } = usePreviewSlider();

  // product data from QuickView
  const data = useAppSelector(
    (state) => state.productDetailsReducer.value
  );

  const sliderRef = useRef<any>(null);

  const handlePrev = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slidePrev();
  }, []);

  const handleNext = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slideNext();
  }, []);

  if (!data) return null;

  return (
    <div
      className={`preview-slider fixed inset-0 z-[999999] flex justify-center items-center bg-[#000000F2] ${
        isModalPreviewOpen ? "block" : "hidden"
      }`}
    >
      {/* CLOSE BUTTON */}
      <button
        onClick={closePreviewModal}
        aria-label="close preview"
        className="absolute top-6 right-6 z-50 flex items-center justify-center w-10 h-10 rounded-full text-white hover:text-[var(--gold)]"
      >
        ✕
      </button>

      {/* PREV / NEXT */}
      <button
        onClick={handlePrev}
        className="absolute left-6 z-50 p-3 rotate-180 text-white hover:text-[var(--gold)]"
      >
        ❯
      </button>

      <button
        onClick={handleNext}
        className="absolute right-6 z-50 p-3 text-white hover:text-[var(--gold)]"
      >
        ❯
      </button>

      {/* SLIDER */}
      <Swiper
        ref={sliderRef}
        slidesPerView={1}
        spaceBetween={30}
        className="max-w-[90vw] max-h-[90vh]"
      >
        {data?.imgs?.previews?.map((img: string, index: number) => (
          <SwiperSlide key={index}>
            <div className="flex justify-center items-center">
              <Image
                src={img}
                alt={`product-preview-${index}`}
                width={500}
                height={500}
                className="object-contain max-h-[80vh]"
                priority
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default PreviewSliderModal;
