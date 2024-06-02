import { IconButton, Tooltip } from "@mui/material";
import React, { Suspense, lazy, useState } from "react";
import { IoMdSearch } from "react-icons/io";
import { GoPlus } from "react-icons/go";
import { TiGroup } from "react-icons/ti";
import { IoNotificationsSharp } from "react-icons/io5";
import { HiLogout } from "react-icons/hi";
import Confirm from "../shared/Confirm";
import Loading from "../shared/Loading";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutMe } from "../../global/asyncThung/userAsync";

const Search = lazy(() => import("../common/SearchBox"));
const Notification = lazy(() => import("../common/Notification"));

const Header = () => {
  const [perLogout, setPerLogout] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isSearch, setIsSearch] = useState(false);
  const [isNotification, setIsNotification] = useState(false);

  return (
    <>
      <div className="header">
        <div
          className="logo"
          onClick={() => {
            navigate("/");
          }}
        >
          <h2>Shashikant</h2>
          <p>Whats's App Clone</p>
        </div>

        <div className="features">
          <Tooltip title="Search Friend" placement="bottom-start" arrow>
            <IconButton
              color="primary"
              onClick={() => {
                setIsSearch(true);
              }}
            >
              <IoMdSearch color="white" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Create Group" placement="bottom-start" arrow>
            <IconButton color="primary">
              <GoPlus color="white" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Manage Group" placement="bottom-start" arrow>
            <IconButton color="primary" onClick={() => navigate("/group")}>
              <TiGroup color="white" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Your Notification" placement="bottom-start" arrow>
            <IconButton color="primary" onClick={() => setIsNotification(true)}>
              <IoNotificationsSharp color="white" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Logout" placement="bottom-start" arrow>
            <IconButton color="primary" onClick={() => setPerLogout(true)}>
              <HiLogout color="white" />
            </IconButton>
          </Tooltip>
        </div>
      </div>
      {/* Search Box Start Here ============>>>>>>>>>>>>>>>> */}
      <Suspense fallback={<Loading />}>
        <Search isSearch={isSearch} setIsSearch={setIsSearch} />
      </Suspense>
      {/* Search Box End Here ============>>>>>>>>>>>>>>>> */}

      {/* Notification Box Start Here ============>>>>>>>>>>>>>>>> */}
      <Suspense fallback={<Loading />}>
        <Notification
          isNotification={isNotification}
          setIsNotification={setIsNotification}
        />
      </Suspense>
      {/* Notification Box End Here ============>>>>>>>>>>>>>>>> */}

      {/* Logout Confirm Start ==================>>>>>>>>>>>> */}
      <Confirm
        visibal={perLogout}
        title={"Logout"}
        description={"Your Want To Logout"}
        accept={() => {
          setPerLogout(false);
          dispatch(logoutMe({}));
        }}
        reject={() => {
          setPerLogout(false);
        }}
      />
      {/* Logout Confirm End ==================>>>>>>>>>>>> */}
    </>
  );
};

export default Header;
