import express  from 'express';
import bcrypt from 'bcrypt'
const app = express();




let users:[{userName:string,passWord:string}] = [{userName:"",passWord:""}];





app.use(express.urlencoded({extended:true}));

app.use(express.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.post('/user',async (req,res) => {
    const userName:string = req.body.userName;
    const passWord:string = req.body.passWord;
    
   

    try{
        const hashedPassword = await bcrypt.hash(passWord,10);
        users.push({userName: userName,passWord: hashedPassword})
        res.status(201).send({ //if user was created succesfully 
            success:true
        });
    }
   catch{
        res.status(500).send({ //Internal server error
            success:false
        })
    }
})

app.post('/user/login',async (req,res) => {
    const userName:string = req.body.userName;
    const passWord:string = req.body.passWord;

    if(userName === undefined || passWord === undefined){ //if input is malformed error 400 = Bad Request
        return res.status(400).send({sucess:false})
    }


    const user = users.find(user => user.userName === userName); //Find the user with the same username
    
    if( user == undefined){ //if user doensn't exist error 401 = unauthorized
        return res.status(401).send({sucess:false})
    }
    try{
        if(await bcrypt.compare(passWord,user.passWord)){ //if username and password is correct status 302 = Found
            return res.status(302).send({sucess:true})
        }
        else{
            res.status(401).send({sucess:false})//if password is incorrect error 401 = unauthorized
        }
    }
    catch{
        res.status(500).send({success:false}) //Internal Server error
    }
})



app.listen(5000,()=>{}); 