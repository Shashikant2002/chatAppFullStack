import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Title from "../shared/Title";
import ChatItem from "../shared/ChatItem";
import AllChats from "../shared/AllChats";

const AppLayout = () => (WrappedComponent) => {
  return (propes) => {
    return (
      <>
        <Title />
        <Header />

        <div className="layoutArea">
          <AllChats />

          <div className="chats">
            <WrappedComponent {...propes} />
          </div>
        </div>

        {/* <Footer /> */}
      </>
    );
  };
};

export default AppLayout;
