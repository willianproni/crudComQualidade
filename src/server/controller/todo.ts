import { read } from "@db-crud-todo";
import { NextApiRequest, NextApiResponse } from "next";

function get(req: NextApiRequest, res: NextApiResponse) {
    const responseTodoList = read();

    res.status(200).json({
        todos: responseTodoList,
    });
}

export const todoController = {
    get,
};
