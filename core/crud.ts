
import fs from "fs";
import { ResultTodos, Todo } from "./models";

const DB_FILE_PATH = './core/db' //caminho do arquivo
console.log('[CRUD]')

//writeFileSync --> escrever um arquivo de maneira assíncrona fs.writeFileSync('caminho do arquivo (onde vai ser salvo)', conteúdo do arquivo)
function create(content: string){ //Simula a criação de um dado no banco, aqui estamos criando um arquivo com o dado enviado
    const todo : Todo = { //Criando um objeto JSON
        date: new Date().toISOString(),
        content: content,
        done: false
    };

    const todos: Array<Todo> = [
        ...read(),
        todo
    ]

    //precisa salvar o content no sistema
    fs.writeFileSync(DB_FILE_PATH, JSON.stringify({
        todos,
    }, null, 2)) //salvando o conteúdo(content) no arquivo DB_FILE_PATH
    return content;
}

 function read(): Todo[]{
    const dbString = fs.readFileSync(DB_FILE_PATH, "utf-8")
    const db: ResultTodos = JSON.parse(dbString || '{}')
    if(!db.todos) return []
    return db.todos
}

function CLEAR_DB() {
    fs.writeFileSync(DB_FILE_PATH, '')
}

//simulação
CLEAR_DB()
create('Primeira TODO')
create('Segunda TODO')
console.log(read())