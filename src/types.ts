export type Todo = {
  id: string;
  title: string;
  completed: boolean;
  createdAt: number;
  updatedAt: number;
};

export type Todos = {
  Items: Todo[];
  nextToken?: string;
};

export type CreateTodoArguments = {
  title?: string;
};

export type DeleteTodoArguments = {
  id?: string;
};

export type UpdateTodoArguments = {
  id?: string;
  todo?: {
    title?: string;
    completed?: boolean;
  };
};

export type GetTodoArguments = {
  id?: string;
};

export type GetTodosArguments = {
  limit?: number;
  token?: string;
};
