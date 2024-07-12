import React, { memo, useState } from "react";
import { Avatar } from "@mui/material";
import { IconButton } from "@mui/material";
import { FaPlus } from "react-icons/fa";
import Tooltip from "@mui/material/Tooltip";
import { IoMdCheckmark } from "react-icons/io";
import { FaXmark } from "react-icons/fa6";
import { useAcceptFriendRequestMutation } from "../../global/api/api";
import { toast } from "react-toastify";
import Loading from "./Loading";

const NotificationItem = ({ data, closePopup }) => {
  const [acceptFriendRequest] = useAcceptFriendRequestMutation();
  const [loading, setLoading] = useState(false);

  const handleRequest = async (isAccept) => {
    try {
      setLoading(true);
      const res = await acceptFriendRequest({
        reqId: data?._id,
        isAccept: isAccept,
      });

      if (res?.data?.success) {
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? <Loading /> : ""}
      <div className="notificationItem">
        <Avatar
          src={data?.sender?.avatar?.url}
          sx={{ width: 50, height: 50 }}
        />

        <div className="content">
          <div className="main">
            <h4 className="name">{data?.sender?.name}</h4>
            <p className="bio">{data?.sender?.bio}</p>
          </div>
          <div className="control">
            <Tooltip title="Send Friend Request" arrow>
              <IconButton color="error" onClick={() => handleRequest(false)}>
                <FaXmark />
              </IconButton>
            </Tooltip>

            <Tooltip title="Send Friend Request" arrow>
              <IconButton
                color="primary"
                varient={"contained"}
                onClick={() => handleRequest(true)}
              >
                <IoMdCheckmark color="white" />
              </IconButton>
            </Tooltip>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotificationItem;
