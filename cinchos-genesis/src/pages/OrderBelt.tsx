import { useState, useEffect } from 'react';
import './orderbelt.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

function OrderBelt() {
  const [color, setColor] = useState<'black' | 'white' | 'red'>('black');
  const [quantity, setQuantity] = useState(1);
  const location = useLocation();
  const { customerId } = location.state;
  const [showNextButton, setShowNextButton] = useState(false);
  const [price, setPrice] = useState(30);

  useEffect(() => {
    const priceMap: { [color in 'black' | 'white' | 'red']: number } = { black: 30, white: 35, red: 40 };
    setPrice(priceMap[color] * quantity);
  }, [color, quantity]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const orderData = { customerId, color, quantity };
    try {
      const response = await axios.post('http://localhost:3000/api/orders', orderData);
      console.log(response.data);
      setShowNextButton(true);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="orderForm">
      <label>
        Color del cincho:
        <select value={color} onChange={(e) => setColor(e.target.value as 'black' | 'white' | 'red')} className="orderSelect">
          <option value="black">Negro - Q30</option>
          <option value="white">Blanco - Q35</option>
          <option value="red">Rojo - Q40</option>
        </select>
      </label>
      <label>
        Cantidad:
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(+e.target.value)}
          min="1"
          className="orderInput"
        />
      </label>
      <p>Total: Q{price}</p>
      <input type="submit" value="Agregar" className="orderButton" />
      {showNextButton && (
        <Link to="/invoicedetails">
          <button className="nextButton">Siguiente</button>
        </Link>
      )}
    </form>
  );
}

export default OrderBelt;
