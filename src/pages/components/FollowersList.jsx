import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import useFollowUser from "@/hooks/useFollowUser";
import React from "react";
import { useSelector } from "react-redux";

const FollowersList = () => {
  const followersCount = useSelector((state) => state.followersCountReducer);
  const followingList = useSelector((state) => state.followingListReducer);
  const {followUser } = useFollowUser() ;
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button className="my-2">
            {followersCount.data && followersCount.data.length}
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] mx-4 bg-[#282828] border-none shadow-lg text-white">
          <DialogHeader>
            <DialogTitle>Followers</DialogTitle>
          </DialogHeader>
          {followersCount.data && followersCount.data.length > 0 && followingList.data ?
            followersCount.data.map((item) => (
              <div className="bg-black p-6 rounded-lg flex items-center gap-4 justify-between">
                <div className="flex gap-4 items-center">
                  <img
                    src={
                      item.follower?.url
                        ? item.follower.url
                        : item.follower?.gender === "male"
                        ? "2150793895.jpg"
                        : item.follower?.gender === "female"
                        ? "2151839621.jpg"
                        : "2151100252.jpg"
                    }
                    className="w-[50px] min-w-[50px] rounded-[50px] h-[50px] object-cover border-white border-[2px]"
                  />
                  <div>
                    <p className="font-bold">{item.follower.name}</p>
                    <p className="text-xs font-medium">
                      gender : {item.follower.gender}
                    </p>
                  </div>
                </div>

                <Button onClick = {() => {followUser(item.follower.id)}}>
                  {followingList.data[item.follower.id]
                    ? "Following"
                    : "Follow"}
                </Button>
              </div>
            )) : <div>You have no followers.</div>}
        </DialogContent>
      </form>
    </Dialog>
  );
};

export default FollowersList;
