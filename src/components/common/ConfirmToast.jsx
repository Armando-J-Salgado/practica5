import toast from "react-hot-toast";

export default function ConfirmToast({ title, description, onConfirm, onCancel, theme = "light", showCancel = true }) {
  const isDark = theme === "dark";

  const bg = isDark ? "bg-gray-800" : "bg-white";
  const text = isDark ? "text-gray-100" : "text-gray-900";
  const border = isDark ? "border-gray-700" : "border-gray-200";
  const subText = isDark ? "text-gray-300" : "text-gray-600";

  toast.custom(
    (t) => {
      const close = () => toast.remove(t.id);

      return (
        <div
          className={`w-80 ${bg} ${text} ${border} border rounded-xl shadow-xl p-4`}
        >
          <h3 className="font-semibold text-lg">{title}</h3>

          <p className={`mt-2 text-sm ${subText}`}>{description}</p>

          <div className="mt-4 flex justify-end gap-3">
            {(showCancel) && <button
              onClick={() => {
                onCancel?.();
                close();
              }}
              className={`px-3 py-1.5 rounded-md text-sm border ${
                isDark
                  ? "bg-gray-700 border-gray-600 text-gray-200 hover:bg-gray-600"
                  : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
              }`}
            >
              Cancelar
            </button>}

            <button
              onClick={() => {
                onConfirm?.();
                close();
              }}
              className="px-3 py-1.5 rounded-md text-sm bg-blue-600 text-white hover:bg-blue-700 rounded-md"
            >
              Confirmar
            </button>
          </div>
        </div>
      );
    },
    { duration: Infinity, position: "top-right" }
  );
}