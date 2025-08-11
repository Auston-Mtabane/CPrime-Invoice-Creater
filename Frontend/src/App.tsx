import "./App.css";
import InvoiceForm from "./components/InvoiceForm";
import { useState } from "react";

interface Client {
  fname: string;
  femail: string;
  fphone: string;
}

type Item = {
  index: number; // Optional for initial state
  name: string;
  quantity: number;
  amount: number;
  subtotal: number;
};

function App() {
  const [client, setClient] = useState({ fname: "", femail: "", fphone: "" });
  const [items, setItems] = useState<Item[]>([]); // type as needed

  // Example company and invoice details (replace with your actual data or state as needed)
  const companyName = "C.Prime_";
  const companyEmail = "info@yourcompany.com";
  const companyPhone = "+1234567890";
  const companyWebsite = "www.yourcompany.com";
  const invoiceNo = "INV-001";
  const paymentMethod = "Bank Transfer";
  const paymentStatus = "Pending";

  // This function will generate the HTML preview string (can move it outside App)
  const generateInvoiceHTML = (client: Client, items: Item[]) => `<html>
  <head><style>@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&display=swap');
body {
  font-family:  "Plus Jakarta Sans", sans-serif;
  line-height: 1.5;
  font-weight: 400;

  color-scheme: light dark;
  color: rgba(255, 255, 255, 0.87);
  background-color: #242424;

  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin: 1em;


}

a {
  font-weight: 500;
  color: #646cff;
  text-decoration: inherit;
}
a:hover {
  color: #535bf2;
}

h1 {
  font-size: 3.2em;
  line-height: 1.1;
}

button {
  border-radius: 8px;
  border: 1px solid transparent;
  padding: 0.6em 1.2em;
  font-size: 1em;
  font-weight: 500;
  font-family: inherit;
  background-color: #1a1a1a;
  cursor: pointer;
  transition: border-color 0.25s;
}
button:hover {
  border-color: #646cff;
}
button:focus,
button:focus-visible {
  outline: 4px auto -webkit-focus-ring-color;
}
table, td ,th{
    
    margin: 0; padding: 1em; 
    font-family: "Plus Jakarta Sans", Arial, sans-serif;
    line-height: 1.5;
    border-bottom: 1px solid #464444;
    
  }
  th {
    font-weight: 600;
    text-align: left;
    border-right: 1px solid #0b0b0b;
    background-color: #ff7700c3;
    
  }

table {
    width: 80vw;
    border-collapse: collapse;
    
}

.container {
  font-size: 0.8em;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto auto auto auto;
  grid-template-areas: 
    "clientInfo compInfo"
    "invoiceInfo invoiceInfo"
    "paymentInfo paymentInfo"
    "footer footer";

  background-color: #1a1a1a;

  gap: 5px;
  
}
.clientInfo{grid-area: clientInfo;} 
.compInfo{grid-area: compInfo;
  text-align: right;
}
.invoiceInfo{
  grid-area: invoiceInfo;
background-color: #1a1a1a;
border-radius: 1em;
padding: 3em;
}
.paymentInfo{grid-area: paymentInfo;}
.footer{grid-area: footer;

padding: 2rem;}


@media (prefers-color-scheme: light) {
  :root {
    color: #213547;
    background-color: #ffffff;
  }
  a:hover {
    color: #747bff;
  }
  button {
    background-color: #f9f9f9;
  }
}
  @media (max-width: 600px) {
  table, thead, tbody, th, td, tr {
    display: block;
  }

  thead {
    display: none; /* hide headers on small screens */
  }

  tr {
    margin-bottom: 1em;
    border-bottom: 1px solid #444;
  }

  td {
    padding-left: 50%;
    position: relative;
    text-align: left;
  }

  td::before {
    content: attr(data-label);
    position: absolute;
    left: 1em;
    font-weight: bold;
  }
}
  #item-row {
    background-color: #453838ff;
    border-radius: 1em;}
</style></head>
  <body>
    <div class="container">
      <div class="clientInfo">
        <h1>Invoice for</h1>
        <p><strong>Name:</strong> ${client.fname}</p>
        <p><strong>Email:</strong> ${client.femail}</p>
        <p><strong>Phone:</strong> ${client.fphone}</p>
      </div>

      <div class="compInfo">
        <img src="cplogo.svg" alt style="width: 100px; height: auto;">
        <p>${companyName}</p>
        <p>${companyEmail}</p>
        <p>${companyPhone}</p>
        <p>${companyWebsite}</p>

      </div>
      <div class="invoiceInfo">
        <p><strong>Invoice/Quote No#:</strong> ${invoiceNo}</p>
        <p><strong>Date:</strong> ${new Date().toLocaleDateString()}</p>

        <table>
          <thead><tr><th>Item
                No#</th><th>Item</th><th>Qty</th><th>Amount</th><th>Subtotal</th></tr></thead>
          <tbody>
            ${items
              .map(
                (item: Item) => `
            <tr id="item-row">
              <td data-label="Item No#">${item.index + 1}</td>
              <td data-label="Item">${item.name}</td>
              <td data-label="Qty">${item.quantity}</td>
              <td data-label="Amount">${item.amount.toFixed(2)}</td>
              <td data-label="Subtotal">${item.subtotal.toFixed(2)}</td>
            </tr>`
              )
              .join("")}
                <tr>
              <td colspan="4" style="text-align: right;"></td>
              <td><strong>Total:</strong> <strong>${items
                .reduce((acc, item) => acc + item.subtotal, 0)
                .toFixed(2)}</strong></td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="paymentInfo">
        <p><strong>Payment Method:</strong> ${paymentMethod}</p>
        <p><strong>Payment Status:</strong> ${paymentStatus}</p>
      </div>

      <div class="footer">
        <p>Thank you for your business!</p>
        <p>For any queries, please contact us at <a href="mailto:"></p>

        </div>
      </div>

    </body>
  </html>`;

  // send email function
  const handleSendEmail = async () => {
    if (!client.fname || !client.femail || !client.fphone) {
      alert("Please fill in all client details before sending the email.");
      return;
    }

    console.log(items[-1]);
    const htmlString = generateInvoiceHTML(client, items);
    try {
      const response = await fetch("https://your-python-backend/send-email", {
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
      <div id="container">
        <div id="form-section">
          <InvoiceForm
            client={client}
            setClient={setClient}
            items={items}
            setItems={setItems}
          />
        </div>

        <div id="preview-section">
          <iframe
            title="Invoice Preview"
            srcDoc={generateInvoiceHTML(client, items)}
          />
        </div>
      </div>

      <button onClick={handleSendEmail}>Send Email</button>
    </>
  );
}

export default App;
