const PORT = process.env.PORT || 5000;
const URI_NAME =
  process.env.URI_NAME ||
  "mongodb+srv://shashikant2002:4886Shashi%40384443@cluster0.f9tcemk.mongodb.net";

const exportObj = {
  PORT,
  URI_NAME,
};

export default Object.freeze(exportObj);
