import { useParams } from "react-router-dom";
import Header from "@/components/Header";
import Select from "@/components/Select";
import Text from "@/components/Text";
import { GrainUnit } from "@/constants";
import { useStore } from "@/store";

export default function DeviceList() {
  const params = useParams();
  const { devices, updateUnitType } = useStore();
  const device = devices.find((d) => d.deviceSn === params.id);

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
        onChange={(e) =>
          updateUnitType(device?.deviceSn, Number(e.target.value))
        }
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
