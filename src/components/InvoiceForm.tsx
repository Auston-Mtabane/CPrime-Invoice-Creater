import React from "react";
import { ClientForm } from "./ClientForm";
import { ItemRow } from "./ItemRow";
import { ItemForm } from "./ItemForm";

type Item = {
  name: string;
  quantity: number;
  amount: number;
  subtotal: number;
};

interface InvoiceFormProps {
  client: { fname: string; femail: string; fphone: string };
  setClient: React.Dispatch<
    React.SetStateAction<{ fname: string; femail: string; fphone: string }>
  >;
  items: Item[];
  setItems: React.Dispatch<React.SetStateAction<Item[]>>;
}

export default function InvoiceForm({
  client,
  setClient,
  items,
  setItems,
}: InvoiceFormProps) {
  // We'll need local state for the new item inputs
  const [item, setItem] = React.useState({ name: "", quantity: "", amount: "" });

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
      subtotal: Number(item.quantity) * Number(item.amount),
    };
    setItems([...items, newItem]);
    setItem({ name: "", quantity: "", amount: "" });
  };

  const deleteItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const subtotal = (Number(item.quantity) || 0) * (Number(item.amount) || 0);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        addItem();
      }}
    >
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
    </form>
  );
}
