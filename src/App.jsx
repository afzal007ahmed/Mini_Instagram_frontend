import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import useUserDetails from "./hooks/useUserDetails";
import RoutesManager from "./Routes/RoutesManager";
import { useEffect } from "react";
import socket from "./socket";
import { toast } from "sonner";
import useFeed from "./hooks/useFeed";
import useHandleLikeDislike from "./hooks/useHandleLikeDislike";
import useStatus from "./hooks/useStatus";
import useMessage from "./hooks/useMessage";

function App() {
  const { userDetails } = useUserDetails();
  const { getPostsReactions, getReactionCount } = useHandleLikeDislike();
  const { postsFeed } = useFeed();
  const { allMessages } = useMessage() ;
  const { onlineStatus } = useStatus();
  const user = useSelector((state) => state.userReducer);
  function socketNotify(title, message) {
    toast(<p className="text-md font-bold">{title}</p>, {
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
      onlineStatus();
    });

    socket.on("disconnect-response", () => {
      onlineStatus();
    });

    socket.on("new-message", ({ name, id, message }) => {
      toast(<p className="text-md font-bold">{name}</p>, {
        description: (
          <p className="font-bold text-green-600 text-md">{message}</p>
        ),
      });
      allMessages(id) ;
    });
    socket.on("create-post-response", ({ message }) => {
      postsFeed();
      getPostsReactions();
      getReactionCount();
      socketNotify("Update", message);
    });
  }, []);

  return (
    <>
      <RoutesManager />
    </>
  );
}

export default App;
