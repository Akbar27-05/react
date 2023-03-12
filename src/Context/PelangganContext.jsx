import { createContext, useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
axios.defaults.baseURL = "http://127.0.0.1:8000/api/v1/";

const PelangganContext = createContext();

const initialForm = {
  nama: "",
  alamat: "",
  telp: "",
};

export const PelangganProvider = ({ children }) => {
  const [formValues, setFormValues] = useState(initialForm);

  const [pelanggans, setPelanggans] = useState([]);
  const [pelanggan, setPelanggan] = useState([]);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const onChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const getPelanggans = async () => {
    const apiPelanggans = await axios.get("pelanggan");
    setPelanggans(apiPelanggans.data.data);
  };

  const getPelanggan = async (id) => {
    const respoonse = await axios.get("pelanggan/" + id);
    const apiPelanggan = respoonse.data.data;
    setPelanggan(apiPelanggan);
    setFormValues({
      nama: apiPelanggan.nama,
      alamat: apiPelanggan.alamat,
      telp: apiPelanggan.telp
    })
  }

  const storePelanggan = async (e) => {
    e.preventDefault();
    try {
      await axios.post("pelanggan", formValues);
      setFormValues(initialForm);
      navigate("/pelanggans");
    } catch (e) {
      if (e.response.status === 422) {
        setErrors(e.response.data.errors);
      }
    }
  }

  const updatePelanggan = async (e) => {
    e.preventDefault();
    try {
      await axios.put("pelanggan/" + pelanggan.id, formValues);
      setFormValues(initialForm);
      navigate("/pelanggans");
    } catch (e) {
      if (e.response.status === 422) {
        setErrors(e.response.data.errors);
      }
    }
  };

  const deletePelanggan = async (id) => {
    await axios.delete("pelanggan/" + id);
    getPelanggans();
  }

  return <PelangganContext.Provider value={{ pelanggan, pelanggans, getPelanggans, getPelanggan, onChange, formValues, storePelanggan, errors, setErrors, updatePelanggan, deletePelanggan }}>{children}</PelangganContext.Provider>
}

export default PelangganContext;