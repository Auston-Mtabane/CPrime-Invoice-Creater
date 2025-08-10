import React, { useState } from "react";
import { ClientForm } from "./ClientForm";
import { ItemRow } from "./ItemRow";
import { ItemForm } from "./ItemForm";

type Item = {
  name: string;
  quantity: number;
  amount: number;
  subtotal: number;
};

export default function InvoiceForm() {
  const [client, setClient] = useState({ fname: "", femail: "", fphone: "" });
  const [item, setItem] = useState({ name: "", quantity: "", amount: "" });
  const [items, setItems] = useState<Item[]>([]);

  const handleClientChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setClient((prev) => ({ ...prev, [name]: value }));
  };

  const handleItemChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setItem((prev) => ({ ...prev, [name]: value }));
  };

  const addItem = () => {
    if (!item.name || !item.quantity || !item.amount) return;
    const newItem: Item = {
      name: item.name,
      quantity: Number(item.quantity),
      amount: Number(item.amount),
      subtotal: (Number(item.quantity) || 0) * (Number(item.amount) || 0),
    };
    setItems([...items, newItem]);
    setItem({ name: "", quantity: "", amount: "" });
  };

  const deleteItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const subtotal = (Number(item.quantity) || 0) * (Number(item.amount) || 0);

  const handlePreview = (e: React.FormEvent) => {
    e.preventDefault();
    const invoiceData = { client, items };
    const jsonString = JSON.stringify(invoiceData, null, 2);
    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "invoice.json";
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <form onSubmit={handlePreview}>
      <p>Client Details</p>
      <ClientForm client={client} onChange={handleClientChange} />

      <p>Invoice/Quote Items</p>
      <div className="rounded-div" id="invoice-items">
        <div className="row-item">
          <p>Item Name/Description</p>
          <p>Quantity</p>
          <p>Amount (R)</p>
          <p>Sub Total</p>
        </div>

        {items.map((it, idx) => (
          <ItemRow
            key={idx}
            index={idx}
            name={it.name}
            quantity={it.quantity}
            amount={it.amount}
            subtotal={it.subtotal}
            onDelete={deleteItem}
          />
        ))}

        <br />
        <ItemForm
          item={item}
          onChange={handleItemChange}
          onAdd={addItem}
          subtotal={subtotal}
        />
      </div>

      <br />
      <button type="submit">Preview</button>
    </form>
  );
}
