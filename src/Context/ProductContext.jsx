import { createContext, useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
axios.defaults.baseURL = "http://127.0.0.1:8000/api/v1/";

const ProductContext = createContext();

const initialForm = {
  barang: "",
  harga: "",
};

export const ProductProvider = ({ children }) => {
  const [formValues, setFormValues] = useState(initialForm);

  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState([]);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const onChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const getProducts = async () => {
    const apiProducts = await axios.get("product");
    setProducts(apiProducts.data.data);
  };

  const getProduct = async (id) => {
    const respoonse = await axios.get("product/" + id);
    const apiProduct = respoonse.data.data;
    setProduct(apiProduct);
    setFormValues({
      barang: apiProduct.barang,
      harga: apiProduct.harga
    })
  }

  const storeProduct = async (e) => {
    e.preventDefault();
    try {
      await axios.post("product", formValues);
      setFormValues(initialForm);
      navigate("/products");
    } catch (e) {
      if (e.response.status === 422) {
        setErrors(e.response.data.errors);
      }
    }
  }

  const updateProduct = async (e) => {
    e.preventDefault();
    try {
      await axios.put("product/" + product.id, formValues);
      setFormValues(initialForm);
      navigate("/products");
    } catch (e) {
      if (e.response.status === 422) {
        setErrors(e.response.data.errors);
      }
    }
  };

  const deleteProduct = async (id) => {
    await axios.delete("product/" + id);
    getProducts();
  }

  return <ProductContext.Provider value={{ product, products, getProducts, getProduct, onChange, formValues, storeProduct, errors, setErrors, updateProduct, deleteProduct }}>{children}</ProductContext.Provider>
}

export default ProductContext;