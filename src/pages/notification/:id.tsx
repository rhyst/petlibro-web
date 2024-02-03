import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useStore } from "@/store";
import Header from "@/components/Header";
import Text from "@/components/Text";

import { NotificationEventKey } from "@/constants";
import Button from "@/components/Button";

export default function Device() {
  // State
  const navigate = useNavigate();
  const params = useParams();
  const { notifications, getNotification } = useStore();
  const notification = notifications.find(
    (notification) => notification.id === params?.id
  );

  useEffect(() => {
    if (params?.id) {
      getNotification(params.id as string);
    }
  }, [params?.id, getNotification]);

  // Render

  if (!notification) {
    return <Text>Notification not found.</Text>;
  }

  return (
    <>
      <Header className="mt-6">{notification.title}</Header>
      <Text className="mt-6">{notification.content}</Text>
      {[
        NotificationEventKey.DEVICE_SHARE_ADD,
        NotificationEventKey.DEVICE_SHARE_CANCELLED,
      ].includes(notification.eventKey as NotificationEventKey) && (
        <Button
          className="mt-6"
          variant="transparent"
          onClick={() => navigate(`/share`)}
        >
          View Shared Devices
        </Button>
      )}
    </>
  );
}
