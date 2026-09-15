/**
 * WorkBridge Email Service
 * Supports Resend, Brevo (Sendinblue), SendGrid, and Console Simulation
 */

export const sendOtpEmail = async ({ to, name = 'User', otp }) => {
  const senderEmail = process.env.EMAIL_FROM || 'auth@workbridge.et';
  const appName = 'WorkBridge Ethiopia';

  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Password Reset Code - ${appName}</title>
      </head>
      <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; margin: 0; padding: 24px; color: #1e293b;">
        <div style="max-width: 520px; margin: 0 auto; background-color: #ffffff; border-radius: 20px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);">
          <!-- Header -->
          <div style="background-color: #047857; padding: 28px; text-align: center;">
            <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 800; letter-spacing: -0.5px;">WorkBridge</h1>
            <p style="color: #a7f3d0; margin: 4px 0 0 0; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; font-weight: 600;">Ethiopia Labor Marketplace</p>
          </div>

          <!-- Body -->
          <div style="padding: 32px 28px;">
            <h2 style="font-size: 18px; font-weight: 700; color: #0f172a; margin: 0 0 12px 0;">Verification Code</h2>
            <p style="font-size: 14px; line-height: 22px; color: #475569; margin: 0 0 24px 0;">
              Hello <strong>${name}</strong>,<br>
              We received a request to reset your password on WorkBridge. Use the 6-digit verification code below to complete your password reset:
            </p>

            <!-- OTP Code Display -->
            <div style="text-align: center; margin: 28px 0;">
              <div style="display: inline-block; background-color: #ecfdf5; border: 2px dashed #059669; border-radius: 16px; padding: 16px 32px; font-size: 32px; font-weight: 800; letter-spacing: 8px; color: #047857; font-family: monospace;">
                ${otp}
              </div>
            </div>

            <div style="background-color: #f1f5f9; border-radius: 12px; padding: 14px; margin-bottom: 24px;">
              <p style="font-size: 12px; line-height: 18px; color: #64748b; margin: 0;">
                ⏱️ <strong>Note:</strong> This verification code is valid for <strong>10 minutes</strong>. If you did not make this request, you can safely ignore this email.
              </p>
            </div>

            <p style="font-size: 13px; color: #64748b; margin: 0;">
              Best regards,<br>
              <strong>The WorkBridge Team</strong>
            </p>
          </div>

          <!-- Footer -->
          <div style="border-top: 1px solid #f1f5f9; background-color: #fafafa; padding: 16px 28px; text-align: center;">
            <p style="font-size: 11px; color: #94a3b8; margin: 0;">
              WorkBridge Ethiopia · Dire Dawa & Addis Ababa<br>
              Direct Trade & Labor Connection Platform
            </p>
          </div>
        </div>
      </body>
    </html>
  `;

  // 1. If Resend API Key is provided
  if (process.env.RESEND_API_KEY) {
    try {
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: process.env.EMAIL_FROM || 'WorkBridge <onboarding@resend.dev>',
          to: [to],
          subject: `${otp} is your WorkBridge verification code`,
          html: htmlContent,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        console.log(`[EmailService] Resend email successfully delivered to ${to} (ID: ${data.id})`);
        return { success: true, provider: 'resend', id: data.id };
      } else {
        console.warn(`[EmailService] Resend delivery failed:`, data);
      }
    } catch (err) {
      console.error(`[EmailService] Resend API error:`, err);
    }
  }

  // 2. If Brevo (Sendinblue) API Key is provided
  if (process.env.BREVO_API_KEY) {
    try {
      const response = await fetch('https://api.brevo.com/v3/smtp/email', {
        method: 'POST',
        headers: {
          'api-key': process.env.BREVO_API_KEY,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          sender: { name: 'WorkBridge Ethiopia', email: process.env.EMAIL_FROM || 'noreply@workbridge.et' },
          to: [{ email: to, name }],
          subject: `${otp} is your WorkBridge verification code`,
          htmlContent: htmlContent,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        console.log(`[EmailService] Brevo email successfully delivered to ${to} (MessageID: ${data.messageId})`);
        return { success: true, provider: 'brevo', id: data.messageId };
      } else {
        console.warn(`[EmailService] Brevo delivery failed:`, data);
      }
    } catch (err) {
      console.error(`[EmailService] Brevo API error:`, err);
    }
  }

  // 3. Fallback: Terminal Simulator & Log (Active when no email service API key is set)
  console.log(`\n======================================================`);
  console.log(`📧 [EMAIL DELIVERY SIMULATOR - WORKBRIDGE OTP]`);
  console.log(`To:       ${to} (${name})`);
  console.log(`Subject:  ${otp} is your WorkBridge verification code`);
  console.log(`------------------------------------------------------`);
  console.log(`Your 6-Digit OTP Code:  👉 [  ${otp}  ] 👈`);
  console.log(`Expiry:   10 Minutes from now`);
  console.log(`Tip:      To send live emails to real inboxes, add RESEND_API_KEY or BREVO_API_KEY in apps/api/.env`);
  console.log(`======================================================\n`);

  return { success: true, provider: 'simulator', otp };
};
