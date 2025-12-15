import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import useMessage from "@/hooks/useMessage";
import { ArrowRight, Loader2 } from "lucide-react";
import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";

const ChatBox = ({ name, id }) => {
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);
  const disable = message.trim().length === 0;
  const user = useSelector(( state ) => state.userReducer ) ;
  const { addMessage, allMessages } = useMessage();
  const messages = useSelector((state) => state.currentChatReducer);
  const msgArray = useMemo(() => {
       return messages.data ? messages.data?.map((item ) => <div className={`${user.data.id === item.from_id ? "ml-auto bg-green-600" : "mr-auto bg-red-600"} w-fit p-2 rounded-lg mt-2 font-bold text-white`}>{item.message}</div>) : []
  } , [messages])

  return (
    <Dialog
      onOpenChange={(value) => {
        if (!value) {
          setMessage("");
        }else{
            allMessages(id)
        }
        setOpen(value);
      }}
      open={open}
    >
      <DialogTrigger asChild>
        <Button className="bg-white text-black hover:text-white">
          Message
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center">{name}</DialogTitle>
          <div className="min-h-[400px] max-h-[500px] overflow-y-scroll">
            { messages.loading ? <Loader2 className="animate-spin"/> : messages.data && messages.data.length === 0 ? <div className="h-full w-full flex justify-center items-center"><p>You have no messages.</p></div> : msgArray}
          </div>
          <div className="flex gap-2 border p-1 rounded-md items-center">
            <Input
              placeholder="Enter your message here..."
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" && message.trim().length != 0) {
                  e.stopPropagation();
                  addMessage(message, id);
                  setMessage("");
                }
              }}
            />
            <Button
              className="rounded-[40px] h-[40px] w-[40px] bg-green-600 border-none"
              disabled={disable}
              onClick={() => {
                addMessage(message, id);
                setMessage("");
              }}
            >
              <ArrowRight />
            </Button>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default ChatBox;
