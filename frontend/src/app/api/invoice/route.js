import { NextResponse } from 'next/server';

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const orderNumber = searchParams.get('orderNumber') || '#WOB-' + Math.floor(100000 + Math.random() * 900000);
    const email = searchParams.get('email') || 'customer@example.com';
    const total = searchParams.get('total') || '2,450';
    const date = new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' });

    const html = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Tax Invoice - ${orderNumber} - Wave of Bengal</title>
    <style>
        body {
            font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
            color: #334155;
            background: #fff;
            margin: 0;
            padding: 40px;
        }
        .invoice-box {
            max-width: 800px;
            margin: auto;
            border: 1px solid #e2e8f0;
            border-radius: 12px;
            padding: 36px;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
        }
        .header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            border-bottom: 2px solid #0f172a;
            padding-bottom: 20px;
            margin-bottom: 24px;
        }
        .logo {
            font-size: 24px;
            font-weight: 800;
            color: #0f172a;
            letter-spacing: 1px;
        }
        .tagline {
            font-size: 11px;
            text-transform: uppercase;
            letter-spacing: 2px;
            color: #d97706;
            font-weight: bold;
            margin-top: 4px;
        }
        .invoice-title {
            text-align: right;
        }
        .invoice-title h1 {
            margin: 0;
            font-size: 28px;
            color: #0284c7;
        }
        .meta-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 24px;
            margin-bottom: 30px;
            font-size: 14px;
        }
        .meta-box h4 {
            margin: 0 0 6px 0;
            color: #64748b;
            text-transform: uppercase;
            font-size: 11px;
            letter-spacing: 1px;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 24px;
        }
        th {
            background: #f8fafc;
            padding: 12px;
            text-align: left;
            font-size: 12px;
            text-transform: uppercase;
            letter-spacing: 1px;
            color: #475569;
            border-bottom: 1px solid #cbd5e1;
        }
        td {
            padding: 12px;
            border-bottom: 1px solid #e2e8f0;
            font-size: 14px;
        }
        .totals {
            margin-left: auto;
            width: 300px;
            font-size: 14px;
        }
        .totals-row {
            display: flex;
            justify-content: space-between;
            padding: 6px 0;
        }
        .grand-total {
            border-top: 2px solid #0f172a;
            font-weight: bold;
            font-size: 18px;
            color: #0f172a;
            padding-top: 8px;
            margin-top: 6px;
        }
        .footer {
            margin-top: 40px;
            padding-top: 20px;
            border-top: 1px solid #e2e8f0;
            text-align: center;
            font-size: 12px;
            color: #94a3b8;
        }
        .print-btn {
            background: #0284c7;
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 8px;
            font-weight: bold;
            cursor: pointer;
            margin-bottom: 20px;
        }
        @media print {
            .print-btn { display: none; }
            body { padding: 0; }
            .invoice-box { border: none; box-shadow: none; padding: 0; }
        }
    </style>
</head>
<body>
    <div style="max-width: 800px; margin: auto; text-align: right;">
        <button class="print-btn" onclick="window.print()">🖨️ Print / Save as PDF</button>
    </div>
    <div class="invoice-box">
        <div class="header">
            <div>
                <div class="logo">WAVE OF BENGAL</div>
                <div class="tagline">Premium Artisanal Seafood</div>
                <div style="font-size: 12px; color: #64748b; margin-top: 6px;">
                    GSTIN: 19AAACW1234F1Z8<br>
                    Plot 44, Cold Chain Hub, Kolkata Port, WB 700024
                </div>
            </div>
            <div class="invoice-title">
                <h1>TAX INVOICE</h1>
                <div style="font-size: 14px; color: #64748b; margin-top: 4px;"><strong>Invoice No:</strong> ${orderNumber}</div>
                <div style="font-size: 13px; color: #64748b;"><strong>Date:</strong> ${date}</div>
            </div>
        </div>

        <div class="meta-grid">
            <div class="meta-box">
                <h4>Billed & Shipped To:</h4>
                <div style="font-weight: bold; color: #0f172a;">Valued Customer</div>
                <div>${email}</div>
                <div>Express Cold-Chain Delivery</div>
            </div>
            <div class="meta-box" style="text-align: right;">
                <h4>Payment Status:</h4>
                <div style="font-weight: bold; color: #16a34a;">PAID (Verified)</div>
                <div>Mode: Online / Credit Card</div>
            </div>
        </div>

        <table>
            <thead>
                <tr>
                    <th>Item Description</th>
                    <th style="text-align: center;">Qty</th>
                    <th style="text-align: right;">Rate (₹)</th>
                    <th style="text-align: right;">Total (₹)</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td><strong>Wave of Bengal Ocean Fresh Catch</strong><br><small style="color: #64748b;">Sustainably Sourced • Vacuum Sealed Cold-Chain</small></td>
                    <td style="text-align: center;">1 pkg</td>
                    <td style="text-align: right;">₹${total}</td>
                    <td style="text-align: right;">₹${total}</td>
                </tr>
            </tbody>
        </table>

        <div class="totals">
            <div class="totals-row">
                <span>Subtotal:</span>
                <span>₹${total}</span>
            </div>
            <div class="totals-row">
                <span>Cold-Chain Delivery:</span>
                <span style="color: #16a34a; font-weight: bold;">FREE</span>
            </div>
            <div class="totals-row">
                <span>GST (Included 5%):</span>
                <span>Included</span>
            </div>
            <div class="totals-row grand-total">
                <span>Total Amount:</span>
                <span>₹${total}</span>
            </div>
        </div>

        <div class="footer">
            Thank you for choosing Wave of Bengal. For queries or catch traceability certificates, contact support@waveofbengal.com.<br>
            <em>This is a computer-generated tax invoice.</em>
        </div>
    </div>
</body>
</html>
    `;

    return new NextResponse(html, {
        headers: {
            'Content-Type': 'text/html; charset=utf-8',
        },
    });
}
