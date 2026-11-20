"use client";

import { useEffect, useRef, type MouseEvent } from "react";
import { gsap } from "gsap";
import { BrandMark } from "./brand";
import { bookingUrl, navigation, phone, phoneUrl } from "./details";

export function Header() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const menuToggle = useRef<HTMLButtonElement>(null);
  const panelTween = useRef<gsap.core.Timeline | null>(null);

  function openMenu() {
    const dialog = dialogRef.current;
    if (!dialog || dialog.open) return;
    dialog.showModal();
    document.documentElement.classList.add("menu-open");
    menuToggle.current?.setAttribute("aria-expanded", "true");

    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      panelTween.current = gsap.timeline({ defaults: { ease: "power3.out", clearProps: "transform,opacity" } })
        .from(dialog, { y: -22, opacity: 0, duration: 0.38 })
        .from(dialog.querySelectorAll("[data-menu-item]"), {
          y: 15, opacity: 0, stagger: 0.045, duration: 0.42,
        }, 0.09);
    }
  }

  function handleClose() {
    panelTween.current?.progress(1).kill();
    panelTween.current = null;
    document.documentElement.classList.remove("menu-open");
    menuToggle.current?.setAttribute("aria-expanded", "false");
  }

  function followSection(event: MouseEvent<HTMLAnchorElement>) {
    const section = document.querySelector<HTMLElement>(event.currentTarget.hash);
    dialogRef.current?.close();
    handleClose();
    if (section) {
      section.tabIndex = -1;
      section.focus({ preventScroll: true });
    }
  }

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 761px)");
    function closeOnDesktop(event: MediaQueryListEvent) {
      if (event.matches) dialogRef.current?.close();
    }
    desktop.addEventListener("change", closeOnDesktop);
    return () => {
      desktop.removeEventListener("change", closeOnDesktop);
      panelTween.current?.kill();
      document.documentElement.classList.remove("menu-open");
    };
  }, []);

  return (
    <header className="site-header">
      <div className="shell header-inner">
        <a className="header-brand" href="#nahoru" aria-label="Banditos Barber Shop, úvod"><BrandMark /></a>
        <nav className="desktop-nav" aria-label="Hlavní navigace">
          {navigation.map(({ label, href }) => <a key={href} href={href}>{label}</a>)}
        </nav>
        <a className="button button-primary header-book" href={bookingUrl}>Rezervace</a>
        <button ref={menuToggle} className="menu-toggle" type="button" aria-haspopup="dialog" aria-expanded="false" aria-controls="mobile-menu" onClick={openMenu}>
          Menu <span className="menu-bars" aria-hidden="true" />
        </button>
      </div>

      <dialog ref={dialogRef} id="mobile-menu" className="mobile-menu" aria-label="Hlavní navigace" onClose={handleClose}>
        <div className="mobile-menu-top">
          <BrandMark />
          <form method="dialog">
            <button className="menu-close" type="submit" autoFocus>Zavřít <span aria-hidden="true">×</span></button>
          </form>
        </div>
        <nav aria-label="Navigace v menu">
          {navigation.map(({ label, href }) => (
            <a key={href} href={href} onClick={followSection} data-menu-item>{label}</a>
          ))}
        </nav>
        <div className="mobile-menu-actions" data-menu-item>
          <a className="button button-primary" href={bookingUrl}>Rezervovat termín</a>
          <a href={phoneUrl}>{phone}</a>
        </div>
      </dialog>
    </header>
  );
}
