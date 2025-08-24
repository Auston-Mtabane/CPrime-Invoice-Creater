type Props = {
  docType: "invoice" | "quote";
  setDocType: (value: "invoice" | "quote") => void;
};

const DocumentTypeInput = ({ docType, setDocType }: Props) => {
  return (
    <div>
      <label htmlFor="docType">Document Type: </label>
      <select
        id="docType"
        value={docType}
        onChange={(e) => setDocType(e.target.value as "invoice" | "quote")}
      >
        <option value="invoice">Invoice</option>
        <option value="quote">Quote</option>
      </select>
    </div>
  );
};

export default DocumentTypeInput;
