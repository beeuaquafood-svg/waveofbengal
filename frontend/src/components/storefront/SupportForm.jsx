"use client";
import { useState } from "react";
export default function SupportForm({ newsletter = false }) {
  const [busy, setBusy] = useState(false),
    [notice, setNotice] = useState(""),
    [error, setError] = useState("");
  async function submit(event) {
    event.preventDefault();
    setBusy(true);
    setNotice("");
    setError("");
    const form = event.currentTarget,
      values = Object.fromEntries(new FormData(form));
    try {
      const response = await fetch("/api/support", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          kind: newsletter ? "newsletter" : "contact",
        }),
      });
      const result = await response.json();
      if (!response.ok)
        throw new Error(result.error || "Please try again in a moment.");
      setNotice(result.message);
      form.reset();
    } catch (err) {
      setError(err.message || "Please check your connection and try again.");
    } finally {
      setBusy(false);
    }
  }
  return (
    <form
      className={newsletter ? "newsletter-form" : "fields contact-form"}
      onSubmit={submit}
    >
      {!newsletter && (
        <>
          <div className="field-grid">
            <label>
              Your name
              <input name="name" autoComplete="name" required maxLength={100} />
            </label>
            <label>
              Email address
              <input
                name="email"
                type="email"
                autoComplete="email"
                required
                maxLength={254}
              />
            </label>
          </div>
          <label>
            How can we help?
            <select name="topic">
              <option>Product enquiry</option>
              <option>Delivery & returns</option>
              <option>Wholesale & hospitality</option>
              <option>Something else</option>
            </select>
          </label>
          <label>
            Your message
            <textarea
              name="message"
              rows={5}
              required
              minLength={10}
              maxLength={3000}
              placeholder="Tell us a little about what you need."
            />
          </label>
        </>
      )}
      {newsletter && (
        <>
          <label htmlFor="newsletter-email">Email address</label>
          <div className="newsletter-input">
            <input
              id="newsletter-email"
              name="email"
              type="email"
              placeholder="Your email address"
              autoComplete="email"
              required
              maxLength={254}
            />
            <button type="submit" disabled={busy}>
              {busy ? "Joining…" : "Join →"}
            </button>
          </div>
          <label className="consent">
            <input type="checkbox" name="consent" value="yes" required />
            <span>
              I’d like offers and updates from Wave of Bengal. I can unsubscribe
              at any time.
            </span>
          </label>
        </>
      )}
      <div className="form-trap" aria-hidden="true">
        <label>
          Leave this field empty
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      {!newsletter && (
        <>
          <p className="small-note">
            We’ll use these details to respond to your enquiry.
          </p>
          <button className="button" type="submit" disabled={busy}>
            {busy ? "Sending…" : "Send enquiry →"}
          </button>
        </>
      )}
      {notice && (
        <p className="form-feedback" role="status">
          {notice}
        </p>
      )}
      {error && (
        <p className="form-feedback error" role="alert">
          {error}
        </p>
      )}
    </form>
  );
}
