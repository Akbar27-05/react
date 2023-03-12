import { createContext, useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
axios.defaults.baseURL = "http://127.0.0.1:8000/api/v1/";

const OrderDetailContext = createContext();

export const OrderDetailProvider = ({ children }) => {
  const [product, setProduct] = useState([]);
  const [pelanggan, setPelanggan] = useState([]);

  const cartProduct = async (id) => {
    const respoonse = await axios.get("product/" + id);
    const apiProduct = respoonse.data.data;
    setProduct(apiProduct);
    console.log(apiProduct)
  }

  const cartPelanggan = async (id) => {
    const respoonse = await axios.get("pelanggan/" + id);
    const apiPelanggan = respoonse.data.data;
    setPelanggan(apiPelanggan);
  }

  return <OrderDetailContext.Provider value={{ product, cartProduct, pelanggan, cartPelanggan }}>{children}</OrderDetailContext.Provider>
}

export default OrderDetailContext;