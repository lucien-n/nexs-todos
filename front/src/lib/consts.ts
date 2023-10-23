import { FilterOption } from "./types";

export const FILTERS: { [key: string]: FilterOption[] } = {
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
