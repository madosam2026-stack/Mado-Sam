"use client";

import Image from "next/image";
import Link from "next/link";
import { FaInstagram, FaFacebookF, FaTiktok } from "react-icons/fa";

const Footer = () => {
  const socials = [
    { name: "Instagram", icon: <FaInstagram />, href: "https://instagram.com" },
    { name: "Facebook", icon: <FaFacebookF />, href: "https://facebook.com" },
    { name: "TikTok", icon: <FaTiktok />, href: "https://tiktok.com" },
  ];

  return (
    <footer className="overflow-hidden bg-[#202020]">
      <section
        className="relative h-[72vh] w-full text-white flex flex-col items-center justify-center px-6"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.65), rgba(0,0,0,0.65)), url('/images/footer.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="text-center flex flex-col gap-6 items-center">
          <h1
            className="cinzel text-[32px] sm:text-[40px] md:text-[50px] lg:text-[54px] text-[var(--gold)] font-bold leading-tight mb-4"
            style={{ fontFamily: "Cinzel" }}
          >
            We are ready to give you the best dining experiences
          </h1>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <div className="flex items-center gap-2">
              <Image
                src="/images/icons/localisation.png"
                alt="localisation"
                width={20}
                height={20}
              />
              <p className="text-gray-300 text-xs sm:text-sm md:text-base">
                Sahara City, Sharjah.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Image
                src="/images/icons/phone.png"
                alt="phone"
                width={20}
                height={20}
              />
              <p className="text-gray-300 text-xs sm:text-sm md:text-base">
                (+971) 5 8575 7204
              </p>
            </div>
          </div>

          {/* Make Order Button & Logo */}
          <div className="flex flex-col gap-6 justify-center items-center mt-6">
            <Link
              href="/shop-with-sidebar"
              className="inline-flex items-center gap-3 px-6 sm:px-8 py-2 sm:py-3 bg-[#F5BE32] text-[#000] transition-all duration-300 z-10 relative text-sm sm:text-base"
              style={{ fontFamily: "Cinzel", borderRadius: "2px" }}
            >
              Make Order
            </Link>

            <Image
              src="/images/logo/Logo2.png"
              alt="Logo"
              width={150}
              height={150}
            />
          </div>

          {/* Social Buttons */}
          <div className="flex gap-5 mt-6">
            {socials.map((social) => (
              <Link
                key={social.name}
                href={social.href}
                target="_blank"
                className="group relative flex items-center gap-2 text-white text-sm sm:text-base font-medium"
                style={{ fontFamily: "Cinzel", borderRadius: "2px" }}
              >
                {social.icon} {social.name}
                {/* Tailwind underline hover */}
                <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-[var(--gold)] group-hover:w-full transition-all duration-300"></span>
              </Link>
            ))}
          </div>
        </div>

        {/* Shadow overlay */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{ boxShadow: "inset 0 0 200px 120px rgba(0,0,0,0.55)" }}
        ></div>

      </section>
    </footer>
  );
};

export default Footer;
