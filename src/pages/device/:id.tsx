import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

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

import { PlanState, GrainUnit } from "@/constants";
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
  const params = useParams();
  const {
    devices,
    todayFeedingPlan,
    feedingPlan,
    workRecord,
    getTodayFeedingPlan,
    getFeedingPlan,
    getWorkRecord,
    enableFeedingPlanToday,
    enableFeedingPlan,
    updateFeedingPlan,
    addFeedPlan,
    deleteFeedPlan,
    manualFeed,
  } = useStore();
  const device = devices.find(
    (device) => device.deviceSn === params?.id
  );
  const deviceTodayFeedingPlan = todayFeedingPlan[device?.deviceSn || ""] || {};
  const deviceFeedingPlan = feedingPlan[device?.deviceSn || ""] || [];
  const logs = workRecord[device?.deviceSn || ""] || [];
  const [editPlan, setEditPlan] = useState<Partial<FeedingPlan> | null>(null);
  const [manualGrainNum, setManualGrainNum] = useState<number>(1);
  const [confirmation, setConfirmation] = useState<boolean>(false);

  // Effects
  useEffect(() => {
    if (device) {
      getTodayFeedingPlan(device.deviceSn);
      getFeedingPlan(device.deviceSn);
      getWorkRecord(device.deviceSn);
    }
  }, [device, getTodayFeedingPlan, getFeedingPlan, getWorkRecord]);

  // Handlers
  const handleNewPlan = () => {
    setEditPlan({
      deviceSn: device?.deviceSn,
      enableAudio: false,
    });
  };

  const handleEditPlan = (plan: FeedingPlan) => {
    setEditPlan(plan);
  };

  const handleCancelPlan = () => {
    setEditPlan(null);
  };

  const handlePlanSubmit = async () => {
    if (device) {
      if (editPlan?.id) {
        await updateFeedingPlan(device.deviceSn, editPlan as FeedingPlan);
        setEditPlan(null);
      } else if (editPlan) {
        await addFeedPlan(device.deviceSn, editPlan);
        setEditPlan(null);
      }
      await getFeedingPlan(device.deviceSn);
    }
  };

  const handleManualFeed = async () => {
    if (device) {
      await manualFeed(device.deviceSn, manualGrainNum);
      setConfirmation(false);
    }
  };

  // Render

  if (!device) {
    return <Text>Device not found.</Text>;
  }

  if (device.productIdentifier !== "PLAF103") {
    return <Text>Unsupported device.</Text>;
  }

  const renderPlan = (plan: FeedingPlan) => {
    const repeatDay = JSON.parse(plan.repeatDay);
    return (
      <React.Fragment key={plan.id}>
        <Text>{plan.executionTime}</Text>
        {/* range 1-7 */}
        {Array.from(Array(7).keys()).map((i) => (
          <Checkbox key={i} checked={repeatDay.includes(i + 1)} disabled />
        ))}

        <Text>{plan.label}</Text>
        <Text>
          <GrainNum value={plan.grainNum} units={device?.unitType} />
        </Text>
        <Toggle
          onChange={() =>
            enableFeedingPlan(device.deviceSn, plan.id, !plan.enable)
          }
          checked={plan.enable}
        />
        <span className="flex">
          <Button variant="transparent" onClick={() => handleEditPlan(plan)}>
            <NotePencil size="1rem" />
          </Button>
          <Button
            title="Delete planned feed"
            variant="transparent"
            onClick={() => deleteFeedPlan(device.deviceSn, plan.id)}
          >
            <Trash size="1rem" />
          </Button>
        </span>
      </React.Fragment>
    );
  };

  const renderEditPlan = (
    plan: Partial<FeedingPlan>,
    setPlan: (plan: Partial<FeedingPlan>) => void
  ) => {
    return (
      <React.Fragment key={plan.id || "new"}>
        <Timepicker
          className=""
          value={plan.executionTime || ""}
          onChange={(e) => {
            setPlan({ ...plan, executionTime: e.target.value });
          }}
        />
        {Array.from(Array(7).keys()).map((i) => (
          <Checkbox
            key={i}
            checked={JSON.parse(plan.repeatDay || "[]").includes(i + 1)}
            onChange={(e) => {
              let newPlanRepeatDay = JSON.parse(plan.repeatDay || "[]");
              if (!e.target.checked) {
                newPlanRepeatDay = newPlanRepeatDay.filter(
                  (day: number) => day !== i + 1
                );
              } else {
                newPlanRepeatDay.push(i + 1);
              }
              setPlan({
                ...plan,
                repeatDay: JSON.stringify(newPlanRepeatDay),
              });
            }}
          />
        ))}
        <Input
          className=""
          type="text"
          value={plan.label || ""}
          onChange={(e) => setPlan({ ...plan, label: e.target.value })}
        />
        <GrainNumPicker
          value={plan.grainNum}
          units={device?.unitType}
          onChange={(e) =>
            setPlan({ ...plan, grainNum: Number(e.target.value) })
          }
          className="w-[150px]"
        />
        <Toggle
          checked={plan.enable}
          onChange={(e) => setPlan({ ...plan, enable: e.target.checked })}
        />
        <span className="flex">
          <Button variant="transparent" onClick={handleCancelPlan}>
            <XCircle size="1rem" />
          </Button>
          <Button variant="transparent" onClick={handlePlanSubmit}>
            <CheckCircle size="1rem" />
          </Button>
        </span>
      </React.Fragment>
    );
  };

  return (
    <>
      <Header>{device.name}</Header>
      <div className="mt-6 flex justify-between">
        <Header size="small">Device Schedule Today</Header>
        <Link to={`settings`}>
          <Button variant="transparent">Settings</Button>
        </Link>
      </div>
      <div className="grid mt-6 grid-cols-4 items-center max-w-[500px] gap-x-4">
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
        {deviceTodayFeedingPlan?.plans?.map((plan) => (
          <React.Fragment key={plan.planId}>
            <Text>{plan.time}</Text>
            <Text>{plan.grainNum * 10}g</Text>
            <Text>{stateMap[plan.state]}</Text>
            <Toggle
              onChange={() =>
                enableFeedingPlanToday(
                  device.deviceSn,
                  plan.planId,
                  ![
                    PlanState.EnabledUpcoming,
                    PlanState.EnabledCompleted,
                  ].includes(plan.state)
                )
              }
              checked={[
                PlanState.EnabledCompleted,
                PlanState.EnabledUpcoming,
              ].includes(plan.state)}
              disabled={[
                PlanState.EnabledCompleted,
                PlanState.DisabledCompleted,
              ].includes(plan.state)}
            />
          </React.Fragment>
        ))}
      </div>
      <div className="mt-6 flex justify-between">
        <Header size="small">Manual Feed</Header>
      </div>
      <span className="flex mt-6">
        <GrainNumPicker
          className="w-[200px]"
          units={device?.unitType}
          value={manualGrainNum}
          onChange={(e) => setManualGrainNum(Number(e.target.value))}
        />
        <Button
          variant="transparent"
          className="ml-4"
          onClick={() => setConfirmation(true)}
        >
          Dispense
        </Button>
      </span>

      <div className="mt-6 flex gap-x-4 items-center">
        <Header size="small">Device Schedule</Header>
        <Button variant="transparent" onClick={handleNewPlan}>
          <PlusCircle size="1rem" />
        </Button>
      </div>
      <div className="grid mt-6 grid-cols-[100px_repeat(7,25px)_1fr_1fr_1fr_50px] justify-center items-center max-w-[1000px] gap-x-4">
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
        {deviceFeedingPlan?.map((plan) =>
          editPlan?.id === plan.id
            ? renderEditPlan(editPlan, setEditPlan)
            : renderPlan(plan)
        )}
        {editPlan && !editPlan.id
          ? renderEditPlan(editPlan, setEditPlan)
          : null}
      </div>

      <div className="mt-6 flex justify-between">
        <Header size="small">Log</Header>
      </div>
      <div className="grid mt-6 grid-cols-[100px_1fr] items-center gap-x-4">
        <Text size="small" className="font-bold">
          Time
        </Text>
        <Text size="small" className="font-bold">
          Message
        </Text>
        {sortBy(logs, "recordTime")?.map((log) => (
          <React.Fragment key={log.recordTime}>
            {sortBy(log.workRecords, "recordTime").map((workRecord) => (
              <React.Fragment key={workRecord.id}>
                <Text>{formatTime(workRecord.createTime)}</Text>
                <Text>
                  {template(workRecord.content, {
                    ...workRecord,
                    ...unitMap[device.unitType](workRecord.actualGrainNum),
                  })}
                </Text>
              </React.Fragment>
            ))}
          </React.Fragment>
        ))}
      </div>
      <Modal onClose={() => setConfirmation(false)} open={confirmation}>
        <Text>
          Are you sure you want to dispense{" "}
          <GrainNum units={device?.unitType} value={manualGrainNum} /> of food?
        </Text>
        <span className="flex justify-end gap-2 pt-4">
          <Button variant="transparent" onClick={() => setConfirmation(false)}>
            Cancel
          </Button>
          <Button variant="transparent" onClick={handleManualFeed}>
            Confirm
          </Button>
        </span>
      </Modal>
    </>
  );
}
