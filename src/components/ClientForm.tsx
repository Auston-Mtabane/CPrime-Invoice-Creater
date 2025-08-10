import React from "react";

interface Client {
  fname: string;
  femail: string;
  fphone: string;
}

interface ClientFormProps {
  client: Client;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function ClientForm({ client, onChange }: ClientFormProps) {
  return (
    <div className="rounded-div" id="client-details">
      <label htmlFor="fname">Full Name:</label>
      <input
        type="text"
        name="fname"
        value={client.fname}
        onChange={onChange}
        placeholder="John Doe"
      />

      <label htmlFor="femail">Email:</label>
      <input
        type="email"
        name="femail"
        value={client.femail}
        onChange={onChange}
        placeholder="doejohn3@gmail.com"
      />

      <label htmlFor="fphone">Mobile/Tel:</label>
      <input
        type="tel"
        name="fphone"
        value={client.fphone}
        onChange={onChange}
        placeholder="27 61 961 0499"
      />
    </div>
  );
}
