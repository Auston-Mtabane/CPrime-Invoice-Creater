import { createClient } from '@supabase/supabase-js'
import dotenv from "dotenv";

dotenv.config(); // load .env variables

const supabaseUrl = 'https://duybqhvtwiofytvzsfbe.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)


let companyDetails = {
    name: "",
    email: "",
    phone: "",
    website: "",
    bankDetails: {
        bankName: "",
        accountNumber: "",
        accountHolder: "",
        phoneNumber: ""
    }
}
export async function fetchCompanyDetails() {
    try {

        let { data, error } = await supabase
            .from('company_details')
            .select("1").select("*");

        console.log(data);
        companyDetails.name = data[0].name;
        companyDetails.email = data[0].email;
        companyDetails.phone = data[0].phone;
        companyDetails.website = data[0].website;
        companyDetails.bankDetails.bankName = data[0].bankname;
        companyDetails.bankDetails.accountNumber = data[0].accountnumber;
        companyDetails.bankDetails.accountHolder = data[0].accountholder;
        companyDetails.bankDetails.phoneNumber = data[0].bankphonenumber;
        return companyDetails;
    } catch (e) {
        console.error(e);
    }
}
export async function updateComanyDetails(companyDetails) {
    try {
        let comp_data = {

            name: companyDetails.name,
            email: companyDetails.email,
            phone: companyDetails.phone,
            website: companyDetails.website,
            bankname: companyDetails.bankDetails.bankName,
            accountnumber: companyDetails.bankDetails.accountNumber,
            accountholder: companyDetails.bankDetails.accountHolder,
            bankphonenumber: companyDetails.bankDetails.phoneNumber
        };

        const { data, error } = await supabase
            .from('company_details')
            .update(comp_data)
            .eq('id', 1)
            .select()

        console.log(data);


    } catch (e) {
        console.error(e);
    }
}

export async function insertInvoice(client, items, invoice) {
    try {
        //insert client 
        let client_id = await upsertClient(client);
        console.log("client_id", client_id);
        //insert invoice
        let invoiceData = await upsertInvoice(invoice, client_id);
        console.log("invoiceData", invoiceData);
        let invoice_id = invoiceData[0].id;
        //insert items
        console.log("in_house items", items);
        let itemsData = await insertItems(items, invoice_id);
        console.log("itemsData", itemsData);

    } catch (e) {
        console.error(e);
    }
}

export async function getNextInvoiceNumber() {
    try {
        let { data, error } = await supabase
            .from("invoices")
            .select("number, issued_at")
            .order('issued_at', { ascending: false })
            .limit(1)
            .single();
        let numstr = data['number'];
       
        let num = parseInt(numstr.split("-")[1]) + 1;
        return `INV-${String(num).padStart(3, '0')}`;
    }
    catch (e) {
        console.error(e);
    }

}
async function upsertClient(client) { //returns client id
    try {
        let client_ = {
            name: client.name,
            email: String(client.email),
            phone: String(client.phone)
        };

        const { data, error } = await supabase
            .from('clients')
            .upsert([client_,], { onConflict: 'email' })
            .select("id")
        console.log(data);
        console.log("error-client", error);
        return data[0].id;

    } catch (e) {
        console.error(e);
    }
}
async function insertItems(items, invoice_id) {
    try {
        let items_ = items.map(item => ({
            invoice_id: invoice_id,
            name: item.name,
            qty: item.quantity,
            amount: item.amount,
            subtotal: item.subtotal
        }));

        const { data, error } = await supabase
            .from('items')
            .insert(items_)
            .select()

        console.log(data);
        console.log("error-item", error);
        return data;

    } catch (e) {
        console.error(e);
    }
}  
async function upsertInvoice(invoice, client_id) {
    try {
        let invoice_ = {
            client_id: client_id,
            type: invoice.type,
            number: invoice.number ,
            amount: invoice.total,
            issued_at: new Date().toISOString()

        }

        const { data, error } = await supabase
            .from('invoices')
            .upsert([invoice_,], { onConflict: 'number' })
            .select("id")
        console.log(data);
        console.log("error-invoice", error);
        return data;

    } catch (e) {
        console.error(e);
    }
}


