import { Todo } from "@/__generated__/graphql";
import { Dispatch, SetStateAction } from "react";
import Filter from "./filter";
import { FilterOption } from "@/lib/types";

const FILTERS: { [key: string]: FilterOption[] } = {
  by: [
    { label: "Create Date", value: "createDate" },
    { label: "Update Date", value: "updateDate" },
    { label: "Content", value: "content" },
    { label: "Completed", value: "completed" },
  ],
  direction: [
    { label: "Ascending", value: "asc" },
    { label: "Descending", value: "desc" },
  ],
};

type Props = {
  setTodos: Dispatch<SetStateAction<Todo[]>>;
};

const Filters = ({ setTodos }: Props) => {
  return (
    <>
      <div className="w-full">
        <p>By</p>
        <Filter values={FILTERS.by} onChange={(_) => {}} />
      </div>
      <div className="w-full">
        <p>Direction</p>
        <Filter values={FILTERS.direction} onChange={(_) => {}} />
      </div>
    </>
  );
};

export default Filters;
