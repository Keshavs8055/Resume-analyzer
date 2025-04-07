// components/ErrorToast.tsx
import toast from "react-hot-toast";

export const showError = (message: string) => {
  toast.error(message, {
    style: {
      border: "1px solid #ef4444",
      padding: "10px",
      color: "#7f1d1d",
    },
    iconTheme: {
      primary: "#ef4444",
      secondary: "#fff",
    },
  });
};
