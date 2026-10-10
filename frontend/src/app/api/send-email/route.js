import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req) {
    try {
        const payload = await req.json();
        const {
            orderNumber = '#WOB-' + Math.floor(100000 + Math.random() * 900000),
            email,
            fullName = 'Valued Customer',
            phone = '',
            address = '',
            items = [],
            subtotal = 0,
            shipping = 0,
            tax = 0,
            total = 0,
            timeSlot = 'Morning Delivery (7:00 AM - 10:00 AM)',
        } = payload;

        if (!email) {
            return NextResponse.json({ error: 'Recipient email address is required' }, { status: 400 });
        }

        const gmailUser = process.env.GMAIL_USER;
        const gmailPass = process.env.GMAIL_PASS;

        const isRealCredentials =
            gmailUser &&
            gmailPass &&
            !gmailUser.includes('your-email') &&
            !gmailPass.includes('your-app-password') &&
            gmailUser.includes('@');

        // Build item rows HTML
        const itemsHtml = items.length > 0
            ? items.map(item => `
                <tr style="border-bottom: 1px solid #e7e5e4;">
                    <td style="padding: 12px 0; font-weight: 600; color: #1c1917;">${item.name || item.title || 'Fresh Seafood Item'}</td>
                    <td style="padding: 12px 0; text-align: center; color: #57534e;">${item.quantity || 1}</td>
                    <td style="padding: 12px 0; text-align: right; color: #1c1917; font-weight: 600;">₹${(item.price || 0).toLocaleString('en-IN')}</td>
                </tr>
            `).join('')
            : `
                <tr style="border-bottom: 1px solid #e7e5e4;">
                    <td style="padding: 12px 0; font-weight: 600; color: #1c1917;">Fresh Bengal Seafood Assortment</td>
                    <td style="padding: 12px 0; text-align: center; color: #57534e;">1</td>
                    <td style="padding: 12px 0; text-align: right; color: #1c1917; font-weight: 600;">₹${total.toLocaleString('en-IN')}</td>
                </tr>
            `;

        const emailHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Wave of Bengal — Order Confirmation ${orderNumber}</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f5f5f4; margin: 0; padding: 24px; color: #1c1917;">
    <div style="max-width: 620px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.06); border: 1px solid #e7e5e4;">
        
        <!-- Header Banner -->
        <div style="background: linear-gradient(135deg, #09203f 0%, #1c3b57 100%); padding: 36px 32px; text-align: center; color: #ffffff;">
            <div style="letter-spacing: 4px; font-size: 11px; text-transform: uppercase; color: #f59e0b; font-weight: bold; margin-bottom: 8px;">
                ⚓ WAVE OF BENGAL • ARTISANAL SEAFOOD
            </div>
            <h1 style="margin: 0; font-size: 26px; font-weight: 700; color: #ffffff;">
                Order Confirmed!
            </h1>
            <p style="margin: 8px 0 0; font-size: 14px; color: #93c5fd;">
                Order Reference: <strong>${orderNumber}</strong>
            </p>
        </div>

        <!-- Greeting -->
        <div style="padding: 32px 32px 16px;">
            <p style="font-size: 16px; margin: 0 0 16px; line-height: 1.5;">
                Hello <strong>${fullName}</strong>,
            </p>
            <p style="font-size: 14px; color: #44403c; line-height: 1.6; margin: 0 0 24px;">
                Thank you for your order! Your harvest has been confirmed and assigned to our direct cold-chain handling. Our fishermen and quality teams will pack your seafood in insulated temperature-controlled crates to guarantee ocean freshness at your doorstep.
            </p>

            <!-- Delivery Details Box -->
            <div style="background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 12px; padding: 18px; margin-bottom: 24px;">
                <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px; color: #166534; margin-bottom: 8px;">
                    🚚 Delivery Information
                </div>
                <div style="font-size: 14px; color: #14532d; line-height: 1.5;">
                    <strong>Address:</strong> ${address || 'On file'}<br/>
                    ${phone ? `<strong>Contact:</strong> ${phone}<br/>` : ''}
                    <strong>Delivery Slot:</strong> ${timeSlot}
                </div>
            </div>

            <!-- Items Breakdown -->
            <div style="margin-bottom: 24px;">
                <h3 style="font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px; color: #78716c; margin: 0 0 12px; border-bottom: 2px solid #f5f5f4; padding-bottom: 8px;">
                    Order Summary
                </h3>
                <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
                    <thead>
                        <tr style="border-bottom: 1px solid #d6d3d1; color: #78716c; font-size: 12px; text-transform: uppercase;">
                            <th style="padding: 8px 0; text-align: left;">Item</th>
                            <th style="padding: 8px 0; text-align: center;">Qty</th>
                            <th style="padding: 8px 0; text-align: right;">Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${itemsHtml}
                    </tbody>
                </table>

                <!-- Pricing Totals -->
                <div style="margin-top: 16px; border-top: 2px solid #f5f5f4; padding-top: 12px; font-size: 14px;">
                    <div style="display: flex; justify-content: space-between; padding: 4px 0; color: #57534e;">
                        <span>Subtotal:</span>
                        <span>₹${subtotal.toLocaleString('en-IN')}</span>
                    </div>
                    <div style="display: flex; justify-content: space-between; padding: 4px 0; color: #57534e;">
                        <span>Delivery Fee:</span>
                        <span>${shipping === 0 ? '<strong style="color: #16a34a;">FREE</strong>' : `₹${shipping}`}</span>
                    </div>
                    <div style="display: flex; justify-content: space-between; padding: 4px 0; color: #57534e;">
                        <span>GST & Packaging (5%):</span>
                        <span>₹${tax.toLocaleString('en-IN')}</span>
                    </div>
                    <div style="display: flex; justify-content: space-between; padding: 12px 0 0; margin-top: 8px; border-top: 1px solid #e7e5e4; font-size: 18px; font-weight: 700; color: #0f172a;">
                        <span>Total Paid:</span>
                        <span style="color: #0369a1;">₹${total.toLocaleString('en-IN')}</span>
                    </div>
                </div>
            </div>

            <!-- Freshness Notice -->
            <div style="background: #eff6ff; border-left: 4px solid #3b82f6; border-radius: 4px 12px 12px 4px; padding: 14px 16px; margin-bottom: 24px; font-size: 13px; color: #1e40af; line-height: 1.5;">
                ❄️ <strong>Cold-Chain Guarantee:</strong> Your seafood is kept strictly between 0°C - 4°C. Our rider will contact you 2 hours prior to scheduled delivery. Please refrigerate promptly upon unboxing.
            </div>

        </div>

        <!-- Footer -->
        <div style="background: #f8fafc; padding: 24px 32px; border-top: 1px solid #e2e8f0; text-align: center; font-size: 12px; color: #64748b; line-height: 1.5;">
            <p style="margin: 0 0 6px;">Questions about your harvest? Email us at <a href="mailto:support@waveofbengal.com" style="color: #0284c7; text-decoration: none;">support@waveofbengal.com</a></p>
            <p style="margin: 0;">Wave of Bengal Pvt Ltd • Sustainably sourced from the Bay of Bengal</p>
        </div>
    </div>
</body>
</html>
`;

        if (isRealCredentials) {
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: gmailUser,
                    pass: gmailPass,
                },
            });

            const mailOptions = {
                from: `"Wave of Bengal" <${gmailUser}>`,
                to: email,
                subject: `Order Confirmation: ${orderNumber} — Wave of Bengal`,
                html: emailHtml,
            };

            await transporter.sendMail(mailOptions);

            return NextResponse.json({
                success: true,
                emailSent: true,
                isSimulated: false,
                recipient: email,
                orderNumber,
                message: `Order confirmation successfully emailed to ${email}`,
            });
        } else {
            // Simulated delivery when using placeholder credentials
            console.log(`[Email Service] Simulated email confirmation for order ${orderNumber} to ${email}`);
            return NextResponse.json({
                success: true,
                emailSent: true,
                isSimulated: true,
                recipient: email,
                orderNumber,
                message: `Order confirmation prepared and logged for ${email} (Configure real GMAIL_USER & GMAIL_PASS in .env.local to send live emails)`,
            });
        }
    } catch (error) {
        console.error('Email sending error:', error);
        return NextResponse.json({
            success: false,
            error: error.message || 'Failed to send confirmation email',
        }, { status: 500 });
    }
}
