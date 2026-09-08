"use client";

import { useState, type FormEvent } from "react";
import type { getContent } from "@/lib/content";

type ContactContent = ReturnType<typeof getContent<"contact">>;

type Status = "idle" | "sending" | "success" | "error";

export default function ContactForm({ form }: { form: ContactContent["form"] }) {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");

    // Captured before the `await` — React nulls out `event.currentTarget`
    // once the synchronous part of the handler finishes, so reusing
    // `event.currentTarget` after an await throws and would otherwise
    // mask a successful submission as an error.
    const formEl = event.currentTarget;
    const data = new FormData(formEl);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          phone: data.get("phone"),
          subject: data.get("subject"),
          message: data.get("message"),
        }),
      });

      if (!response.ok) throw new Error("Request failed");
      setStatus("success");
      formEl.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div
        role="status"
        className="rounded-md border border-gold bg-paper-raised p-6"
      >
        <p className="font-heading text-lg text-brand dark:text-ink">
          {form.successTitle}
        </p>
        <p className="mt-2 text-sm text-ink-muted">{form.successBody}</p>
      </div>
    );
  }

  const inputClass =
    "w-full rounded-md border border-line bg-paper px-3 py-2 text-sm text-ink placeholder:text-ink-muted/70 focus:border-gold focus:outline-none";

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-ink mb-1.5">
            {form.nameLabel} *
          </label>
          <input id="name" name="name" type="text" required className={inputClass} />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-ink mb-1.5">
            {form.emailLabel} *
          </label>
          <input id="email" name="email" type="email" required className={inputClass} />
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-ink mb-1.5">
            {form.phoneLabel}
          </label>
          <input id="phone" name="phone" type="tel" className={inputClass} />
        </div>
        <div>
          <label htmlFor="subject" className="block text-sm font-medium text-ink mb-1.5">
            {form.subjectLabel}
          </label>
          <select id="subject" name="subject" className={inputClass} defaultValue={form.subjectOptions[0]}>
            {form.subjectOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-ink mb-1.5">
          {form.messageLabel} *
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          className={inputClass}
        />
      </div>

      <p className="text-xs text-ink-muted">{form.requiredNote}</p>

      {status === "error" ? (
        <p role="alert" className="text-sm text-red-700 dark:text-red-400">
          {form.errorBody}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={status === "sending"}
        className="inline-flex items-center justify-center bg-gold px-6 py-3 text-sm font-medium tracking-wide text-ink-black hover:bg-gold-light disabled:opacity-60 transition-colors"
      >
        {status === "sending" ? form.sendingLabel : form.submitLabel}
      </button>
    </form>
  );
}
