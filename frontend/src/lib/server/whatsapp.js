import { database } from "./commerce.js";
// This sends from the configured business sender to the opted-in merchant, never impersonates a customer.
export async function notifyMerchant(ref, services = {}) {
  const env = services.env || process.env;
  const db = services.database || database;
  const send = services.fetch || fetch;
  if (
    !env.WHATSAPP_ACCESS_TOKEN ||
    !env.WHATSAPP_PHONE_NUMBER_ID ||
    !env.WHATSAPP_MERCHANT_NUMBER ||
    !env.WHATSAPP_TEMPLATE ||
    !env.WHATSAPP_GRAPH_VERSION
  )
    return;
  const order = await db().runTransaction(async (tx) => {
    const current = (await tx.get(ref)).data();
    if (
      current.status !== "paid" ||
      current.cancelRequested ||
      current.notificationState
    )
      return;
    tx.update(ref, { notificationState: "sending" });
    return current;
  });
  if (!order) return;
  try {
    const response = await send(
      `https://graph.facebook.com/${env.WHATSAPP_GRAPH_VERSION}/${env.WHATSAPP_PHONE_NUMBER_ID}/messages`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${env.WHATSAPP_ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
        signal: AbortSignal.timeout(12000),
        body: JSON.stringify({
          messaging_product: "whatsapp",
          to: env.WHATSAPP_MERCHANT_NUMBER,
          type: "template",
          template: {
            name: env.WHATSAPP_TEMPLATE,
            language: { code: env.WHATSAPP_TEMPLATE_LANGUAGE || "en" },
            components: [
              {
                type: "body",
                parameters: [
                  order.number,
                  `INR ${order.total}`,
                  order.delivery.fullName,
                  order.paymentId,
                ].map((text) => ({ type: "text", text })),
              },
            ],
          },
        }),
      },
    );
    const data = await response.json();
    await ref.update({
      notificationState: response.ok ? "sent" : "failed",
      ...(data.messages?.[0]?.id
        ? { notificationId: data.messages[0].id }
        : {}),
    });
  } catch {
    await ref.update({ notificationState: "uncertain" });
  }
  // Do not blindly retry an uncertain send: Meta may have accepted it before a timeout.
}
