import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function NotificationList() {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/");
  });

  return <p>Redirecting...</p>;
}
