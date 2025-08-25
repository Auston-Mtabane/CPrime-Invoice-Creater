import "../styles/App.css";
import InvoiceForm from "../components/InvoiceForm";
import { useState } from "react";
import companyDetails from "../data/companyDetails.json";

interface Client {
  fname: string;
  femail: string;
  fphone: string;
}

type Item = {
  index: number;
  name: string;
  quantity: number;
  amount: number;
  subtotal: number;
};

const InvoiceQuote = () => {
  const [client, setClient] = useState({ fname: "", femail: "", fphone: "" });
  const [items, setItems] = useState<Item[]>([]);
  const [docType, setDocType] = useState<"invoice" | "quote">("invoice");

  const companyName = companyDetails.name;
  const companyEmail = companyDetails.email;
  const companyPhone = companyDetails.phone;
  const companyWebsite = companyDetails.website;
  const invoiceNo = "INV-001";

  const generateInvoiceHTML = (client: Client, items: Item[]) => `
<html>
  <body style="font-family: Arial, sans-serif; line-height:1.5; font-weight:400; background-color:#242424; color:#ffffff; margin:0; padding:20px;">
    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:800px; margin:0 auto; background-color:#242424; color:#ffffff;">
      <tr>
        <!-- Client Info -->
        <td valign="top" style="padding:20px; width:50%;">
          <h1 style="font-size:24px; margin:0 0 10px 0; color:#ffffff;">${
            docType == "invoice" ? "Invoice" : "Quote"
          } for</h1>
          <p style="margin:4px 0;"><strong>Name:</strong> ${client.fname}</p>
          <p style="margin:4px 0;"><strong>Email:</strong> ${client.femail}</p>
          <p style="margin:4px 0;"><strong>Phone:</strong> ${client.fphone}</p>
        </td>

        <!-- Company Info -->
        <td valign="top" align="right" style="padding:20px; width:50%;">
          <img src="https://i.imgur.com/2BQDkwU.png" style="width:auto; height:auto; display:block; margin-bottom:10px;">
          <p style="margin:4px 0;">${companyName}</p>
          <p style="margin:4px 0;">${companyEmail}</p>
          <p style="margin:4px 0;">${companyPhone}</p>
          <p style="margin:4px 0;">${companyWebsite}</p>
        </td>
      </tr>

      <!-- Invoice Info -->
      <tr>
        <td colspan="2" style="padding:20px; background-color:#1a1a1a; border-radius:10px;">
          <p style="margin:4px 0;"><strong>Invoice/Quote No#:</strong> ${invoiceNo}</p>
          <p style="margin:4px 0;"><strong>Date:</strong> ${
            new Date().getDate().toString() +
            " " +
            new Date()
              .toLocaleString("default", { month: "short" })
              .toUpperCase() +
            " " +
            new Date().getFullYear()
          }</p>

          <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:15px; border-collapse:collapse;">
            <thead>
              <tr>
                <th style="padding:10px; text-align:left; font-weight:600; background-color:#ff7700c3; border:1px solid #0b0b0b;">Item No#</th>
                <th style="padding:10px; text-align:left; font-weight:600; background-color:#ff7700c3; border:1px solid #0b0b0b;">Item</th>
                <th style="padding:10px; text-align:left; font-weight:600; background-color:#ff7700c3; border:1px solid #0b0b0b;">Qty</th>
                <th style="padding:10px; text-align:left; font-weight:600; background-color:#ff7700c3; border:1px solid #0b0b0b;">Amount</th>
                <th style="padding:10px; text-align:left; font-weight:600; background-color:#ff7700c3; border:1px solid #0b0b0b;">Subtotal</th>
              </tr>
            </thead>
            <tbody>
              ${items
                .map(
                  (item: Item) => `
                <tr>
                  <td style="padding:10px; border:1px solid #464444; background-color:#252525;">${
                    item.index + 1
                  }</td>
                  <td style="padding:10px; border:1px solid #464444; background-color:#252525;">${
                    item.name
                  }</td>
                  <td style="padding:10px; border:1px solid #464444; background-color:#252525;">${
                    item.quantity
                  }</td>
                  <td style="padding:10px; border:1px solid #464444; background-color:#252525;">R ${item.amount.toFixed(
                    2
                  )}</td>
                  <td style="padding:10px; border:1px solid #464444; background-color:#252525;">R ${item.subtotal.toFixed(
                    2
                  )}</td>
                </tr>
              `
                )
                .join("")}
              <tr>
                <td colspan="4" align="right" style="padding:10px; border:1px solid #464444; font-weight:bold;">Total:</td>
                <td style="padding:10px; border:1px solid #464444; font-weight:bold;">
                  R ${items
                    .reduce((acc, item) => acc + item.subtotal, 0)
                    .toFixed(2)}
                </td>
              </tr>
            </tbody>
          </table>
        </td>
      </tr>

      <!-- Payment Info -->
      <tr>
        
        <td colspan="2" style="padding:20px;">
<h3>Payment Details:</h3>
<table style="border-collapse: collapse; width: 100%; max-width: 500px; font-size: .7em;">
  <tr>
    <td style="padding: 6px; "><strong>Bank Name:</strong></td>
    <td style="padding: 6px; ">
      ${companyDetails.bacnkDetails.bankName}
    </td>
  </tr>
  <tr>
    <td style="padding: 6px; "><strong>Account Holder:</strong></td>
    <td style="padding: 6px; ">
      ${companyDetails.bacnkDetails.accountHolder}
    </td>
  </tr>
  <tr>
    <td style="padding: 6px; "><strong>Account Number:</strong></td>
    <td style="padding: 6px; ">
      ${companyDetails.bacnkDetails.accountNumber}
    </td>
  </tr>
  <tr>
    <td style="padding: 6px; "><strong>Phone Number:</strong></td>
    <td style="padding: 6px; ">
      ${companyDetails.bacnkDetails.phoneNumber}
    </td>
  </tr>
</table>

        </td>
      </tr>

      <!-- Footer -->
      <tr>
        <td colspan="2" align="center" style="padding:20px;"  background-color:#1a1a1a;>
          <p style="margin:4px 0;">Thank you for your business!</p>
          <p style="margin:4px 0;">For any queries, please contact us at 
            <a href="mailto:${companyEmail}" style="color:#646cff; text-decoration:none;">${companyEmail}</a>
          </p>
        </td>
      </tr>
    </table>
  </body>
</html>
`;

  // send email function
  const handleSendEmail = async () => {
    if (!client.fname || !client.femail || !client.fphone) {
      alert("Please fill in all client details before sending the email.");
      return;
    }

    console.log(items[items.length - 1]);
    const htmlString = generateInvoiceHTML(client, items);
    try {
      const response = await fetch("http://localhost:3001/api/invoice", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ client, items, html: htmlString }),
      });
      if (response.ok) alert("Email sent!");
      else alert("Email sending failed.");
    } catch (e) {
      alert("Error sending email");
      console.error(e);
    }
  };

  return (
    <>
      <div className="page">
        <div id="container">
          <div id="form-section">
            <InvoiceForm
              client={client}
              setClient={setClient}
              items={items}
              setItems={setItems}
              docType={docType}
              setDocType={setDocType}
            />
          </div>

          <div id="preview-section">
            <iframe
              title="Invoice Preview"
              srcDoc={generateInvoiceHTML(client, items)}
            />
          </div>
          <button onClick={handleSendEmail}>Send Email</button>
        </div>
      </div>
    </>
  );
};

export default InvoiceQuote;
