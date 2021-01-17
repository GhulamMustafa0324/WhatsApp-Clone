import React, { useState, useEffect } from 'react'
import '../css/chat.css'
import { Avatar, IconButton } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { InsertEmoticon, Mic } from '@material-ui/icons';
import { useParams } from 'react-router-dom';
import db from '../config/firebase';
import { useStateValue } from '../config/StateProvider';
import firebase from 'firebase'

function Chat() {

    const [seed, setSeed] = useState('')
    const [input, setInput] = useState('')
    const { roomId } = useParams()
    const [roomName, setRoomName] = useState('')
    const [messages, setMessages] = useState([])
    const [{ user }, dispatch] = useStateValue()

    useEffect(() => {

        if (roomId) {
            db.collection('rooms').doc(roomId).onSnapshot((snapshot) => setRoomName(snapshot.data().name));
           
            db.collection('rooms').doc(roomId).collection('messages').orderBy('timestamp', 'asc').onSnapshot((snapshot) => setMessages(snapshot.docs.map((doc) => doc.data())))
        }

    }, [roomId])
    // useEffect(() => {
    //     if (roomId) {
    //         db.collection('rooms').doc(roomId).onSnapshot((snapshot) =>
    //             setRoomName(snapshot.data().name));

    //         db.collection('rooms')
    //             .doc(roomId)
    //             .collection('messages')
    //             .orderBy('timestamp', 'asc')
    //             .onSnapshot((snapshot) =>
    //                                                               setMessages(snapshot.docs.map((doc) =>
    //                                                                   doc.data()
    //                 ))
    //             );
    //     }
    // }, [roomId]);

    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000))
    }, [])

    const sendMessage = (e) => {
        e.preventDefault();
        db.collection('rooms').doc(roomId).collection('messages').add({
            message: input,
            name: user.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });
        setInput("")
    }


    return (
        <div className='chat'>

            <div className="chat__header">
                <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
                <div className="chat__headerInfo">
                    <h3>{roomName}</h3>
                    <p> last seen {""}  {new Date(
                        messages[messages.length - 1]?.
                            timestamp?.toDate()
                    ).toUTCString()}</p>
                </div>
                <div className="chat__headerRight">
                    <IconButton>
                        <SearchIcon />
                    </IconButton>

                    <IconButton>
                        <AttachFileIcon />
                    </IconButton>

                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                </div>
            </div>

            <div className="chat__body">
                {messages.map(message => (
                    <div className={`chat__message ${message.name === user.displayName && "chat__reciever"}`}>
                        <span className="chat__name">{message.name}</span>
                        {message.message}
                        <span className="chat__timeStamp">
                            {new Date(message.timestamp?.toDate()).toUTCString()}
                        </span>
                    </div>
                ))}

            </div>

            <div className="chat__footer">
                <InsertEmoticon />
                <form>
                    <input value={input} onChange={e => setInput(e.target.value)} placeholder='Type a message' type="text" />
                    <button onClick={sendMessage} >Send a Message</button>
                </form>
                <Mic />
            </div>

        </div>
    )
}

export default Chat
