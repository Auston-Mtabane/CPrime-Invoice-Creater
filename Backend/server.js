import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/',(req,res)=>{
    res.send('Express server is running');
    
});

app.post("/api/invoice",(req,res)=>{
    const {client, items, htmlStr }= req.body;
    console.log('Received invoice data:', client, items);
    res.status(200).json({message: 'Invoice data received successfully'});
}

);

app.listen(3001,()=>{
    console.log('Server is running on port http://localhost:3001 ');
});