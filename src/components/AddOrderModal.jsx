export default function AddOrderModal({
  isOpen,
  onClose
}) {

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

      <div className="bg-white p-6 rounded-xl w-[400px]">

        <h1 className="text-2xl font-bold mb-5">
          Add Order
        </h1>

        <div className="space-y-3">

          <input
            type="text"
            placeholder="Customer Name"
            className="w-full border p-3 rounded"
          />

          <select className="w-full border p-3 rounded">
            <option>Pending</option>
            <option>Completed</option>
            <option>Cancelled</option>
          </select>

          <input
            type="text"
            placeholder="Total Price"
            className="w-full border p-3 rounded"
          />

          <input
            type="date"
            className="w-full border p-3 rounded"
          />

        </div>

        <div className="flex justify-end gap-3 mt-5">

          <button
            onClick={onClose}
            className="px-4 py-2 border rounded"
          >
            Cancel
          </button>

          <button className="bg-green-500 text-white px-4 py-2 rounded">
            Save
          </button>

        </div>

      </div>

    </div>
  );
}