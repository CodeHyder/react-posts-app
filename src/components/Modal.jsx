import Button from "./Button";

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

          <Button
            onClick={onClose}
            variant="cancel"
            size="fixed"
            className="rounded-[8px]"
          >
            {cancelText}
          </Button>
          {onConfirm && (
            <Button
              onClick={onConfirm}
              variant={confirmColor === "red" ? "danger" : "success"}
              size="fixed"
              className="rounded-[8px]"
            >
              {confirmText}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
