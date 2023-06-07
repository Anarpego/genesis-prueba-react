import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CustomerInfo from './pages/CustomerInfo.tsx';
import './app.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/customerinfo" element={<CustomerInfo />} />
        {/* Add other routes here */}
        {/* <Route path="/otherpage" element={<OtherPage />} /> */}
        {/* If no other route matches, redirect to CustomerInfo page */}
        <Route path="/" element={<CustomerInfo />} />
      </Routes>
    </Router>
  );
}

export default App;
