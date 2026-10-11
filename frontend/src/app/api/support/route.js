import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { validateSupport } from "@/lib/support";
export const runtime = "nodejs";
const attempts = new Map();
export async function POST(request) {
  const origin = request.headers.get("origin");
  if (origin && origin !== new URL(request.url).origin)
    return NextResponse.json(
      { error: "Please submit this form from our website." },
      { status: 403 },
    );
  const text = await request.text();
  if (text.length > 6000)
    return NextResponse.json(
      { error: "Your message is too long." },
      { status: 413 },
    );
  let payload;
  try {
    payload = JSON.parse(text);
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
  const validation = validateSupport(payload);
  if (validation)
    return NextResponse.json({ error: validation }, { status: 400 });
  if (payload.website)
    return NextResponse.json(
      { error: "Unable to submit this request." },
      { status: 400 },
    );
  const user = process.env.GMAIL_USER,
    password = process.env.GMAIL_PASS;
  if (
    !user ||
    !password ||
    user.includes("your-email") ||
    password.includes("your-app-password")
  )
    return NextResponse.json(
      {
        error:
          payload.kind === "newsletter"
            ? "Newsletter signup is temporarily unavailable. Please try again later."
            : "Our enquiry form is temporarily unavailable. Please try again later.",
      },
      { status: 503 },
    );
  // Short-lived instance-level abuse protection; use a shared rate limiter at production ingress.
  const now = Date.now();
  for (const [key, value] of attempts)
    if (now - value.time > 3600000) attempts.delete(key);
  const key = payload.email.toLowerCase();
  const previous = attempts.get(key);
  if ((previous?.count || 0) >= 3 || attempts.size >= 10000)
    return NextResponse.json(
      { error: "Please wait before sending another request." },
      { status: 429 },
    );
  attempts.set(key, {
    time: previous?.time || now,
    count: (previous?.count || 0) + 1,
  });
  const transport = nodemailer.createTransport({
    service: "gmail",
    auth: { user, pass: password },
    connectionTimeout: 8000,
    socketTimeout: 10000,
  });
  try {
    await transport.sendMail({
      from: user,
      to: process.env.SUPPORT_EMAIL || user,
      replyTo: payload.email,
      subject:
        payload.kind === "newsletter"
          ? "Wave of Bengal: newsletter opt-in request"
          : `Wave of Bengal: ${payload.topic}`,
      text:
        payload.kind === "newsletter"
          ? `Newsletter opt-in request\nEmail: ${payload.email}\nConsent: offers and updates, unsubscribe at any time.\nRequested at: ${new Date().toISOString()}\nConfirm subscription using your mailing platform before sending campaigns.`
          : `Name: ${payload.name}\nEmail: ${payload.email}\nTopic: ${payload.topic}\n\n${payload.message}`,
    });
    return NextResponse.json({
      message:
        payload.kind === "newsletter"
          ? "Your signup request has been sent. Look out for a subscription confirmation."
          : "Your enquiry has been sent. We’ll reply to the email address you provided.",
    });
  } catch {
    return NextResponse.json(
      { error: "We couldn’t send your request. Please try again later." },
      { status: 502 },
    );
  } finally {
    transport.close();
  }
}
