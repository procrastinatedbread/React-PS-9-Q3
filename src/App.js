import "./styles.css";
import { NavLink } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import MenuPage from "./pages/MenuPage";
import CartPage from "./pages/CartPage";
import { useContext } from "react";
import { MenuContext } from "./contexts/MenuContext";

export default function App() {
  const { cartItems } = useContext(MenuContext);
  return (
    <div className="App">
      <>
        <nav>
          <NavLink to="/">Home</NavLink>
          <span> </span>
          <NavLink to="/menu">Menu</NavLink>
          <span> </span>
          <NavLink to="/cart">Cart({cartItems.length})</NavLink>
        </nav>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/cart" element={<CartPage />} />
        </Routes>
      </>
    </div>
  );
}
