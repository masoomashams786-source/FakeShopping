import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavigationBar from "./Components/NavigationBar";
import LoadingSpinner from "./Components/LoadingSpinner";
import ConfirmModel from "./Components/ConfirmModel";

import Home from "./Pages/Home";
import ProductList from "./Pages/ProductList";
import ProductDetails from "./Pages/ProductDetails";
import AddProduct from "./Pages/AddProduct";
import EditProduct from "./Pages/EditProduct";

function App() {
  return (
    <BrowserRouter>
      <NavigationBar />
      <div style={{ paddingTop: "120px" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/add-product" element={<AddProduct />} />
          <Route path="/edit-product/:id" element={<EditProduct />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
