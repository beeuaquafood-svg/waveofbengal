"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
function ProfileEditor({ profile, updateProfile }) {
  const [values, setValues] = useState({
    name: profile?.name || "",
    phone: profile?.phone || "",
    address: profile?.address || "",
    city: profile?.city || "",
    pincode: profile?.pincode || "",
  });
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");
  async function save(e) {
    e.preventDefault();
    setBusy(true);
    setNotice("");
    setError("");
    try {
      await updateProfile(values);
      setNotice("Your details have been saved.");
    } catch {
      setError("We couldn’t save your details. Please try again.");
    } finally {
      setBusy(false);
    }
  }
  return (
    <form className="fields" onSubmit={save}>
      <h2>Your details</h2>
      {error && <p role="alert">{error}</p>}
      {notice && <p role="status">{notice}</p>}
      <div className="field-grid">
        {[
          ["name", "Full name", "name"],
          ["phone", "Phone number", "tel"],
          ["address", "Address", "street-address"],
          ["city", "City", "address-level2"],
          ["pincode", "PIN code", "postal-code"],
        ].map(([key, label, autocomplete]) => (
          <label key={key}>
            {label}
            <input
              value={values[key]}
              autoComplete={autocomplete}
              type={key === "phone" ? "tel" : "text"}
              onChange={(e) => setValues({ ...values, [key]: e.target.value })}
              required={key === "name"}
            />
          </label>
        ))}
      </div>
      <button className="button" disabled={busy} type="submit">
        {busy ? "Saving…" : "Save details"}
      </button>
    </form>
  );
}
export default function Account() {
  const { user, profile, isAdmin, loading, updateProfile, logout } = useAuth();
  const router = useRouter();
  const [error, setError] = useState("");
  if (loading)
    return (
      <div className="shell empty-state" role="status">
        Loading your account…
      </div>
    );
  if (!user)
    return (
      <div className="shell empty-state">
        <h1>Your place at the table.</h1>
        <p>Sign in to manage your details, or keep exploring the collection.</p>
        <Link className="button" href="/login?next=%2Faccount">
          Sign in →
        </Link>
      </div>
    );
  return (
    <div className="shell account-page">
      <div className="section-heading">
        <div>
          <span className="eyebrow">YOUR ACCOUNT</span>
          <h1>
            Hello,{" "}
            {profile?.name?.split(" ")[0] ||
              user.displayName?.split(" ")[0] ||
              "there"}
            .
          </h1>
          <p>{user.email || user.phoneNumber}</p>
        </div>
        <button
          className="text-link"
          onClick={async () => {
            try {
              await logout();
              router.push("/home");
            } catch {
              setError("Sign-out failed. Please try again.");
            }
          }}
        >
          Sign out →
        </button>
      </div>
      {error && <p role="alert">{error}</p>}
      <div className="commerce-grid">
        <ProfileEditor
          key={profile?.name || user.uid}
          profile={profile}
          updateProfile={updateProfile}
        />
        <aside className="order-summary">
          <span className="eyebrow">SOMETHING FOR YOUR NEXT MEAL</span>
          <h2>Back to the coast.</h2>
          <p>Explore our collection and choose your next favourite.</p>
          <Link className="button wide" href="/products">
            Shop prawns →
          </Link>
          {isAdmin && (
            <Link className="text-link" href="/admin">
              Open admin dashboard →
            </Link>
          )}
        </aside>
      </div>
    </div>
  );
}
