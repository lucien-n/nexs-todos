import { gql } from "@/__generated__";

export const GET_TODOS: any = gql(`
  query GetTodos {
    todos {
      id
      content
      completed
    }
  }
`);
