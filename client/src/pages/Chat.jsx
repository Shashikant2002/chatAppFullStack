import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import AppLayout from "../components/layout/AppLayout";
import { RiMenuFoldLine } from "react-icons/ri";
import { IconButton, Button } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import ViewProfile from "../components/shared/ViewProfile";
import { IoIosPaperPlane } from "react-icons/io";
import { MdOutlineAttachFile } from "react-icons/md";
import AllMessagesContainer from "../components/shared/AllMessagesContainer";

const Chat = () => {
  const [isShowProfile, setIsProfile] = useState(false);

  return (
    <>
      <div className="chatScreen">
        <div className="headerChat">
          <div className="userDetail">
            <Avatar sx={{ width: "50px", height: "50px" }} />
            <div className="text">
              <h4 className="name">Rahul</h4>
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
        <AllMessagesContainer />
        {/* AllMessagesContainer End ===================>>>>>>>>>>>>>>>>>>> */}

        <form className="inputChat">
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
          />
          <Button
            className="button"
            variant="contained"
            startIcon={<IoIosPaperPlane color="white" />}
            color="primary"
          >
            Send Message
          </Button>
        </form>
      </div>

      {/* View Profile Start ===================>>>>>>>>>>>>>>>>>>> */}
      <ViewProfile isShowProfile={isShowProfile} setIsProfile={setIsProfile} />
      {/* View Profile End ===================>>>>>>>>>>>>>>>>>>> */}
    </>
  );
};

export default AppLayout()(Chat);
