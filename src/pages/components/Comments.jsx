import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import React, { useMemo } from "react";
import DisplayComments from "./DisplayComments";
import { useSelector } from "react-redux";
import { Loader2 } from "lucide-react";

const Comments = ({ id }) => {
  const comments = useSelector((state) => state.commentsReducer);

  const map = useMemo(() => {
    const tempMap = new Map();
    Object.keys(comments.data).map((key) => {
      comments.data[key].map((comment) => {
        tempMap.set(comment.id, { ...comment, childrens: [] });
      });
    });
    return tempMap;
  }, [comments]);

  const temp = useMemo(() => {
    const obj = {
      data: { ...comments.data },
    };
    Object.keys(comments.data).map((key) => {
      obj.data[key] = comments.data[key].map((comment) => {
        const newObj = { ...comment, childrens: [] };
        newObj.childrens = map.get(comment.id).childrens;
        if (newObj.parent_id) {
          map.get(comment.parent_id).childrens.push(newObj);
          return null ;
        }

        return newObj;
      });
    });
    return obj;
  }, [comments]);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-white text-black font-bold">
          {" "}
          show comments ({ comments.data[id ].length }) 
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[300px] overflow-y-auto scrollbar-hide">
        <DialogHeader>
          <DialogTitle>Comments</DialogTitle>
        </DialogHeader>
        {comments.data ? comments.data[id].length > 0 ? <DisplayComments id={id} comments={temp.data[id]} margin={0}/> : <div>No Comments</div> : comments.loading ? <Loader2 className="animte-spin" /> : <div>{comments.error}</div>}
      </DialogContent>
    </Dialog>
  );
};

export default Comments;
