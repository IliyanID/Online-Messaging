import express  from 'express';
const app = express();

app.get('/',(req,res)=>{
    res.send("hello")
});

app.use(express.urlencoded({extended:true}));

app.use(express.json());

app.post('/user',(req,res) => {
    const userName:string = req.body.userName;
    const passWord:string = req.body.passWord;

    console.log('Username: ' + userName + ' | Password: ' + passWord );

    res.send({
        success:true,
        token: Math.floor(Math.random() * 100000000000)
    });
})

app.listen(5000,()=>{}); 