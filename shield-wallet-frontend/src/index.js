import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import WalletBuilder from "./pages/WalletBuilder";
import Wallets from "./pages/Wallets";
import "./styles/main.css"

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="create-wallet" element={<WalletBuilder />} />
          <Route path="wallets" element={<Wallets />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.style = { height: '100%' };
root.render(<App />);


