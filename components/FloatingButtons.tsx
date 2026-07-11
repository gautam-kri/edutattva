import { site } from "@/lib/data";
import Icon from "./Icon";

export default function FloatingButtons() {
  return (
    <div className="fixed bottom-5 right-4 z-40 flex flex-col items-end gap-3">
      {/* Click-to-call — mobile only */}
      <a
        href={`tel:${site.phoneDial}`}
        className="grid place-items-center rounded-full bg-royal text-white shadow-lg ring-4 ring-white/60 transition-transform hover:scale-105 sm:hidden"
        style={{ height: 52, width: 52 }}
        aria-label={`Call ${site.phoneDisplay}`}
      >
        <Icon name="phone" size={24} />
      </a>
      {/* WhatsApp — all breakpoints */}
      <a
        href={site.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        className="grid place-items-center rounded-full text-white shadow-lg ring-4 ring-white/60 transition-transform hover:scale-105"
        style={{ height: 56, width: 56, background: "#25D366" }}
        aria-label="Chat with us on WhatsApp"
      >
        <Icon name="whatsapp" size={30} />
      </a>
    </div>
  );
}
