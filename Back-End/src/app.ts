import express  from 'express';
import bcrypt from 'bcrypt'
const app = express();

let users:[{userName:string,passWord:string}] = [{userName:"",passWord:""}];



app.get('/',(req,res)=>{
    res.send("hello")
});

app.use(express.urlencoded({extended:true}));

app.use(express.json());

app.post('/user',async (req,res) => {
    const userName:string = req.body.userName;
    const passWord:string = req.body.passWord;

    //console.log('Username: ' + userName + ' | Password: ' + passWord );
    try{
        const hashedPassword = await bcrypt.hash(passWord,10);

        users.push({userName: userName,passWord: hashedPassword})

        //console.log('Username: ' + userName + ' | Password: ' + hashedPassword );



        

        res.status(201).send({
            success:true
        });
    }
   catch{
        res.status(500).send({
            success:false
        })
    }
})

app.post('/user/login',async (req,res) => {
    if(req.body.userName == undefined || req.body.passWord == undefined){
        return res.status(400).send({sucess:false})
    }

    const user = users.find(user => user.userName === req.body.userName);
    
    if( user == undefined){
        return res.status(401).send({sucess:false})
    }
    try{
        if(await bcrypt.compare(req.body.passWord,user.passWord)){
            return res.status(302).send({sucess:true})
        }
        else{
            res.status(401).send({sucess:false})
        }
    }
    catch{
        res.status(500).send({success:false})
    }
})

app.listen(5000,()=>{}); 