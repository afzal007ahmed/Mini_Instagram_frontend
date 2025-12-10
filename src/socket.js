import { io  } from "socket.io-client";


const socket = io(import.meta.env.SOCKET_URL , {
    withCredentials : true ,
    autoConnect : true ,
    reconnection : true ,
    reconnectionAttempts : Infinity ,
    reconnectionDelay : 2000
}) ;

if( !socket.connected ) {
    socket.connect();
} 



export default socket ; 