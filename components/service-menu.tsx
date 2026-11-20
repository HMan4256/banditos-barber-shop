"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { serviceGroups } from "./details";

gsap.registerPlugin(useGSAP);

export function ServiceMenu() {
  const [active, setActive] = useState(0);
  const list = useRef<HTMLDivElement>(null);
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);

  useGSAP(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.from("[role='tabpanel']:not([hidden]) [data-service-row]", {
      y: 12, opacity: 0, stagger: 0.034, duration: 0.34, ease: "power2.out",
      clearProps: "transform,opacity",
    });
  }, { scope: list, dependencies: [active], revertOnUpdate: true });

  function handleTabKey(event: KeyboardEvent<HTMLButtonElement>) {
    const last = serviceGroups.length - 1;
    const nextByKey: Record<string, number> = {
      ArrowLeft: active === 0 ? last : active - 1,
      ArrowRight: active === last ? 0 : active + 1,
      Home: 0,
      End: last,
    };
    const next = nextByKey[event.key];
    if (typeof next !== "number") return;
    event.preventDefault();
    buttons.current[next]?.focus();
    setActive(next);
  }

  return (
    <div className="service-menu" ref={list}>
      <div className="service-tabs" role="tablist" aria-label="Ceníky služeb">
        {serviceGroups.map((group, index) => (
          <button
            key={group.id}
            id={`service-tab-${group.id}`}
            type="button"
            role="tab"
            aria-selected={index === active}
            aria-controls={`service-panel-${group.id}`}
            tabIndex={index === active ? 0 : -1}
            ref={(button) => { buttons.current[index] = button; }}
            onClick={() => setActive(index)}
            onKeyDown={handleTabKey}
          >
            {group.label}
          </button>
        ))}
      </div>
      {serviceGroups.map((group, index) => (
        <div
          key={group.id}
          id={`service-panel-${group.id}`}
          role="tabpanel"
          aria-labelledby={`service-tab-${group.id}`}
          hidden={index !== active}
        >
          {group.services.map((service) => (
            <details key={service.name} name={`services-${group.id}`} className="service-row" data-service-row>
              <summary>
                <span className="service-name">{service.name}</span>
                <span className="service-duration">{service.minutes} min</span>
                <span className="service-price">{service.price} Kč</span>
                <span className="service-plus" aria-hidden="true" />
              </summary>
              <div className="service-detail">
                <p>{service.description}</p>
              </div>
            </details>
          ))}
        </div>
      ))}
    </div>
  );
}
