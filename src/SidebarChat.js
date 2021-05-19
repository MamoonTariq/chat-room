import React from 'react';
import "./SidebarChat.css";
import { Avatar } from '@material-ui/core';

function SidebarChat(){
    return(
        <div className="sidebarChat">
            <Avatar />
            <div className="sidebarChat__info">
                <h2>My Room</h2>
                <p>I mean's testing message</p>
            </div>
        </div>
    )
}

export default SidebarChat;