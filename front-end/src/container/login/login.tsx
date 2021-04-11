import React,{useState, Fragment, FormEvent, useEffect} from 'react';
import {GoogleLogin} from 'react-google-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'

import './login.css';





interface props{
  getLoginInfo:{loggedIn:boolean,userName:string,view:string}
  setLoginInfo:(obj:{loggedIn:boolean,userName:string,view:string}) => void
}

const Login:React.FC<props> = ({ getLoginInfo, setLoginInfo}) => {


  enum Currentpage {
    login,
    createAccount
  }

  let globalURL = "http://localhost:5000";

  const [state,setState] = useState(Currentpage.login);
  const [notify,setNotify] = useState({error:false,message:""});
  


  useEffect(() => {
    const timer = setTimeout(()=>{
      setNotify({error:false,message:""});
   },8000)
    return () => clearTimeout(timer);
  }, );


  const postData =async<T extends {}, G extends{error:boolean,message:string}>(url:string,data:T):Promise<G> =>{
    let headers = new Headers();
    headers.set('Content-Type', "application/json");
    let rawData;
    try{
    const response = await fetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      //mode: 'cors', // no-cors, *cors, same-origin
      //cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      //credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json'
      },
  
      //redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    });


      rawData = await response.json();
    }
    catch(err){

      rawData = {error:true,message:"Error 501: Failed to Connect to Server"}
    }

    return rawData;
  }

  const sendLogin = async(e:FormEvent) =>{
    let url = globalURL + "/user/login";

    e.preventDefault();
    let userName:string = "";
    let passWord:string = "";
    
    let doc= document.getElementById('userName') as HTMLInputElement;
    if(doc != null){
      userName = doc.value;
      //doc.value = "";
    }
    doc= document.getElementById('passWord') as HTMLInputElement;
    if(doc != null){
      passWord = doc.value;
      doc.value = "";
    }
  
    let credentials = {userName:userName,passWord:passWord};
  
    let response = await postData(url,credentials)
    

    if(!response.error){
      setLoginInfo({loggedIn:true,userName:userName,view:"dashboard"});
    }
    else
      setNotify(response);
    
    
  }

  const createAccount = async(e:FormEvent) =>{



    e.preventDefault();
    let userName:string = "";
    let passWord:string = "";
    
    let doc= document.getElementsByClassName('userName')[0] as HTMLInputElement;
    if(doc != null){
      userName = doc.value;
      doc.value = "";
    }
    doc= document.getElementsByClassName('passWord')[0] as HTMLInputElement;
    if(doc != null){
      passWord = doc.value;
      doc.value = "";
    }
  
    let credentials = {userName:userName,passWord:passWord};

    let url = globalURL + "/user";
    let response = await postData(url,credentials)
    
    setNotify(response);
    

    //console.log(response.error);
    if(!response.error)
      setState(Currentpage.login);
    
  }

  const clientId = '20941103072-p44ideb6m9rg6bqagbgl8c7r6uq35vgk.apps.googleusercontent.com'

  const googleLogin = async(res:any) =>{

    let url = globalURL + '/user/login'
    let credentials = {userName:res.profileObj.email + res.profileObj.googleId,passWord:res.profileObj.googleId};
  
    let response = await postData(url,credentials)
    
    if(!response.error){
      setLoginInfo({loggedIn:true,userName:res.profileObj.name,view:"dashboard"});
    }

    
    else
      setNotify(response);
  }

  const googleCreate = async(res:any) =>{
    let credentials = {userName:res.profileObj.email + res.profileObj.googleId,passWord:res.profileObj.googleId};

    console.log(credentials);
    let url = globalURL + '/user'
    let response = await postData(url,credentials)
    
    setNotify(response);
    

    //console.log(response.error);
    if(!response.error)
      setState(Currentpage.login);
  }

  const loginFacebook = async(res:any) =>{
    let url = globalURL + '/user/login'
    let credentials = {userName:res.name + res.id,passWord:res.id};
  
 
    let response = await postData(url,credentials)
    
    if(!response.error){
      setLoginInfo({loggedIn:true,userName:res.name,view:"dashboard"});
    }
   
    else
      setNotify(response);
  }
  const createFacebook = async(res:any) =>{
    let credentials = {userName:res.name + res.id,passWord:res.id};

    console.log(credentials);
    let url = globalURL + '/user'
    let response = await postData(url,credentials)
    
    setNotify(response);
    

    //console.log(response.error);
    if(!response.error)
      setState(Currentpage.login);
  }
  
  const onFailure = (res:any) =>{
    setNotify({error:true,message:"Failed to get Credentials"})
  }
  
  let errorMessage = <Fragment></Fragment>
    if(notify.message !== "")
    errorMessage=(<p className={(notify.error) ? 'alertError newAccount' : 'alertNotify newAccount'}>{notify.message}</p>);

  //console.log(notify.message)

  let form = <Fragment></Fragment>;
  if(state ===  Currentpage.login){
    form = 
    (
        <form className = 'login'>
          <h1 onClick={()=>setLoginInfo({loggedIn:false,userName:"",view:"landingPage"})}>Deimos</h1>
          <input className='text' placeholder='Username' id='userName' type='text'></input>
          <input className='text' placeholder = 'Password'id = 'passWord' type ='password'></input>
          {errorMessage}
          <button className='button'type = 'submit' onClick={sendLogin}>Login</button>
          
          <GoogleLogin  
            clientId = {clientId}
            render={renderProps =>(
              <label className='Google svg'><input className='button' type='button'  onClick={renderProps.onClick} value='Sign in with Google'></input></label>
            )}
            onSuccess={googleLogin}
            onFailure = {onFailure}
            cookiePolicy={'single_host_origin'}
          />

          <FacebookLogin
            appId="739390000075213" 
            callback={loginFacebook}
            render={(renderProps) =>(
              <label className='Facebook svg'><input className='button' type='button'  onClick={renderProps.onClick} value='Sign in with Facebook'></input></label>
            )}
          />
          <p className='newAccount'>Don't have an account? <span onClick={()=>setState(()=>Currentpage.createAccount)} className='link'>Create one</span></p>
        </form>

    );
  }
  else if(state === Currentpage.createAccount){
    form = 
    (
        <form className = 'createAccount'>
          <h1 onClick={()=>setLoginInfo({loggedIn:false,userName:"",view:"landingPage"})}>Deimos</h1>
          <input className='text userName' placeholder='Username'  type='text'></input>
          <input className='text userName' placeholder='Confirm Username' type='text'></input>
          <input className='text passWord' placeholder = 'Password' type ='password'></input>
          <input className='text passWord' placeholder = 'Confirm Password' type ='password'></input>
          {errorMessage}
          <button className='button'type = 'submit' onClick={createAccount}>Create Account</button>
          
          <GoogleLogin  
            clientId = {clientId}
            render={renderProps =>(
              <label className='Google svg'><input className='button' type='button'  onClick={renderProps.onClick} value='Create with Google'></input></label>
            )}
            onSuccess={googleCreate}
            onFailure = {onFailure}
            cookiePolicy={'single_host_origin'}
          />

          <FacebookLogin
            appId="739390000075213" 
            callback={createFacebook}
            render={(renderProps) =>(
              <label className='Facebook svg'><input className='button' type='button'  onClick={renderProps.onClick} value='Create with Facebook'></input></label>
            )}
          />
          <p className='newAccount'>Already have an account? <span className='link' onClick={()=>setState(Currentpage.login)}>Login</span></p>
        </form>
    );    
  }



  return (
    <div className="loginApp">
    {form}
      
    </div>);
}


export default Login;