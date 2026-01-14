"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { useCallback, useRef, useEffect } from "react";
import data from "./categoryData";
import SingleItem from "./SingleItem";

// Swiper styles
import "swiper/css";
import "swiper/css/navigation";

const Categories = () => {
  const sliderRef = useRef(null);

  const handlePrev = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slidePrev();
  }, []);

  const handleNext = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slideNext();
  }, []);

  useEffect(() => {
    if (sliderRef.current) {
      sliderRef.current.swiper.init();
    }
  }, []);

  return (
    <section className="overflow-hidden pt-20 bg-[#1E1E1E]">
      <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0 pb-15 border-b border-gray-700">

        {/* CENTERED TITLE */}
        <div className="text-center mb-12 text-white">
          <p className="text-xl italic text-gray-400 mb-3"  style={{ fontFamily: "Grand Hotel", }}>
            Quality Sweets For You
          </p>

          <h2 className="text-4xl md:text-5xl font-serif font-semibold mb-4 text-[var(--gold)]" style={{ fontFamily: "Cinzel" }}>
            OUR SPECIALITIES
          </h2>

          <p className="max-w-[600px] mx-auto text-gray-300 text-sm md:text-base">
            Authentic food from our restaurant served with high quality ingredients
          </p>
        </div>

        {/* SLIDER WITH SIDE BUTTONS */}
        <div className="relative">

          {/* LEFT BUTTON */}
          <button
            onClick={handlePrev}
          className="absolute -left-6 top-1/2 -translate-y-1/2 z-10
             w-8 h-8 flex items-center justify-center text-[var(--gold)]"
          >
            <svg
              className="fill-current"
              width="26"
              height="26"
              viewBox="0 0 24 24"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M15.4881 4.43057C15.8026 4.70014 15.839 5.17361 15.5694 5.48811L9.98781 12L15.5694 18.5119C15.839 18.8264 15.8026 19.2999 15.4881 19.5695C15.1736 19.839 14.7001 19.8026 14.4306 19.4881L8.43056 12.4881C8.18981 12.2072 8.18981 11.7928 8.43056 11.5119L14.4306 4.51192C14.7001 4.19743 15.1736 4.161 15.4881 4.43057Z"
              />
            </svg>
          </button>

          {/* RIGHT BUTTON */}
          <button
            onClick={handleNext}
            className="absolute -right-6 top-1/2 -translate-y-1/2 z-10
              w-8 h-8 flex items-center justify-center text-[var(--gold)]"
          >
            <svg
              className="fill-current"
              width="26"
              height="26"
              viewBox="0 0 24 24"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M8.51192 4.43057C8.82641 4.161 9.29989 4.19743 9.56946 4.51192L15.5695 11.5119C15.8102 11.7928 15.8102 12.2072 15.5695 12.4881L9.56946 19.4881C9.29989 19.8026 8.82641 19.839 8.51192 19.5695C8.19743 19.2999 8.161 18.8264 8.43057 18.5119L14.0122 12L8.43057 5.48811C8.161 5.17361 8.19743 4.70014 8.51192 4.43057Z"
              />
            </svg>
          </button>

          {/* SWIPER */}
          <div className="swiper categories-carousel common-carousel px-10">
            <Swiper
              ref={sliderRef}
              slidesPerView={6}
              breakpoints={{
                0: { slidesPerView: 2 },
                1000: { slidesPerView: 4 },
                1200: { slidesPerView: 6 },
              }}
            >
              {data.map((item, key) => (
                <SwiperSlide key={key}>
                  <SingleItem item={item} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Categories;
