import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { Toast, ToastMessage } from "primereact/toast";
import { Message } from "@/lib/models/Message";

interface ToastContextProps {
  addMessage: (message: any) => void;
}

export const ToastContext = createContext<ToastContextProps>({
  addMessage: () => {},
});

export const useToastContext = (): ToastContextProps =>
  useContext(ToastContext);

interface ToastContextProviderProps {
  children: React.ReactNode;
}

export const ToastContextProvider = ({
  children,
}: ToastContextProviderProps): JSX.Element => {
  const toast = useRef<Toast>(null);

  const addMessage = (message: Message, life: number = 3000) => {
    message.life = life;
    toast.current?.show(message as ToastMessage);
  };

  return (
    <ToastContext.Provider value={{ addMessage }}>
      <Toast ref={toast} />
      {children}
    </ToastContext.Provider>
  );
};
