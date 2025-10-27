import toast from "react-hot-toast";

export const notifySuccess = (message: string) =>
  toast.success(message, {
    iconTheme: {
      primary: "#34B53A",
      secondary: "#fff",
    },
    style: {
      maxWidth: "fit-content",
      color: "#34B53A",
      border: "1px solid #34B53A",
      width: "fit-content",
      fontSize: "14px",
      padding: "10px",
    },
  });

export const notifyError = (message: string) =>
  toast.error(message, {
    iconTheme: {
      primary: "#FF3A29",
      secondary: "#fff",
    },
    style: {
      maxWidth: "fit-content",
      color: "#FF3A29",
      border: "1px solid #FF3A29",
      width: "fit-content",
      fontSize: "14px",
      padding: "10px",
    },
  });
