import {
  postsReactionsFailed,
  postsReactionsLoading,
  postsReactionsSuccess,
} from "@/redux/postsReactions";
import { reactionCountFailed, reactionCountLoading, reactionCountSuccess } from "@/redux/reactionCountSlice";
import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { toast } from "sonner";

const useHandleLikeDislike = () => {
  const nav = useNavigate();
  const dispatch = useDispatch();
  

  async function getReactionCount() {
    try {
      dispatch( reactionCountLoading()) ;
      const response = await axios.get(`${import.meta.env.VITE_API}posts/reaction/count` , { withCredentials : true } ) ;
      dispatch( reactionCountSuccess( response.data ) ) ;
    } catch (error) {
       toast(<p className="text-md font-bold">Status</p>, {
        description: (
          <p className="font-bold text-red-600 text-md">
            {error.response?.data.error || error.message}
          </p>
        ),
      });
      if (error.response && error.response.status === 401) {
        nav("/login");
      }
      dispatch( reactionCountFailed( error.response.data.error ) ) ;
    }
  }

  async function getPostsReactions() {
    try {
      dispatch(postsReactionsLoading());
      const response = await axios.get(
        `${import.meta.env.VITE_API}posts/reaction/all`,
        { withCredentials: true }
      );
      dispatch(postsReactionsSuccess(response.data));
    } catch (error) {
      toast(<p className="text-md font-bold">Status</p>, {
        description: (
          <p className="font-bold text-red-600 text-md">
            {error.response?.data.error || error.message}
          </p>
        ),
      });
      if (error.response && error.response.status === 401) {
        nav("/login");
      }
      dispatch(postsReactionsFailed(error.response.data.error));
    }
  }

  async function handleLikeDislike(id, operation) {
    try {
      await axios.put(
        `${import.meta.env.VITE_API}posts/${id}/like`,
        {
          operation: operation,
        },
        { withCredentials: true }
      );
      await getPostsReactions();
      getReactionCount() ;
    } catch (error) {
      toast(<p className="text-md font-bold">Status</p>, {
        description: (
          <p className="font-bold text-red-600 text-md">
            {error.response?.data.error || error.message}
          </p>
        ),
      });
      if (error.response && error.response.status === 401) {
        nav("/login");
      }
    }
  }
  return { handleLikeDislike, getPostsReactions , getReactionCount };
};

export default useHandleLikeDislike;
