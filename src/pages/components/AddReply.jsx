import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import useComment from "@/hooks/useComment";
import React, { useState } from "react";

const AddReply = ({ postId, parentId }) => {
  const [open, setOpen] = useState(false);
  const [comment, setComment] = useState("");
  const disable = comment.trim().length === 0;
  const { addCommentApi } = useComment();

  return (
    <Dialog open={open} onOpenChange={(value) => setOpen(value)}>
      <DialogTrigger asChild>
        <Button className="text-xs font-bold bg-transparent text-black shadow-none hover:bg-transparent">
          Reply
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Reply</DialogTitle>
        </DialogHeader>
        <Textarea
          type="text"
          onChange={(e) => {
            setComment(e.target.value);
          }}
        />
        <DialogFooter>
          <Button
            onClick={() => {
              addCommentApi(postId, comment, parentId);
              setOpen(false);
            }}
            disabled={disable}
            className="bg-green-600 font-bold"
          >
            Reply
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddReply;
