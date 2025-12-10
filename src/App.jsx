import { useSelector } from "react-redux";
import "./App.css";
import useUserDetails from "./hooks/useUserDetails";
import RoutesManager from "./Routes/RoutesManager";
import { useEffect } from "react";
import socket from "./socket";


function App() {
  const { userDetails } = useUserDetails();
  const user = useSelector(( state ) => state.userReducer ) ;


  useEffect(() => {
    if( user?.data?.id ) {
      socket.emit('register' , {
        userId : user.data.id 
      })
    }
  } , [user.data])


  useEffect(() => {
    userDetails();
  }, []);

  return (
    <>
      <RoutesManager />
    </>
  );
}

export default App;
