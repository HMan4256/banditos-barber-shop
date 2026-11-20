"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";

gsap.registerPlugin(useGSAP);

const photos = [
  { file: "storefront", width: 1210, height: 806, caption: "Podloubí na Krkonošské", alt: "Vchod do Banditos pod podloubím na Krkonošské ulici" },
  { file: "shop-interior", width: 600, height: 800, caption: "Uvnitř holičství", alt: "Kožená křesla, cihlové stěny a zelený strop v Banditos" },
  { file: "portrait-vest", width: 400, height: 267, caption: "Portrét z holičství", alt: "Holič v košili a vestě se založenýma rukama" },
  { file: "shop-floor", width: 400, height: 267, caption: "U křesel", alt: "Holičská křesla u zrcadel, za nimi cihlová stěna" },
  { file: "portrait-mirror", width: 400, height: 267, caption: "Portrét u zrcadla", alt: "Holič v bílé košili vedle zrcadla a holičského křesla" },
  { file: "workstation", width: 400, height: 267, caption: "Holičské náčiní", alt: "Holičské přípravky na policích na cihlovém sloupu" },
  { file: "coffee-bar", width: 400, height: 267, caption: "Detail baru", alt: "Láhev na baru v holičství" },
] as const;

export function Gallery() {
  const gallery = useRef<HTMLDivElement>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState(false);
  const photo = photos[active];

  useGSAP(() => {
    if (!open || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.from("[data-gallery-slide]", {
      opacity: 0.15, y: 9, duration: 0.28, ease: "power2.out", clearProps: "opacity,transform",
    });
  }, { scope: gallery, dependencies: [active, open], revertOnUpdate: true });

  function openPhoto(index: number) {
    if (!dialog.current || dialog.current.open) return;
    setActive(index);
    setOpen(true);
    dialog.current.showModal();
  }

  function step(direction: number) {
    setActive((index) => (index + direction + photos.length) % photos.length);
  }

  function handleKeys(event: KeyboardEvent<HTMLDialogElement>) {
    const directions: Record<string, number> = { ArrowLeft: -1, ArrowRight: 1 };
    const direction = directions[event.key];
    if (direction === undefined) return;
    event.preventDefault();
    step(direction);
  }

  return (
    <div ref={gallery}>
      <div className="gallery-grid">
        {photos.slice(0, 3).map((item, index) => (
          <button key={item.file} className="gallery-tile" type="button" onClick={() => openPhoto(index)} aria-label={`Zvětšit fotografii: ${item.caption}`} aria-haspopup="dialog" aria-controls="banditos-gallery">
            <picture>
              {index === 0 && <source media="(max-width: 720px)" srcSet="/images/storefront-small.webp" />}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`/images/${item.file}.webp`} width={item.width} height={item.height} alt={item.alt} fetchPriority={index === 0 ? "high" : "auto"} />
            </picture>
            <span className="tile-mark" aria-hidden="true" />
          </button>
        ))}
      </div>
      <div className="gallery-rail">
        <a className="location-link" href="#kontakt">Krkonošská 14 <span>·</span> Vrchlabí</a>
        <button className="gallery-open" type="button" onClick={() => openPhoto(0)} aria-haspopup="dialog" aria-controls="banditos-gallery">
          Prohlédnout galerii <span aria-hidden="true">+</span>
        </button>
      </div>

      <dialog
        className="gallery-dialog"
        id="banditos-gallery"
        ref={dialog}
        aria-label="Fotogalerie Banditos"
        onKeyDown={handleKeys}
        onClose={() => setOpen(false)}
        onClick={(event) => { if (event.target === event.currentTarget) dialog.current?.close(); }}
      >
        <div className="viewer">
          <div className="viewer-top">
            <span className="word-label">Fotogalerie</span>
            <form method="dialog">
              <button className="viewer-close" type="submit" autoFocus>Zavřít <span aria-hidden="true">×</span></button>
            </form>
          </div>
          {open && (
            <figure className="viewer-figure">
              <div className="viewer-image">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img key={photo.file} data-gallery-slide src={`/images/${photo.file}.webp`} width={photo.width} height={photo.height} alt={photo.alt} />
              </div>
              <figcaption aria-live="polite" aria-atomic="true">
                <span>{photo.caption}</span>
                <span>{active + 1} / {photos.length}</span>
              </figcaption>
            </figure>
          )}
          <div className="viewer-controls">
            <button type="button" onClick={() => step(-1)}>Předchozí</button>
            <button type="button" onClick={() => step(1)}>Další</button>
          </div>
        </div>
      </dialog>
    </div>
  );
}
