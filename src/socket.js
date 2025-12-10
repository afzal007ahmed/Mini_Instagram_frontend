import { io  } from "socket.io-client";


const socket = io(import.meta.env.SOCKET_URL , {
    withCredentials : true ,
    autoConnect : true 
}) ;

if( !socket.connected ) {
    socket.connect();
} 



export default socket ; 