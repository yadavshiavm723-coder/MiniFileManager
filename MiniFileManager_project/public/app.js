const filenameInput=document.getElementById("filename");
const filecontentInput=document.getElementById("content");

console.log("Hello");
const msg=document.getElementById("message");
async function createFile(){
    const filename=filenameInput.value;
    const filecontent=filecontentInput.value;
    console.log(filecontent);
    console.log(filename);
    const response= await fetch("/api/createFile",{
        method:"POST",
        header:{
            "content-type":"",
        },
        body:JSON.stringify({fileName:filename,fileContent:filecontent})
    })

    const data=await response.JSON();
    console.log(data);
    msg.textContent=data.message;
    filecontentInput.textContent="";
    filenameInput=textContent="";
}