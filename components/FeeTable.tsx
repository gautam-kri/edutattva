import { feeIncludes, onlineMaterialNote, singleSubjectNote } from "@/lib/data";
import Icon from "./Icon";

type FeeRow = { tier?: string; mode: string; location: string; prices: string[] };
type Fee = {
  columns: string[];
  rows: FeeRow[];
  remark?: string;
  installments?: string;
};

/** Condensed-bold price, matching the .fee .price treatment inside the table. */
function Price({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="text-[1.15rem] font-extrabold leading-none text-royal"
      style={{ fontFamily: "var(--font-condensed)" }}
    >
      {children}
    </span>
  );
}

export default function FeeTable({
  fee,
  showIncludes = true,
  onlineNote = false,
  tutoringNote = false,
}: {
  fee: Fee;
  showIncludes?: boolean;
  /** Online fees exclude study material — books sold separately. */
  onlineNote?: boolean;
  /** Single-subject tutoring pricing for Hybrid & Online. */
  tutoringNote?: boolean;
}) {
  // Each delivery mode is a named tier of the program, so lead the row with it.
  const hasTiers = fee.rows.some((r) => r.tier);

  return (
    <div>
      {/* Desktop / tablet table */}
      <div className="hidden overflow-hidden rounded-2xl md:block">
        <table className="fee">
          <thead>
            <tr>
              <th scope="col">{hasTiers ? "Tier & Mode" : "Mode"}</th>
              <th scope="col">Location &amp; Timing</th>
              {fee.columns.map((c) => (
                <th key={c} scope="col" className="text-right">
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {fee.rows.map((r) => (
              <tr key={r.mode}>
                <th scope="row" className="max-w-[18rem]">
                  {r.tier ? (
                    <>
                      <span className="block text-[1.02rem] text-navy">{r.tier}</span>
                      <span className="mt-1 block text-[0.85rem] font-medium leading-snug text-muted">
                        {r.mode}
                      </span>
                    </>
                  ) : (
                    r.mode
                  )}
                </th>
                <td className="text-muted">{r.location}</td>
                {r.prices.map((p, i) => (
                  <td key={i} className="text-right">
                    <span className="price">{p}</span>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile stacked cards */}
      <div className="flex flex-col gap-4 md:hidden">
        {fee.rows.map((r) => (
          <div key={r.mode} className="card p-5">
            {r.tier ? (
              <>
                <h4 className="text-[1.15rem] leading-snug text-navy">{r.tier}</h4>
                <p className="mt-1 text-[0.85rem] leading-snug text-muted">{r.mode}</p>
              </>
            ) : (
              <h4 className="text-[1.05rem] leading-snug text-navy">{r.mode}</h4>
            )}
            <p className="mt-1.5 flex items-start gap-1.5 text-[0.85rem] text-muted">
              <Icon name="pin" size={15} className="mt-0.5 shrink-0 text-royal-400" />
              {r.location}
            </p>
            <div className="mt-4 grid grid-cols-2 gap-3">
              {r.prices.map((p, i) => (
                <div key={i} className="rounded-xl bg-sky px-3 py-2.5">
                  <div className="text-[0.72rem] font-semibold uppercase tracking-wide text-royal-600">
                    {fee.columns[i]}
                  </div>
                  <div className="mt-0.5">
                    <Price>{p}</Price>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-5 flex flex-col gap-2 text-[0.88rem] text-muted">
        {fee.installments && (
          <p className="flex items-start gap-2">
            <Icon name="check" size={17} className="mt-0.5 shrink-0 text-lime-600" />
            {fee.installments}
          </p>
        )}
        {showIncludes && (
          <p className="flex items-start gap-2">
            <Icon name="check" size={17} className="mt-0.5 shrink-0 text-lime-600" />
            {feeIncludes}
          </p>
        )}
        {fee.remark && (
          <p className="mt-1 rounded-xl border border-gold/40 bg-gold-100/50 px-4 py-3 text-navy">
            <strong className="font-bold">Note:</strong> {fee.remark}
          </p>
        )}
      </div>

      {(onlineNote || tutoringNote) && (
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {onlineNote && (
            <div className="rounded-2xl border border-sky-200 bg-white p-5">
              <div className="flex items-center gap-2.5">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-sky text-royal">
                  <Icon name="notes" size={18} />
                </span>
                <h4 className="text-[1rem] leading-tight">{onlineMaterialNote.title}</h4>
              </div>
              <p className="mt-3 text-[0.88rem] leading-relaxed text-muted">
                {onlineMaterialNote.body}
              </p>
              <div className="mt-3 flex flex-wrap items-baseline gap-x-2.5 gap-y-1 rounded-xl bg-sky px-4 py-2.5">
                <Price>{onlineMaterialNote.price}</Price>
                <span className="text-[0.8rem] text-muted">{onlineMaterialNote.priceLabel}</span>
              </div>
            </div>
          )}

          {tutoringNote && (
            <div className="rounded-2xl border border-gold/40 bg-gold-100/50 p-5">
              <div className="flex items-center gap-2.5">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-white text-gold-600">
                  <Icon name="mentor" size={18} />
                </span>
                <h4 className="text-[1rem] leading-tight">{singleSubjectNote.title}</h4>
              </div>
              <p className="mt-3 text-[0.88rem] leading-relaxed text-muted">
                {singleSubjectNote.body}
              </p>
              <div className="mt-3 grid gap-2 sm:grid-cols-2">
                {singleSubjectNote.options.map((o) => (
                  <div key={o.price} className="rounded-xl bg-white px-4 py-2.5">
                    <Price>{o.price}</Price>
                    <div className="mt-1 text-[0.78rem] leading-snug text-muted">{o.label}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
