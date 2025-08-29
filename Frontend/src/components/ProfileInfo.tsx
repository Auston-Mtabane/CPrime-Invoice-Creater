import "../styles/App.css";
import { useEffect, useState } from "react";
import Loader1 from "./Loader1";

interface CompanyInfo {
  name: string;
  email: string;
  phone: string;
  website: string;
  bankDetails: {
    bankName: string;
    accountNumber: string;
    accountHolder: string;
    phoneNumber: string;
  };
}

type Mode = "edit" | "save";

interface SettingsPageProps {
  mode: Mode;
}

function isFilled(companyDetails: CompanyInfo) : boolean {
  return (
    companyDetails.name !== "" &&
    companyDetails.email !== "" &&
    companyDetails.phone !== "" &&
    companyDetails.website !== "" &&
    companyDetails.bankDetails.bankName !== "" && 
    companyDetails.bankDetails.accountNumber !== "" &&
    companyDetails.bankDetails.accountHolder !== "" &&
    companyDetails.bankDetails.phoneNumber !== ""
  );
}

function ProfileInfo({ mode }: SettingsPageProps) {
  const isEditable = mode === "save";

  const [companyDetails, setCompanyDetails] = useState<CompanyInfo>({
    name: "",
    email: "",
    phone: "",
    website: "",
    bankDetails: {
      bankName: "",
      accountNumber: "",
      accountHolder: "",
      phoneNumber: "",
    },
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("http://localhost:3001/settings/data");
        if (response.ok) {
          console.log("Settings data fetched");
          const data = await response.json();
          setCompanyDetails(data);
        } else {
          alert("Could not fetch settings data");
        }
      } catch (e) {
        alert("Error fetching settings data");
        console.error(e);
      }
    }

    fetchData();
  }, []);

    

  useEffect(() => {
    if (mode === "edit" && isFilled(companyDetails)) {
      async function saveData() {
        try {
          const response = await fetch("http://localhost:3001/settings/update-data", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(companyDetails),
          });
          if (response.ok) {
            console.log("Settings data saved");
          } else {
            alert("Could not save settings data");
          }
        } catch (e) {
          alert("Error saving settings data");
          console.error(e);
        }
      }

      saveData();
    }
  }, [mode]);

  if(!isFilled(companyDetails)) return <Loader1 />;
  return (
    <>
      <div className="rounded-div2">
        <h2>Company Details</h2>

        <label>Name:</label>
        <input
          type="text"
          value={companyDetails.name}
          onChange={(e) =>
            setCompanyDetails({ ...companyDetails, name: e.target.value })
          }
          readOnly={!isEditable}
        />

        <label>Email:</label>
        <input
          type="text"
          value={companyDetails.email}
          onChange={(e) =>
            setCompanyDetails({ ...companyDetails, email: e.target.value })
          }
          readOnly={!isEditable}
        />

        <label>Phone:</label>
        <input
          type="text"
          value={companyDetails.phone}
          onChange={(e) =>
            setCompanyDetails({ ...companyDetails, phone: e.target.value })
          }
          readOnly={!isEditable}
        />

        <label>Website:</label>
        <input
          type="text"
          value={companyDetails.website}
          onChange={(e) =>
            setCompanyDetails({ ...companyDetails, website: e.target.value })
          }
          readOnly={!isEditable}
        />
      </div>

      <div className="rounded-div2">
        <h2>Bank Details</h2>

        <label>Bank Name:</label>
        <input
          type="text"
          value={companyDetails.bankDetails.bankName}
          onChange={(e) =>
            setCompanyDetails({
              ...companyDetails,
              bankDetails: {
                ...companyDetails.bankDetails,
                bankName: e.target.value,
              },
            })
          }
          readOnly={!isEditable}
        />

        <label>Account Holder:</label>
        <input
          type="text"
          value={companyDetails.bankDetails.accountHolder}
          onChange={(e) =>
            setCompanyDetails({
              ...companyDetails,
              bankDetails: {
                ...companyDetails.bankDetails,
                accountHolder: e.target.value,
              },
            })
          }
          readOnly={!isEditable}
        />

        <label>Account Number:</label>
        <input
          type="text"
          value={companyDetails.bankDetails.accountNumber}
          onChange={(e) =>
            setCompanyDetails({
              ...companyDetails,
              bankDetails: {
                ...companyDetails.bankDetails,
                accountNumber: e.target.value,
              },
            })
          }
          readOnly={!isEditable}
        />

        <label>Phone:</label>
        <input
          type="text"
          value={companyDetails.bankDetails.phoneNumber}
          onChange={(e) =>
            setCompanyDetails({
              ...companyDetails,
              bankDetails: {
                ...companyDetails.bankDetails,
                phoneNumber: e.target.value,
              },
            })
          }
          readOnly={!isEditable}
        />
      </div>
    </>
  );
}

export default ProfileInfo;
