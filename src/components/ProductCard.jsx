import Card from "./Card";

export default function ProductCard({ image, title, category, price, description }) {
  return (
    <Card noPadding>
      <img
        src={image}
        alt={title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <span className="inline-block bg-blue-100 text-blue-700 text-xs px-3 py-1 rounded-full mb-2">
          {category}
        </span>
        <h2 className="text-base font-bold mb-1 leading-snug">{title}</h2>
        <p className="text-gray-500 text-sm mb-3 line-clamp-2">{description}</p>
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <h3 className="text-lg font-bold text-blue-600">{price}</h3>
          <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-3 py-1.5 rounded-lg transition">
            Detail
          </button>
        </div>
      </div>
    </Card>
  );
}
