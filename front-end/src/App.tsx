import React,{useState} from 'react';

import './App.css';
const debug = true



const createAccount = async(e:any) =>{



  e.preventDefault();
  let userName:string = "";
  let passWord:string = "";
  
  let doc= document.getElementById('cuserName') as HTMLInputElement;
  if(doc != null){
    userName = doc.value;
    doc.value = "";
  }
  doc= document.getElementById('cpassWord') as HTMLInputElement;
  if(doc != null){
    passWord = doc.value;
    doc.value = "";
  }

  let credentials = {userName:userName,passWord:passWord};


  let headers = new Headers();
  headers.set('Content-Type', "application/json");

    

  let url = "http://192.168.0.105:5000/user";
  //let response = await fetch(url,{method: 'POST', {headers:headers, body:credentials.toString()});



  
  const response = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    //mode: 'cors', // no-cors, *cors, same-origin
    //cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    //credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json'
      //"Access-Control-Allow-Origin": "*"
      
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },

    //redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(credentials) // body data type must match "Content-Type" header
  });

  let rawData = await response.json();
  
  console.log(rawData.success);

  
}



const App = () => {
  const [login,setLogin] = useState<string>('No');

  const sendLogin = async(e:any) =>{



    e.preventDefault();
    let userName:string = "";
    let passWord:string = "";
    
    let doc= document.getElementById('userName') as HTMLInputElement;
    if(doc != null){
      userName = doc.value;
      doc.value = "";
    }
    doc= document.getElementById('passWord') as HTMLInputElement;
    if(doc != null){
      passWord = doc.value;
      doc.value = "";
    }
  
    let credentials = {userName:userName,passWord:passWord};
  
  
    let headers = new Headers();
    headers.set('Content-Type', "application/json");
  
      
  
    let url = "http://192.168.0.105:5000/user/login";
    //let response = await fetch(url,{method: 'POST', {headers:headers, body:credentials.toString()});
  
  
  
    
    const response = await fetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      //mode: 'cors', // no-cors, *cors, same-origin
      //cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      //credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json'
        //"Access-Control-Allow-Origin": "*"
        
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
  
      //redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(credentials) // body data type must match "Content-Type" header
    });
  
    let rawData = await response.json();
    
    console.log(rawData.sucess);
  
    setLogin((rawData.sucess) ? 'Yes':'No');
    
  }





  return (
    <div className="App">
      <form>
        <h1>Create Account</h1>
        <input id='cuserName' type='text'></input>
        <input id = 'cpassWord' type ='text'></input>
        <input type = 'submit' value='submit' onClick={createAccount}></input>
      </form>

      <form>
        <h1>Login</h1>
        <input id='userName' type='text'></input>
        <input id = 'passWord' type ='text'></input>
        <input type = 'submit' value='submit' onClick={sendLogin}></input>
      </form>
      <h2>Currently Logged: {login}</h2>

      <input type='submit' value='logout' onClick={()=>{setLogin('No')}}></input>
    </div>
  );
}

export default App;
