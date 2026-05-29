export default function Card({ children, noPadding = false }) {
  return (
    <div className={`bg-white border border-gray-200 rounded-xl shadow overflow-hidden ${noPadding ? "" : "p-6"}`}>
      {children}
    </div>
  );
}
