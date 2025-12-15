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
    } catch (error) {
      toast(<p className="text-md font-bold">Message Status</p>, {
        description: (
          <p className="font-bold text-green-600 text-md">{error?.response?.data?.error || error.message }</p>
        ),
      });
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
      dispatch(
        currentChatFailed(error?.response?.data?.error || error.message)
      );
    }
  }
  return {
    addMessage,
    allMessages
  };
};

export default useMessage;
