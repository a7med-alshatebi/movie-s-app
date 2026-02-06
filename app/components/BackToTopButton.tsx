"use client";

import { useState, useEffect } from "react";

export default function BackToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  return (
    isVisible && (
      <button
        onClick={scrollToTop}
        type="button"
        className="fixed bottom-8 right-8 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-tr from-rose-500 via-red-500 to-orange-400 text-white shadow-xl shadow-red-500/30 ring-1 ring-white/20 transition hover:-translate-y-0.5 hover:shadow-2xl hover:shadow-red-500/40 active:translate-y-0 active:scale-95 sm:hidden"
        aria-label="Back to top"
      >
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
          className="h-5 w-5"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 5l-7 7" />
          <path d="M12 5l7 7" />
          <path d="M12 5v14" />
        </svg>
      </button>
    )
  );
}
