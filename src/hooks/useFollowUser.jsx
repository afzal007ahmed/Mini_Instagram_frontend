import {
  followersCountFailed,
  followersCountLoading,
  followersCountSuccess,
} from "@/redux/followersCountSlice";
import {
  followingListFailed,
  followingListLoading,
  followingListSuccess,
} from "@/redux/follwingListSlice";
import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import useFeed from "./useFeed";
import useHandleLikeDislike from "./useHandleLikeDislike";

const useFollowUser = () => {
  const nav = useNavigate();
  const user = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();
  const { postsFeed } = useFeed() ;
  const { getReactionCount , getPostsReactions } = useHandleLikeDislike() ;

  async function getFollowersCount() {
    try {
      dispatch(followersCountLoading());
      const response = await axios.get(
        `${import.meta.env.VITE_API}users/${user.data.id}/followers` , { withCredentials : true }
      );
      await getReactionCount() ;
      await getPostsReactions() ;
      dispatch(followersCountSuccess(response.data));
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
      dispatch(followersCountFailed(error.response.data.error));
    }
  }

  const followUser = async (id) => {
    try {
       await axios.put(
        `${import.meta.env.VITE_API}users/${id}/follow`,{},
        { withCredentials: true }
      );
      await getFollowersCount();
      await fetchFollowings();
      await postsFeed() ;
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
    }
  };

  const fetchFollowings = async () => {
    try {
      dispatch(followingListLoading());
      const response = await axios.get(
        `${import.meta.env.VITE_API}users/${user.data.id}/following`,
        { withCredentials: true }
      );
      dispatch(followingListSuccess(response.data));
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
      dispatch(followingListFailed(error.response.data.error));
    }
  };
  return {
    followUser,
    getFollowersCount,
    fetchFollowings,
  };
};

export default useFollowUser;
