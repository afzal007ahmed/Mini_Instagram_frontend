import { useSelector } from "react-redux";
import "./App.css";
import useUserDetails from "./hooks/useUserDetails";
import RoutesManager from "./Routes/RoutesManager";
import { useEffect } from "react";
import socket from "./socket";
import { toast } from "sonner";

function App() {
  const { userDetails } = useUserDetails();
  const user = useSelector((state) => state.userReducer);
  function socketNotify(message) {
    toast(<p className="text-md font-bold">Connection Status</p>, {
      description: (
        <p className="font-bold text-green-600 text-md">{message}</p>
      ),
    });
  }

  useEffect(() => {
    if (user?.data?.id) {
      socket.emit("register", {
        userId: user.data.id,
      });
    }
  }, [user.data]);

  useEffect(() => {
    userDetails();

    socket.on("connect", () => {
      console.log("Connected");
    });

    socket.on("register-response", ({ message }) => {
      socketNotify(message)
    });
  
    socket.on('create-post-response' , ({message}) => {
      socketNotify( message ) ;
    })

  }, []);

  return (
    <>
      <RoutesManager />
    </>
  );
}

export default App;
