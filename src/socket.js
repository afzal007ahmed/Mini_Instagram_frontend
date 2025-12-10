import { io  } from "socket.io-client";


const socket = io(import.meta.env.SOCKET_URL , {
    transports : ['websocket'] ,
    withCredentials : true ,
    autoConnect : true ,
    reconnection : true ,
    reconnectionAttempts : Infinity ,
    reconnectionDelay : 2000
}) ;




export default socket ; 