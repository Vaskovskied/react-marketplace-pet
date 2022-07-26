import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import Header from "./components/Header/Header";
import Cart from "./pages/Cart/Cart";
import Catalog from "./pages/Catalog/Catalog";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import store, { persistor } from "./store";
import "./styles/App.scss";

export const App: React.FC = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter basename="/react-marketplace-pet">
          <div className="App">
            <Header />
            <Routes>
              <Route path="/" element={<Catalog />} />
              <Route path="/:categoryName" element={<Catalog />} />
              <Route path="/product/:productId" element={<ProductDetails />} />
              <Route path="/cart" element={<Cart />} />
            </Routes>
          </div>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
};

export default App;
