import { Todo } from "@/__generated__/graphql";
import { Dispatch, SetStateAction } from "react";
import Filter from "./filter";
import { FILTERS } from "@/lib/consts";
import { Filters } from "@/lib/types";

type Props = {
  setFilters: Dispatch<SetStateAction<Filters>>;
  filters: Filters;
};

const Filters = ({ setFilters, filters }: Props) => {
  return (
    <>
      <div className="w-full">
        <p>By</p>
        <Filter
          values={FILTERS.by}
          onChange={({ value: by }) => setFilters({ ...filters, by })}
        />
      </div>
      <div className="w-full">
        <p>Direction</p>
        <Filter
          values={FILTERS.direction}
          onChange={({ value: direction }) =>
            setFilters({ ...filters, direction })
          }
        />
      </div>
    </>
  );
};

export default Filters;
