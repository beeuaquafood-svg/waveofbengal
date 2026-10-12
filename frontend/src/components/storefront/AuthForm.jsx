"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useAuth } from "@/hooks/useAuth";

function destination() {
  const next = new URLSearchParams(window.location.search).get("next");
  return next && /^\/(?!\/)/.test(next) && !next.includes("\\")
    ? next
    : "/account";
}
function authError(error) {
  const messages = {
    "auth/unauthorized-domain":
      "Sign-in is not enabled for this website address yet. Please contact support.",
    "auth/operation-not-allowed":
      "This sign-in method is not enabled yet. Please choose another method.",
    "auth/invalid-app-credential":
      "Phone verification could not start. Refresh and try again, or use Google or email.",
    "auth/invalid-phone-number":
      "Enter a valid mobile number including your country code.",
    "auth/account-exists-with-different-credential":
      "Use your existing sign-in method for this email address.",
    "auth/invalid-credential":
      "The email or password isn’t correct. Please try again.",
    "auth/email-already-in-use":
      "An account already exists with this email. Please sign in.",
    "auth/too-many-requests":
      "Too many attempts. Please wait a moment and try again.",
    "auth/network-request-failed":
      "Please check your connection and try again.",
    "auth/weak-password": "Use at least six characters for your password.",
    "auth/popup-blocked":
      "Allow the sign-in pop-up in your browser, then try again.",
    "auth/invalid-verification-code":
      "That code isn’t correct. Please try again.",
    "auth/code-expired": "Your code has expired. Request a new one.",
  };
  return (
    messages[error.code] ||
    "We couldn’t complete sign-in. Please try again shortly."
  );
}
export default function AuthForm({ register = false }) {
  const {
    loginWithEmail,
    registerWithEmail,
    loginWithGoogle,
    sendPhoneOtp,
    verifyPhoneOtp,
  } = useAuth();
  const router = useRouter();
  useEffect(
    () => () => {
      if (window.recaptchaVerifier) {
        window.recaptchaVerifier.clear();
        window.recaptchaVerifier = null;
      }
      window.confirmationResult = null;
    },
    [],
  );

  const [mode, setMode] = useState("email");
  const [sent, setSent] = useState(false);
  const [show, setShow] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    otp: "",
  });
  const set = (e) => setValues({ ...values, [e.target.name]: e.target.value });
  async function run(action, redirect = true) {
    setError("");
    setNotice("");
    setBusy(true);
    try {
      if (!auth) throw Object.assign(new Error(), { code: "auth/unavailable" });
      await action();
      if (redirect) router.replace(destination());
    } catch (err) {
      if (err.code !== "auth/popup-closed-by-user")
        setError(
          err.code === "auth/unavailable"
            ? "Sign-in is temporarily unavailable. You can still browse and build your bag."
            : authError(err),
        );
    } finally {
      setBusy(false);
    }
  }
  function submit(e) {
    e.preventDefault();
    if (mode === "phone") {
      if (sent) return run(() => verifyPhoneOtp(values.otp));
      const phone = values.phone.replace(/[\s()-]/g, "");
      return run(async () => {
        await sendPhoneOtp(
          phone.startsWith("+") ? phone : "+91" + phone,
          "shop-recaptcha",
        );
        setSent(true);
        setNotice("Code sent. Enter the six-digit code from your SMS.");
      }, false);
    }
    return run(() =>
      register
        ? registerWithEmail(
            values.name.trim(),
            values.email.trim(),
            values.password,
          )
        : loginWithEmail(values.email.trim(), values.password),
    );
  }
  return (
    <div className="storefront auth-page">
      <div className="auth-panel">
        <Link href="/home" className="brand">
          <Image
            src="/images/WOB-black-4.png"
            alt="Wave of Bengal home"
            width={170}
            height={55}
          />
        </Link>
        <div className="auth-form">
          <Link className="text-link" href="/products">
            ← Back to the collection
          </Link>
          <span className="eyebrow">YOUR PLACE AT THE TABLE</span>
          <h1>{register ? "Make yourself at home." : "Welcome back."}</h1>
          <p>
            {register
              ? "Create an account for your next coastal favourite."
              : "Sign in and pick up where you left off."}
          </p>
          <button
            className="button secondary wide"
            disabled={busy}
            onClick={() => run(loginWithGoogle)}
          >
            <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M21.6 12.2c0-.7-.1-1.5-.2-2.2H12v4.2h5.4a4.6 4.6 0 0 1-2 3v2.6h3.3c1.9-1.8 2.9-4.4 2.9-7.6Z"
              />
              <path
                fill="#34A853"
                d="M12 22c2.7 0 5-.9 6.7-2.4l-3.3-2.6c-.9.6-2 1-3.4 1-2.6 0-4.8-1.8-5.6-4.1H3v2.7A10 10 0 0 0 12 22Z"
              />
              <path
                fill="#FBBC05"
                d="M6.4 13.9a6 6 0 0 1 0-3.8V7.4H3a10 10 0 0 0 0 9.2l3.4-2.7Z"
              />
              <path
                fill="#EA4335"
                d="M12 6c1.5 0 2.8.5 3.8 1.5L18.6 4A9.6 9.6 0 0 0 12 2a10 10 0 0 0-9 5.4l3.4 2.7A6 6 0 0 1 12 6Z"
              />
            </svg>{" "}
            Continue with Google
          </button>
          <div className="auth-divider">
            <span>or use {mode === "email" ? "your email" : "your phone"}</span>
          </div>
          {!register && (
            <div className="auth-tabs">
              <button
                aria-pressed={mode === "email"}
                onClick={() => {
                  setMode("email");
                  setError("");
                }}
              >
                Email
              </button>
              <button
                aria-pressed={mode === "phone"}
                onClick={() => {
                  setMode("phone");
                  setError("");
                }}
              >
                Phone
              </button>
            </div>
          )}
          {error && (
            <p className="form-error" role="alert">
              {error}
            </p>
          )}
          {notice && (
            <p className="form-notice" role="status">
              {notice}
            </p>
          )}
          <form onSubmit={submit} className="fields">
            {register && (
              <label>
                Full name
                <input
                  name="name"
                  autoComplete="name"
                  value={values.name}
                  onChange={set}
                  required
                />
              </label>
            )}
            {mode === "email" ? (
              <>
                <label>
                  Email address
                  <input
                    type="email"
                    name="email"
                    autoComplete="email"
                    value={values.email}
                    onChange={set}
                    required
                  />
                </label>
                <label>
                  Password
                  <div className="password-field">
                    <input
                      type={show ? "text" : "password"}
                      name="password"
                      autoComplete={
                        register ? "new-password" : "current-password"
                      }
                      minLength={register ? 6 : undefined}
                      value={values.password}
                      onChange={set}
                      required
                    />
                    <button
                      type="button"
                      aria-label={show ? "Hide password" : "Show password"}
                      onClick={() => setShow(!show)}
                    >
                      {show ? "Hide" : "Show"}
                    </button>
                  </div>
                </label>
                {!register && (
                  <button
                    className="text-link forgot-link"
                    type="button"
                    disabled={busy}
                    onClick={() => {
                      if (!values.email.trim()) {
                        setError("Enter your email address first.");
                        return;
                      }
                      run(async () => {
                        await sendPasswordResetEmail(auth, values.email.trim());
                        setNotice(
                          "If an account exists, a password reset link will arrive in your inbox.",
                        );
                      }, false);
                    }}
                  >
                    Forgot password?
                  </button>
                )}
              </>
            ) : (
              <>
                <label>
                  Mobile number
                  <input
                    type="tel"
                    name="phone"
                    autoComplete="tel"
                    placeholder="+91 98765 43210"
                    value={values.phone}
                    onChange={set}
                    required
                    disabled={sent}
                  />
                </label>
                {sent && (
                  <>
                    <label>
                      Verification code
                      <input
                        name="otp"
                        inputMode="numeric"
                        autoComplete="one-time-code"
                        pattern="[0-9]{6}"
                        maxLength={6}
                        value={values.otp}
                        onChange={set}
                        required
                      />
                    </label>
                    <button
                      type="button"
                      className="text-link"
                      disabled={busy}
                      onClick={() => {
                        setSent(false);
                        setValues({ ...values, otp: "" });
                      }}
                    >
                      Change number or request a new code
                    </button>
                  </>
                )}
              </>
            )}
            <button className="button wide" disabled={busy} type="submit">
              {busy
                ? "Please wait…"
                : mode === "phone"
                  ? sent
                    ? "Verify & sign in →"
                    : "Send verification code →"
                  : register
                    ? "Create account →"
                    : "Sign in →"}
            </button>
          </form>
          <div id="shop-recaptcha" />
          <p className="auth-switch">
            {register ? "Already have an account?" : "New to Wave of Bengal?"}{" "}
            <Link
              href={register ? "/login" : "/register"}
              onClick={(e) => {
                e.preventDefault();
                router.push(
                  `${register ? "/login" : "/register"}?next=${encodeURIComponent(destination())}`,
                );
              }}
            >
              {register ? "Sign in" : "Create an account"}
            </Link>
          </p>
          <Link className="guest-link" href="/products">
            Continue browsing without an account →
          </Link>
        </div>
        <span className="auth-bottom">
          Wave of Bengal · From our coast to your kitchen.
        </span>
      </div>
      <div className="auth-image">
        <Image
          src="/images/black%20tiger.jpeg"
          alt="Black Tiger Prawns arranged with fresh herbs"
          fill

          sizes="50vw"
        />
        <div>
          <span className="eyebrow">GOOD FOOD. GREAT BEGINNINGS.</span>
          <h2>
            A little closer
            <br />
            to the coast.
          </h2>
        </div>
      </div>
    </div>
  );
}
