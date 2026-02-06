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
        className="fixed bottom-8 right-8 rounded-full bg-red-500 p-3 text-white shadow-lg shadow-red-500/30 transition hover:bg-red-600 active:scale-95 z-40 sm:hidden"
        aria-label="Back to top"
      >
        ↑
      </button>
    )
  );
}
