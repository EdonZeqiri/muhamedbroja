import { Resend } from "resend";

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

const NOTIFY_EMAIL = process.env.NOTIFY_EMAIL || "admin@muhamedbroja.com";
const FROM_EMAIL = process.env.FROM_EMAIL || "Pyetje <noreply@muhamedbroja.com>";

export async function notifyNewQuestion(name: string, question: string) {
  if (!resend) {
    console.log("[Email] Resend not configured, skipping notification");
    console.log(`[Email] New question from ${name}: ${question}`);
    return;
  }

  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: NOTIFY_EMAIL,
      subject: `Pyetje e re nga ${name}`,
      html: `
        <div style="font-family: -apple-system, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #faf9f6; border-radius: 12px; padding: 24px; margin-bottom: 16px;">
            <p style="color: #c29464; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em; margin: 0 0 8px;">
              Pyetje e re
            </p>
            <p style="color: #1D1D1F; font-size: 16px; line-height: 1.6; margin: 0;">
              ${question.replace(/\n/g, "<br>")}
            </p>
          </div>
          <p style="color: #616162; font-size: 13px; margin: 0;">
            Nga: <strong>${name}</strong>
          </p>
          <hr style="border: none; border-top: 1px solid #e5e5e5; margin: 16px 0;">
          <p style="color: #616162; font-size: 12px; margin: 0;">
            Mund ta pergjigjeni kete pytje ne
            <a href="${process.env.NEXT_PUBLIC_SITE_URL || "https://muhamedbroja.com"}/admin/pyetje" style="color: #c29464;">
              panelin admin
            </a>.
          </p>
        </div>
      `,
    });
  } catch (error) {
    console.error("[Email] Failed to send notification:", error);
  }
}
