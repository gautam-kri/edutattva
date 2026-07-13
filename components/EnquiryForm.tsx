"use client";

import { useState, type FormEvent } from "react";
import { site } from "@/lib/data";
import Icon from "./Icon";

const grades = ["Grade 6", "Grade 7", "Grade 8", "Grade 9", "Grade 10", "Grade 11", "Grade 12"];
const modeOptions = ["Integrated", "Offline", "Hybrid", "Online", "Not sure yet"];

const field =
  "w-full rounded-xl border border-sky-200 bg-white px-4 py-3 text-[0.95rem] text-ink outline-none transition-colors focus:border-royal focus:ring-2 focus:ring-royal/20 placeholder:text-slate-400";
const labelCls = "mb-1.5 block text-[0.85rem] font-semibold text-navy";
const errCls = "mt-1 text-[0.78rem] font-medium text-crimson";

type Errors = Record<string, string>;

export default function EnquiryForm({ compact = false }: { compact?: boolean }) {
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);

  function validate(fd: FormData): Errors {
    const e: Errors = {};
    const str = (k: string) => String(fd.get(k) ?? "").trim();

    if (!str("student")) e.student = "Please enter the student's name.";
    if (!compact && !str("parent")) e.parent = "Please enter the parent's name.";
    const phone = str("phone").replace(/\s|-/g, "");
    if (!phone) e.phone = "Please enter a phone number.";
    else if (!/^(\+?91)?[6-9]\d{9}$/.test(phone)) e.phone = "Enter a valid 10-digit mobile number.";
    const email = str("email");
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = "Enter a valid email address.";
    if (!compact && !str("grade")) e.grade = "Select the current grade.";
    if (!compact && !str("program")) e.program = "Select a program of interest.";
    return e;
  }

  function onSubmit(ev: FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    const fd = new FormData(ev.currentTarget);
    const e = validate(fd);
    setErrors(e);
    if (Object.keys(e).length > 0) {
      const first = document.querySelector<HTMLElement>('[aria-invalid="true"]');
      first?.focus();
      return;
    }
    // TODO: connect backend — currently a front-end only success state.
    setSent(true);
  }

  if (sent) {
    return (
      <div className="card p-8 text-center">
        <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-lime/20 text-lime-600">
          <Icon name="check" size={34} />
        </span>
        <h3 className="mt-5 text-[1.5rem]">Enquiry received — thank you!</h3>
        <p className="mx-auto mt-3 max-w-md text-muted">
          Our counselling team will reach out shortly. For anything urgent, call or message us
          directly and we&apos;ll help right away.
        </p>
        <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a href={`tel:${site.phoneDial}`} className="btn btn-navy">
            <Icon name="phone" size={18} /> {site.phoneDisplay}
          </a>
          <a href={site.whatsapp} target="_blank" rel="noopener noreferrer" className="btn btn-outline">
            <Icon name="whatsapp" size={18} /> WhatsApp us
          </a>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="card p-6 md:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <div className={compact ? "sm:col-span-2" : ""}>
          <label htmlFor="student" className={labelCls}>
            Student name <span className="text-crimson">*</span>
          </label>
          <input
            id="student"
            name="student"
            className={field}
            placeholder="Student's full name"
            aria-invalid={!!errors.student}
            aria-describedby={errors.student ? "err-student" : undefined}
          />
          {errors.student && (
            <p id="err-student" className={errCls} role="alert">
              {errors.student}
            </p>
          )}
        </div>

        {!compact && (
          <div>
            <label htmlFor="parent" className={labelCls}>
              Parent name <span className="text-crimson">*</span>
            </label>
            <input
              id="parent"
              name="parent"
              className={field}
              placeholder="Parent / guardian name"
              aria-invalid={!!errors.parent}
              aria-describedby={errors.parent ? "err-parent" : undefined}
            />
            {errors.parent && (
              <p id="err-parent" className={errCls} role="alert">
                {errors.parent}
              </p>
            )}
          </div>
        )}

        <div>
          <label htmlFor="phone" className={labelCls}>
            Phone <span className="text-crimson">*</span>
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            inputMode="tel"
            className={field}
            placeholder="10-digit mobile number"
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? "err-phone" : undefined}
          />
          {errors.phone && (
            <p id="err-phone" className={errCls} role="alert">
              {errors.phone}
            </p>
          )}
        </div>

        <div className={compact ? "sm:col-span-2" : ""}>
          <label htmlFor="email" className={labelCls}>
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            className={field}
            placeholder="you@example.com"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "err-email" : undefined}
          />
          {errors.email && (
            <p id="err-email" className={errCls} role="alert">
              {errors.email}
            </p>
          )}
        </div>

        {!compact && (
          <>
            <div>
              <label htmlFor="grade" className={labelCls}>
                Current grade <span className="text-crimson">*</span>
              </label>
              <select
                id="grade"
                name="grade"
                defaultValue=""
                className={field}
                aria-invalid={!!errors.grade}
                aria-describedby={errors.grade ? "err-grade" : undefined}
              >
                <option value="" disabled>
                  Select grade
                </option>
                {grades.map((g) => (
                  <option key={g} value={g}>
                    {g}
                  </option>
                ))}
              </select>
              {errors.grade && (
                <p id="err-grade" className={errCls} role="alert">
                  {errors.grade}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="program" className={labelCls}>
                Program interest <span className="text-crimson">*</span>
              </label>
              <select
                id="program"
                name="program"
                defaultValue=""
                className={field}
                aria-invalid={!!errors.program}
                aria-describedby={errors.program ? "err-program" : undefined}
              >
                <option value="" disabled>
                  Select program
                </option>
                <option value="Foundation (6–8)">Foundation (6–8)</option>
                <optgroup label="Edu Ignite (9–10)">
                  <option value="Edu Ignite (9–10) — JEE">Edu Ignite (9–10) — JEE</option>
                  <option value="Edu Ignite (9–10) — NEET">Edu Ignite (9–10) — NEET</option>
                  <option value="Edu Ignite (9–10) — Both">Edu Ignite (9–10) — Both (JEE &amp; NEET)</option>
                </optgroup>
                <optgroup label="Edu Edge (11–12)">
                  <option value="Edu Edge (11–12) — JEE">Edu Edge (11–12) — JEE</option>
                  <option value="Edu Edge (11–12) — NEET">Edu Edge (11–12) — NEET</option>
                  <option value="Edu Edge (11–12) — Both">Edu Edge (11–12) — Both (JEE &amp; NEET)</option>
                </optgroup>
                <option value="Edu Edge Online (XI)">Edu Edge Online (XI)</option>
                <option value="Not sure yet">Not sure yet</option>
              </select>
              {errors.program && (
                <p id="err-program" className={errCls} role="alert">
                  {errors.program}
                </p>
              )}
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="mode" className={labelCls}>
                Preferred mode
              </label>
              <select id="mode" name="mode" defaultValue="" className={field}>
                <option value="" disabled>
                  Select mode
                </option>
                {modeOptions.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
            </div>
          </>
        )}

        <div className="sm:col-span-2">
          <label htmlFor="message" className={labelCls}>
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={compact ? 3 : 4}
            className={field}
            placeholder="Tell us anything that helps us guide you better…"
          />
        </div>
      </div>

      <button type="submit" className="btn btn-gold mt-6 w-full sm:w-auto">
        Book Free Counselling
        <Icon name="arrow" size={18} />
      </button>
      <p className="mt-3 text-[0.8rem] text-muted">
        Prefer to talk now? Call{" "}
        <a href={`tel:${site.phoneDial}`} className="font-semibold text-royal">
          {site.phoneDisplay}
        </a>{" "}
        or message us on WhatsApp.
      </p>
    </form>
  );
}
