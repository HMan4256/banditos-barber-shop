"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function Motion() {
  useGSAP(() => {
    const motion = gsap.matchMedia();

    motion.add({
      allowed: "(prefers-reduced-motion: no-preference)",
      desktop: "(min-width: 900px) and (hover: hover) and (pointer: fine)",
    }, ({ conditions }) => {
      if (!conditions?.allowed) return;

      // Skip the entrance on a slow load or a link to a section below the masthead.
      if (performance.now() < 1200 && window.scrollY < 20) {
        gsap.timeline({ defaults: { ease: "power3.out", clearProps: "transform,opacity" } })
          .from("[data-masthead-name]", { yPercent: 108, duration: .76 }, 0)
          .from("[data-masthead-aside]", { y: 12, opacity: 0, duration: .55 }, .16)
          .from(".gallery-tile picture", { yPercent: 6, opacity: .45, duration: .72, stagger: .07 }, .12)
          .from(".gallery-rail", { opacity: .35, duration: .5 }, .29);
      }

      document.querySelectorAll<HTMLElement>("[data-section-reveal]").forEach((element) => {
        if (element.getBoundingClientRect().top < window.innerHeight) return;
        gsap.from(element, {
          y: 23, opacity: 0, duration: .71, ease: "power3.out", clearProps: "transform,opacity",
          scrollTrigger: { trigger: element, start: "top 91%", once: true },
        });
      });

      document.querySelectorAll<HTMLElement>("[data-story-figure], [data-photo-reveal]").forEach((figure) => {
        const image = figure.querySelector("img");
        if (!image || figure.getBoundingClientRect().top < window.innerHeight) return;
        gsap.from(image, {
          scale: 1.09, opacity: .6, duration: .85, ease: "power2.out", clearProps: "transform,opacity",
          scrollTrigger: { trigger: figure, start: "top 92%", once: true },
        });
      });

      if (conditions.desktop) {
        const tiles = gsap.utils.toArray<HTMLElement>(".gallery-tile img");
        gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: { trigger: ".gallery-grid", start: "top 25%", end: "bottom top", scrub: .48 },
        })
          .to(tiles[0], { scale: 1.15, xPercent: -4, yPercent: -3 }, 0)
          .to(tiles[1], { scale: 1.18, yPercent: -7 }, 0)
          .to(tiles[2], { scale: 1.11, yPercent: -4 }, 0);
      }

      const priceList = document.querySelector(".service-menu");
      if (!priceList) return;
      let refreshFrame = 0;
      const observer = new ResizeObserver(() => {
        cancelAnimationFrame(refreshFrame);
        refreshFrame = requestAnimationFrame(() => ScrollTrigger.refresh());
      });
      observer.observe(priceList);

      return () => {
        observer.disconnect();
        cancelAnimationFrame(refreshFrame);
      };
    });

    return () => motion.revert();
  });

  return null;
}
