import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import useFollowUser from "@/hooks/useFollowUser";
import useStatus from "@/hooks/useStatus";
import {
  userListFailed,
  userListLoading,
  userListSuccess,
} from "@/redux/userListSlice";
import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import ChatBox from "./ChatBox";

const Users = () => {
  const usersList = useSelector((state) => state.userListReducer);
  const userStatus = useSelector((state) => state.onlineStatusReducer);
  const followingList = useSelector((state) => state.followingListReducer);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userReducer);
  const { followUser, fetchFollowings } = useFollowUser();
  const { onlineStatus } = useStatus();

  const fetchUsers = async () => {
    try {
      dispatch(userListLoading());
      const response = await axios.get(
        `${import.meta.env.VITE_API}users/all/${user.data.id}`,
        { withCredentials: true }
      );
      dispatch(userListSuccess(response.data));
    } catch (error) {
      toast(<p className="text-md font-bold">Status</p>, {
        description: (
          <p className="font-bold text-red-600 text-md">
            {error.response.data.error}
          </p>
        ),
      });
      if (error.response && error.response.status === 401) {
        nav("/login");
      }
      dispatch(userListFailed(error.response.data.message));
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchFollowings();
    onlineStatus();
  }, []);

  async function handleFollowUnfollow(id) {
    await followUser(id);
    await fetchFollowings();
  }

  return (
    <Card className="flex-1 bg-[#282828] border-none text-white mt-4 min-w-[335px]">
      {usersList.data && (
        <div>
          <CardHeader>
            <h1 className="font-bold text-lg text-center">
              You can follow these people{" "}
            </h1>
          </CardHeader>
          <CardContent className="p-3 md:p-6">
            {usersList.data.map((item) => (
              <div className="mt-3 flex items-center gap-4 bg-black p-4 rounded-lg min-w-[300px] justify-between cursor-pointer">
                <div className="flex items-center gap-4">
                  <div>
                    <img
                      src={
                        item?.url
                          ? item.url
                          : item?.gender === "male"
                          ? "2150793895.jpg"
                          : item?.gender === "female"
                          ? "2151839621.jpg"
                          : "2151100252.jpg"
                      }
                      className="h-[60px] min-w-[60px] w-[60px] object-cover rounded-[60px] object-center border-[2px]"
                    />
                    <div className={`border h-[20px] w-[20px] relative -top-4 bg-gray-500 rounded-[20px] ${ userStatus?.data?.[ item.id ] ? "bg-green-600" : "bg-gray-500" }`}></div>
                  </div>
                  <div>
                    <p className="text-lg font-bold">{item.name}</p>
                    <p className="text-sm font-medium">{item.gender}</p>
                  </div>
                </div>
                <div className="flex flex-wrap justify-end gap-2">
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleFollowUnfollow(item.id);
                    }}
                    className={
                      !followingList.data?.[item.id] &&
                      "bg-green-600 text-white font-bold"
                    }
                  >
                    {followingList.data?.[item.id] ? "Following" : "Follow"}
                  </Button>
                  <ChatBox name={item.name} id={item.id}/>
                </div>
              </div>
            ))}
          </CardContent>
        </div>
      )}
    </Card>
  );
};

export default Users;
