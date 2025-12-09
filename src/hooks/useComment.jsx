import axios from "axios";
import React from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import useFeed from "./useFeed";

const useComment = () => {
   const nav = useNavigate() ;
   const { allComments } = useFeed() ;


   
  async function addCommentApi(id , comment , parentId) {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API}posts/${id}/comment`,
        {
          comment: comment,
          parentId : parentId 
        },
        { withCredentials: true }
      );
      await allComments();
      toast(<p className="text-md font-bold">Status</p>, {
        description: (
          <p className="font-bold text-green-500 text-md">
            Comment added successfully.
          </p>
        ),
      });
    } catch (error) {
      toast(<p className="text-md font-bold">Status</p>, {
        description: (
          <p className="font-bold text-red-500 text-md">
            Upload failed. {error.response?.data?.error}
          </p>
        ),
      });

      if (error.response && error.response.status === 401) {
        nav("/login");
      }
    }
  }

  return { addCommentApi};
};

export default useComment;
