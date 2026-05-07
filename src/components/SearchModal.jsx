export default function SearchModal({isOpen, onClose}) {
  if(!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl w-[400px]">
        <h2 className="text-xl font-bold mb-4">Search Anything 🔍</h2>
        <input
          type="text"
          placeholder="Search project, skill, etc..."
          className="w-full border p-2 rounded-md"
        />
        <button 
          onClick={onClose}
          className="mt-4 bg-hijau text-white px-4 py-2 rounded-lg">
          Close
        </button>
      </div>
    </div>
  );
}