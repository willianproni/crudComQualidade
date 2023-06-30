/* eslint-disable no-console */
import fs from "fs";
import { ResultTodos, Todo } from "./models";
import { UUID, randomUUID } from "crypto";

const DB_FILE_PATH = "./core/db"; //caminho do arquivo

//writeFileSync --> escrever um arquivo de maneira assíncrona fs.writeFileSync('caminho do arquivo (onde vai ser salvo)', conteúdo do arquivo)
function create(content: string): Todo {
    //Simula a criação de um dado no banco, aqui estamos criando um arquivo com o dado enviado (POST)
    const todo: Todo = {
        //Criando um objeto JSON (Lista de tarefas)
        id: randomUUID(), //Gerando um Randon ID
        date: new Date().toISOString(), //Criando uma Data para a tarefa
        content: content, //Centeúdo da tarefa (string)
        done: false, //Se foi concluida ou não
    };

    const todos: Array<Todo> = [
        //Criando objeto
        ...read(), //Buscando a lista de Tarefas
        todo, //Adicionando a nova tarefa
    ];

    //precisa salvar o content no sistema
    fs.writeFileSync(
        DB_FILE_PATH,
        JSON.stringify(
            {
                //Escrevendo novo valor
                todos,
            },
            null,
            2
        )
    ); //salvando o conteúdo(content) no arquivo DB_FILE_PATH
    return todo; //Retornando a lista
}

function read(): Todo[] {
    //Função para leitura da lista (GET)
    const dbString = fs.readFileSync(DB_FILE_PATH, "utf-8"); //Faz a leitura do arquivo e retorna no formato utf-8
    const db: ResultTodos = JSON.parse(dbString || "{}"); //Converte a lista que retonar em JSON, caso venha vazia retornar um objeto{}
    if (!db.todos) return []; //Verificar se tem valor caso não tenha retornar []
    return db.todos; //Retorno do valor
}

function update(idUptdate: UUID, contentUpdate: Partial<Todo>) {
    //Função de Update (PUT)
    let updateTodo;
    const todos = read(); //buscar a lista de tarefas
    const hasResultFindId = todos.find(({ id }) => id === idUptdate); // Buscar pelo id igual ao solicitado do update

    if (hasResultFindId) {
        // Se encontrar o id
        updateTodo = Object.assign(hasResultFindId, contentUpdate); //Fazer um object.assing que modificar os valores iguals e adicionar o novos ao objeto solicitado
        fs.writeFileSync(DB_FILE_PATH, JSON.stringify({ todos }, null, 2)); //Reescrever a lista de tarefas com o objeto atualizado
    }

    if (!updateTodo) {
        //Verificar se o objeto foi realmente modificado
        throw new Error("Please, provide another ID!"); //caso não retornar erro, falando que o ID está errado
    }

    return updateTodo; //Retornar o objeto alterado
}

function updateContentById(id: UUID, content: string) {
    //Chama a função update
    update(id, {
        content,
    });
}

function deleteById(id: string) {
    //função de delete (DELETE)
    const todos = read(); //ler a lista de tarefas

    const todoWithoutDeleteOne = todos.filter((todo) => {
        //filtrar pela lista a tarefa com o mesmo ID enviado
        if (todo.id === id) {
            //caso encontre
            return false; //não retornar ele
        }
        return true; //retornar o objeto da lista
    });

    fs.writeFileSync(
        DB_FILE_PATH,
        JSON.stringify({ todos: todoWithoutDeleteOne }, null, 2)
    ); //Rescrever a lista de tarefas sem o id deletado
}

function CLEAR_DB() {
    //Função para limpar o documento
    fs.writeFileSync(DB_FILE_PATH, ""); //Escrever documento vazio
}

// -- simulação --
CLEAR_DB(); //Limpando o document
//--------
create("Primeira TODO"); //Criando o primeiro objeto
//--------
const responseTwoCreate = create("Segunda TODO"); //Criando o segundo objeto
//--------
const responseThreeCreate = create("Terceira TODO"); //Criando o terceiro objeto
//--------
deleteById(responseTwoCreate.id); // Deletando o segundo objeto criado
//--------
updateContentById(responseThreeCreate.id, "Atualização do content"); //Atualizando o terceiro objeto criado
//--------
const todos = read(); //Lendo a lista de tarefas
//--------
// -- Visualização
console.log(todos); //Visualizar lista de tarefas
console.log("Tamanho da Todos: ", todos.length); //Verificar tamanho da lista de tarefas
