export default function ErrorPage({
  code,
  description,
  image
}) {
  return (
    <div className="flex flex-col items-center justify-center h-[80vh]">

      <img
        src={image}
        alt="error"
        className="w-72 mb-6"
      />

      <h1 className="text-6xl font-bold text-red-500">
        {code}
      </h1>

      <p className="text-gray-500 mt-3 text-lg">
        {description}
      </p>

    </div>
  );
}