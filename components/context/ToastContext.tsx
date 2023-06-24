import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { Toast } from "primereact/toast";

interface ToastContextProps {
  messages: any[];
  addMessage: (message: any) => void;
}

export const ToastContext = createContext<ToastContextProps>({
  messages: [],
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
  const [messages, setMessages] = useState<any[]>([]);

  const addMessage = (message: any) => {
    setMessages((prevMessages) => [...prevMessages, message]);
  };

  useEffect(() => {
    toast.current?.show(messages);
  }, [messages]);

  return (
    <ToastContext.Provider value={{ messages, addMessage }}>
      <Toast ref={toast} />
      {children}
    </ToastContext.Provider>
  );
};
