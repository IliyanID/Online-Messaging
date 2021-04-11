import {ReactComponent as Phone} from '../../../resources/svg/phone-call.svg'
import {ReactComponent as Video} from '../../../resources/svg/video-camera.svg'
import HostProfile from '../../../resources/profilePicture/sunset.jpg'
import ClientProfile from '../../../resources/profilePicture/colorful.jpg'

import './Messages.css'

import React,{ PureComponent, Fragment } from 'react'
import Draggable from "react-draggable";

interface props{
    creds:{loggedIn:boolean,userName:string,view:string},
    messageData:[[[string],{userName:string,message:string,date:string,time:string}]],
    bounds:string,
    defaultPosition:{x:number,y:number},
    cancel:string,
    zIndex:number
}


class Messages extends PureComponent{
    state = {  
        messageData:this.props.messageData,    
        selectedMessage:0  
    }
    creds;
    props;
    messageRef;

    constructor(props:props){
        super(props);
        this.props = props;
        this.creds = props.creds;
        this.messageRef = React.createRef();

        this.setState({
            messageData:props.messageData,
            selectedMessage:0
        });


    }

    parseMessageData = (index:number,messageData,userName:string) =>{
        const compareDates = (date:string) =>{
            let currentDate = new Date();
            let messageDate = new Date(date);
    
            if(currentDate.getFullYear() === messageDate.getFullYear())
                if(currentDate.getMonth() === messageDate.getMonth())
                    if(currentDate.getDay() === messageDate.getDay())
                        return true;
                    
    
            return false;
        }
    
        const combineMessages = (index:number,currentMessages) => {
            let user = currentMessages[index].userName;
            let date:string = currentMessages[index].date;
            let combine:JSX.Element[] = [];
            
            
    
            for(let i = index;i < currentMessages.length; i++){
                if((currentMessages[i].userName !== user) || (currentMessages[i].date !== date)){
                    index = i -1;
                    break;
                }
                else if(i === currentMessages.length - 1)
                    index = i;

                let dayOfWeek = ""
                let d:any = new Date(date);
                d = d.getDay()
                switch(d){
                    case 0:
                        dayOfWeek = "Sunday";
                        break;
                    case 1:
                        dayOfWeek = "Monday";
                        break;
                    case 2:
                        dayOfWeek = "Tuesday";
                        break;
                    case 3:
                        dayOfWeek = "Wednesday";
                        break;
                    case 4:
                        dayOfWeek = "Thursday";
                        break;
                    case 5:
                        dayOfWeek = "Friday";
                        break;
                    case 6:
                        dayOfWeek = "Saterday";
                        break;
                    default:
                        dayOfWeek = "";
                        break;
                }

                combine.push(<div ref = {this.messageRef} className='messageText'>{currentMessages[i].message}</div>);
                combine.push(<div className='messageHiddenTime noSelect'>{dayOfWeek + ", " + currentMessages[i].date + " " + currentMessages[i].time}</div>);
            }
            return {i:index,combine:combine};
        }
        let currentMessages = messageData[index];

        let JSXmessagesArray:JSX.Element[] = [
            <li>
                <div className='hostMessage noSelect'>
                    <img src={ClientProfile} alt ='Host Profile'/>
                    <div className='startMessageName'>{currentMessages[0][0]}</div>
                    <div 
                        ref = {this.messageRef} 
                        className='messageStart'>This is the beginning of your direct message history with 
                        <b>
                            {currentMessages[0].map((s) => {return '@' + s + ' '})}
                        </b>
                    </div>
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

    sendMessage = (e) =>{
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
            let temp = [...this.state.messageData];
            temp[this.state.selectedMessage].push({userName:this.creds.userName, message:message,date:date,time:time});
            this.setState(temp);
            doc.value = "";
        }
        
        if(this.messageRef !== undefined && this.messageRef.current !== null){
            // @ts-ignore: Object is possibly 'null'
            messageRef.current.scrollIntoView({behavior: "smooth"}); 
        }
        
        //Set newest message at the top
        let data = this.state.messageData[this.state.selectedMessage];
        let temp = [...this.state.messageData];
        temp.splice(this.state.selectedMessage,1);//Remove newest data
        temp.unshift(data);//place newest data at the front of array
        this.setState({temp,selectedMessage:0});
    }



    /*componentDidUpdate(){
        if(this.messageRef !== undefined && this.messageRef.current !== null){
            // @ts-ignore: Object is possibly 'null'
            messageRef.current.scrollIntoView({behavior: "instant"}); 
        }
    }*/

    render(){
        console.log(this.state.messageData);
        return(
            <Draggable 
            bounds = {this.props.bounds}
            defaultPosition = {this.props.defaultPosition}
            cancel = {this.props.cancel}
            >
                <div  style={{zIndex:this.props.zIndex}} className='messages'>
                    <div className='grabBar'></div>
                    <div className='messagesContainer'>
                        <div className = 'friends'>
                            <h1>Direct Messages</h1>
                            <ul>
                                {this.state.messageData.map((obj,index)=>{
                                    return <li onClick={()=>{this.setState({selectedMessage:index})}} className={(index === this.state.selectedMessage) ? 'selectedChat' : ''}><img src={ClientProfile} alt='User'/>{obj[0].map((s,index1)=>{return (s + ((this.state.messageData[index][0].length - 1 === index1)?"":", "));})}</li>
                                })}
                                
                            </ul>
                        </div>
                    {this.parseMessageData(this.state.selectedMessage,this.state.messageData,this.creds.userName)}
                        <form onSubmit={this.sendMessage} className='messageType'>
                            <input id='messageType'type='text' autoComplete = 'off' placeholder={'Message' + this.state.messageData[this.state.selectedMessage][0].map((s)=>{return (' @' + s);})}></input>
                        </form>
                    </div>
                    
                </div>
            </Draggable>
        );
    }
}

export default Messages;