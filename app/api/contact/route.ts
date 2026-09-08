import { NextResponse } from "next/server";

interface ContactPayload {
  name?: string;
  email?: string;
  phone?: string;
  subject?: string;
  message?: string;
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let body: ContactPayload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid request body." },
      { status: 400 }
    );
  }

  const name = body.name?.trim() ?? "";
  const email = body.email?.trim() ?? "";
  const message = body.message?.trim() ?? "";

  if (!name || !email || !message || !EMAIL_PATTERN.test(email)) {
    return NextResponse.json(
      { ok: false, error: "Please provide a valid name, email address and message." },
      { status: 400 }
    );
  }

  // TODO(Firm, pre-launch): this route only validates the submission today —
  // it does not send an email. Wire in a transactional email provider (e.g.
  // Postmark, SendGrid, Amazon SES, Resend) before launch so submissions
  // actually reach the Firm, and decide which mailbox should receive them
  // (see the flagged question about the public contact address).

  return NextResponse.json({ ok: true });
}
