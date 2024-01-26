"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { useStore } from "@/store";
import Header from "@/components/Header";
import Text from "@/components/Text";

const stateMap: Record<number, string> = {
  1: "Upcoming",
  2: "Disabled",
  3: "Completed",
};

export default function Device() {
  const router = useRouter();
  const { devices, todaySchedule, schedule, getTodaySchedule, getSchedule } =
    useStore();
  const device = devices.find((device) => device.deviceSn === router?.query?.id);
  const deviceTodaySchedule = todaySchedule[device?.deviceSn || ""] || {};
  const deviceSchedule = schedule[device?.deviceSn || ""] || [];

  useEffect(() => {
    if (device) {
      getTodaySchedule(device.deviceSn);
      getSchedule(device.deviceSn);
    }
  }, [device, getTodaySchedule, getSchedule]);

  return (
    <>
      <Header>{device?.name}</Header>

      <div className="mt-6 flex justify-between">
        <Header size="small">Device Schedule Today</Header>
      </div>
      <div className="grid mt-6 grid-cols-3 items-center ">
        <Text size="small" className="font-bold">
          Time
        </Text>
        <Text size="small" className="font-bold">
          Amount
        </Text>
        <Text size="small" className="font-bold">
          State
        </Text>
        {deviceTodaySchedule?.plans?.map((schedule) => (
          <React.Fragment key={schedule.planId}>
            <Text>{schedule.time}</Text>
            <Text>{schedule.grainNum * 10}g</Text>
            <Text>{stateMap[schedule.state]}</Text>
          </React.Fragment>
        ))}
      </div>

      <div className="mt-6 flex justify-between">
        <Header size="small">Device Schedule</Header>
      </div>
      <div className="grid mt-6 grid-cols-3 items-center ">
        <Text size="small" className="font-bold">
          Name
        </Text>
        <Text size="small" className="font-bold">
          Time
        </Text>
        <Text size="small" className="font-bold">
          Amount
        </Text>
        {deviceSchedule?.map((schedule) => (
          <React.Fragment key={schedule.id}>
            <Text>{schedule.label}</Text>
            <Text>{schedule.executionTime}</Text>
            <Text>{schedule.grainNum * 10}g</Text>
          </React.Fragment>
        ))}
      </div>
    </>
  );
}