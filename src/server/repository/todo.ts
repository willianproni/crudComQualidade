import { read } from "@db-crud-todo";

interface TodoRepositoryGetParams {
    page?: number;
    limit?: number;
}

interface Todo {
    id: string;
    content: string;
    date: string;
    done: boolean;
}

interface TodoRepositoryGetOutput {
    todos: Todo[];
    totalAmoutTodos: number;
    totalPages: number;
}

function get({
    page,
    limit,
}: TodoRepositoryGetParams = {}): TodoRepositoryGetOutput {
    const currentPage = page || 1;
    const currentLimit = limit || 10;

    const ALL_TODOS = read();

    const startIndex = (currentPage - 1) * currentLimit; //0 * 10 = 0
    const endIndex = currentPage * currentLimit; // 1 * 10 = 10
    const paginatedTodos = ALL_TODOS.slice(startIndex, endIndex);
    const totalPages = Math.ceil(ALL_TODOS.length / currentLimit); //total de pages 40 / 10 = 4 pages
    //Math.ceil sempre arredonda para cima

    return {
        todos: paginatedTodos,
        totalAmoutTodos: ALL_TODOS.length,
        totalPages: totalPages,
    };
}

export const todoRepository = {
    get,
};
