import { useState } from "react";
import companyDetails from "../data/companyDetails.json";


type Mode = "edit" | "save";
interface SettingsPageProps {
  mode : Mode,
};

function ProfileInfo( {mode} : SettingsPageProps) {
  var IsEditable = mode === "save";
  const [name,setName] = useState(companyDetails.name);
  const [phone,setPhone] = useState(companyDetails.phone);
  const [email,setEmail] = useState(companyDetails.email);
  const [website,setWebsite] = useState(companyDetails.website);

  const [bankName,setBankName] = useState(companyDetails.bacnkDetails.bankName);
  const [accountHolder,setAccountHolder] = useState(companyDetails.bacnkDetails.accountHolder);
  const [accountNumber,setAccountNumber] = useState(companyDetails.bacnkDetails.accountNumber);
  const [bankPhoneNumber,setPhoneNumber] = useState(companyDetails.bacnkDetails.phoneNumber);

  

  return (
    <>
    <div className="rounded-div2">
        <h2>
        Company Details
        </h2>
        <label htmlFor="name">Name:</label>
        {/* change readOnly to nothing if mode == 'save' */}
        <input  type ="text" value={name} onChange={(e)=>setName(e.target.value)} readOnly={!IsEditable} />  
        
        <label htmlFor="name">Email:</label>
        <input  type ="text"  value={email} onChange={(e)=>setEmail(e.target.value)} readOnly={!IsEditable} />

        <label htmlFor="name">Phone:</label>
        <input  type ="text"  value={phone} onChange={(e)=>setPhone(e.target.value)} readOnly={!IsEditable} />

        <label htmlFor="name">Website: </label>
        <input  type ="text"  value={website} onChange={(e)=>setWebsite(e.target.value)} readOnly={!IsEditable} />
    </div>

    <div className="rounded-div2">
        <h2>
        Bank Details
        </h2>
        <label htmlFor="name">Bank Name:</label>
        <input  type ="text"  value={bankName} onChange={(e)=>setBankName(e.target.value)} readOnly={!IsEditable} />

        <label htmlFor="name">Account Holder:</label>
        <input  type ="text"  value={accountHolder} onChange={(e)=>setAccountHolder(e.target.value)} readOnly={!IsEditable} />

        <label htmlFor="name">Account Number:</label>
        <input  type ="text"  value={accountNumber} onChange={(e)=>setAccountNumber(e.target.value)} readOnly={!IsEditable} />

        <label htmlFor="name">Phone:</label>
        <input  type ="text"  value={bankPhoneNumber} onChange={(e)=>setPhoneNumber(e.target.value)} readOnly={!IsEditable} />
    </div>
    

    </>

  );
}

export default ProfileInfo;