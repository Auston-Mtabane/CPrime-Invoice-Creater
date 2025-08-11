import './App.css'
import InvoiceForm from './components/InvoiceForm'
import { useState } from 'react'

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
  const [client, setClient] = useState({ fname: '', femail: '', fphone: '' })
  const [items, setItems] = useState<Item[]>([]) // type as needed

  // This function will generate the HTML preview string (can move it outside App)
const generateInvoiceHTML = (client:Client, items:Item[]) => `
    <html>
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
    margin: 3em;
    margin-bottom: 1em;
    
}

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
</style></head>
      <body>
        <h1>Invoice for</h1> 
        <p><strong>Name:</strong> ${client.fname}</p>
        <p><strong>Email:</strong> ${client.femail}</p>
        <p><strong>Phone:</strong> ${client.fphone}</p>
        <table>
          <thead><tr><th>Item No#</th><th>Item</th><th>Qty</th><th>Amount</th><th>Subtotal</th></tr></thead>
          <tbody>
            ${items.map((item:Item) => `
              <tr>
              <td>${item.index+1}</td>
                <td>${item.name}</td>
                <td>${item.quantity}</td>
                <td>${item.amount.toFixed(2)}</td>
                <td>${item.subtotal.toFixed(2)}</td>
              </tr>`).join('')}
          </tbody>
        </table>
      </body>
    </html>`

  // send email function
  const handleSendEmail = async () => {
    const htmlString = generateInvoiceHTML(client, items)
    try {
      const response = await fetch('https://your-python-backend/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ client, items, html: htmlString }),
      })
      if (response.ok) alert('Email sent!')
      else alert('Email sending failed.')
    } catch (e) {
      alert('Error sending email')
      console.error(e)
    }
  }

  return (
    <>
      <div id='container'>
        <div id='form-section'>
          <InvoiceForm
            client={client}
            setClient={setClient}
            items={items}
            setItems={setItems}
          />
        </div>

        <div id='preview-section'>
          <iframe
            title='Invoice Preview'
            srcDoc={generateInvoiceHTML(client, items)}
            style={{ width: '95%', height: '90%',margin: '1em' }}
          />

          
        </div>
      </div>

      <button onClick={handleSendEmail}>Send Email</button>
    </>
  )
}

export default App
