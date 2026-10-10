import io
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle

def generate_invoice_pdf(order_data: dict) -> bytes:
    """
    Generates an official Wave of Bengal tax invoice PDF in memory using ReportLab.
    """
    buffer = io.BytesIO()
    doc = SimpleDocTemplate(
        buffer,
        pagesize=letter,
        rightMargin=36,
        leftMargin=36,
        topMargin=36,
        bottomMargin=36
    )

    styles = getSampleStyleSheet()
    title_style = ParagraphStyle(
        'Title',
        parent=styles['Heading1'],
        fontName='Helvetica-Bold',
        fontSize=20,
        textColor=colors.HexColor('#09203F'),
        spaceAfter=6
    )
    subtitle_style = ParagraphStyle(
        'Subtitle',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=10,
        textColor=colors.HexColor('#D97706'),
        spaceAfter=12
    )
    meta_style = ParagraphStyle(
        'Meta',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9,
        textColor=colors.HexColor('#334155'),
        leading=14
    )

    story = []

    order_num = order_data.get("orderNumber", "#WOB-ORDER")
    full_name = order_data.get("fullName", "Valued Customer")
    email = order_data.get("email", "customer@example.com")
    address = order_data.get("address", "On file")
    total = order_data.get("total", 0)

    story.append(Paragraph("WAVE OF BENGAL", title_style))
    story.append(Paragraph("ARTISANAL SEAFOOD &bull; TAX INVOICE", subtitle_style))
    story.append(Spacer(1, 10))

    meta_text = f"""
    <b>Invoice No:</b> {order_num}<br/>
    <b>Customer:</b> {full_name}<br/>
    <b>Email:</b> {email}<br/>
    <b>Delivery Address:</b> {address}
    """
    story.append(Paragraph(meta_text, meta_style))
    story.append(Spacer(1, 15))

    # Table
    table_data = [
        ["Item Description", "Qty", "Rate (INR)", "Amount (INR)"],
        ["Premium Wave of Bengal Seafood Pack", "1", f"{total}", f"{total}"],
        ["Cold-Chain Delivery", "-", "0", "FREE"],
        ["GST (Included 5%)", "-", "-", "Included"],
        ["Total Amount", "", "", f"INR {total}"]
    ]

    t = Table(table_data, colWidths=[240, 60, 100, 120])
    t.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor('#09203F')),
        ('TEXTCOLOR', (0, 0), (-1, 0), colors.white),
        ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
        ('FONTSIZE', (0, 0), (-1, 0), 10),
        ('BOTTOMPADDING', (0, 0), (-1, 0), 8),
        ('ALIGN', (1, 0), (-1, -1), 'CENTER'),
        ('ALIGN', (2, 0), (-1, -1), 'RIGHT'),
        ('GRID', (0, 0), (-1, -2), 0.5, colors.HexColor('#E2E8F0')),
        ('FONTNAME', (0, -1), (-1, -1), 'Helvetica-Bold'),
        ('BACKGROUND', (0, -1), (-1, -1), colors.HexColor('#F8FAFC')),
        ('TEXTCOLOR', (0, -1), (-1, -1), colors.HexColor('#09203F')),
    ]))

    story.append(t)
    story.append(Spacer(1, 20))
    story.append(Paragraph("<i>Thank you for choosing Wave of Bengal. Ocean freshness guaranteed.</i>", meta_style))

    doc.build(story)
    pdf_val = buffer.getvalue()
    buffer.close()
    return pdf_val
