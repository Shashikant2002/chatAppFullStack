import { userSocketIds } from "../index.js";

export const emitEvent = (req, event, user, data) => {
  console.log("Imiting Event", event);
  console.log("message", data);
};

export const getSockets = (users = []) => {
  const sockets = users?.map((user) => userSocketIds?.get(user?.toString()));
  return sockets;
};
