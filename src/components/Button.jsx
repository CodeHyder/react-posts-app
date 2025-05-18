import clsx from "clsx";

export default function Button({
  children,
  onClick,
  variant = "primary",
  size = "md",
  disabled = false,
  className = "",
  type = "button",
  icon = null,
  fullWidth = false,
  ...rest
}) {
  const baseStyles =
    "inline-flex items-center justify-center rounded font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer";

  const variantStyles = {
    primary: "bg-[#7695EC] hover:bg-[#5b77c5] text-white focus:ring-[#7695EC]",
    danger: "bg-[#FF5151] hover:bg-red-600 text-white focus:ring-red-500",
    success: "bg-[#47B960] hover:bg-green-600 text-white focus:ring-green-600",
    gray: "bg-gray-400 text-white cursor-not-allowed",
    cancel: "bg-white border border-gray-500 rounded text-gray-700 hover:bg-gray-100",
  };

  const sizeStyles = {
    sm: "px-3 py-1 text-sm h-8",
    md: "px-4 py-2 text-base h-[32px]",
    lg: "px-6 py-3 text-lg h-12",
    fixed: "w-[120px] h-[32px] text-sm"
  };

  const composedClass = clsx(
    baseStyles,
    variantStyles[variant],
    sizeStyles[size],
    fullWidth && "w-full",
    className
  );

  return (
    <button
      type={type}
      onClick={onClick}
      className={composedClass}
      disabled={disabled}
      aria-disabled={disabled}
      {...rest}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </button>
  );
}
 