import React, { useState } from 'react';
import "./Chat.css";
import { Avatar, IconButton } from '@material-ui/core';
import { AttachFile, InsertEmoticon, MoreVert, SearchOutlined } from '@material-ui/icons';
import MicIcon from '@material-ui/icons/Mic';
import axios from './axios';

function Chat({ messages }){

    const [input, setInput] = useState(['']);

    const sendMessage = async(e) =>{
        e.preventDefault();
        await axios.post('/messages/new', {
            message: input,
            name: "Maoon",
            timeStamp: "today",
            received: true
        });
        setInput('');
    }

    return(
        <div className="chat">
            <div className="chat__header">
                <Avatar />

                <div className="chat__headerInfo">
                    <h3>My Room</h3>
                    <p>Last Seen at .....</p>
                </div>

                <div className="chat__headerRight">
                    <IconButton>
                        <SearchOutlined />
                    </IconButton>
                    <IconButton>
                        <AttachFile />
                    </IconButton>
                    <IconButton>
                        <MoreVert />
                    </IconButton>
                </div>
            </div>

            <div className="chat__body">

                {messages.map(message=>(
                    <p className={`chat__message ${message.received && "chat__reciever"}`}> 
                        <span className="chat__name"> {message.name}</span>
                        {message.message}
                        <span className="chat__timestamp">
                            {message.timestamp}
                        </span>
                    </p>
                ))}

                

                {/* <p className="chat__message chat__reciever"> 
                    <span className="chat__name"> Moon</span>
                    What message ?
                    <span className="chat__timestamp">
                        {new Date().toUTCString()}
                    </span>
                </p>

                <p className="chat__message"> 
                    <span className="chat__name"> Mamoon</span>
                    I mean's testing message
                    <span className="chat__timestamp">
                        {new Date().toUTCString()}
                    </span>
                </p> */}

            </div>
            
            <div className="chat__footer">
                <InsertEmoticon />
                <form>
                    <input value={input} onChange={e =>setInput(e.target.value)} type="text" placeholder="Type Message" />
                    <button onClick={sendMessage} type="submit">Send message </button>
                </form>
                <MicIcon />
            </div>
        </div>
    )
}
export default Chat;