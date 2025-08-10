import './App.css'
import InvoiceForm from './components/InvoiceForm'
import { useState } from 'react'

function App() {
  const [client, setClient] = useState({ fname: '', femail: '', fphone: '' })
  const [items, setItems] = useState([]) // type as needed

  // This function will generate the HTML preview string (can move it outside App)
  const generateInvoiceHTML = (client, items) => `
    <html>
      <head><style>/* your CSS here */</style></head>
      <body>
        <h1>Invoice for ${client.fname}</h1>
        <p>Email: ${client.femail}</p>
        <p>Phone: ${client.fphone}</p>
        <table>
          <thead><tr><th>Item No#</th><th>Item</th><th>Qty</th><th>Amount</th><th>Subtotal</th></tr></thead>
          <tbody>
            ${items.map(item => `
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
            style={{ width: '100%', height: '400px', border: '1px solid #ccc' }}
          />

          
        </div>
      </div>

      <button onClick={handleSendEmail}>Send Email</button>
    </>
  )
}

export default App
