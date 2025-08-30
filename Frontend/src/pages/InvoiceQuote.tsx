import "../styles/App.css";
import InvoiceForm from "../components/InvoiceForm";
import { useState, useEffect } from "react";
import Loader1 from "../components/Loader1";

interface Client {
  name: string;
  email: string;
  phone: string;
}

type Item = {
  index: number;
  name: string;
  quantity: number;
  amount: number;
  subtotal: number;
};

type Invoice = {
  type: "invoice" | "quote";
  number : string;
  total: number;

};  

interface CompanyDetails {
  name: string;
  email: string;
  phone: string;
  website: string;
  bankDetails: {
    bankName: string;
    accountNumber: string;
    accountHolder: string;
    phoneNumber: string;
  };
}

const InvoiceQuote = () => {
  const [client, setClient] = useState<Client>({ name: "", email: "", phone: "" });
  const [items, setItems] = useState<Item[]>([]);
  const [docType, setDocType] = useState<"invoice" | "quote">("invoice");
  const [companyDetails, setCompanyDetails] = useState<CompanyDetails | null>(null);
  const [invoiceNo, setInvoiceNo] = useState<string>("");
  

  useEffect(() => {
    const fetchCompanyDetails = async () => {
      try {
        const response = await fetch("http://localhost:3001/settings/data");
        if (response.ok) {
          const data = await response.json();
          setCompanyDetails(data);
        } else {
          alert("Failed to fetch company details");
        }
      } catch (error) {
        alert("Error fetching company details");
        console.error(error);
      }
    };
    const fetchNextInvoiceNumber = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/next-invoice-number");
        if (response.ok) {
          const data = await response.json();
            setInvoiceNo(data);
        } else {
          alert("Failed to next invoice number");
        }
      } catch (error) {
        alert("Error fetching next invoice number");
        console.error(error);
      }
    };

    fetchNextInvoiceNumber();
    fetchCompanyDetails();
  }, []);

  if (!companyDetails) return <Loader1 />;

  const generateInvoiceHTML = (client: Client, items: Item[], company: CompanyDetails) => `
<html>
  <body style="font-family: Arial, sans-serif; line-height:1.5; font-weight:400; background-color:#242424; color:#ffffff; margin:0; padding:20px;">
    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:800px; margin:0 auto; background-color:#242424; color:#ffffff;">
      <tr>
        <td valign="top" style="padding:20px; width:50%;">
          <h1 style="font-size:24px; margin:0 0 10px 0; color:#ffffff;">${
            docType === "invoice" ? "Invoice" : "Quote"
          } for</h1>
          <p style="margin:4px 0;"><strong>Name:</strong> ${client.name}</p>
          <p style="margin:4px 0;"><strong>Email:</strong> ${client.email}</p>
          <p style="margin:4px 0;"><strong>Phone:</strong> ${client.phone}</p>
        </td>

        <td valign="top" align="right" style="padding:20px; width:50%;">
          <img src="https://i.imgur.com/2BQDkwU.png" style="width:auto; height:auto; display:block; margin-bottom:10px;">
          <p style="margin:4px 0;">${company.name}</p>
          <p style="margin:4px 0;">${company.email}</p>
          <p style="margin:4px 0;">${company.phone}</p>
          <p style="margin:4px 0;">${company.website}</p>
        </td>
      </tr>

      <tr>
        <td colspan="2" style="padding:20px; background-color:#1a1a1a; border-radius:10px;">
          <p style="margin:4px 0;"><strong>Invoice/Quote No#:</strong> ${invoiceNo}</p>
          <p style="margin:4px 0;"><strong>Date:</strong> ${
            new Date().getDate().toString() +
            " " +
            new Date().toLocaleString("default", { month: "short" }).toUpperCase() +
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
                  <td style="padding:10px; border:1px solid #464444; background-color:#252525;">${item.index + 1}</td>
                  <td style="padding:10px; border:1px solid #464444; background-color:#252525;">${item.name}</td>
                  <td style="padding:10px; border:1px solid #464444; background-color:#252525;">${item.quantity}</td>
                  <td style="padding:10px; border:1px solid #464444; background-color:#252525;">R ${item.amount.toFixed(2)}</td>
                  <td style="padding:10px; border:1px solid #464444; background-color:#252525;">R ${item.subtotal.toFixed(2)}</td>
                </tr>`
                )
                .join("")}
              <tr>
                <td colspan="4" align="right" style="padding:10px; border:1px solid #464444; font-weight:bold;">Total:</td>
                <td style="padding:10px; border:1px solid #464444; font-weight:bold;">
                  R ${items.reduce((acc, item) => acc + item.subtotal, 0).toFixed(2)}
                </td>
              </tr>
            </tbody>
          </table>
        </td>
      </tr>

      <tr>
        <td colspan="2" style="padding:20px;">
          <h3>Payment Details:</h3>
          <table style="border-collapse: collapse; width: 100%; max-width: 500px; font-size: .7em;">
            <tr><td ><strong>Bank Name:</strong></td><td>${company.bankDetails.bankName}</td></tr>
            <tr><td ><strong>Account Holder:</strong></td><td>${company.bankDetails.accountHolder}</td></tr>
            <tr><td ><strong>Account Number:</strong></td><td>${company.bankDetails.accountNumber}</td></tr>
            <tr><td ><strong>Phone Number:</strong></td><td>${company.bankDetails.phoneNumber}</td></tr>
          </table>
        </td>
      </tr>

      <tr>
        <td colspan="2" align="center" style="padding:20px;" background-color:#ff7700c3;>
          <p style="margin:4px 0;">Thank you for your business!</p>
          <p style="margin:4px 0;">For any queries, please contact us at 
            <a href="mailto:${company.email}" style="color:#646cff; text-decoration:none;">${company.email}</a>
          </p>
        </td>
      </tr>
    </table>
  </body>
</html>
`;

  const handleSendEmail = async () => {
    if (!client.name || !client.email || !client.phone) {
      alert("Please fill in all client details before sending the email.");
      return;
    }
    

    const htmlString = generateInvoiceHTML(client, items, companyDetails);
    let invoice: Invoice = {
      type: docType,
      number: invoiceNo,
      total: items.reduce((acc, item) => acc + item.subtotal, 0)
    };
    try {
      console.log("Sending email with data:", { client, items, invoice, htmlString });
      const response = await fetch("http://localhost:3001/api/invoice", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ client, items,invoice, html: htmlString }),
        
      });
      if (response.ok) alert("Email sent!");
      else alert("Email sending failed.");
    } catch (e) {
      alert("Error sending email");
      console.error(e);
    }
  };

  return (
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
            srcDoc={generateInvoiceHTML(client, items, companyDetails)}
          />
        </div>

        <button onClick={handleSendEmail}>Send Email</button>
      </div>
    </div>
  );
};

export default InvoiceQuote;
