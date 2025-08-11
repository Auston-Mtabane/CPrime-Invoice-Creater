import React from "react";

interface ItemFormProps {
  item: { name: string; quantity: string; amount: string };
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onAdd: () => void;
  subtotal: number;
}

export function ItemForm({ item, onChange, onAdd, subtotal }: ItemFormProps) {
  return (
    <div className="row-item">
      <input
        type="text"
        placeholder="Item"
        name="name"
        value={item.name}
        onChange={onChange}
      />
      <input
        type="number"
        placeholder="0"
        name="quantity"
        value={item.quantity}
        onChange={onChange}
      />
      <input
        type="number"
        placeholder="0.00"
        name="amount"
        value={item.amount}
        onChange={onChange}
      />
      <input
        type="number"
        placeholder="0.00"
        name="item-subtotal"
        value={subtotal}
        readOnly
      />
      <button id="add-btn" type="button" onClick={onAdd}>
        +
      </button>
    </div>
  );
}
