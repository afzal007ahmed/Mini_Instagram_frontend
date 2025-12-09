import {
  commentsSliceFailed,
  commentsSliceLoading,
  commentsSliceSuccess,
} from "@/redux/commentsSlice";
import {
  postsFeedFailed,
  postsFeedLoading,
  postsFeedSuccess,
} from "@/redux/postsFeedSlice";
import axios from "axios";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { toast } from "sonner";

const useFeed = () => {
  const dispatch = useDispatch();
  const nav = useNavigate();

  async function allComments() {
    try {
      dispatch(commentsSliceLoading());
      const response = await axios.get(
        `${import.meta.env.VITE_API}posts/comments`,
        { withCredentials: true }
      );
      dispatch(commentsSliceSuccess(response.data));
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
      dispatch( commentsSliceFailed(error.response?.data.error))
    }
  }

  async function postsFeed() {
    try {
      dispatch(postsFeedLoading());
      const response = await axios.get(
        `${import.meta.env.VITE_API}posts/feed`,
        { withCredentials: true }
      );
      await allComments(); 
      dispatch(postsFeedSuccess(response.data));
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
      dispatch(postsFeedFailed(error.response.data.error));
    }
  }

  return {
    postsFeed,
    allComments
  };
};

export default useFeed;
