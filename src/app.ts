import express from 'express';

const app = express();

app.get('/',(req,res)=>{
    res.send("hello");
})

app.use(express.json())
app.use(
    express.urlencoded({
        extended:true
    })
)
app.post('/user',(req,res)=>{
    console.log(req.body.todo);
    let response = {sucess:true}
    res.send(response);
})

app.listen(3000,()=>{console.log("Server running")})