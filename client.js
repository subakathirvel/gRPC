const grpc = require('@grpc/grpc-js')
const protoLoader = require('@grpc/proto-loader')
const packageDef = protoLoader.loadSync("todo.proto",{})
const grpcObject = grpc.loadPackageDefinition(packageDef);
const todoPackage = grpcObject.todoPackage

const text  = process.argv[2]
const client1 = new todoPackage.Todo("localhost:4000",grpc.credentials.createInsecure())
client1.createTodo({
    "id":-1,
    "text":text
},(err,response)=>{
  
    // console.log("recieve from server "+ JSON.stringify(response))
})

const call =  client1.readTodos()
call.on("data",item =>{
    console.log("the stream recieved from server is",item,"the type is ",typeof item)
})
call.on('end',()=>{
    console.log("all readed --------------------------------------------")
})



