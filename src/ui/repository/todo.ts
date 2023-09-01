/* eslint-disable no-console */
interface TodoRepositoryGetParams {
    //Dados de entrada na função Get
    page: number;
    limit: number;
}

interface TodoRepositoryGetOutput {
    //Dados de saída da função Get
    todos: Todo[];
    totalAmoutTodos: number;
    totalPages: number;
}

async function get({
    page,
    limit,
}: TodoRepositoryGetParams): Promise<TodoRepositoryGetOutput> {
    return fetch(`/api/todos?page=${page}&limit=${limit}`).then(async (res) => {
        const responseParsed = parseTodosFromServer(await res.json());

        return {
            todos: responseParsed.todos,
            totalAmoutTodos: responseParsed.total,
            totalPages: responseParsed.pages,
        };
    });
}

export const todoRepository = {
    get,
};

//Model/Schema
interface Todo {
    id: string;
    content: string;
    date: Date;
    done: boolean;
}

function parseTodosFromServer(responseBody: unknown): {
    total: number;
    pages: number;
    todos: Todo[];
} {
    if (
        responseBody !== null && //é diferente de null
        typeof responseBody === "object" && //o tipo dele é um objeto
        "todos" in responseBody && //temos algum objeto chamado todos
        "total" in responseBody && //temos algum objeto chamado todos
        "pages" in responseBody && //temos algum objeto chamado todos
        Array.isArray(responseBody.todos) //é um array de todos
    ) {
        return {
            total: Number(responseBody.total),
            pages: Number(responseBody.pages),
            todos: responseBody.todos.map((todo: unknown) => {
                if (todo === null && typeof todo !== "object") {
                    throw new Error("Invalid todo From API");
                }

                const { id, content, date, done } = todo as {
                    id: string;
                    content: string;
                    date: string;
                    done: string;
                };

                return {
                    id,
                    content,
                    date: new Date(date),
                    done: String(done).toLowerCase() === "true",
                };
            }),
        };
    }

    return {
        todos: [],
        pages: 1,
        total: 0,
    };
}
