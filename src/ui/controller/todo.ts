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

function filterTodoByContent<Todo>(
    todos: Array<Todo & { content: string }>,
    seach: string
): Todo[] {
    const homeTodos = todos.filter((todo) => {
        const searchNormalized = seach.toLowerCase();
        const contentNormalized = todo.content.toLowerCase();
        return contentNormalized.includes(searchNormalized);
    });

    return homeTodos;
}

export const controller = {
    getListTodo,
    filterTodoByContent,
};
