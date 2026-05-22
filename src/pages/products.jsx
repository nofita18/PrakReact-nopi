import { Link } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import products from "../data/products.json";

export default function Products() {
  return (
    <div>
      <PageHeader title="Product" breadcrumb={["Dashboard", "Products"]}>
        <button className="rounded bg-green-500 px-4 py-2 text-white">
          Add New Product
        </button>
      </PageHeader>

      <h1 className="mb-4 text-xl font-bold">Ini adalah halaman produk</h1>

      <div className="mt-4 overflow-hidden rounded-2xl bg-white shadow-lg">
        <table className="w-full border-collapse">
          {/* Header */}
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-bold">ID</th>

              <th className="px-6 py-4 text-left text-sm font-bold">Title</th>

              <th className="px-6 py-4 text-left text-sm font-bold">
                Category
              </th>

              <th className="px-6 py-4 text-left text-sm font-bold">Brand</th>

              <th className="px-6 py-4 text-left text-sm font-bold">Price</th>

              <th className="px-6 py-4 text-left text-sm font-bold">Stock</th>
            </tr>
          </thead>

          {/* Body */}
          <tbody>
            {products.map((item) => (
              <tr key={item.id} className="border-b hover:bg-gray-50">
                <td className="px-6 py-4">{item.id}</td>

                <td className="px-6 py-4">
                  <Link
                    to={`/products/${item.id}`}
                    className="text-emerald-400 hover:text-emerald-500"
                  >
                    {item.tittle}
                  </Link>
                </td>

                <td className="px-6 py-4">{item.category}</td>

                <td className="px-6 py-4">{item.brand}</td>

                <td className="px-6 py-4">
                  Rp {item.price.toLocaleString("id-ID")}
                </td>

                <td className="px-6 py-4">{item.stock}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
