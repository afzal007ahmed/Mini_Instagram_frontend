import React from "react";
import { Loader2 } from "lucide-react";
import AddReply from "./AddReply";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast } from "sonner";
import useFeed from "@/hooks/useFeed";

const DisplayComments = ({ id, comments, margin }) => {
  const user = useSelector((state) => state.userReducer);
  const { allComments } = useFeed();

  async function deleteComment(id) {
    try {
      await axios.delete(`${import.meta.env.VITE_API}posts/${id}/comment`, {
        withCredentials: true,
      });

      await allComments();

      toast(<p className="text-md font-bold">Status</p>, {
        description: (
          <p className="font-bold text-green-500 text-md">
            Comment deleted successfully.
          </p>
        ),
      });
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

  return (
    <>
      <div>
        <div>
          {comments &&
            comments?.length > 0 &&
            comments.map(
              (item) =>
                item && (
                  <div>
                    <div
                      className={`p-2 my-2 border rounded-md`}
                      style={{ marginLeft: margin }}
                      key={item.id}
                    >
                      <div className="flex gap-2">
                        <img
                          src={
                            item.user?.url
                              ? item.user.url
                              : item.user?.gender === "male"
                              ? "2150793895.jpg"
                              : item.user?.gender === "female"
                              ? "2151839621.jpg"
                              : "2151100252.jpg"
                          }
                          className="w-[50px] min-w-[50px] rounded-[50px] h-[50px] object-cover border-black border"
                        />
                        <div>
                          <p className="font-bold text-sm ">{item.user.name}</p>
                          <p className="text-xs">{item.createdAt}</p>
                          <p className="p-1 mt-1 text-sm">{item.content}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 mt-2">
                        <AddReply postId={id} parentId={item.id} />
                        {user.data.id === item.user_id && (
                          <p className="text-red-600 font-bold text-xs cursor-pointer" onClick={() => { deleteComment(item.id)}}>
                            Delete
                          </p>
                        )}
                      </div>
                    </div>
                    <DisplayComments
                      id={id}
                      comments={item.childrens}
                      margin={margin + 20}
                    />
                  </div>
                )
            )}
        </div>
      </div>
    </>
  );
};

export default DisplayComments;
