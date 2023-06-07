import { useState } from 'react';
import './customerinfo.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function CustomerInfo() {
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await axios.post('/api/customers', { name, lastName, email });
      if (response.status === 200) {
        navigate("/orderbelt");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Primer Nombre:
        <input type="text" value={name} onChange={e => setName(e.target.value)} />
      </label>
      <label>
        Primer Apellido:
        <input type="text" value={lastName} onChange={e => setLastName(e.target.value)} />
      </label>
      <label>
        Email:
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
      </label>
      <input type="submit" value="Siguiente" />
    </form>
  );
}

export default CustomerInfo;
