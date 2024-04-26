const grpc = require('@grpc/grpc-js')
const protoLoader = require('@grpc/proto-loader')
const packageDef = protoLoader.loadSync("todo.proto",{})
const grpcObject = grpc.loadPackageDefinition(packageDef);
const todoPackage = grpcObject.todoPackage

const server = new grpc.Server()
const todos = []
server.bindAsync("0.0.0.0:4000", grpc.ServerCredentials.createInsecure(), () => {
   console.log("server is listening in 4000")
  });
  server.addService(todoPackage.Todo.service,{
"createTodo":createTodo,
"readTodos":readTodos
});


function createTodo(call,callback)
{
    console.log("this is crete todo")
    const todoItem = {
        "id":todos.length +1,
        "text":call.request.text
    }
todos.push(todoItem)
console.log(todos)
callback(null,todoItem)
console.log("the todos are",todos)
}
function readTodos(call,callback)
{
    console.log("enters into read todos in server")
    console.log(todos)
    todos.forEach(t => call.write(t));
    call.end();

}


// const grpc = require('@grpc/grpc-js')
// const protobuf = require('protobufjs')
// const root = protobuf.loadSync('todo.proto')
// // const todoPackage = root.lookup('todoPackage');
// const TodoService = root.lookupService('todo');
// console.log(root,"-------------------")
// console.log(TodoService,"this is todo service ")

// const server = new grpc.Server();

// server.addService( TodoService.todo, {
//     createTodo:CreateTodo
// })
// const todos = [
//     {
//         id:1,
//         text:"abc"
//     },
//     {
//         id:2,
//         text:"xyz"
//     }
// ]
// function CreateTodo(call,callback)
// {
//     let obj = {
//         id:1,
//         text:"helo"
//     }
//     callback(null,obj)
// }
// function readTodos(call,callback)
// {
    
//    todos.forEach((e)=>{
//     call.write(null,e)
//    })
//    call.end()
// }
