"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Trash, PlusCircle } from "phosphor-react";

import { useStore } from "@/store";
import Header from "@/components/Header";
import Text from "@/components/Text";
import Toggle from "@/components/Toggle";

import { PlanState } from "@/constants";
import Button from "@/components/Button";

const stateMap: Record<number, string> = {
  [PlanState.DisabledCompleted]: "Did not run",
  [PlanState.DisabledUpcoming]: "Will not run",
  [PlanState.EnabledCompleted]: "Ran",
  [PlanState.EnabledUpcoming]: "Will run",
};

const formatTime = (time: number) => {
  const date = new Date(time);
  // Return the time as a string with 24-hour time and no seconds
  return date.toLocaleTimeString("en-US", {
    hour12: false,
    hour: "numeric",
    minute: "numeric",
  });
};

const reverse = (arr: any[]) => {
  const copy = [...arr];
  copy.reverse();
  return copy;
};

// Template a string like 'Hello {name}, we are having {sentiment} weather' with a context object like { name: 'world', sentiment: 'great' }
const template = (str: string, context: Record<string, string>) => {
  return str.replace(/{([^}]+)}/g, (_, key) => context[key]);
};

export default function Device() {
  // State
  const router = useRouter();
  const {
    devices,
    todaySchedule,
    schedule,
    workRecord,
    getTodaySchedule,
    getSchedule,
    getWorkRecord,
    enableFeedingPlanToday,
    enableFeedingPlan,
    updateFeedingPlan,
    addFeedPlan,
    deleteFeedPlan,
  } = useStore();
  const device = devices.find(
    (device) => device.deviceSn === router?.query?.id
  );
  const deviceTodaySchedule = todaySchedule[device?.deviceSn || ""] || {};
  const deviceSchedule = schedule[device?.deviceSn || ""] || [];
  const logs = workRecord[device?.deviceSn || ""] || [];
  const [newPlan, setNewPlan] = useState<Partial<FeedingPlanSchedule>>({
    deviceSn: device?.deviceSn,
    enableAudio: false,
  });

  // Effects
  useEffect(() => {
    if (device) {
      getTodaySchedule(device.deviceSn);
      getSchedule(device.deviceSn);
      getWorkRecord(device.deviceSn);
    }
  }, [device, getTodaySchedule, getSchedule, getWorkRecord]);

  // Handlers

  const handleDayOfWeekChange = (
    planId: number,
    dayOfWeek: number,
    enable: boolean
  ) => {
    const plan = deviceSchedule.find((plan) => plan.id === planId);
    if (plan && device) {
      let newRepeatDay = JSON.parse(plan.repeatDay);
      if (!enable) {
        newRepeatDay = newRepeatDay.filter((day: number) => day !== dayOfWeek);
      } else {
        newRepeatDay.push(dayOfWeek);
      }
      updateFeedingPlan(device.deviceSn, {
        ...plan,
        repeatDay: JSON.stringify(newRepeatDay),
      });
    }
  };

  const handleNewPlanSubmit = () => {
    if (device) {
      addFeedPlan(device.deviceSn, newPlan);
    }
  };

  if (!device) {
    return null;
  }

  return (
    <>
      <Header>{device.name}</Header>

      <div className="mt-6 flex justify-between">
        <Header size="small">Device Schedule Today</Header>
      </div>
      <div className="grid mt-6 grid-cols-4 items-center ">
        <Text size="small" className="font-bold">
          Time
        </Text>
        <Text size="small" className="font-bold">
          Amount
        </Text>
        <Text size="small" className="font-bold">
          State
        </Text>
        <Text size="small" className="font-bold">
          Enabled
        </Text>
        {deviceTodaySchedule?.plans?.map((schedule) => (
          <React.Fragment key={schedule.planId}>
            <Text>{schedule.time}</Text>
            <Text>{schedule.grainNum * 10}g</Text>
            <Text>{stateMap[schedule.state]}</Text>
            <Toggle
              onChange={() =>
                enableFeedingPlanToday(
                  device.deviceSn,
                  schedule.planId,
                  ![
                    PlanState.EnabledUpcoming,
                    PlanState.EnabledCompleted,
                  ].includes(schedule.state)
                )
              }
              checked={[
                PlanState.EnabledCompleted,
                PlanState.EnabledUpcoming,
              ].includes(schedule.state)}
              disabled={[
                PlanState.EnabledCompleted,
                PlanState.DisabledCompleted,
              ].includes(schedule.state)}
            />
          </React.Fragment>
        ))}
      </div>

      <div className="mt-6 flex justify-between">
        <Header size="small">Device Schedule</Header>
      </div>
      <div className="grid mt-6 grid-cols-[100px_repeat(7,25px)_1fr_1fr_1fr_50px] justify-center items-center gap-x-2">
        <Text size="small" className="font-bold ">
          Time
        </Text>
        {["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].map((day) => (
          <Text size="small" className="font-bold text-center" key={day}>
            {day}
          </Text>
        ))}
        <Text size="small" className="font-bold">
          Name
        </Text>
        <Text size="small" className="font-bold">
          Amount
        </Text>
        <Text size="small" className="font-bold">
          Enabled
        </Text>
        <Text size="small" className="font-bold">
          Action
        </Text>
        {deviceSchedule?.map((schedule) => {
          const repeatDay = JSON.parse(schedule.repeatDay);
          return (
            <React.Fragment key={schedule.id}>
              <Text>{schedule.executionTime}</Text>
              {/* range 1-7 */}
              {Array.from(Array(7).keys()).map((i) => (
                <input
                  key={i}
                  checked={repeatDay.includes(i + 1)}
                  type="checkbox"
                  onChange={() =>
                    handleDayOfWeekChange(
                      schedule.id,
                      i + 1,
                      !repeatDay.includes(i + 1)
                    )
                  }
                />
              ))}

              <Text>{schedule.label}</Text>
              <Text>{schedule.grainNum * 10}g</Text>
              <Toggle
                onChange={() =>
                  enableFeedingPlan(
                    device.deviceSn,
                    schedule.id,
                    !schedule.enable
                  )
                }
                checked={schedule.enable}
              />
              <Button
                variant="transparent"
                onClick={() => deleteFeedPlan(device.deviceSn, schedule.id)}
              >
                <Trash />
              </Button>
            </React.Fragment>
          );
        })}
        <input
          type="text"
          className="bg-transparent border border-gray-300 text-sm  block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white "
          value={newPlan.executionTime || ""}
          onChange={(e) =>
            setNewPlan({ ...newPlan, executionTime: e.target.value })
          }
        />
        {Array.from(Array(7).keys()).map((i) => (
          <input
            key={i}
            type="checkbox"
            checked={JSON.parse(newPlan.repeatDay || "[]").includes(i + 1)}
            onChange={(e) => {
              let newPlanRepeatDay = JSON.parse(newPlan.repeatDay || "[]");
              if (!e.target.checked) {
                newPlanRepeatDay = newPlanRepeatDay.filter(
                  (day: number) => day !== i + 1
                );
              } else {
                newPlanRepeatDay.push(i + 1);
              }
              setNewPlan({
                ...newPlan,
                repeatDay: JSON.stringify(newPlanRepeatDay),
              });
            }}
          />
        ))}
        <input
          className="bg-transparent border border-gray-300 text-sm  block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white "
          type="text"
          value={newPlan.label || ""}
          onChange={(e) => setNewPlan({ ...newPlan, label: e.target.value })}
        />
        <input
          className="bg-transparent border border-gray-300 text-sm  block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white "
          type="text"
          value={newPlan.grainNum || 0}
          onChange={(e) =>
            setNewPlan({ ...newPlan, grainNum: parseInt(e.target.value) })
          }
        />
        <Toggle />
        <Button variant="transparent" onClick={() => handleNewPlanSubmit()}>
          <PlusCircle />
        </Button>
      </div>

      <div className="mt-6 flex justify-between">
        <Header size="small">Log</Header>
      </div>
      <div className="grid mt-6 grid-cols-[100px_1fr] items-center ">
        <Text size="small" className="font-bold">
          Time
        </Text>
        <Text size="small" className="font-bold">
          Message
        </Text>
        {logs?.map((log) => (
          <React.Fragment key={log.recordTime}>
            {reverse(log.workRecords).map((workRecord) => (
              <React.Fragment key={workRecord.id}>
                <Text>{formatTime(workRecord.createTime)}</Text>
                <Text>
                  {template(workRecord.content, {
                    ...workRecord,
                    actualGrainUnit: "0g",
                  })}
                </Text>
              </React.Fragment>
            ))}
          </React.Fragment>
        ))}
      </div>
    </>
  );
}
