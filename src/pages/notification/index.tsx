"use client";

import { useRouter } from "next/router";
import { useEffect } from "react";

export default function NotificationList() {
  const router = useRouter();
  useEffect(() => {
    router.push("/");
  });

  return <p>Redirecting...</p>;
}
