import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { toast } from "sonner";

const CreatePost = () => {
  const [postDetails, setPostDetails] = useState({
    title: "",
    description: "",
    image: null,
  });
  const nav = useNavigate() ;

  const [open, setOpen] = useState(false);
  const user = useSelector((state) => state.userReducer);
  const disable = postDetails.title.length === 0;

  const uploadPost = async () => {
    try {
      const formData = new FormData();
      formData.append("title", postDetails.title);
      formData.append("description", postDetails.description);
      formData.append("image", postDetails.image ? postDetails.image : "");
      formData.append("userId", user.data.id);
      const response = await axios.post(
        `${import.meta.env.VITE_API}posts`,
        formData,
        { withCredentials: true }
      );
      toast(<p className="text-md font-bold">Status</p>, {
        description: (
          <p className="font-bold text-green-500 text-md">
            Post uploaded successfully.
          </p>
        ),
      });
      setOpen(false);
    } catch (error) {
      toast(<p className="text-md font-bold">Status</p>, {
        description: (
          <p className="font-bold text-red-500 text-md">
            Upload failed. {error.response.data.error}
          </p>
        ),
      });

      if (error.response && error.response.status === 401) {
        nav("/login");
      }
    }
  };

  const handleChange = (e) => {
    const { name } = e.target;
    if (name !== "profile") {
      setPostDetails((prev) => ({ ...prev, [name]: e.target.value }));
    } else {
      setPostDetails((prev) => ({ ...prev, image: e.target.files[0] }));
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(value) => {
        setOpen(value);
      }}
    >
      <DialogTrigger asChild className="my-2">
        <Button className="bg-green-500 font-bold">POST</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            <p>Share your post with your followers.</p>
          </DialogTitle>
        </DialogHeader>
        <Input
          placeholder="Enter the title of your post"
          type="text"
          name="title"
          onChange={handleChange}
        />
        <Textarea
          placeholder="Enter the description of your post"
          name="description"
          onChange={handleChange}
        />
        <Input
          type="file"
          className="border-none shadow-none"
          accept=".jpg,.jpeg,.png,.mp4,.mkv"
          name="profile"
          onChange={handleChange}
        />
        <DialogFooter>
          <Button
            onClick={uploadPost}
            disabled={disable}
            className="bg-green-600 font-bold"
          >
            Upload
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreatePost;
