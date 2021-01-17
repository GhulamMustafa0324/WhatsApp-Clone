import React, { useEffect, useState } from 'react'
import '../css/sidebar.css'
import { Avatar, IconButton } from '@material-ui/core';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ChatIcon from '@material-ui/icons/Chat';
import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";
import SidebarChat from './SidebarChat';
import db from '../config/firebase';
import { useStateValue } from '../config/StateProvider';


function Sidebar() {

    const [{ user }, dispatch] = useStateValue()
    const [rooms, setRooms] = useState([])

    useEffect(() => {
        const unsubscribe = db.collection('rooms').onSnapshot((snapshot) => setRooms(
            snapshot.docs.map((doc) => ({
                id: doc.id,
                data: doc.data(),
            }))
        ))
        return () => {
            unsubscribe();
        }
    }, [])

    return (
        <div className='sidebar'>

            <div className="sidebar__header">
                <Avatar src={user?.photoURL} />
                <h3>{user?.displayName}</h3>

                <div className="sidebar__headerRight">

                    <IconButton>
                        <DonutLargeIcon />
                    </IconButton>

                    <IconButton>
                        <ChatIcon />
                    </IconButton>

                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>

                </div>

            </div>

            <div className="sidebar__search">
                <div className="sidebar__searchContainer">
                    <SearchOutlinedIcon />
                    <input placeholder="Search or start a new chat" type="text" />
                </div>
            </div>

            <div className="sidebar__chats">
                <SidebarChat addNewChat />
                {rooms.map(room => (
                    <SidebarChat key={room.id} id={room.id} name={room.data.name} />
                ))}
            </div>

        </div>
    )
}

export default Sidebar
