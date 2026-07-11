import { feeIncludes } from "@/lib/data";
import Icon from "./Icon";

type FeeRow = { mode: string; location: string; prices: string[] };
type Fee = {
  columns: string[];
  rows: FeeRow[];
  remark?: string;
  installments?: string;
};

export default function FeeTable({ fee, showIncludes = true }: { fee: Fee; showIncludes?: boolean }) {
  return (
    <div>
      {/* Desktop / tablet table */}
      <div className="hidden overflow-hidden rounded-2xl md:block">
        <table className="fee">
          <thead>
            <tr>
              <th scope="col">Mode</th>
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
                  {r.mode}
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
            <h4 className="text-[1.05rem] leading-snug text-navy">{r.mode}</h4>
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
                  <div className="price mt-0.5">{p}</div>
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
    </div>
  );
}
