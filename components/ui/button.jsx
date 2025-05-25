export function Button({ children, variant, size, onClick, disabled, className }) {
  const baseClass = "inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2";
  const variantClass = variant === "ghost" ? "bg-transparent hover:bg-gray-100" : "bg-blue-500 text-white hover:bg-blue-600";
  const sizeClass = size === "icon" ? "p-1" : "px-4 py-2";

  return (
    <button
      className={`${baseClass} ${variantClass} ${sizeClass} ${className || ""}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
