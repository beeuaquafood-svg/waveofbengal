export async function commerce(user, action, body = {}) {
  if (!user) throw new Error("Please sign in to continue.");
  const response = await fetch(`/api/commerce/${action}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${await user.getIdToken()}`,
    },
    body: JSON.stringify(body),
  });
  const result = await response.json();
  if (!response.ok) throw new Error(result.error || "Please try again.");
  return result;
}
let checkoutScript;
export function loadCheckout() {
  if (window.Razorpay) return Promise.resolve();
  if (!checkoutScript)
    checkoutScript = new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = resolve;
      script.onerror = () => {
        checkoutScript = null;
        script.remove();
        reject(new Error("Unable to load payments. Check your connection."));
      };
      document.head.appendChild(script);
    });
  return checkoutScript;
}
