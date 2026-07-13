"use client";

import { useState } from "react";
import Icon from "./Icon";

const TO = "enquiries@edutattva.com";
const field =
  "w-full rounded-xl border border-sky-200 bg-white px-4 py-3 text-[0.95rem] text-ink outline-none transition-colors focus:border-royal focus:ring-2 focus:ring-royal/20 placeholder:text-slate-400";

/** Email button that opens an on-site composer, then hands off to the user's mail app. */
export default function EmailComposer({ className = "" }: { className?: string }) {
  const [open, setOpen] = useState(false);
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");

  function send(e: React.FormEvent) {
    e.preventDefault();
    const href = `mailto:${TO}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = href;
    setOpen(false);
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={`Email ${TO}`}
        className={className}
      >
        <Icon name="mail" size={18} />
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Compose email"
        >
          <div
            className="absolute inset-0 bg-navy/60 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          <form
            onSubmit={send}
            className="relative w-full max-w-md rounded-2xl bg-white p-6 text-ink shadow-2xl"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-[1.25rem] text-navy">Email us</h3>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close"
                className="grid h-9 w-9 place-items-center rounded-lg text-navy hover:bg-sky"
              >
                <Icon name="close" size={20} />
              </button>
            </div>
            <p className="mt-1 text-sm text-muted">
              To: <span className="font-semibold text-royal">{TO}</span>
            </p>
            <div className="mt-4 space-y-3">
              <input
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Subject"
                className={field}
                aria-label="Subject"
              />
              <textarea
                value={body}
                onChange={(e) => setBody(e.target.value)}
                rows={5}
                placeholder="Your message…"
                className={field}
                aria-label="Message"
              />
            </div>
            <button type="submit" className="btn btn-gold mt-4 w-full">
              Open in mail app <Icon name="arrow" size={18} />
            </button>
            <p className="mt-2 text-[0.75rem] text-muted">
              This opens your email app with the message ready to send.
            </p>
          </form>
        </div>
      )}
    </>
  );
}
