import React, { useState } from "react";
import Item from "./Item";

type Item = {
  index: number
  name: string;
  quantity: number;
  amount: number;
  subtotal: number;
}

let items: Item[] = [];

function FormSectionInvoice() {


  const [item, setItem] = useState({
    name: "",
    quantity: "",
    amount: "",
  });

  const addItem = () => {
    const newItem: Item = {
      index: items.length,
      name: item.name,
      quantity: Number(item.quantity),
      amount: Number(item.amount),
      subtotal: Number(item.quantity) * Number(item.amount),
    };
    items.push(newItem);
    setItem({ name: "", quantity: "", amount: "" });
    console.log(items);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setItem((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const subtotal = Number(item.quantity) * Number(item.amount);

  return (
    <>
      <p>Client Details</p>
      <form action="/" method="post">
        <div className="rounded-div" id="client-details">
          <label htmlFor="fname">FullName:</label>
          <input type="name" placeholder="John Doe" id="fname" name="fname" />

          <label htmlFor="femail">Email:</label>
          <input
            type="email"
            placeholder="doejohn3@gmail.com"
            id="femail"
            name="femail"
          />
          <br />

          <label htmlFor="fphone">Mobile/Tel:</label>
          <input
            type="tel"
            placeholder="27 61 961 0499"
            id="fphone"
            name="fphone"
          />
        </div>
        <p>Invoice/Quote Items</p>
        <div className="rounded-div">
          <div>
            <div className="row-item">
              <p>Item Name/Description</p>
              <p>Quantity</p>
              <p>Amount (R)</p>
              <p>Sub Total</p>
            </div>

            <div className="added-items">
              {items.map((item) => (
                <Item
                  key={item.index}
                  index={item.index}
                  name={item.name}
                  quantity={item.quantity}
                  amount={item.amount}
                  subtotal={item.subtotal}
                />

              ))}
            </div>
            <br />
            <div className="row-item">
              <input
                type="text"
                placeholder="Item"
                name="name"
                value={item.name}
                onChange={handleChange}
              />
              <input
                type="number"
                placeholder="0"
                name="quantity"
                value={item.quantity}
                onChange={handleChange}
              />
              <input
                type="number"
                placeholder="0.00"
                name="amount"
                value={item.amount}
                onChange={handleChange}
              />
              <input
                type="number"
                placeholder="0.00"
                name="item-subtotal"
                value={subtotal}
                readOnly
              />
            </div>
          </div>
          <button id="add-btn" type="button" onClick={addItem}>+</button>
        </div>

        <br />
        <input type="submit" value="preview" />
      </form>
    </>
  );
}

export default FormSectionInvoice;
