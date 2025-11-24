"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import AOS from "aos";

export default function AOSProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)");

    AOS.init({
      duration: 800,
      once: true,
      mirror: false,
      easing: "ease-out-cubic",
      offset: 50,
      disable: () => prefersReduced.matches,
    });

    const onLoad = () => AOS.refreshHard();
    const onMotionChange = () => AOS.refreshHard();

    window.addEventListener("load", onLoad);
    prefersReduced.addEventListener("change", onMotionChange);

    return () => {
      window.removeEventListener("load", onLoad);
      prefersReduced.removeEventListener("change", onMotionChange);
    };
  }, []);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (prefersReduced.matches) return undefined;

    const id = setTimeout(() => AOS.refreshHard(), 120);
    return () => clearTimeout(id);
  }, [pathname]);

  return <>{children}</>;
}
