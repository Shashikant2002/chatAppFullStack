import mongoose from "mongoose";

const ConnectDataBase = async (uri) => {
  try {
    const isConnected = await mongoose.connect(uri, { dbName: "ChatApp_Full" });
    if (isConnected.connection.host) {
      console.log("Database Connected Successfull !! ");
    }
  } catch (error) {
    console.log("DataBase Connection Error", error);
  }
};

export default ConnectDataBase;
