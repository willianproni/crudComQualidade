import { ResultTodos } from "core/models";

async function getListTodo(): Promise<ResultTodos> {
    return fetch("/api/todos").then((res) => res.json());
}

export const controller = {
    getListTodo,
};
