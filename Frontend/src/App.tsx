import "./styles/App.css";
import SideNavBar from "./components/SideNavBar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import InvoiceQuote from "./pages/InvoiceQuote";
import Email from "./pages/Email";
import Dashboard from "./pages/Deshboard";
import Settings from "./pages/Settings";

function App() {
  return (
    <Router>
      <div id="main">
        <SideNavBar />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/invoice-quote" element={<InvoiceQuote />} />
            <Route path="/email" element={<Email />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
      </div>
    </Router>
  );
}

export default App;
