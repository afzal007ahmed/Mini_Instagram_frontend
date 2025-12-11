import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import useUserDetails from "@/hooks/useUserDetails";
import {
  postSliceFailed,
  postSliceLoading,
  postSliceSuccess,
} from "@/redux/postsSlice";
import { userFailed, userLoading, userSuccess } from "@/redux/userSlice";
import axios from "axios";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { toast } from "sonner";

const ProfileDetails = () => {
  const nav = useNavigate();
  const [open, setOpen] = useState(false);
  const user = useSelector((state) => state.userReducer);
  const posts = useSelector((state) => state.postReducer);
  const reactionCount = useSelector((state) => state.reactionCountReducer);
  const [profileImg, setProfileImg] = useState(null);
  const dispatch = useDispatch();
  const { userDetails } = useUserDetails();
  const disable = profileImg === null;
  const getAllPosts = async () => {
    try {
      dispatch(postSliceLoading());
      const response = await axios.get(
        `${import.meta.env.VITE_API}users/${user.data.id}/posts`,
        { withCredentials: true }
      );
      dispatch(postSliceSuccess(response.data));
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
      dispatch(postSliceFailed(error.response?.data.error));
    }
  };

  async function changeProfile(e) {
    try {
      dispatch(userLoading());
      const formData = new FormData();
      formData.append("image", profileImg ? profileImg : "");
      if (user.data.public_id) {
        formData.append("public_id", user.data.public_id);
      }
      const response = await axios.post(
        `${import.meta.env.VITE_API}users/change/profile`,
        formData,
        { withCredentials: true }
      );
      dispatch(userSuccess(response.data));
      userDetails();
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
      dispatch(userFailed(error.response.data.error));
    }
  }

  function handleChange(e) {
    setProfileImg(e.target.files[0]);
  }

  useEffect(() => {
    if (open) {
      console.log("Profile");
      getAllPosts();
    }
  }, [open]);

  return (
    <Dialog
      open={open}
      onOpenChange={(value) => {
        setOpen(value);
        if (!value) {
          setProfileImg(null);
        }
      }}
    >
      <DialogTrigger asChild>
        <Button>View details</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[420px] md:max-w-[500px] bg-[#282828] border-none text-white overflow-y-scroll max-h-[80vh] overflow-x-hidden scrollbar-hide">
        <DialogHeader>
          <DialogTitle className="text-center font-bold lg:text-2xl ">
            {user.data.name}
          </DialogTitle>
        </DialogHeader>
        <div className="w-full min-w-[330px]">
          <div className="w-full">
            <p>Change your profile picture.</p>
            <Input
              type="file"
              access=".jpg,.png,.jpeg"
              className="my-2 bg-white text-black w-fit"
              onChange={handleChange}
            />
            <Button
              onClick={changeProfile}
              className="bg-red-600 font-bold"
              disabled={disable}
            >
              {user.loading ? <Loader2 className="animate-spin" /> : "Change"}
            </Button>
          </div>
          <div className="w-full">
            <p>
              {" "}
              Email :{" "}
              <span className="font-bold text-lg"> {user.data.email} </span>
            </p>
            <p>
              {" "}
              Age : <span className="font-bold text-lg">{user.data.age}</span>
            </p>
            <p>
              {" "}
              Gender :{" "}
              <span className="font-bold text-lg">{user.data.gender}</span>
            </p>
          </div>
          <div className="w-full">
            <p className="font-bold text-xl mb-8">Your Posts</p>
            {posts.loading ? (
              <Loader2 className="animate-spin" />
            ) : (
              <div>
                {posts.data && posts.data.length > 0 ? (
                  posts.data.map((item) => (
                    <div className="border mb-4 rounded-lg w-full max-w-full p-3">
                      <h1 className="font-bold text-lg mb-2">{item.title}</h1>
                      <hr />
                      { item.url && <img
                        src={item.url}
                        alt="post_img"
                        className="rounded-lg my-3 object-cover object-center w-full"
                      />}
                      <p className="font-bold">{item.description}</p>
                      <div className="my-2 flex gap-3">
                        <span>
                          {" "}
                          <span className="font-bold text-lg">
                            {reactionCount.data[item.id]
                              ? reactionCount.data[item.id].likes
                              : 0}
                          </span>{" "}
                          likes
                        </span>
                        <span>
                          {" "}
                          <span className="font-bold text-lg">
                            {reactionCount.data[item.id]
                              ? reactionCount.data[item.id].dislikes
                              : 0}
                          </span>{" "}
                          dislikes
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>You have no posts yet.</p>
                )}
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileDetails;
