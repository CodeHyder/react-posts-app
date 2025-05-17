export default function Modal({
  isOpen,
  title,
  onClose,
  onConfirm,
  confirmText = "Confirm",
  cancelText = "Cancel",
  confirmColor = "",
  children,
}) {
  if (!isOpen) return null;

  const confirmBtnStyle =
    confirmColor === "red"
      ? "bg-red-500 hover:bg-red-600"
      : "bg-[#47B960] hover:bg-green-600";

  return (
    <div className="fixed inset-0 bg-[rgba(119,119,119,0.80)] flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-[660px]">
        {title && <h2 className="text-lg font-bold mb-4">{title}</h2>}

        {children}

        <div className="flex justify-end gap-4 mt-4">
          <button
            onClick={onClose}
            className="flex items-center justify-center px-4 py-2 bg-white border border-gray-500 rounded text-gray-700 hover:bg-gray-100 cursor-pointer w-[120px] h-[32px]"
          >
            {cancelText}
          </button>
          {onConfirm && (
            <button
              onClick={onConfirm}
              className={`flex items-center justify-center px-4 py-2 text-white rounded cursor-pointer w-[120px] h-[32px] ${confirmBtnStyle}`}
            >
              {confirmText}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
