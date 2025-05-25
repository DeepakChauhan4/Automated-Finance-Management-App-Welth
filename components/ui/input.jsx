import React from "react";

export const Input = React.forwardRef(function Input(
  { type, value, onChange, className, placeholder, autoFocus, disabled, ...rest },
  ref
) {
  return (
    <input
      ref={ref}
      type={type}
      {...(value !== undefined ? { value } : {})}
      {...(onChange !== undefined ? { onChange } : {})}
      className={`border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 ${className || ""}`}
      placeholder={placeholder}
      autoFocus={autoFocus}
      disabled={disabled}
      {...rest}
    />
  );
});
