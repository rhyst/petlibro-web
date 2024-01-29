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
  const sliderRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLParagraphElement>(null);
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

  const getLabelPostion = () => {
    const minValue = 1;
    const maxValue = 48;
    const fraction = value / 48;
    const thumbHalfWidth = 10;
    const width = sliderRef.current?.clientWidth || 100;
    const left =
      ((value - minValue) / (maxValue - minValue)) *
        (width - thumbHalfWidth - thumbHalfWidth) +
      thumbHalfWidth;
    return {
      left: `${left}px`,
      transform:
        fraction > 0.5
          ? "translate(calc(-100% - 10px), 0)"
          : "translate(20px, 0)",
    };
  };

  useEffect(() => {
    const observer = new ResizeObserver(() => {
      if (labelRef?.current) {
        const { left, transform } = getLabelPostion();
        labelRef.current.style.left = left;
        labelRef.current.style.transform = transform;
      }
    });
    observer.observe(sliderRef.current!);
    return () => observer.disconnect();
  });

  const { left, transform } = getLabelPostion();

  return (
    <div className={"flex items-center relative " + className} ref={sliderRef}>
      <input
        className="w-full cursor-pointer accent-green-800"
        type="range"
        min="1"
        max="48"
        id={id}
        value={value}
        onChange={handleChange}
        {...props}
      />
      <p
        className="absolute text-sm font-bold rounded-md bg-[#000000] text-green-600 border border-green-600 p-[4px] m-[-4px]"
        ref={labelRef}
        style={{
          left,
          transform,
          userSelect: "none",
        }}
      >
        {displayValue}
      </p>
    </div>
  );
};

export default GrainNumPicker;
