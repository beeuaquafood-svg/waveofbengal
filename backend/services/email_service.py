import os
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.mime.application import MIMEApplication
from dotenv import load_dotenv

load_dotenv()

GMAIL_USER = os.getenv("GMAIL_USER", "your-email@gmail.com")
GMAIL_PASS = os.getenv("GMAIL_PASS", "your-app-password")

def send_order_email(recipient_email: str, order_data: dict, pdf_bytes: bytes = None) -> dict:
    """
    Sends an order confirmation email via Gmail SMTP, with optional PDF invoice attachment.
    If credentials are placeholders, simulates the dispatch cleanly without crashing.
    """
    order_number = order_data.get("orderNumber", "#WOB-ORDER")
    full_name = order_data.get("fullName", "Valued Customer")
    total = order_data.get("total", 0)
    address = order_data.get("address", "On file")

    is_configured = (
        GMAIL_USER
        and GMAIL_PASS
        and "your-email" not in GMAIL_USER
        and "your-app-password" not in GMAIL_PASS
        and "@" in GMAIL_USER
    )

    if not is_configured:
        print(f"[Backend Email Service] Simulated email dispatch for order {order_number} to {recipient_email}")
        return {
            "success": True,
            "emailSent": True,
            "isSimulated": True,
            "recipient": recipient_email,
            "message": f"Order receipt prepared for {recipient_email} (Simulated)"
        }

    try:
        msg = MIMEMultipart()
        msg["From"] = f"Wave of Bengal <{GMAIL_USER}>"
        msg["To"] = recipient_email
        msg["Subject"] = f"Order Confirmation: {order_number} — Wave of Bengal"

        html_body = f"""
        <html>
        <body style="font-family: Arial, sans-serif; color: #1e293b; padding: 20px;">
            <div style="max-width: 600px; margin: auto; border: 1px solid #e2e8f0; border-radius: 12px; padding: 24px;">
                <h2 style="color: #0284c7; margin-top: 0;">Wave of Bengal — Order Confirmed</h2>
                <p>Hello <strong>{full_name}</strong>,</p>
                <p>Thank you for choosing Wave of Bengal. Your order <strong>{order_number}</strong> for <strong>₹{total}</strong> has been received and scheduled for express cold-chain delivery.</p>
                <p><strong>Delivery Address:</strong> {address}</p>
                <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
                <p style="font-size: 13px; color: #64748b;">A copy of your tax invoice is attached as a PDF.</p>
            </div>
        </body>
        </html>
        """
        msg.attach(MIMEText(html_body, "html"))

        if pdf_bytes:
            pdf_part = MIMEApplication(pdf_bytes, Name=f"{order_number}_invoice.pdf")
            pdf_part["Content-Disposition"] = f'attachment; filename="{order_number}_invoice.pdf"'
            msg.attach(pdf_part)

        server = smtplib.SMTP("smtp.gmail.com", 587)
        server.starttls()
        server.login(GMAIL_USER, GMAIL_PASS)
        server.send_message(msg)
        server.quit()

        return {
            "success": True,
            "emailSent": True,
            "isSimulated": False,
            "recipient": recipient_email,
            "message": f"Order confirmation email sent to {recipient_email}"
        }
    except Exception as e:
        print(f"[Backend Email Service Error]: {e}")
        return {
            "success": False,
            "emailSent": False,
            "error": str(e)
        }
