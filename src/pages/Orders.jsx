import PageHeader from "../components/PageHeader";
import { useState } from "react";
import AddOrderModal from "../components/AddOrderModal";
import orders from "../data/orders";

export default function Orders() {
  const [open, setOpen] = useState(false);

  return (
    <div>

      <PageHeader
        title="Order List"
        breadcrumb={["Dashboard", "Orders"]}
      >
        <button
          onClick={() => setOpen(true)}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Add New Order
        </button>
      </PageHeader>

      <div className="bg-white p-4 rounded shadow mt-4">

        <table className="w-full overflow-hidden rounded-xl">

          <thead className="bg-gray-100">
            <tr className="border-b hover:bg-gray-50">
              <th className="text-left p-2">Order ID</th>
              <th className="text-left p-2">Customer</th>
              <th className="text-left p-2">Status</th>
              <th className="text-left p-2">Total Price</th>
              <th className="text-left p-2">Order Date</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((item) => (
              <tr key={item.orderId} className="border-b">
                <td className="p-2">{item.orderId}</td>
                <td className="p-2">{item.customerName}</td>
                <td className="p-2">{item.status}</td>
                <td className="p-2">{item.totalPrice}</td>
                <td className="p-2">{item.orderDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <AddOrderModal
        isOpen={open}
        onClose={() => setOpen(false)}
      />
    </div>
  );
}