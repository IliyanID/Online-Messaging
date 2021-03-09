import express  from 'express';
import bcrypt from 'bcrypt'
const app = express();

const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const databaseName = 'Account'


const mongoURL = 'mongodb://localhost:27017';


MongoClient.connect(mongoURL,{useNewUrlParser:true},(error:any,client:any) =>{
    if(error){
        console.log(error);
        return console.log('Unable to connect to Database');
    }

    const db = client.db(databaseName);
    /*db.collection('users').insertOne({
        userName:"testing",
        passWord:"password"
    })*/

   





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
            db.collection('users').insertOne({userName: userName,passWord: hashedPassword},(error:any)=>{
                console.log(error);
                if(!error){
                    res.status(201).send({ //if user was created succesfully 
                        error:false,
                        message:"The user " + userName + " was succesfully created!"
                    });
                }
                else{
                    res.status(500).send({ //if user was created succesfully 
                        error:true,
                        message:"The username " + userName + " is already taken."
                    });
                }
            })

        }
    catch{
            res.status(500).send({ //Internal server error
                error:true,
                message:"Error 500: Request Failed Internal Server Error. Please try again later."
            });
        }
    })

    app.post('/user/login',async (req,res) => {
        const userName:string = req.body.userName;
        const passWord:string = req.body.passWord;

        if(userName === undefined || passWord === undefined){ //if input is malformed error 400 = Bad Request
            return res.status(400).send({
                error:true,
                message:"Error 400: Received Bad Request. Pleast Try Again."
            });
        }

        db.collection('users').find( { userName:userName} ).toArray((error:any,users:any)=>{
            if(error){
                return ()=>console.log("Failed to Query Database");
            }
            let user;
            if(users.length !== 0)
                user = users[0];
            if( user == undefined){ //if user doensn't exist error 401 = unauthorized
                return res.status(401).send({
                    error:true,
                    message:"Error 401: Incorrect Username or Password"
                });
            }
            try{
                bcrypt.compare(passWord,user.passWord,(error:any,isValid:boolean) =>{
                    if(isValid){
                        return res.status(302).send({
                            error:false,
                            message:"Welcome " + userName + "!"
                        });
                    }
                    else{
                        res.status(401).send({
                            error:true,
                            message:"Error 401: Incorrect Username or Password"
                        });//if password is incorrect error 401 = unauthorized
                    }
                })
                
            }
            catch{
                res.status(500).send({
                    error:true,
                    message:"Error 500: Request Failed Internal Server Error. Please try again later."
                }); //Internal Server error
            }
        })
            
    });

        //const user = users.find(user => user.userName === userName); //Find the user with the same username
        


})





let port = 5000;
app.listen(port,()=>{console.log("New Server Running on Port: " + port)}); 