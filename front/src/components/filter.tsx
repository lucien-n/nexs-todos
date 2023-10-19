import { FilterOption } from "@/lib/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

type Props = {
  values: FilterOption[];
  onChange: (filter: FilterOption) => void;
};

const Filter = ({ values, onChange }: Props) => {
  return (
    <Select
      onValueChange={(value) =>
        onChange(values.filter(({ value: _value }) => value === _value)[0])
      }
    >
      <SelectTrigger>
        <SelectValue placeholder={values[0].label}></SelectValue>
      </SelectTrigger>
      <SelectContent>
        {values.map(({ label, value }) => (
          <SelectItem value={value} key={value}>
            {label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default Filter;
