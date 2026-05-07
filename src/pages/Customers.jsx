import PageHeader from "../components/PageHeader";
import { useState } from "react";
import AddCustomerModal from "../components/AddCustomerModal";
import customers from "../data/customers";

export default function Customers() {
  const [open, setOpen] = useState(false);

  return (
    <div>

      <PageHeader
        title="Customer List"
        breadcrumb={["Dashboard", "Customers"]}
      >
        <button
          onClick={() => setOpen(true)}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Add New Customer
        </button>
      </PageHeader>
      <div className="bg-white p-4 rounded shadow mt-4">

        <table className="w-full">

          <thead>
            <tr className="border-b">
              <th className="text-left p-2">Customer ID</th>
              <th className="text-left p-2">Name</th>
              <th className="text-left p-2">Email</th>
              <th className="text-left p-2">Phone</th>
              <th className="text-left p-2">Loyalty</th>
            </tr>
          </thead>

          <tbody>
            {customers.map((item) => (
              <tr key={item.customerId} className="border-b">
                <td className="p-2">{item.customerId}</td>
                <td className="p-2">{item.customerName}</td>
                <td className="p-2">{item.email}</td>
                <td className="p-2">{item.phone}</td>
                <td className="p-2">{item.loyalty}</td>
              </tr>
            ))}
          </tbody>

        </table>

      </div>
      <AddCustomerModal
        isOpen={open}
        onClose={() => setOpen(false)}
      />
    </div>
  );
}