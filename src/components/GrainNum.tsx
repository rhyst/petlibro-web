// Tailwind react toggle component

import { GrainUnit } from "@/constants";
import React, { ChangeEvent, useId, useState } from "react";

interface GrainNumProps extends React.HTMLAttributes<HTMLElement> {
  units?: GrainUnit;
  value: number;
}

const GrainNum: React.FC<GrainNumProps> = ({ className, units, ...props }) => {
  const id = useId();
  const value = Number(props.value);
  const unit = units || GrainUnit.TenGrams;

  let displayValue = `${value}`;
  switch (unit) {
    case GrainUnit.TenGrams:
      displayValue = `${value * 10}g`;
      break;
    case GrainUnit.NoughtPointThreeFiveOunces:
      displayValue = `${value * 0.35}oz`;
      break;
    case GrainUnit.TwentyMl:
      displayValue = `${value * 20}ml`;
      break;
    case GrainUnit.TwelthsOfCup:
      const whole = Math.floor(value / 12);
      const wholeText = whole > 0 ? `${whole} ` : "";
      const rem = value % 12;
      const remText = rem > 0 ? `${rem}/12` : "";
      displayValue = `${wholeText}${remText} cup${
        whole === 1 && rem === 0 ? "" : "s"
      }`;
      break;
  }

  return displayValue;
};

export default GrainNum;
