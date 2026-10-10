from fastapi import APIRouter, Response
from pydantic import BaseModel
from typing import Optional, List
from services.pdf_service import generate_invoice_pdf
from services.email_service import send_order_email

router = APIRouter(prefix="/api", tags=["Orders"])

class OrderItem(BaseModel):
    name: Optional[str] = "Fresh Seafood"
    quantity: Optional[int] = 1
    price: Optional[float] = 0.0

class OrderRequest(BaseModel):
    orderNumber: Optional[str] = None
    email: str
    fullName: Optional[str] = "Valued Customer"
    phone: Optional[str] = ""
    address: Optional[str] = ""
    total: float
    items: Optional[List[OrderItem]] = []

@router.post("/place-order")
def place_order(order: OrderRequest):
    order_data = order.dict()
    if not order_data.get("orderNumber"):
        import random
        order_data["orderNumber"] = f"#WOB{random.randint(1000000, 9999999)}"

    # Generate invoice PDF
    pdf_bytes = generate_invoice_pdf(order_data)

    # Dispatch email
    email_result = send_order_email(order.email, order_data, pdf_bytes)

    return {
        "success": True,
        "orderId": order_data["orderNumber"],
        "emailSent": email_result.get("emailSent", True),
        "isSimulated": email_result.get("isSimulated", True),
        "message": "Order successfully confirmed and invoice receipt generated."
    }

@router.get("/orders/{order_id}/pdf")
def get_order_invoice_pdf(order_id: str):
    mock_order = {
        "orderNumber": order_id,
        "fullName": "Valued Customer",
        "email": "customer@waveofbengal.com",
        "address": "Express Delivery Address",
        "total": 2450
    }
    pdf_bytes = generate_invoice_pdf(mock_order)
    return Response(
        content=pdf_bytes,
        media_type="application/pdf",
        headers={"Content-Disposition": f'attachment; filename="Invoice_{order_id}.pdf"'}
    )
