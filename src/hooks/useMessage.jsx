import {
  currentChatFailed,
  currentChatLoading,
  currentChatSuccess,
} from "@/redux/currentChatSlice";
import axios from "axios";
import React from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

const useMessage = () => {
  const dispatch = useDispatch();
  async function addMessage(message, id) {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API}message/${id}/add`,
        {
          message: message,
        },
        { withCredentials: true }
      );
      allMessages( id ) ;
    } catch (error) {
      toast(<p className="text-md font-bold">Message Status</p>, {
        description: (
          <p className="font-bold text-red-600 text-md">
            {error?.response?.data?.error || error.message}
          </p>
        ),
      });
      if (error.response && error.response.status === 401) {
        nav("/login");
      }
    }
  }
  async function allMessages(id) {
    try {
      dispatch(currentChatLoading());
      const response = await axios.get(
        `${import.meta.env.VITE_API}message/${id}/all`,
        { withCredentials: true }
      );
      dispatch(currentChatSuccess(response.data));
    } catch (error) {
      toast(<p className="text-md font-bold">Message Status</p>, {
        description: (
          <p className="font-bold text-red-600 text-md">
            {error?.response?.data?.error || error.message}
          </p>
        ),
      });
      dispatch(
        currentChatFailed(error?.response?.data?.error || error.message)
      );
      if (error.response && error.response.status === 401) {
        nav("/login");
      }
    }
  }
  return {
    addMessage,
    allMessages,
  };
};

export default useMessage;
