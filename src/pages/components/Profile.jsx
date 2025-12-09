import { Card, CardContent, CardHeader } from "@/components/ui/card";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import FollowersList from "./FollowersList";
import useFollowUser from "@/hooks/useFollowUser";
import { Button } from "@/components/ui/button";
import ProfileDetails from "./ProfileDetails";

const Profile = () => {
  const user = useSelector((state) => state.userReducer);
  const followingList = useSelector(( state ) => state.followingListReducer);

  const { getFollowersCount } = useFollowUser();

  useEffect(() => {
     getFollowersCount() ;
  }, []);

  
  return (
    <Card className="flex-1 min-w-fit bg-[#282828] border-none text-white min-w-[325px]">
      <CardContent>
      <CardHeader className="p-3">
        <img
          src="221853792_d2b12830-47a1-45b8-90df-59e7acee7ec5.jpg"
          className="max-h-[90px] object-cover rounded-md"
          loading="lazy"
        />
        <div className="flex items-center gap-5 justify-between">
          <div>
            <FollowersList/>
            <p className="text-sm">Followers</p>
          </div>
          <div className="flex flex-col items-center">
            <img src={ user.data?.url ? user.data.url :  user.data?.gender === "male" ?  "2150793895.jpg" : user.data?.gender === "female" ? "2151839621.jpg" : "2151100252.jpg" } className="w-[100px] min-w-[100px] rounded-[100px] h-[100px] object-cover border-white border-[2px] relative -top-[40px]"/>
            <p className="lg:text-2xl text-xl font-bold">{ user.data?.name || "Loading..." }</p>
            <p><span className="text-xs">Gender :</span> <span className="font-bold text-sm">{ user.data?.gender }</span> </p>
          </div>
          <div>
            <p className="font-bold text-center">{followingList.data && Object.keys(followingList.data).length }</p>
            <p className="text-sm">Following</p>
          </div>
        </div>
      </CardHeader>
      <ProfileDetails/>
      </CardContent>
    </Card>
  );
};

export default Profile;
