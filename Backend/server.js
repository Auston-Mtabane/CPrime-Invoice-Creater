import express from 'express';
import cors from 'cors';
import { sendEmail } from "./emailService.js";

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Express server is running');

});

app.post("/api/invoice", async (req, res) => {
    const { client, items, html } = req.body;
    console.log('Received invoice data:', client, items);
    try {
        await sendEmail(client.femail, "C.Prime_ Invoice/Quote", html);
        res.status(200).json({ message: "Invoice sent successfully" });
    } catch (err) {
        res.status(500).json({ error: "Failed to send invoice email" });
    }
}

);

app.listen(3001, () => {
    console.log('Server is running on port http://localhost:3001 ');
});