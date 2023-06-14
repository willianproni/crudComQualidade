import { UUID } from "crypto";

export interface ResultTodos {
    todos: Todo[]
}

export interface Todo {
    id: UUID;
    date: string;
    content: string;
    done: boolean;
};