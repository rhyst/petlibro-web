// Tailwind react toggle component

import { GrainUnit } from "@/constants";
import React, { ChangeEvent, useId, useState, useRef, useEffect } from "react";

interface GrainNumPickerProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  units?: GrainUnit;
}

const GrainNumPicker: React.FC<GrainNumPickerProps> = ({
  className,
  ...props
}) => {
  const id = useId();
  const ref = useRef<HTMLDivElement>(null);
  const [intValue, setIntValue] = useState(1);
  const [intUnits, setIntUnits] = useState<GrainUnit>(GrainUnit.TenGrams);

  const value = Number(props.value) || intValue;
  const onChangeInt = (e: ChangeEvent<HTMLInputElement>) =>
    setIntValue(Number(e.target.value));
  const handleChange = props.value ? props.onChange : onChangeInt;

  const units = props.units || intUnits;

  let displayValue = `${value}`;
  switch (units) {
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

  const fraction = value / 48;
  const half_thumb_width = 20 / 2;
  const slider_width = ref.current?.clientWidth || 100;
  const center_position = slider_width / 2;
  const value_px_position = fraction * slider_width;
  const dist_from_center = value_px_position - center_position;
  const percent_dist_from_center = dist_from_center / center_position;
  const offset = percent_dist_from_center * half_thumb_width;
  const final_label_position = `${value_px_position - offset}px`;
  const translate = fraction > 0.5 ? "translate(calc(-100% - 15px), 0)" : "translate(15px, 0)";

  useEffect(() => {
    const interval = setInterval(() => {
      if (props.value) {
        setIntValue(Number(props.value));
      }
    }, 100);
    return () => clearInterval(interval);
  }
  , [props.value]);
  

  return (
    <div
      className={"flex items-center relative w-full " + className}
      ref={ref}
    >
      <input
       className="w-full cursor-pointer accent-green-800"
        type="range"
        defaultValue="1"
        min="1"
        max="48"
        id={id}
        value={value}
        onChange={handleChange}
        {...props}
      />
      <p
        className="absolute text-sm font-bold rounded-md bg-[#000000] text-green-600 border border-green-600 p-[4px] m-[-4px]"
        style={{
          left: final_label_position,
          transform: translate,
          userSelect: "none",
        }}
      >
        {displayValue}
      </p>
    </div>
  );
};

export default GrainNumPicker;
