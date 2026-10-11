export function validateSupport(payload) {
  if (!payload || typeof payload !== "object") return "Invalid request.";
  if (!["contact", "newsletter"].includes(payload.kind))
    return "Choose a valid enquiry type.";
  if (
    typeof payload.email !== "string" ||
    payload.email.length > 254 ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email)
  )
    return "Enter a valid email address.";
  if (payload.kind === "newsletter" && payload.consent !== "yes")
    return "Please confirm you would like to receive updates.";
  if (payload.kind === "contact") {
    if (
      typeof payload.name !== "string" ||
      !payload.name.trim() ||
      payload.name.length > 100
    )
      return "Enter your name (up to 100 characters).";
    if (
      typeof payload.message !== "string" ||
      payload.message.trim().length < 10 ||
      payload.message.length > 3000
    )
      return "Enter a message between 10 and 3,000 characters.";
    if (
      ![
        "Product enquiry",
        "Delivery & returns",
        "Wholesale & hospitality",
        "Something else",
      ].includes(payload.topic)
    )
      return "Choose a valid topic.";
  }
  return null;
}
