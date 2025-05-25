export function Progress({ value, extraStyles }) {
  return (
    <div className="w-full bg-gray-200 rounded-full h-4">
      <div
        className={`h-4 rounded-full transition-all duration-300 ${extraStyles}`}
        style={{ width: `${value}%` }}
      />
    </div>
  );
}
