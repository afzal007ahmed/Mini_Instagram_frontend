import "./App.css";
import useUserDetails from "./hooks/useUserDetails";
import RoutesManager from "./Routes/RoutesManager";
import { useEffect } from "react";

function App() {
  const { userDetails } = useUserDetails();

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
