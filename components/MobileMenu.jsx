"use client";

import { useState } from "react";

export default function MobileMenu({ links, langHref, langLabel, ctaHref, ctaLabel }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="mobile-menu-wrap">
      <button
        className="burger"
        aria-label="Menu"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      >
        <span />
        <span />
        <span />
      </button>

      {open && (
        <div className="mobile-menu-panel">
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)}>
              {l.label}
            </a>
          ))}
          <a href={langHref} className="mobile-menu-lang" onClick={() => setOpen(false)}>
            {langLabel}
          </a>
          <a
            href={ctaHref}
            className="btn btn-primary mobile-menu-cta"
            onClick={() => setOpen(false)}
          >
            {ctaLabel}
          </a>
        </div>
      )}
    </div>
  );
}
