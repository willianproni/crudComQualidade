import { todoRepository } from "@ui/repository/todo";
interface TodoControllerGetParams {
    pageNumber: number;
}

async function getListTodo({ pageNumber }: TodoControllerGetParams) {
    return todoRepository.get({
        page: pageNumber,
        limit: 10,
    });
}

export const controller = {
    getListTodo,
};
