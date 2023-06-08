import { useState, useEffect } from 'react';

const useCustomerEmail = () => {
  const [email, setEmail] = useState('');

  useEffect(() => {
    const storedEmail = localStorage.getItem('customerEmail');
    if (storedEmail) {
      setEmail(storedEmail);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('customerEmail', email);
  }, [email]);

  return [email, setEmail];
}

export { useCustomerEmail };
