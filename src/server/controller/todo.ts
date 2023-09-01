import { todoRepository } from "@server/repository/todo";
import { NextApiRequest, NextApiResponse } from "next";

function get(req: NextApiRequest, res: NextApiResponse) {
    const query = req.query;

    const page = Number(query.page);
    const limit = Number(query.limit);

    if (query.page && isNaN(page)) {
        res.status(400).json({
            error: {
                message: "`page` must be a number",
            },
        });
    }

    if (query.limit && isNaN(limit)) {
        res.status(400).json({
            error: {
                message: "`limit` must be a number",
            },
        });
    }

    const output = todoRepository.get({
        page: Number(query.page),
        limit: Number(query.limit),
    });

    res.status(200).json({
        todos: output.todos,
        total: output.totalAmoutTodos,
        pages: output.totalPages,
    });
}

export const todoController = {
    get,
};
