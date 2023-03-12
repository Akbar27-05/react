import { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import ProductContext from "../../Context/ProductContext";
import OrderDetailContext from "../../Context/OrderDetailContext";

export const ProductIndex = () => {
  const { products, getProducts, deleteProduct } = useContext(ProductContext);
  const { cartProduct } = useContext(OrderDetailContext);

  useEffect(() => {
    getProducts();
  }, []);
  return (
    <div className="mt-12">
      <div className="m-2 flex justify-end p-2">  
        <Link
          to="/products/create"
          className="rounded-md bg-indigo-500 px-4 py-2 text-white hover:bg-indigo-700"
        >
          New product
        </Link>
      </div>
      <div className="relative overflow-x-auto">
        <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
          <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Barang
              </th>
              <th scope="col" className="px-6 py-3">
                Harga
              </th>
              <th scope="col" className="px-6 py-3"></th>
              <th scope="col" className="px-6 py-3">
                Keranjang
              </th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => {
              return (
                <tr
                  key={product.id}
                  className="border-b bg-white dark:border-gray-700 dark:bg-gray-800"
                >
                  <td className="px-6 py-4">{product.barang}</td>
                  <td className="px-6 py-4">{product.harga}</td>
                  <td className="space-x-2 px-6 py-4">
                    <Link
                      to={`/products/${product.id}/edit`}
                      className="rounded-md bg-yellow-500 px-4 py-2 text-white hover:bg-yellow-700"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => deleteProduct(product.id)}
                      className="rounded-md bg-red-500 px-4 py-2 text-white hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => cartProduct(product.id)}
                      className="rounded-md bg-green-500 px-4 py-2 text-white hover:bg-green-700"
                    >
                      Beli
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
};