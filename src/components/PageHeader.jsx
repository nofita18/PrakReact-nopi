export default function PageHeader({
  title,
  breadcrumb,
  children
}) {
  return (
    <div className="flex justify-between items-center p-4">

      <div>
        <h1 className="text-2xl font-semibold">
          {title}
        </h1>

        <div className="text-gray-500 text-sm">
          {Array.isArray(breadcrumb)
            ? breadcrumb.join(" / ")
            : breadcrumb}
        </div>
      </div>

      <div>
        {children}
      </div>

    </div>
  );
}