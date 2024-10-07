import { createContext, useContext, useState, ReactNode } from "react";
import Snackbar from "~/components/Snackbar";
import SnackbarTypes from "~/constants/snackbarTypes";

interface SnackbarContextType {
  showSnackbar: (message: string, type: SnackbarTypes) => void;
}

const SnackbarContext = createContext<SnackbarContextType | undefined>(
  undefined
);

export const useSnackbar = (): SnackbarContextType => {
  const context = useContext(SnackbarContext) as SnackbarContextType;
  return context;
};

export const SnackbarProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [snackbar, setSnackbar] = useState<{
    isVisible: boolean;
    message: string;
    type: SnackbarTypes;
  }>({
    isVisible: false,
    message: "",
    type: SnackbarTypes.SUCCESS,
  });

  const showSnackbar = (message: string, type: SnackbarTypes) => {
    setSnackbar({ isVisible: true, message, type });

    setTimeout(() => {
      setSnackbar((prev) => ({ ...prev, isVisible: false }));
    }, 3000);
  };

  return (
    <SnackbarContext.Provider value={{ showSnackbar }}>
      {children}
      <Snackbar
        isVisible={snackbar.isVisible}
        message={snackbar.message}
        type={snackbar.type}
      />
    </SnackbarContext.Provider>
  );
};
