import React from "react";
import Avatar from "@mui/material/Avatar";
import { IconButton } from "@mui/material";
import { MdClose } from "react-icons/md";

const ViewProfile = ({ isShowProfile, setIsProfile, data }) => {
  return (
    <div className={`viewProfile ${isShowProfile ? "active" : ""}`}>
      <div className="headingMain">
        <h3 className="heading">User Detail</h3>
        <IconButton
          sx={{ padding: 0 }}
          color="primary"
          onClick={() => setIsProfile((prev) => !prev)}
        >
          <MdClose color="white" size={30} />
        </IconButton>
      </div>
      <div className="avatar">
        <Avatar src={data?.avatar} sx={{ height: "150px", width: "150px" }} />
      </div>

      <div className="detail">
        <div className="detailCard">
          <p className="desc">
            {data?.bio}
          </p>
          <p className="title">Bio</p>
        </div>
        <div className="detailCard">
          <h3 className="desc">{data?.name}</h3>
          <p className="title">Name</p>
        </div>
        <div className="detailCard">
          <h3 className="desc">{data?.email}</h3>
          <p className="title">Email</p>
        </div>
        {/* <div className="detailCard">
          <h3 className="desc">+91 9643510696</h3>
          <p className="title">Phone Number</p>
        </div> */}
      </div>
    </div>
  );
};

export default ViewProfile;
