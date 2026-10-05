function ConfirmModal({
  isOpen,
  title = "Delete this item?",
  message = "This action cannot be undone.",
  onCancel,
  onConfirm,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 text-center">

        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-100">
          <span className="text-2xl">⚠️</span>
        </div>

        <h2 className="text-xl font-bold text-gray-800">
          {title}
        </h2>

        <p className="text-gray-500 mt-2">
          {message}
        </p>

        <div className="flex justify-center gap-3 mt-6">
          <button
            onClick={onCancel}
            className="px-5 py-2.5 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="px-5 py-2.5 rounded-lg bg-red-600 text-white hover:bg-red-700"
          >
            Delete
          </button>
        </div>

      </div>
    </div>
  );
}

export default ConfirmModal;