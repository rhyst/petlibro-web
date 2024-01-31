"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  Trash,
  XCircle,
  CheckCircle,
  PlusCircle,
  NotePencil,
} from "phosphor-react";
import { format } from "date-fns";
import sortBy from "just-sort-by";

import { useStore } from "@/store";
import Header from "@/components/Header";
import Text from "@/components/Text";
import Toggle from "@/components/Toggle";

import { PlanState, GrainUnit, NotificationEventKey } from "@/constants";
import Button from "@/components/Button";
import Checkbox from "@/components/Checkbox";
import Timepicker from "@/components/Timepicker";
import Input from "@/components/Input";
import GrainNumPicker from "@/components/GrainNumPicker";
import GrainNum from "@/components/GrainNum";
import Modal from "@/components/Modal";

const stateMap: Record<number, string> = {
  [PlanState.DisabledCompleted]: "Did not run",
  [PlanState.DisabledUpcoming]: "Will not run",
  [PlanState.EnabledCompleted]: "Ran",
  [PlanState.EnabledUpcoming]: "Will run",
};

const unitMap: Record<
  number,
  (amount: number) => {
    actualGrainUnit: string;
    actualGrainNum: number;
  }
> = {
  [GrainUnit.TenGrams]: (amount) => ({
    actualGrainNum: amount * 10,
    actualGrainUnit: "g",
  }),
  [GrainUnit.TwelfthsOfCup]: (amount) => ({
    actualGrainNum: amount,
    actualGrainUnit: "/12 cups",
  }),
  [GrainUnit.TwentyMl]: (amount) => ({
    actualGrainNum: amount * 20,
    actualGrainUnit: "ml",
  }),
  [GrainUnit.NoughtPointThreeFiveOunces]: (amount) => ({
    actualGrainNum: amount * 0.35,
    actualGrainUnit: "oz",
  }),
};

const formatTime = (time: UnixTimestamp) => {
  const date = new Date(time);
  // Return the time as a string with short weekday and 24-hour time and no seconds
  return format(date, "EEE HH:mm");
};

// Template a string like 'Hello {name}, we are having {sentiment} weather' with a context object like { name: 'world', sentiment: 'great' }
const template = (str: string, context: Record<string, unknown>) => {
  return str.replace(/{([^}]+)}/g, (_, key) => `${context[key]}`);
};

export default function Device() {
  // State
  const router = useRouter();
  const { notifications, getNotification } = useStore();
  const notification = notifications.find(
    (notification) => notification.id === router?.query?.id
  );

  useEffect(() => {
    if (router?.query?.id) {
      getNotification(router.query.id as string);
    }
  }, [router?.query?.id, getNotification]);

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
          onClick={() => router.push(`/share`)}
        >
          View Shared Devices
        </Button>
      )}
    </>
  );
}
