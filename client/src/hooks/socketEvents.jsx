import { useEffect } from "react";
import { NEW_MESSAGE } from "../constants/socketEvents";

const useSocketEvents = (socket, handelers) => {
  // Socket Listeners ========================>>>>>>>>>>>>>>>>>>>>>
  useEffect(() => {
    Object.entries(handelers).forEach(([events, handelers]) => {
      socket.on(events, handelers);
    });

    return () => {
      Object.entries(handelers).forEach(([events, handelers]) => {
        socket.off(events, handelers);
      });
    };
  }, [socket, handelers]);
};

export default useSocketEvents;
