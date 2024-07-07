import React, { useEffect, useState } from "react";
import NotificationItem from "../shared/NotificationItem";
import { useGetNotificationQuery } from "../../global/api/api";
import Loading from "../shared/Loading";
import useError from "../../hooks/error";

const Notification = ({ isNotification, setIsNotification }) => {
  const [notification, setNotification] = useState([]);

  const { isLoading, data, error, isError } = useGetNotificationQuery();

  useEffect(() => {
    if (data?.success) {
      setNotification(data?.requests);
    }
  }, [data]);

  useError([{ error, isError }]);

  // console.log("notification", notification);

  return (
    <>
      {isLoading ? <Loading /> : ""}

      {isNotification ? (
        <div className="notification">
          <div className="mainPopup">
            <h3 className="title">Notification</h3>
            <p className="description">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quia,
              odit delectus.
            </p>

            <div className="notificationsGroup">
              {notification?.map((data, i) => (
                <NotificationItem key={i} data={data} />
              ))}

              {notification?.length <= 0 ? (
                <div className="notFoundNotification">
                  <h3 className="notFound">No Notification</h3>
                  {/* <h3 className="notFound">OR</h3>
                  <h3 className="notFound">User Not Found</h3> */}
                </div>
              ) : (
                ""
              )}
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
      )}
    </>
  );
};

export default Notification;
