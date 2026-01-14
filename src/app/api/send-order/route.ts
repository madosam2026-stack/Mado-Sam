import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  try {
    const { customer, items, totalPrice } = await req.json();

    // Generate HTML rows for items
    const rows = items
      .map(
        (item: any) => `
      <tr>
        <td>${item.name}</td>
        <td>${item.quantity} × ${item.unitWeight} gm</td>
        <td>AED ${item.price}</td>
        <td>AED ${item.subtotal}</td>
      </tr>`
      )
      .join("");

    // Nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

await transporter.sendMail({
  // Shows a nicer sender name in inboxes (won’t override “me” if you send to yourself)
  from: `"New Orders" <${process.env.EMAIL_USER}>`,
  to: process.env.EMAIL_USER,

  // Better subject (includes customer name)
  subject: `🛒 New Order — ${customer.firstName} ${customer.lastName}`,

  html: `
  <div style="background:#f6f7fb;padding:24px 0;font-family:Arial,Helvetica,sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
      <tr>
        <td align="center" style="padding:0 16px;">
          <table role="presentation" width="680" cellpadding="0" cellspacing="0" style="border-collapse:collapse;max-width:680px;width:100%;">
            
            <!-- Header -->
            <tr>
              <td style="background:#111827;border-radius:16px 16px 0 0;padding:22px 24px;">
                <div style="display:flex;align-items:center;gap:10px;">
                  <div>
                    <div style="color:#ffffff;font-size:18px;font-weight:700;line-height:1.2;">
                      New Order Received
                    </div>
                    <div style="color:#cbd5e1;font-size:13px;line-height:1.4;">
                      ${new Date().toLocaleString()}
                    </div>
                  </div>
                </div>
              </td>
            </tr>

            <!-- Body -->
            <tr>
              <td style="background:#ffffff;padding:24px;border-left:1px solid #e5e7eb;border-right:1px solid #e5e7eb;">
                
                <!-- Customer Card -->
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
                  <tr>
                    <td style="background:#f9fafb;border:1px solid #e5e7eb;border-radius:14px;padding:16px 16px;">
                      <div style="font-size:14px;font-weight:700;color:#111827;margin-bottom:10px;">Customer</div>
                      <div style="font-size:14px;color:#111827;line-height:1.7;">
                        <div><span style="color:#6b7280;">Name:</span> <strong>${customer.firstName} ${customer.lastName}</strong></div>
                        <div><span style="color:#6b7280;">Phone:</span> ${customer.phone}</div>
                        <div><span style="color:#6b7280;">Address 1:</span> ${customer.address1}</div>
                        ${
                          customer.address2
                            ? `<div><span style="color:#6b7280;">Address 2:</span> ${customer.address2}</div>`
                            : ""
                        }
                        ${
                          customer.message
                            ? `<div style="margin-top:8px;padding-top:8px;border-top:1px dashed #e5e7eb;">
                                 <span style="color:#6b7280;">Message:</span> ${customer.message}
                               </div>`
                            : ""
                        }
                      </div>
                    </td>
                  </tr>
                </table>

                <!-- Spacer -->
                <div style="height:16px;"></div>

                <!-- Items -->
                <div style="font-size:14px;font-weight:700;color:#111827;margin:8px 0 10px;">Items</div>

                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;border:1px solid #e5e7eb;border-radius:14px;overflow:hidden;">
                  <thead>
                    <tr style="background:#f3f4f6;">
                      <th align="left" style="padding:12px 14px;font-size:12px;color:#374151;text-transform:uppercase;letter-spacing:.04em;border-bottom:1px solid #e5e7eb;">
                        Product
                      </th>
                      <th align="left" style="padding:12px 14px;font-size:12px;color:#374151;text-transform:uppercase;letter-spacing:.04em;border-bottom:1px solid #e5e7eb;">
                        Qty × Weight
                      </th>
                      <th align="right" style="padding:12px 14px;font-size:12px;color:#374151;text-transform:uppercase;letter-spacing:.04em;border-bottom:1px solid #e5e7eb;">
                        Price
                      </th>
                      <th align="right" style="padding:12px 14px;font-size:12px;color:#374151;text-transform:uppercase;letter-spacing:.04em;border-bottom:1px solid #e5e7eb;">
                        Subtotal
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    ${items
                      .map(
                        (item: any, idx: number) => `
                          <tr style="background:${idx % 2 === 0 ? "#ffffff" : "#fbfbfd"};">
                            <td style="padding:12px 14px;font-size:14px;color:#111827;border-bottom:1px solid #f1f5f9;">
                              ${item.name}
                            </td>
                            <td style="padding:12px 14px;font-size:14px;color:#111827;border-bottom:1px solid #f1f5f9;">
                              ${item.quantity} × ${item.unitWeight} gm
                            </td>
                            <td align="right" style="padding:12px 14px;font-size:14px;color:#111827;border-bottom:1px solid #f1f5f9;white-space:nowrap;">
                              AED ${item.price}
                            </td>
                            <td align="right" style="padding:12px 14px;font-size:14px;color:#111827;border-bottom:1px solid #f1f5f9;white-space:nowrap;">
                              AED ${item.subtotal}
                            </td>
                          </tr>
                        `
                      )
                      .join("")}
                  </tbody>
                </table>

                <!-- Total -->
                <div style="height:16px;"></div>
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
                  <tr>
                    <td style="background:#111827;border-radius:14px;padding:14px 16px;">
                      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
                        <tr>
                          <td style="color:#cbd5e1;font-size:13px;">Total</td>
                          <td align="right" style="color:#ffffff;font-size:18px;font-weight:800;white-space:nowrap;">
                            AED ${totalPrice}
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>

              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="background:#ffffff;border-radius:0 0 16px 16px;padding:16px 24px;border:1px solid #e5e7eb;border-top:none;">
                <div style="font-size:12px;color:#6b7280;line-height:1.5;">
                  This email was generated automatically from your store checkout.
                </div>
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </div>
  `,
});

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { success: false, message: "Failed to send email" },
      { status: 500 }
    );
  }
}
