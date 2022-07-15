import { createContext, useCallback, useContext, useRef } from "react";
import { AlertContainer, AlertInfo } from "./AlertContainer";

const AlertContext = createContext<{
  showAlert: (alertInfo: AlertInfo) => void;
} | null>(null);

type AlertProviderProps = {
  children: React.ReactNode;
};

const AlertProvider = ({ children }: AlertProviderProps) => {
  const alertCallbackRef = useRef<(alertInfo: AlertInfo) => void>();

  const showAlert = useCallback((alertInfo: AlertInfo) => {
    alertCallbackRef.current?.(alertInfo);
  }, []);

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {children}
      <AlertContainer alertCallbackRef={alertCallbackRef} />
    </AlertContext.Provider>
  );
};

const useAlert = () => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error("useAlert can only be used inside AlertProvider");
  }
  return context;
};

export { AlertProvider, useAlert };
