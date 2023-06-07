import { useState } from 'react';
import './customerinfo.css';

function CustomerInfo() {
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log({ name, lastName, email });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Primer Nombre:
        <input type="text" value={name} onChange={e => setName(e.target.value)} required />
      </label>
      <label>
        Primer Apellido:
        <input type="text" value={lastName} onChange={e => setLastName(e.target.value)} required />
      </label>
      <label>
        Email:
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
      </label>
      <input type="submit" value="Siguiente" />
    </form>
  );
}

export default CustomerInfo;
