import companyDetails from "../data/companyDetails.json";

function ProfileInfo() {
  return (
    <>
    <div className="rounded-div2">
        <h2>
        Company Details
        </h2>
        <label htmlFor="name">Name:</label>
        <input  type ="text" value={companyDetails.name} readOnly />
        
        <label htmlFor="name">Email:</label>
        <input  type ="text"  value={companyDetails.email} readOnly />

        <label htmlFor="name">Phone:</label>
        <input  type ="text"  value={companyDetails.phone} readOnly />

        <label htmlFor="name">Website:</label>
        <input  type ="text"  value={companyDetails.website} readOnly />
    </div>

    <div className="rounded-div2">
        <h2>
        Bank Details
        </h2>
        <label htmlFor="name">Bank Name:</label>
        <input  type ="text"  value={companyDetails.bacnkDetails.bankName} readOnly />

        <label htmlFor="name">Account Holder:</label>
        <input  type ="text"  value={companyDetails.bacnkDetails.accountHolder} readOnly />

        <label htmlFor="name">Account Number:</label>
        <input  type ="text"  value={companyDetails.bacnkDetails.accountNumber} readOnly />

        <label htmlFor="name">Phone:</label>
        <input  type ="text"  value={companyDetails.bacnkDetails.phoneNumber} readOnly />
    </div>
    

    </>

  );
}

export default ProfileInfo;