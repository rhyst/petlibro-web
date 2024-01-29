"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

import { useStore } from "@/store";
import Header from "@/components/Header";
import Text from "@/components/Text";
import Button from "@/components/Button";

export default function Home() {
  const { user, devices, getDevices } = useStore();

  useEffect(() => {
    if (user) {
      getDevices();
    }
  }, [user, getDevices]);

  return (
    <>
      <div className="flex justify-between">
        <Header>Your Devices</Header>
        <Button variant="transparent" onClick={getDevices}>
          Refresh
        </Button>
      </div>
      <div className="grid mt-6 grid-cols-[100px_1fr_1fr] items-center ">
        <div></div>
        <Text size="small" className="font-bold">
          Name
        </Text>
        <Text size="small" className="font-bold">
          Next Feeding
        </Text>
        {devices?.map((device) => (
          <React.Fragment key={device.deviceSn}>
            <Image src={device.icon} alt="" width={50} height={50} />
            <Link key={device.deviceSn} href={`/device/${device.deviceSn}`}>
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
    </>
  );
}
