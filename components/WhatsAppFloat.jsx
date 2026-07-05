"use client";

import { contact } from "@/data/content";

export default function WhatsAppFloat({ lang = "fr" }) {
  const message =
    lang === "ar"
      ? "مرحبا، أريد معلومات عن عقار في الدار البيضاء."
      : "Bonjour, je souhaite des informations sur un bien à Casablanca.";

  const url = `https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contacter sur WhatsApp"
      style={{
        position: "fixed",
        bottom: 24,
        right: 24,
        width: 56,
        height: 56,
        borderRadius: "50%",
        background: "#25D366",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 4px 14px rgba(0,0,0,0.35)",
        zIndex: 999,
      }}
    >
      <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M16 3C9.373 3 4 8.373 4 15c0 2.34.66 4.52 1.8 6.38L4 29l7.8-1.75A11.9 11.9 0 0 0 16 27c6.627 0 12-5.373 12-12S22.627 3 16 3z"
          fill="#fff"
        />
        <path
          d="M16 5.4c-5.3 0-9.6 4.3-9.6 9.6 0 1.9.55 3.66 1.5 5.15L6.9 25l5-1.35A9.55 9.55 0 0 0 16 24.6c5.3 0 9.6-4.3 9.6-9.6S21.3 5.4 16 5.4z"
          fill="#25D366"
        />
        <path
          d="M12.4 10.2c-.24-.53-.5-.54-.73-.55h-.62c-.22 0-.57.08-.87.4-.3.3-1.14 1.12-1.14 2.72 0 1.6 1.17 3.15 1.33 3.36.16.22 2.28 3.65 5.63 4.97 2.78 1.1 3.35.88 3.95.82.6-.06 1.94-.79 2.21-1.55.27-.77.27-1.42.19-1.55-.08-.14-.3-.22-.62-.38-.32-.16-1.94-.96-2.24-1.07-.3-.11-.52-.16-.74.16-.22.32-.85 1.07-1.04 1.29-.19.22-.38.24-.7.08-.32-.16-1.36-.5-2.6-1.6-.96-.86-1.6-1.92-1.79-2.24-.19-.32-.02-.5.14-.66.14-.14.32-.38.48-.57.16-.19.22-.32.32-.54.11-.22.05-.4-.03-.57-.08-.16-.72-1.79-1-2.46z"
          fill="#fff"
        />
      </svg>
    </a>
  );
}
