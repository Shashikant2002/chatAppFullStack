export const getOtherMembers = (members, user_id) => {
  return members?.find((member) => member._id !== user_id.toString());
};

export const getBase64 = (file) => {
  return `data:${file.mimetype};base64,${file.buffer.toString("base64")}`;
};
