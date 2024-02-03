import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import { useStore } from "@/store";
import Header from "@/components/Header";
import Text from "@/components/Text";
import Button from "@/components/Button";
import { format } from "date-fns";

const formatTime = (time: UnixTimestamp) => {
  const date = new Date(time);
  // Return the time as a string with short weekday and 24-hour time and no seconds
  return format(date, "EEE HH:mm");
};

export default function Home() {
  const { user, devices, notifications, getDevices, getNotifications } =
    useStore();

  useEffect(() => {
    if (user) {
      getDevices();
      getNotifications();
    }
  }, [user, getDevices, getNotifications]);

  return (
    <>
      <div className="flex justify-between mt-6">
        <Header>Devices</Header>
        <Button variant="transparent" onClick={getDevices}>
          Refresh
        </Button>
      </div>
      {devices.length ? (
        <div className="grid mt-3 grid-cols-[100px_1fr_1fr] items-center ">
          <div></div>
          <Text size="small" className="font-bold">
            Name
          </Text>
          <Text size="small" className="font-bold">
            Next Feeding
          </Text>
          {devices?.map((device) => (
            <React.Fragment key={device.deviceSn}>
              <img src={device.icon} alt="" width={50} height={50} />
              <Link key={device.deviceSn} to={`/device/${device.deviceSn}`}>
                <Text className="underline dark:text-blue-300">
                  {device.name}
                </Text>
              </Link>
              <Text>
                {device.nextFeedingQuantity * 10}g at {device.nextFeedingTime}
              </Text>
            </React.Fragment>
          ))}
        </div>
      ) : (
        <Text className="mt-3">No devices found</Text>
      )}

      <div className="flex justify-between mt-6">
        <Header>Notifications</Header>
        <Button variant="transparent" onClick={getNotifications}>
          Refresh
        </Button>
      </div>
      {notifications.length ? (
        <div className="grid mt-3 grid-cols-[100px_1fr]">
          <Text size="small" className="font-bold">
            Time
          </Text>
          <Text size="small" className="font-bold">
            Details
          </Text>
          {notifications?.map((notification) => (
            <React.Fragment key={notification.id}>
              <Text>{formatTime(notification.timestamp)}</Text>
              <Text>
                {!notification.read && (
                  <span className=" rounded-full bg-red-800 w-2 h-2 inline-block mr-2"></span>
                )}
                <Link
                  to={`/notification/${notification.id}`}
                  className="underline dark:text-blue-300"
                >
                  {notification.title}
                </Link>{" "}
                - {notification.subtitle}
              </Text>{" "}
            </React.Fragment>
          ))}
        </div>
      ) : (
        <Text className="mt-3">No notifications found</Text>
      )}

      <div className="flex justify-between mt-6 mb-3">
        <Header>Links</Header>
      </div>
      <Link to="/share">
        <Text className="underline">Shared Devices</Text>
      </Link>
    </>
  );
}
