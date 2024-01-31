"use client";

import Header from "@/components/Header";
import Select from "@/components/Select";
import Text from "@/components/Text";
import { GrainUnit } from "@/constants";
import { useStore } from "@/store";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function DeviceList() {
  const router = useRouter();
  const { devices, updateUnitType } = useStore();
  const device = devices.find((d) => d.deviceSn === router.query.id);

  if (!device) {
    return <Text>Device not found</Text>;
  }

  return (
    <>
      <div className="mt-6 flex justify-between">
        <Header size="small">Unit Type</Header>
      </div>
      <Select
        className="block mt-3"
        value={`${device?.unitType}`}
        onChange={e => updateUnitType(device?.deviceSn, Number(e.target.value))}
        options={[
          { label: "Grams", value: `${GrainUnit.TenGrams}` },
          { label: "Milliliters", value: `${GrainUnit.TwentyMl}` },
          {
            label: "Ounces",
            value: `${GrainUnit.NoughtPointThreeFiveOunces}`,
          },
          { label: "Cups", value: `${GrainUnit.TwelfthsOfCup}` },
        ]}
      />
    </>
  );
}
