import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { jsPDF } from "jspdf";
import './invoicedetails.css';

interface IInvoice {
  id: number;
  invoice_number: string;
  pricing: string;
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
  const [items, setItems] = useState<IItem[]>([]);
  const [isUpdateVisible, setIsUpdateVisible] = useState(false);
  const [currentInvoice, setCurrentInvoice] = useState<IInvoice | null>(null);
  const [updateForm, setUpdateForm] = useState({
    name: "",
    last_name: "",
    email: "",
  });
  const navigate = useNavigate();

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [invoicesPerPage] = useState(10);

  useEffect(() => {
    getInvoices();
    getItems();
  }, []);

  const getInvoices = async () => {
    const res = await axios.get<IInvoice[]>(
      "http://localhost:3000/api/invoices"
    );
    setInvoices(res.data);
  };

  const getItems = async () => {
    const res = await axios.get<IItem[]>("http://localhost:3000/api/items");
    setItems(res.data);
  };

  const handleUpdate = (invoice: IInvoice) => {
    setUpdateForm({
      name: invoice.name,
      last_name: invoice.last_name,
      email: invoice.email,
    });
    setCurrentInvoice(invoice);
    setIsUpdateVisible(true);

    window.scrollTo(0, 0);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUpdateForm({ ...updateForm, [e.target.name]: e.target.value });
  };

  const handleUpdateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (currentInvoice) {
      try {
        await axios.put(`http://localhost:3000/api/invoices/${currentInvoice.id}`, updateForm);
        setIsUpdateVisible(false);
        getInvoices(); 
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:3000/api/invoices/${id}`);
      getInvoices(); 
      getItems(); 
    } catch (error) {
      console.error(error);
    }
  };

  const downloadPDF = (invoice: IInvoice) => {
    const doc = new jsPDF();

    doc.text(`Número de factura: ${invoice.invoice_number}`, 10, 10);
    doc.text(`Nombre: ${invoice.name}`, 10, 20);
    doc.text(`Apellido: ${invoice.last_name}`, 10, 30);
    doc.text(`Email: ${invoice.email}`, 10, 40);

    let offset = 50;
    items.filter(item => item.invoice_id === invoice.id).forEach((item, index) => {
        doc.text(`Item ${index+1} Producto: Cincho`, 10, offset);
        doc.text(`Color: ${item.color === 1 ? 'Negro' : item.color === 2 ? 'Blanco' : 'Rojo'}`, 10, offset+10);
        doc.text(`Cantidad: ${item.quantity}`, 10, offset+20);
        doc.text(`Precio Unitario: ${item.unit_price}`, 10, offset+30);
        offset += 40;
    });

    doc.text(`Total: ${invoice.pricing}`, 10, offset);

    doc.save(`${invoice.invoice_number}.pdf`);
  };

  const handlePageChange = (increment: number) => {
    setCurrentPage(currentPage + increment);
  }

  const indexOfLastInvoice = currentPage * invoicesPerPage;
  const indexOfFirstInvoice = indexOfLastInvoice - invoicesPerPage;

  const currentInvoices = invoices.slice(indexOfFirstInvoice, indexOfLastInvoice);

  return (
    <div>
      <h2>Facturas</h2>
      {isUpdateVisible && currentInvoice && (
        <div>
          <h2>Actualizar Factura {currentInvoice.invoice_number}</h2>
          <form onSubmit={handleUpdateSubmit}>
            <label>
              Nombre:
              <input
                type="text"
                name="name"
                value={updateForm.name}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Apellido:
              <input
                type="text"
                name="last_name"
                value={updateForm.last_name}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Email:
              <input
                type="email"
                name="email"
                value={updateForm.email}
                onChange={handleInputChange}
              />
            </label>
            <button type="submit">Guardar</button>
          </form>
        </div>
      )}
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
          {currentInvoices.map((invoice) => (
            <tr key={invoice.id}>
              <td>{invoice.id}</td>
              <td>{invoice.invoice_number}</td>
              <td>{invoice.pricing}</td>
              <td>{invoice.name}</td>
              <td>{invoice.last_name}</td>
              <td>{invoice.email}</td>
              <td>
                <button onClick={() => handleUpdate(invoice)}>Actualizar</button>
                <button onClick={() => handleDelete(invoice.id)}>Eliminar</button>
                <button onClick={() => downloadPDF(invoice)}>Descargar (pdf)</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <button 
          disabled={currentPage === 1} 
          onClick={() => handlePageChange(-1)}
        >
          Anterior
        </button>
        <span>Página {currentPage}</span>
        <button 
          disabled={currentPage === Math.ceil(invoices.length / invoicesPerPage)} 
          onClick={() => handlePageChange(1)}
        >
          Siguiente
        </button>
      </div>
      <button onClick={() => navigate('/CustomerInfo')}>HOME</button>
    </div>
  );
};

export default InvoiceDetails;
