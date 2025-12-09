import React, { useEffect } from "react";
import Profile from "./components/Profile";
import Feed from "./components/Feed";
import Users from "./components/Users";
import { useSelector } from "react-redux";

const Home = () => {
   const user = useSelector(( state ) => state.userReducer ) ;
  return (
    <div className="p-6 bg-black min-h-[100vh]">
      <div className="bg-[#1a1a1a] lg:p-6 md:flex gap-5 flex-wrap rounded-md items-start">
        { user.data && <Profile />}
        { user.data && <Feed/>}
        { user.data && <Users/>}
      </div>
    </div>
  );
};

export default Home;
