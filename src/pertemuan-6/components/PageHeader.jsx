export default function PageHeader() {
  return (
    <div className="flex justify-between items-center p-4">

      <div>
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <div className="text-gray-500 text-sm">
          Dashboard / Order List
        </div>
      </div>
      
      <button className="bg-hijau text-white px-4 py-2 rounded-lg">
        Add Button
      </button>

    </div>
  );
}