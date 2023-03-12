import { useContext, useEffect } from "react";
import ProductContext from "../../Context/ProductContext";
import { useParams } from "react-router-dom";

export const ProductEdit = () => {
  const {
    formValues,
    onChange,
    errors,
    setErrors,
    product,
    getProduct,
    updateProduct,
  } = useContext(ProductContext);
  let { id } = useParams();

  useEffect(() => {
    getProduct(id);
    setErrors({});
  }, []);

  return (
    <div className="mt-12">
      <form
        onSubmit={updateProduct}
        className="mx-auto max-w-md rounded-sm bg-white p-4 shadow-md"
      >
        <div className="space-y-6">
          <div className="mb-4">
            <label htmlFor="barang" className="black mb-2 text-sm font-medium">
              Barang
            </label>
            <input
              name="barang"
              value={formValues["barang"]}
              onChange={onChange}
              className="block w-full rounded-md border border-gray-300 p-2 text-sm text-gray-900"
            />
            {errors.barang && (
              <span className="text-sm text-red-400">{errors.barang[0]}</span>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="harga" className="black mb-2 text-sm font-medium">
              Harga
            </label>
            <input
              name="harga"
              value={formValues["harga"]}
              onChange={onChange}
              className="block w-full rounded-md border border-gray-300 p-2 text-sm text-gray-900"
            />
            {errors.harga && (
              <span className="text-sm text-red-400">{errors.harga[0]}</span>
            )}
          </div>
        </div>
        <div className="my-4">
          <button className="rounded-md bg-indigo-500 px-4 py-2 text-white hover:bg-indigo-700">
            Update
          </button>
        </div>
      </form>
    </div>
  );
};