import axios from "axios";
import { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import PelangganContext from "../../Context/PelangganContext";
import OrderDetailContext from "../../Context/OrderDetailContext";

const PelangganIndex = () => {
  const { pelanggans, getPelanggans, getPelanggan, deletePelanggan } = useContext(PelangganContext);
  const { cartPelanggan } = useContext(OrderDetailContext);
  
  useEffect(() => {
    getPelanggans();
  }, []);
  return (
    <div className="mt-12">
      <div className="m-2 flex justify-end p-2">  
        <Link
          to="/pelanggans/create"
          className="rounded-md bg-indigo-500 px-4 py-2 text-white hover:bg-indigo-700"
        >
          New pelanggan
        </Link>
      </div>
      <div className="relative overflow-x-auto">
        <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
          <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Nama
              </th>
              <th scope="col" className="px-6 py-3">
                Alamat
              </th>
              <th scope="col" className="px-6 py-3">
                Telp
              </th>
              <th scope="col" className="px-6 py-3"></th>
              <th>
                Cart
              </th>
            </tr>
          </thead>
          <tbody>
            {pelanggans.map((pelanggan) => {
              return (
                <tr
                  key={pelanggan.id}
                  className="border-b bg-white dark:border-gray-700 dark:bg-gray-800"
                >
                  <td className="px-6 py-4">{pelanggan.nama}</td>
                  <td className="px-6 py-4">{pelanggan.alamat}</td>
                  <td className="px-6 py-4">{pelanggan.telp}</td>
                  <td className="space-x-2 px-6 py-4">
                    <Link
                      to={`/pelanggans/${pelanggan.id}/edit`}
                      className="rounded-md bg-green-500 px-4 py-2 text-white hover:bg-green-700"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => deletePelanggan(pelanggan.id)}
                      className="rounded-md bg-red-500 px-4 py-2 text-white hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </td>
                  <td className="px-6 py-4">
                  <button
                      onClick={() => cartPelanggan(pelanggan.id)}
                      className="rounded-md bg-red-500 px-4 py-2 text-white hover:bg-red-700"
                    >
                      Cart
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default PelangganIndex;
