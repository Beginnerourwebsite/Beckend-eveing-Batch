function InvoiceTemplate(custorname,subtotal) {
  let myTemplate = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Order Confirmation</title>
</head>
<body style="margin:0;padding:0;background-color:#F1EFE8;font-family:'Segoe UI',Arial,sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#F1EFE8;padding:40px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

          <!-- HEADER BANNER -->
          <tr>
            <td style="background-color:#185FA5;border-radius:16px 16px 0 0;padding:36px 40px;text-align:center;">
              <p style="margin:0 0 6px;font-size:13px;color:#85B7EB;letter-spacing:3px;text-transform:uppercase;font-weight:600;">Your Store Name</p>
              <h1 style="margin:0;font-size:32px;font-weight:800;color:#ffffff;letter-spacing:-0.5px;">Order Confirmed!</h1>
              <p style="margin:10px 0 0;font-size:15px;color:#B5D4F4;">Thank you for your purchase. We're getting it ready for you.</p>
            </td>
          </tr>

          <!-- ORDER META STRIP -->
          <tr>
            <td style="background-color:#378ADD;padding:14px 40px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="color:#E6F1FB;font-size:13px;">Order <strong style="color:#ffffff;">#ORD-{{orderId}}</strong></td>
                  <td align="right" style="color:#E6F1FB;font-size:13px;">Placed on <strong style="color:#ffffff;">{{orderDate}}</strong></td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- MAIN BODY -->
          <tr>
            <td style="background-color:#ffffff;padding:36px 40px;">

              <!-- Greeting -->
              <p style="margin:0 0 24px;font-size:16px;color:#2C2C2A;">Hi <strong>${custorname}</strong>, your order is confirmed and being processed. Here's a summary:</p>

              <!-- ORDER ITEMS TABLE -->
              <table width="100%" cellpadding="0" cellspacing="0" style="border:1.5px solid #B5D4F4;border-radius:10px;overflow:hidden;margin-bottom:24px;">
                <thead>
                  <tr style="background-color:#E6F1FB;">
                    <th style="padding:12px 16px;text-align:left;font-size:12px;color:#185FA5;text-transform:uppercase;letter-spacing:1px;font-weight:700;">Item</th>
                    <th style="padding:12px 16px;text-align:center;font-size:12px;color:#185FA5;text-transform:uppercase;letter-spacing:1px;font-weight:700;">Qty</th>
                    <th style="padding:12px 16px;text-align:right;font-size:12px;color:#185FA5;text-transform:uppercase;letter-spacing:1px;font-weight:700;">Price</th>
                  </tr>
                </thead>
                <tbody>
                  {{#each items}}
                  <tr style="border-top:1px solid #E6F1FB;">
                    <td style="padding:14px 16px;font-size:14px;color:#2C2C2A;">{{this.name}}</td>
                    <td style="padding:14px 16px;text-align:center;font-size:14px;color:#5F5E5A;">{{this.quantity}}</td>
                    <td style="padding:14px 16px;text-align:right;font-size:14px;font-weight:600;color:#2C2C2A;">₹{{this.price}}</td>
                  </tr>
                  {{/each}}
                </tbody>
              </table>

              <!-- TOTALS BLOCK -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
                <tr>
                  <td style="font-size:13px;color:#888780;padding:4px 0;">Subtotal</td>
                  <td align="right" style="font-size:13px;color:#2C2C2A;padding:4px 0;">₹${subtotal}</td>
                </tr>
                <tr>
                  <td style="font-size:13px;color:#888780;padding:4px 0;">Shipping</td>
                  <td align="right" style="font-size:13px;color:#3B6D11;padding:4px 0;">{{shipping}}</td>
                </tr>
                <tr>
                  <td style="font-size:13px;color:#888780;padding:4px 0;">Tax (GST)</td>
                  <td align="right" style="font-size:13px;color:#2C2C2A;padding:4px 0;">₹{{tax}}</td>
                </tr>
                <tr>
                  <td style="border-top:2px solid #185FA5;padding-top:10px;font-size:17px;font-weight:700;color:#185FA5;">Total</td>
                  <td align="right" style="border-top:2px solid #185FA5;padding-top:10px;font-size:17px;font-weight:800;color:#185FA5;">₹{{totalAmount}}</td>
                </tr>
              </table>

              <!-- SHIPPING + PAYMENT INFO CARDS -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
                <tr>
                  <td width="48%" style="background-color:#EAF3DE;border-radius:10px;padding:16px 18px;vertical-align:top;">
                    <p style="margin:0 0 6px;font-size:11px;font-weight:700;color:#3B6D11;text-transform:uppercase;letter-spacing:1px;">Shipping To</p>
                    <p style="margin:0;font-size:13px;color:#27500A;line-height:1.6;">{{shippingName}}<br/>{{shippingAddress}}<br/>{{shippingCity}}, {{shippingPincode}}</p>
                  </td>
                  <td width="4%"></td>
                  <td width="48%" style="background-color:#FAEEDA;border-radius:10px;padding:16px 18px;vertical-align:top;">
                    <p style="margin:0 0 6px;font-size:11px;font-weight:700;color:#854F0B;text-transform:uppercase;letter-spacing:1px;">Payment</p>
                    <p style="margin:0;font-size:13px;color:#633806;line-height:1.6;">Method: <strong>{{paymentMethod}}</strong><br/>Status: <span style="color:#3B6D11;font-weight:700;">{{paymentStatus}}</span></p>
                  </td>
                </tr>
              </table>

              <!-- CTA BUTTON -->
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center">
                    <a href="{{trackingUrl}}" style="display:inline-block;background-color:#185FA5;color:#ffffff;text-decoration:none;font-size:15px;font-weight:700;padding:14px 36px;border-radius:8px;letter-spacing:0.5px;">Track My Order &rarr;</a>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- FOOTER -->
          <tr>
            <td style="background-color:#0C447C;border-radius:0 0 16px 16px;padding:28px 40px;text-align:center;">
              <p style="margin:0 0 8px;font-size:13px;color:#85B7EB;">Questions? Reply to this email or contact us at <a href="mailto:{{supportEmail}}" style="color:#B5D4F4;text-decoration:none;">{{supportEmail}}</a></p>
              <p style="margin:0;font-size:11px;color:#378ADD;">&copy; {{year}} Your Store Name. All rights reserved.</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>

</body>
</html>`;

  return myTemplate;
}
module.exports = InvoiceTemplate;
