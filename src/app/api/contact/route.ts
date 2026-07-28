import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const SENDER_EMAIL = process.env.SENDER_EMAIL || 'chatrapatirajashekar1.618@gmail.com';
    const SENDER_EMAIL_PASSWORD = (process.env.SENDER_EMAIL_PASSWORD || 'ffrxnqpwukuinfcz').replace(/\s+/g, '');
    const CONTACT_RECEIVER_EMAIL = process.env.CONTACT_RECEIVER_EMAIL || SENDER_EMAIL;

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: SENDER_EMAIL,
        pass: SENDER_EMAIL_PASSWORD,
      },
    });

    const body = await request.json();
    const { name, email, company, phone, subject, message } = body;

    const timestamp = new Date().toLocaleString();

    // 1. Email to Business
    const businessHtml = `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Company:</strong> ${company || 'N/A'}</p>
      <p><strong>Phone:</strong> ${phone || 'N/A'}</p>
      <p><strong>Subject:</strong> ${subject || 'N/A'}</p>
      <br/>
      <p><strong>Message:</strong></p>
      <p>${message}</p>
      <br/>
      <p><em>Submitted At: ${timestamp}</em></p>
    `;

    await transporter.sendMail({
      from: `"AIVatika Contact" <${SENDER_EMAIL}>`,
      to: CONTACT_RECEIVER_EMAIL,
      subject: `New Contact Submission: ${subject || name}`,
      html: businessHtml,
    });

    // 2. Auto-Reply to Customer
    const customerHtml = `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <h2>Thanks for contacting us</h2>
          <p>Hello ${name},</p>
          <p>Thank you for reaching out to us. We have successfully received your message.</p>
          <p>Our team will review your enquiry and get back to you as soon as possible.</p>
          <br>
          <p>Best Regards,</p>
          <p><strong>AIVatika Team</strong></p>
      </div>
    `;

    await transporter.sendMail({
      from: `"AIVatika Team" <${SENDER_EMAIL}>`,
      to: email,
      subject: "Thanks for contacting us",
      html: customerHtml,
    });

    return NextResponse.json({
      success: true,
      message: "Thank you for contacting us. We will get back to you soon."
    });
  } catch (error: any) {
    console.error("Error sending email:", error?.message || error);
    return NextResponse.json(
      { error: error?.message || "An error occurred while sending the message." },
      { status: 500 }
    );
  }
}

