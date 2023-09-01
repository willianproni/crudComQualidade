/* eslint-disable no-console */
import React, { useEffect, useState } from "react";
import { GlobalStyles } from "@ui/theme/GlobalStyles";
import { controller } from "@ui/controller/todo";
const bg = "https://mariosouto.com/cursos/crudcomqualidade/bg";

interface HomeTodo {
    id: string;
    content: string;
    date: Date;
    done: boolean;
}

export default function Page() {
    const [initialLoadComplete, setInitialLoadComplete] = useState(false);
    const [todoSearch, setTodoSearch] = useState("");
    const [totalPages, setTotalPages] = useState(0);
    const [todoList, setTodoList] = useState<HomeTodo[]>([]);
    const [loading, setLoading] = useState(true);
    const availablePages = [1, 2, 3, 4, 5];
    const totalAvailablePages = availablePages.slice(0, totalPages);

    const homeTodos = todoList.filter((todo) => {
        return todo.content
            .toLocaleLowerCase()
            .includes(todoSearch.toLocaleLowerCase());
    });

    useEffect(() => {
        setInitialLoadComplete(true);
        if (!initialLoadComplete) {
            controller
                .getListTodo({ pageNumber: 1 })
                .then(({ todos, totalPages }) => {
                    console.log(`valor retornando:`, todos);
                    setTodoList(todos);
                    setTotalPages(totalPages);
                    setLoading(false);
                });
        }
    }, []);

    return (
        <main>
            <GlobalStyles themeName="coolGrey" />
            <header
                style={{
                    backgroundImage: `url('${bg}')`,
                }}
            >
                <div className="typewriter">
                    <h1>O que fazer hoje?</h1>
                </div>
                <form>
                    <input type="text" placeholder="Correr, Estudar..." />
                    <button type="submit" aria-label="Adicionar novo item">
                        +
                    </button>
                </form>
            </header>

            <section>
                <form>
                    <input
                        type="text"
                        placeholder="Filtrar lista atual, ex: Dentista"
                        onChange={function handleSearch(event) {
                            setTodoSearch(event.target.value);
                        }}
                    />
                </form>

                <table border={1}>
                    <thead>
                        <tr>
                            <th align="left">
                                <input type="checkbox" disabled />
                            </th>
                            <th align="left">Id</th>
                            <th align="left">Conteúdo</th>
                            <th />
                        </tr>
                    </thead>

                    <tbody>
                        {loading ? (
                            <tr>
                                <td
                                    colSpan={4}
                                    align="center"
                                    style={{ textAlign: "center" }}
                                >
                                    Carregando...
                                </td>
                            </tr>
                        ) : (
                            ""
                        )}

                        {homeTodos.map((todo) => {
                            return (
                                <tr key={todo.id}>
                                    <td>
                                        <input type="checkbox" />
                                    </td>
                                    <td>{todo.id.substring(0, 4)}</td>
                                    <td>{todo.content}</td>
                                    <td align="right">
                                        <button data-type="delete">
                                            Apagar
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}

                        {homeTodos.length === 0 && !loading ? (
                            <tr>
                                <td colSpan={4} align="center">
                                    Nenhum item encontrado
                                </td>
                            </tr>
                        ) : null}

                        {totalAvailablePages.map((numberPage, index) => (
                            <button
                                data-type="nav"
                                onClick={() => {
                                    const nextPage = numberPage;
                                    console.log(`nextPage`, nextPage);
                                    controller
                                        .getListTodo({
                                            pageNumber: nextPage,
                                        })
                                        .then(({ todos, totalPages }) => {
                                            setTodoList(todos);
                                            setTotalPages(totalPages);
                                            setLoading(false);
                                        });
                                }}
                                key={index}
                            >
                                {numberPage}
                            </button>
                        ))}
                    </tbody>
                </table>
            </section>
        </main>
    );
}
