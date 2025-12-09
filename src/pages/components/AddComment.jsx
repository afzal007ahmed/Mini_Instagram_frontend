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

const AddComment = ({ id }) => {
  const [ open , setOpen ] = useState( false ) ;
  const [comment, setComment] = useState("");
  const disable = comment.trim().length === 0;
  const { addCommentApi } = useComment() ;


  return (
    <Dialog onOpenChange={(value) => { setOpen( value ) }} open={open}>
      <DialogTrigger asChild>
        <Button className="bg-green-600 font-bold">Add Comment</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            <h1>Add comment.</h1>
          </DialogTitle>
        </DialogHeader>
        <Textarea
          type="text"
          onChange={(e) => {
            setComment(e.target.value);
          }}
        />
        <DialogFooter>
          <Button  onClick={() => {
            addCommentApi( id , comment , null)
            setOpen(false) 
          }} className="bg-green-600 font-bold" disabled={disable}>
            Add
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddComment;
