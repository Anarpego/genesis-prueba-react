import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CustomerInfo from './pages/CustomerInfo';
import OrderBelt from './pages/OrderBelt';
import InvoiceDetails from './pages/InvoiceDetails';
import './app.css';
import { useState, useEffect } from "react";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/customerinfo" element={<CustomerInfo />} />
        <Route path="/orderbelt" element={<OrderBelt />} />
        <Route path="/invoicedetails" element={<InvoiceDetails />} />
        <Route path="/" element={<CustomerInfo />} />
      </Routes>
    </Router>
  );
}

export default App;
