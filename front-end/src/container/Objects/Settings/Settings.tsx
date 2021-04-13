import React,{ PureComponent } from 'react'
import Draggable from "react-draggable";

interface props{
    creds:{loggedIn:boolean,userName:string,view:string},
    bounds:string,
    defaultPosition:{x:number,y:number},
    cancel:string,
    zIndex:number,
    index:number,
    setZIndex:()=>void
}


class Settings extends PureComponent{
    props:props;
    constructor(props:props){
        super(props);
        this.props = props;
    }

    render(){
        return(
            <Draggable 
                bounds = {'.bounds'}
                defaultPosition = {this.props.defaultPosition}
                cancel = {this.props.cancel}
                onMouseDown = {()=>{this.props.setZIndex()}}
                >
                    <div  style={{zIndex:this.props.zIndex}} className='settingWindows'>
                        <div  className='grabBar'></div>
                        <div  className='settingContainer'>
                            <div className='settingsTabs'>
                            </div>
                            <h1>My Account</h1>
                        </div>
                    </div>
                </Draggable>
        );
    }
}

export default Settings;