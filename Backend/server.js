import express from 'express';
import cors from 'cors';
import { sendEmail } from "./emailService.js";
import { fetchCompanyDetails,getNextInvoiceNumber,insertInvoice,updateComanyDetails } from './databaseFuctions.js';

const app = express();
app.use(cors());
app.use(express.json());

let companyDetails = {
  name: "C.Prime_",
  email: "citymous.prime@gmail.com",
  phone: "+27619610499",
  website: "insta : @C.Prime_",
  bankDetails: {
      bankName: "Capitec",
      accountNumber: "1655863515",
      accountHolder: "AN Mtabane",
      phoneNumber: "0619610499"
    }
}
app.get('/', (req, res) => {
    res.send('Express server is running');

});

app.get('/settings/data', (req, res) => {
    
    fetchCompanyDetails().then(data => {
        if (data) {
            res.json(data);
            console.log('Supabase fetch', data);
        }
    }).catch(err => {
        console.error('Error fetching company details:', err);
    });


});
app.get('/api/next-invoice-number', (req, res) => {    
    getNextInvoiceNumber().then(data => {
        if (data) {
            res.json(data);
            console.log('Supabase fetch', data);
        }
    }).catch(err => {
        console.error('Error fetching company details:', err);
    });
});

app.post("/settings/update-data", async (req, res) => {
    const companyDetails = req.body;
    console.log('Received invoice data:', companyDetails);
    try {
        await updateComanyDetails(companyDetails);
        res.status(200).json({ message: "Data saved..." });
    } catch (err) {
        res.status(500).json({ error: "Failed to save" });
    }
});

app.post("/api/invoice", async (req, res) => {
    const { client, items,invoice, html } = req.body;
    console.log('Received invoice data:', client, items);
    try {
        insertInvoice(client, items,invoice);
        await sendEmail(client.email, `C.Prime_ Invoice/Quote : ${invoice.number}`, html);
        res.status(200).json({ message: "Invoice sent successfully" });
    } catch (err) {
        res.status(500).json({ error: "Failed to send invoice email" });
    }
}

);

app.listen(3001, () => {
    console.log('Server is running on port http://localhost:3001 ');
});