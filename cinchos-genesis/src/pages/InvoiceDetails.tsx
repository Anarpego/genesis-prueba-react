import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';
import { jsPDF } from "jspdf";

interface IInvoice {
  id: number;
  invoice_number: string;
  pricing: string;
  name: string;
  last_name: string;
  email: string;
}

interface ICustomer {
  id: number;
  name: string;
  last_name: string;
  email: string;
}

interface IItem {
  id: number;
  invoice_id: number;
  belt_id: number;
  color: number;
  quantity: number;
  unit_price: number;
  total: string;
}

const InvoiceDetails = () => {
  const [invoices, setInvoices] = useState<IInvoice[]>([]);
  const [customers, setCustomers] = useState<ICustomer[]>([]);
  const [items, setItems] = useState<IItem[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    getInvoices();
    getCustomers();
    getItems();
  }, []);

  const getInvoices = async () => {
    const res = await axios.get<IInvoice[]>(
      "http://localhost:3000/api/invoices"
    );
    setInvoices(res.data);
  };

  const getCustomers = async () => {
    const res = await axios.get<ICustomer[]>(
      "http://localhost:3000/api/customers"
    );
    setCustomers(res.data);
  };

  const getItems = async () => {
    const res = await axios.get<IItem[]>("http://localhost:3000/api/items");
    setItems(res.data);
  };

  const handleUpdate = (id: number) => {
    console.log('Update', id);
  }

  const handleDelete = (id: number) => {
    console.log('Delete', id);
  }

  const downloadPDF = (invoice: IInvoice, items: IItem[]) => {
    const doc = new jsPDF();
    
    doc.text(`Número de factura: ${invoice.invoice_number}`, 10, 10);
    doc.text(`Nombre: ${invoice.name}`, 10, 20);
    doc.text(`Apellido: ${invoice.last_name}`, 10, 30);
    doc.text(`Email: ${invoice.email}`, 10, 40);

    let offset = 50;
    items.forEach((item, index) => {
        doc.text(`Item ${index+1} Producto: Cincho`, 10, offset);
        doc.text(`Color: ${item.color === 1 ? 'Negro' : item.color === 2 ? 'Blanco' : 'Rojo'}`, 10, offset+10);
        doc.text(`Cantidad: ${item.quantity}`, 10, offset+20);
        doc.text(`Precio Unitario: ${item.unit_price}`, 10, offset+30);
        offset += 40;
    });
    
    doc.text(`Total: ${invoice.pricing}`, 10, offset);
    
    doc.save(`${invoice.invoice_number}.pdf`);
}
  return (
    <div>
      <h2>Facturas</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Número de Factura</th>
            <th>Total</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Email</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((invoice) => (
            <tr key={invoice.id}>
              <td>{invoice.id}</td>
              <td>{invoice.invoice_number}</td>
              <td>{invoice.pricing}</td>
              <td>{invoice.name}</td>
              <td>{invoice.last_name}</td>
              <td>{invoice.email}</td>
              <td>
                <button onClick={() => handleUpdate(invoice.id)}>Update</button>
                <button onClick={() => handleDelete(invoice.id)}>Delete</button>
                <button onClick={() => downloadPDF(invoice, items.filter(item => item.invoice_id === invoice.id))}>Descargar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={() => navigate('/CustomerInfo')}>Regresar a Home</button>
    </div>
  );
};

export default InvoiceDetails;
