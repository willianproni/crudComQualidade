export interface ResultTodos {
    todos: Todo[]
}

export interface Todo {
    id: string;
    date: string;
    content: string;
    done: boolean;
};