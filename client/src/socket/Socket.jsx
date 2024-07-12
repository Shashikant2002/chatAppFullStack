import io from "socket.io-client";
import { baseUrl } from "../../config";
import { createContext } from "react";
import { useMemo } from "react";
import { useContext } from "react";

const SocketContext = createContext();

const SocketProvider = ({ children }) => {
  const socket = useMemo(() => {
    return io(baseUrl, { withCredentials: true });
  }, []);
  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

const getSocket = () => useContext(SocketContext);

export { getSocket, SocketProvider };
