const http=require("http");
const path=require("path");
const fs=require("fs");

const server=http.createServer((req,res)=>{
    if(req.method==="GET" &&req.url==='/'){
        const filePath=path.join(__dirname,"public","index.html");
        // Reading file to upload on server;
        fs.readFile(filePath,"utf8",(err,data)=>{
            if(err){
                res.writeHead(500,{"content-type":"text/plain"});
                res.end("Error loading HTML file");
                return;
            }
            // sending metadata to server
            res.writeHead(200,{"content-type":"text/html"});
            // sending file to server
            res.end(data);
        })
        return;
    }
    if(req.method==="GET" && req.url==="/style.css"){
        const filePath=path.join(__dirname,"public","style.css");
        fs.readFile(filePath,"utf8",(err,data)=>{
            if(err){
                res.writeHead(500,{"content-type":"text/plain"});
                res.end("Error loading CSS file");
                return;
            } 
            // sending metadata to server
            res.writeHead(200,{"content-type":"text/css"});
            // sending file to server
            res.end(data);
        })
        return;
        
    }
    if(req.method==="GET" && req.url==="/app.js"){
        const filePath=path.join(__dirname,"public","app.js");
        fs.readFile(filePath,"utf8",(err,data)=>{
            if(err){
                res.end("Error loading JavaScript file");
                return;
            }
            res.setHeader("content-type","application/javascript");
            res.end(data);
        })
        return;
    }

    if(req.method==="POST" && req.url==="/api/createFile"){
        let data="";
        req.on("data",(chunk)=>{
            data=data+chunk;
        })

        req.on("end",()=>{
            const fileDate=JSON.parse(data);
            console.log(fileDate);
            const filePath=path.join(__dirname,"data",fileDate.fileName);
            fs.writeFile(filePath,fileDate.fileContent,(err)=>{
                if(err){
                    res.end(JSON.stringify({message:"Error is creating file"}));
                }else{
                    res.end(JSON.stringify({message:"File cread successfully"}));
                }
            })
        })
    }
    res.writeHead(404,{"content-type":"text/html"});
    res.end("404-Page not found");
})

server.listen(8080,()=>{
    console.log("Server is running at 8080");
}) 