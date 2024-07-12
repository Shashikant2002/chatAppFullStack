import React, { useCallback, useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import AppLayout from "../components/layout/AppLayout";
import { RiMenuFoldLine } from "react-icons/ri";
import { IconButton, Button } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import ViewProfile from "../components/shared/ViewProfile";
import { IoIosPaperPlane } from "react-icons/io";
import { MdOutlineAttachFile } from "react-icons/md";
import AllMessagesContainer from "../components/shared/AllMessagesContainer";
import { getSocket } from "../socket/Socket";
import { toast } from "react-toastify";
import { NEW_MESSAGE } from "../constants/socketEvents";
import { useNavigate, useParams } from "react-router-dom";
import { useChatDetailQuery, useMyMessagesQuery } from "../global/api/api";
import Loading from "../components/shared/Loading";
import useError from "../hooks/error";
import { useSelector } from "react-redux";
import useSocketEvents from "../hooks/socketEvents";

const Chat = () => {
  const socket = getSocket();
  const [isShowProfile, setIsProfile] = useState(false);
  const [message, setMessage] = useState("");
  const { chat_id } = useParams();
  const userDetail = useSelector((state) => state?.user?.userDetail?.user);
  const isAuth = useSelector((state) => state?.user?.auth);
  const [sanderUser, setSanderUser] = useState(null);
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);

  const [messagesPage, setMessagesPage] = useState(1);

  const { isLoading, data, error, isError } = useChatDetailQuery({
    chat_id: chat_id,
    skip: !chat_id,
    populate: true,
  });

  const {
    isLoading: getMessageLoading,
    data: getMessageData,
    error: messageError,
    isError: messageIsError,
    refetch,
  } = useMyMessagesQuery({
    chat_id: chat_id,
    page: messagesPage,
  });

  //  Error Hook When Error is Exiest ===================>>>>>>>>>>>>>>>>>>
  useError([{ error, isError }]);
  useError([{ messageError, messageIsError }]);

  useEffect(() => {
    if (isError || messageError) {
      navigate("/");
    }
  }, [isError, messageIsError]);

  // Send Message on Real time ===============>>>>>>>>>>>>>>>>
  const sendMessageForm = (e) => {
    e.preventDefault();

    if (!message.trim()) {
      return toast.error("Fill the Messagebox !!");
    }

    socket.emit(NEW_MESSAGE, {
      chatId: chat_id,
      members: data.chat.members.map((ele) => ele._id),
      message: message,
    });

    // console.log(message);

    setMessage("");
  };

  useEffect(() => {
    if (data?.chat?.group_chat) {
      setSanderUser(data?.chat?.group_chat?.members);
    } else {
      data?.chat?.members?.forEach((member) => {
        if (userDetail._id !== member._id) {
          setSanderUser(member);
        }
      });
    }

    let allMessages = getMessageData?.messages;
    setMessages(allMessages);
  }, [data, isAuth, getMessageData]);

  // Messages Functions ======================>>>>>>>>>>>>>>>>>>>>>>>>>
  const newMessages = useCallback((message) => {
    setMessages((prev) => [...prev, message]);
  }, []);

  const eventHandelers = { [NEW_MESSAGE]: newMessages };

  // Hook For Handle Socket Events On and OFF Both
  useSocketEvents(socket, eventHandelers);

  return (
    <>
      {isLoading || getMessageLoading ? <Loading /> : ""}
      <div className="chatScreen">
        <div className="headerChat">
          <div className="userDetail">
            <Avatar
              src={sanderUser?.avatar}
              sx={{ width: "50px", height: "50px" }}
            />
            <div className="text">
              <h4 className="name">{sanderUser?.name}</h4>
              <p className="status">online</p>
            </div>
          </div>
          <div className="userDetail">
            <Tooltip title="View Profile" arrow>
              <IconButton
                color="primary"
                onClick={() => setIsProfile((prev) => !prev)}
              >
                <RiMenuFoldLine color="#fff" size={30} />
              </IconButton>
            </Tooltip>
          </div>
        </div>

        {/* AllMessagesContainer Start ===================>>>>>>>>>>>>>>>>>>> */}
        <AllMessagesContainer messages={messages} />
        {/* AllMessagesContainer End ===================>>>>>>>>>>>>>>>>>>> */}

        <form className="inputChat" onSubmit={sendMessageForm}>
          <div className="inputs">
            <Tooltip title="Add File" arrow>
              <IconButton
                color="primary"
                onClick={() => setIsProfile((prev) => !prev)}
              >
                <MdOutlineAttachFile color="#fff" size={30} />
              </IconButton>
            </Tooltip>
          </div>
          <input
            type="text"
            placeholder="Type Your Message"
            className="inputMessage"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <Button
            className="button"
            variant="contained"
            startIcon={<IoIosPaperPlane color="white" />}
            color="primary"
            type="submit"
          >
            Send Message
          </Button>
        </form>
      </div>

      {/* View Profile Start ===================>>>>>>>>>>>>>>>>>>> */}
      <ViewProfile
        data={sanderUser}
        isShowProfile={isShowProfile}
        setIsProfile={setIsProfile}
      />
      {/* View Profile End ===================>>>>>>>>>>>>>>>>>>> */}
    </>
  );
};

export default AppLayout()(Chat);
