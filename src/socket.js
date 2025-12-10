import { io  } from "socket.io-client";


const socket = io(import.meta.env.SOCKET_URL , {
    withCredentials : true 
}) ;

console.log( socket.connected ) ;


export default socket ; 