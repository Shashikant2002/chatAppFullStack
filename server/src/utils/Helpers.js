export const getOtherMembers = (members, user_id) => {
  return members?.find((member) => member._id !== user_id.toString());
};
