import {createContext, useContext, useRef, useState} from "react";

const AlertContext = createContext(undefined);

export const AlertProvider = ({ children }) => {
  const timeoutRef = useRef(null);
  const [state, setState] = useState({
    isOpen: false,
    // Type can be either "success" or "error"
    type: 'success',
    // Message to be displayed, can be any string
    message: '',
  });

  return (
    <AlertContext.Provider
      value={{
        ...state,
        onOpen: (type, message) => {
          if (timeoutRef.current) {
            window.clearTimeout(timeoutRef.current);
          }

          setState({ isOpen: true, type, message });

          timeoutRef.current = window.setTimeout(() => {
            setState({ isOpen: false, type: '', message: '' });
            timeoutRef.current = null;
          }, 2000);
        },
        onClose: () => {
          if (timeoutRef.current) {
            window.clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
          }

          setState({ isOpen: false, type: '', message: '' });
        },
      }}
    >
      {children}
    </AlertContext.Provider>
  );
};

export const useAlertContext = () => useContext(AlertContext);
