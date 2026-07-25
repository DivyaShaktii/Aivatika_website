import os
import resend
from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime

# Load environment variables from .env
load_dotenv()

resend.api_key = os.getenv("RESEND_API_KEY")
CONTACT_RECEIVER_EMAIL = os.getenv("CONTACT_RECEIVER_EMAIL")
SENDER_EMAIL = os.getenv("SENDER_EMAIL", "noreply@aivatika.com")

app = FastAPI(
    title="AIVATIKA API",
    description="Backend API for the AIVATIKA Website",
    version="1.0.0"
)

# Configure CORS so the Next.js frontend can communicate with it
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Next.js default port
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ContactForm(BaseModel):
    name: str
    email: EmailStr
    company: Optional[str] = ""
    phone: Optional[str] = ""
    subject: Optional[str] = ""
    message: str

@app.get("/")
def read_root():
    return {"message": "Welcome to the AIVATIKA API"}

@app.get("/health")
def health_check():
    return {"status": "ok"}

@app.post("/api/contact")
def submit_contact(form: ContactForm):
    if not resend.api_key:
        print("ERROR: RESEND_API_KEY is not set.")
        raise HTTPException(status_code=500, detail="Email service is not configured.")

    try:
        timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

        # 1. Email to Business
        business_html = f"""
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> {form.name}</p>
        <p><strong>Email:</strong> {form.email}</p>
        <p><strong>Company:</strong> {form.company or 'N/A'}</p>
        <p><strong>Phone:</strong> {form.phone or 'N/A'}</p>
        <p><strong>Subject:</strong> {form.subject or 'N/A'}</p>
        <br/>
        <p><strong>Message:</strong></p>
        <p>{form.message}</p>
        <br/>
        <p><em>Submitted At: {timestamp}</em></p>
        """
        
        business_params = {
            "from": SENDER_EMAIL,
            "to": [CONTACT_RECEIVER_EMAIL] if CONTACT_RECEIVER_EMAIL else ["test@example.com"],
            "subject": f"New Contact Submission: {form.subject or form.name}",
            "html": business_html,
        }
        resend.Emails.send(business_params)

        # 2. Auto-Reply to Customer
        customer_html = f"""
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
            <h2>Thanks for contacting us</h2>
            <p>Hello {form.name},</p>
            <p>Thank you for reaching out to us. We have successfully received your message.</p>
            <p>Our team will review your enquiry and get back to you as soon as possible.</p>
            <br>
            <p>Best Regards,</p>
            <p><strong>AIVatika Team</strong></p>
        </div>
        """
        
        customer_params = {
            "from": SENDER_EMAIL,
            "to": [form.email],
            "subject": "Thanks for contacting us",
            "html": customer_html,
        }
        resend.Emails.send(customer_params)

        return {
            "success": True,
            "message": "Thank you for contacting us. We will get back to you soon."
        }

    except Exception as e:
        print(f"Error sending email: {e}")
        # Never expose stack traces to the client
        raise HTTPException(status_code=500, detail="An error occurred while sending the message.")
