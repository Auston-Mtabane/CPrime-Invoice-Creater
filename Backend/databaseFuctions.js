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
            .select("1").select("*")

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
