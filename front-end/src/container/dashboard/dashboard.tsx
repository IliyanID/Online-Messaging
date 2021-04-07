import React,{useState, Fragment, useRef, useEffect} from 'react';
import Draggable from "react-draggable";

import './dashboard.css';

import {ReactComponent as Message} from '../../resources/svg/chatting.svg'
import {ReactComponent as Phone} from '../../resources/svg/phone-call.svg'
import {ReactComponent as Video} from '../../resources/svg/video-camera.svg'
import {ReactComponent as Settings} from '../../resources/svg/settings.svg'
import {ReactComponent as Microphone} from '../../resources/svg/microphone.svg'

import HostProfile from '../../resources/profilePicture/sunset.jpg'
import ClientProfile from '../../resources/profilePicture/colorful.jpg'

interface props{
    logOut: () => void
    creds:{loggedIn:boolean,userName:string,view:string}
}









const Dashboard: React.FC<props> = ({logOut,creds}) => {
    const [messageData,setMessageData] = useState<any>(
    [
        [
            ["User"],
            {userName:"User", message:"This is what the client is saying", date:"3/20/2021", time:"10:26AM"},
            {userName:"User", message:"This is what the client is saying now", date:"4/1/2021", time:"10:26AM"},
            {userName:creds.userName, message:"This is what the user is responding with because because because because because because because because because because", date:"4/1/2021", time:"10:40AM"},
            {userName:creds.userName, message:"This is what the Host is saying", date:"4/1/2021", time:"10:40AM"},
            {userName:"User", message:"I am Responding to this", date:"4/1/2021", time:"10:41AM"},
            {userName:"User", message:"I disagree", date:"4/1/2021", time:"10:41AM"},
            {userName:"User", message:"The Objection is", date:"4/1/2021", time:"10:43AM"},
            {userName:"User", message:"mabye", date:"4/1/2021", time:"10:45AM"},
            {userName:creds.userName, message:"wack", date:"4/1/2021", time:"10:45AM"}
            
        ],
        [
            ["User","User3"]
        ],
        [
            ["User3"]
        ]
    ]);

    let messageRef = useRef(null) ;

    const parseMessageData = (index:number,messageData,userName:string) =>{
        const compareDates = (date:string) =>{
            let currentDate = new Date();
            let messageDate = new Date(date);
    
            if(currentDate.getFullYear() === messageDate.getFullYear())
                if(currentDate.getMonth() === messageDate.getMonth())
                    if(currentDate.getDay() === messageDate.getDay()){
                        return true;
                    }
    
            return false;
        }
    
        const combineMessages = (index:number,currentMessages) => {
            let user = currentMessages[index].userName;
            let date = currentMessages[index].date;
            let combine:JSX.Element[] = [];
    
    
            for(let i = index;i < currentMessages.length; i++){
                if((currentMessages[i].userName !== user) || (currentMessages[i].date !== date)){
                    index = i -1;
                    break;
                }
                else if(i === currentMessages.length - 1)
                    index = i;
                combine.push(<div ref = {messageRef} className='messageText'>{currentMessages[i].message}</div>);
            }
            return {i:index,combine:combine};
        }
        let currentMessages = messageData[index];

        let JSXmessagesArray:JSX.Element[] = [
            <li>
                <div className='hostMessage noSelect'>
                    <img src={ClientProfile} alt ='Host Profile'/>
                    <div className='startMessageName'>{currentMessages[0][0]}</div>
                    <div ref = {messageRef} className='messageStart'>This is the beginning of your direct message history with <b>{currentMessages[0].map((s) => {return '@' + s + ' '})}</b></div>
                </div>
            </li>];


        for(let i = 1; i < currentMessages.length;i++){
            let messageResult = combineMessages(i,currentMessages);
            
            let individualMessage = (
                <li>
                    <img className='profilePicture' src={(currentMessages[i].userName === userName)?HostProfile : ClientProfile} alt ='Host Profile'/>
                    <div className='hostMessage'>
                        <div className='hostName'>
                            {currentMessages[i].userName}
                        </div>
                        <div className='time'>{(compareDates(currentMessages[i].date)) ? ("Today at " + currentMessages[i].time) : currentMessages[i].date}</div>
                        {messageResult.combine.map((jsx)=>{return jsx;})}
                    </div>
                </li>
            );
            JSXmessagesArray.push(individualMessage)
            i = messageResult.i;
        }
    
        let result = (
            <Fragment>
                <div className='messageHeader'>
                    <div className = 'friendName'>{currentMessages[0].map((s)=>{return ('@' + s + ' ');})}</div>
                    <ul className='callOptions'>
                        <li><Phone className='svg microphone'/></li>
                        <li><Video className='svg'/></li>
                        <input className='searchMessages noSelect' type='text' placeholder='Search'/>
                    </ul>
                </div>
                <div className='messageContent'>
                    <ul>    
                        {JSXmessagesArray.map((jsx)=>{return jsx})}
                    </ul>
                </div>
            </Fragment>
    
        )
        return result;
    }

    const sendMessage = (e) =>{
        e.preventDefault();



        let doc = document.getElementById('messageType') as HTMLInputElement;
        let message:string;

        let today = new Date();
        
        let dd = String(today.getDate())
        let mm = String(today.getMonth() + 1)
        let yyyy = today.getFullYear();

        let date = mm + '/' + dd + '/' + yyyy;



        let hours = today.getHours();
        if(hours === 0)
            hours = 12;

        let minutes:string|number = today.getMinutes();
        if(minutes < 10)
            minutes = '0' + minutes;
        let time = ((hours > 12) ? (hours - 12) : hours) + ':' + minutes + ((hours > 12) ? 'PM' : 'AM');

        if(doc != null){
            message = doc.value;
            if(message === "")
                return;
            let temp = [...messageData];
            temp[selectedMessage].push({userName:creds.userName, message:message,date:date,time:time});
            setMessageData(temp);
            doc.value = "";
        }
        
        if(messageRef !== null && messageRef.current !== null){
            // @ts-ignore: Object is possibly 'null'
            messageRef.current.scrollIntoView({behavior: "smooth"}); 
        }
        
        //Set newest message at the top
        let data = messageData[selectedMessage];
        let temp = [...messageData];
        temp.splice(selectedMessage,1);//Remove newest data
        temp.unshift(data);//place newest data at the front of array
        setMessageData(temp);
        setSelectedMessage(0);
    }

    const [selectedMessage,setSelectedMessage] = useState(0);


    useEffect(()=>{
        if(messageRef !== null && messageRef.current !== null){
            // @ts-ignore: Object is possibly 'null'
            messageRef.current.scrollIntoView({behavior: "instant"}); 
        }

    },[selectedMessage])


    const [draggable,setDraggable] =  useState("message");

    return (
        <div className='dashboard'>
            <div className='userSettings noSelect'>
                <img src={HostProfile} alt='host'></img>
                <div className='userSettingsName noSelect' onClick={logOut}>{creds.userName}</div>
                <div className='microphoneSVG'><Microphone className='microphoneChild'/></div>
                <div className='settingsSVG'><Settings className='settingsSVG'></Settings></div>
            </div>
            
            <ul className='navBar'>
                <li> <Message fill="white" className='messageSVG noSelect'/> </li>
                <li className='noSelect'></li>
                <li className='noSelect'></li>
                <li className='noSelect'></li>
            </ul>

            <div className='bounds'>
            <Draggable 
        bounds = {'.bounds'}
        defaultPosition = {{x:0,y:0}}
        cancel = '.messagesContainer'
        onMouseDown={()=>setDraggable("message")}
        >
            <div  style={(draggable === "message")?{zIndex:1000}:{zIndex:10}} className='messages'>
                <div className='grabBar'></div>
                <div className='messagesContainer'>
                    <div className = 'friends'>
                        <h1>Direct Messages</h1>
                        <ul>
                            {messageData.map((obj,index)=>{
                                return <li onClick={()=>{setSelectedMessage(index)}} className={(index === selectedMessage) ? 'selectedChat' : ''}><img src={ClientProfile} alt='User'/>{obj[0].map((s,index1)=>{return (s + ((messageData[index][0].length - 1 === index1)?"":", "));})}</li>
                            })}
                            
                        </ul>
                    </div>
                   {parseMessageData(selectedMessage,messageData,creds.userName)}
                    <form onSubmit={sendMessage} className='messageType'>
                        <input id='messageType'type='text' autoComplete = 'off' placeholder={'Message ' + messageData[selectedMessage][0].map((s)=>{return ('@' + s + ' ');})}></input>
                    </form>
                </div>
                
            </div>
        </Draggable>                
        
        <Draggable 
        bounds = {'.bounds'}
        defaultPosition = {{x:900,y:0}}
        cancel = '.settingContainer'
        onMouseDown={()=>setDraggable("settings")}
        >
            <div  style={(draggable === "settings")?{zIndex:1000}:{zIndex:10}} className='settingWindows'>
                <div  className='grabBar'></div>
                <div  className='settingContainer'>
                    <div className='settingsTabs'>
                    </div>
                    <h1>My Account</h1>
                </div>
            </div>
        </Draggable>
            </div>
                
            
        </div>
    );
}
/*
<Draggable 
                bounds = {'.bounds'}
                defaultPosition = {{x:0,y:0}}
                cancel = '.messagesContainer'
                >
                    <div className='messages'>
                        <div className='grabBar'></div>
                        <div className='messagesContainer'>
                            <div className = 'friends'>
                                <h1>Direct Messages</h1>
                                <ul>
                                    {messageData.map((obj,index)=>{
                                        return <li onClick={()=>{setSelectedMessage(index)}} className={(index === selectedMessage) ? 'selectedChat' : ''}><img src={ClientProfile} alt='User'/>{obj[0].map((s,index1)=>{return (s + ((messageData[index][0].length - 1 === index1)?"":", "));})}</li>
                                    })}
                                    
                                </ul>
                            </div>
                           {parseMessageData(selectedMessage,messageData,creds.userName)}
                            <form onSubmit={sendMessage} className='messageType'>
                                <input id='messageType'type='text' autoComplete = 'off' placeholder={'Message ' + messageData[selectedMessage][0].map((s)=>{return ('@' + s + ' ');})}></input>
                            </form>
                        </div>
                        
                    </div>
                </Draggable>
*/


export default Dashboard;