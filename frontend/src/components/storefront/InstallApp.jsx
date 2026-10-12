"use client";
import { useEffect, useState } from "react";
export default function InstallApp() {
  const [prompt, setPrompt] = useState(null);
  const [busy, setBusy] = useState(false);
  useEffect(() => {
    if ("serviceWorker" in navigator)
      navigator.serviceWorker.register("/sw.js").catch(() => {});
    if (
      !/Android/i.test(navigator.userAgent) ||
      matchMedia("(display-mode: standalone)").matches
    )
      return;
    const ready = (e) => {
      e.preventDefault();
      setPrompt(e);
    };
    const installed = () => setPrompt(null);
    window.addEventListener("beforeinstallprompt", ready);
    window.addEventListener("appinstalled", installed);
    return () => {
      window.removeEventListener("beforeinstallprompt", ready);
      window.removeEventListener("appinstalled", installed);
    };
  }, []);
  if (!prompt) return null;
  return (
    <button
      className="install-app"
      disabled={busy}
      onClick={async () => {
        setBusy(true);
        try {
          await prompt.prompt();
          await prompt.userChoice;
        } finally {
          setPrompt(null);
          setBusy(false);
        }
      }}
    >
      ↓ Install Wave of Bengal
    </button>
  );
}
