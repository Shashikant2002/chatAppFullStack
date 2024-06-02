import { userSocketIds } from "../index.js";

export const emitEvent = (req, event, user, data) => {
  console.log("Imiting Event", event);
  console.log("message", data);
};

export const getSockets = (users = []) => {

  console.log(users, userSocketIds);

  const sockets = users?.map((user) => userSocketIds?.get(user?.toString()));

  console.log(sockets);
  return sockets;
};
