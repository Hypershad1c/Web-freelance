import { getDictionary } from "@/i18n/dictionaries";

// Phone number is a placeholder — replace with the real Domify WhatsApp
// Business number before deploying. Left obvious rather than fake-real
// so it doesn't accidentally ship pointing at a wrong number.
const WHATSAPP_NUMBER = "212600000000";

export function WhatsAppButton({ locale }: { locale: string }) {
  const t = getDictionary(locale);
  return (
    <a
      href={`https://wa.me/${WHATSAPP_NUMBER}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t.whatsapp.contact}
      className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] shadow-lg hover:scale-105 transition-transform"
    >
      <svg viewBox="0 0 24 24" className="h-7 w-7 fill-white" aria-hidden="true">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
        <path d="M12.014 2C6.486 2 2 6.487 2 12.015c0 1.882.518 3.694 1.5 5.284L2 22l4.842-1.475a9.96 9.96 0 0 0 5.172 1.442h.005c5.527 0 10.014-4.487 10.014-10.015C21.995 6.487 17.541 2 12.014 2zm0 18.264a8.23 8.23 0 0 1-4.19-1.147l-.3-.178-3.116.95.929-3.03-.196-.312a8.216 8.216 0 0 1-1.264-4.393c0-4.542 3.696-8.239 8.241-8.239 4.545 0 8.24 3.697 8.24 8.239 0 4.543-3.696 8.11-8.344 8.11z" />
      </svg>
    </a>
  );
}
