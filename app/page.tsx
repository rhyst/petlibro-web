"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { useStore } from "@/src/store";
import Header from "@/src/components/Header";
import Text from "@/src/components/Text";

export default function Home() {
  const { user, devices, getDevices } = useStore();

  useEffect(() => {
    if (user) {
      getDevices();
    }
  }, [user, getDevices]);

  console.log(devices);

  return (
    <>
      <div className="flex justify-between">
        <Header>Your Devices</Header>
        <button
          type="button"
          onClick={getDevices}
          className=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-auto sm:w-fit px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Refresh
        </button>
      </div>
      <div className="grid mt-6 grid-cols-[100px_1fr_1fr] items-center ">
        <div></div>
        <Text size="small" className="font-bold">
          Name
        </Text>
        <Text size="small" className="font-bold">
          Next Feeding
        </Text>
        {devices.map((device) => (
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
