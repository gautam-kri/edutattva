import { site } from "@/lib/data";
import Icon from "./Icon";

export default function UtilityBar() {
  return (
    <div className="bg-navy text-white/85">
      <div className="container-x flex h-10 items-center justify-between gap-4 text-[0.82rem]">
        <div className="flex items-center gap-5">
          <a
            href={`tel:${site.phoneDial}`}
            className="flex items-center gap-1.5 font-semibold transition-colors hover:text-gold"
          >
            <Icon name="phone" size={15} className="text-gold" />
            {site.phoneDisplay}
          </a>
          <span className="hidden items-center gap-1.5 sm:flex">
            <Icon name="globe" size={15} className="text-gold" />
            {site.website}
          </span>
        </div>
        <span className="chip chip-gold h-6 text-[0.7rem]">{site.admissions}</span>
      </div>
    </div>
  );
}
