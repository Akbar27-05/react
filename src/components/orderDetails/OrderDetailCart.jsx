import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import OrderDetailContext from "../../Context/OrderDetailContext";

const OrderDetailCart = () => {
  const { product, pelanggan } = useContext(OrderDetailContext);
  const navigate = useNavigate();

  const [ count, setCount ] = useState(0);

  const kurang = () => {
    setCount(count - 1);
    if (count <= 1) {
      window.location.reload(false);
    }
  }

  const tambah = () => {
    setCount(count + 1);
  }


  const checkOut = () => {
    let data = {
      idBarang : product.id,
      barang : product.barang,
      idPelanggan : pelanggan.id,
      pelanggan : pelanggan.nama,
      alamat : pelanggan.alamat,
      jumlah : count,
      harga : product.harga * count
    }
    axios.post('http://127.0.0.1:8000/api/v1/orderDetail', data);
    navigate("/");
  }


  useEffect(() => {}, []);

  return (
    <div className="mt-12">
      <div className="relative overflow-x-auto">
        <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
          <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                idBarang
              </th>
              <th scope="col" className="px-6 py-3">
                Barang
              </th>
              <th scope="col" className="px-6 py-3">
                idPelanggan
              </th>
              <th scope="col" className="px-6 py-3">
                Pelanggan
              </th>
              <th scope="col" className="px-6 py-3">
                Alamat
              </th>
              <th scope="col" className="px-6 py-3">
                Jumlah
              </th>
              <th scope="col" className="px-6 py-3">
                Harga
              </th>
              <th scope="col" className="px-6 py-3"></th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b bg-white dark:border-gray-700 dark:bg-gray-800">
              <td className="px-6 py-3">{product.id}</td>
              <td className="px-6 py-3">{product.barang}</td>
              <td className="px-6 py-3">{pelanggan.id}</td>
              <td className="px-6 py-3">{pelanggan.nama}</td>
              <td className="px-6 py-3">{pelanggan.alamat}</td>
              <td className="px-6 py-3">
                <button onClick={kurang}>[-]</button>
                {count}
                <button onClick={tambah}>[+]</button>
              </td>
              <td className="px-6 py-3">{product.harga * count}</td>
              <td className="px-6 py-3">
                <button
                  onClick={checkOut}
                  className="rounded-md bg-red-500 px-4 py-2 text-white hover:bg-red-700"
                >
                  CheckOut
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderDetailCart;
