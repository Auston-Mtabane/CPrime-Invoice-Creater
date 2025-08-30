import React from "react";

interface Client {
  name: string;
  email: string;
  phone: string;
}

interface ClientFormProps {
  client: Client;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function ClientForm({ client, onChange }: ClientFormProps) {
  return (
    <div className="rounded-div" id="client-details">
      <p className="title"><strong>Client Details</strong></p>
      <label htmlFor="name">Full Name:</label>
      <input
        type="text"
        name="name"
        value={client.name}
        onChange={onChange}
        placeholder="John Doe"
      />

      <label htmlFor="email">Email:</label>
      <input
        type="email"
        name="email"
        value={client.email}
        onChange={onChange}
        placeholder="doejohn3@gmail.com"
      />

      <label htmlFor="phone">Mobile/Tel:</label>
      <input
        type="tel"
        name="phone"
        value={client.phone}
        onChange={onChange}
        placeholder="27 61 961 0499"
      />
    </div>
  );
}
