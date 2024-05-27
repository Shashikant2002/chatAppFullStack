import React from "react";
import NotificationItem from "../shared/NotificationItem";

const Notification = ({ isNotification, setIsNotification }) => {
  return isNotification ? (
    <div className="notification">
      <div className="mainPopup">
        <h3 className="title">Notification</h3>
        <p className="description">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quia, odit
          delectus.
        </p>

        <div className="notificationsGroup">
          <div className="notFoundNotification">
            <h3 className="notFound">Please Search User</h3>
            <h3 className="notFound">OR</h3>
            <h3 className="notFound">User Not Found</h3>
          </div>
          {new Array(10)?.fill({})?.map((_, i) => (
            <NotificationItem />
          ))}
        </div>

        <div className="controll">
          <button
            className="fill_btn"
            onClick={() => {
              setIsNotification(false);
            }}
          >
            Done
          </button>
        </div>
      </div>
    </div>
  ) : (
    ""
  );
};

export default Notification;
