const http=require("node:http")
let server=http.createServer((req,res)=>{
    res.end("create mode 160000 backend")
})

const PORT=process.env.PORT||3000

server.listen(PORT,()=>{
    console.log(`Server Runnig on Port ${PORT}`)
})