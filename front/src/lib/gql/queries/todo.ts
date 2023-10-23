import { gql } from "@/__generated__";

export const GET_TODOS = gql(`
  query GetTodos {
    todos {
      id
      content
      completed
      createDate
      updateDate
    }
  }
`);
