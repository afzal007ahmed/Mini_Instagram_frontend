import { Card, CardContent } from "@/components/ui/card";
import React, { useEffect } from "react";
import CreatePost from "./CreatePost";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  postsFeedFailed,
  postsFeedLoading,
  postsFeedSuccess,
} from "@/redux/postsFeedSlice";
import { toast } from "sonner";
import { Loader2, ThumbsDown, ThumbsUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import useHandleLikeDislike from "@/hooks/useHandleLikeDislike";
import useFeed from "@/hooks/useFeed";
import AddComment from "./AddComment";
import Comments from "./Comments";

const Feed = () => {
  const postsReactions = useSelector((state) => state.postsReactionsReducer);
  const postsFeedData = useSelector((state) => state.postsFeedReducer);
  const reactionCount = useSelector((state) => state.reactionCountReducer);
  const { handleLikeDislike, getPostsReactions, getReactionCount } =
    useHandleLikeDislike();
  const { postsFeed } = useFeed();

  useEffect(() => {
    postsFeed();
    getPostsReactions();
    getReactionCount();
  }, []);

  return (
    <Card className="flex-[2] bg-[#282828] border-none mt-4 min-w-[300px]">
      <CardContent>
        <CreatePost />
        <div>
          {postsFeedData.data ? (
            <div>
              {postsFeedData.data.map((item) => (
                <div className="text-white" key={item.id}>
                  {item.following.posts.map((post) => (
                    <div>
                      <div className="my-6 flex items-center gap-4">
                        <img
                          src={
                            item.following.url
                              ? item.following.url
                              : item.following.gender === "male"
                              ? "2150793895.jpg"
                              : item.following?.gender === "female"
                              ? "2151839621.jpg"
                              : "2151100252.jpg"
                          }
                          className="w-[50px] rounded-[50px] h-[50px] object-cover border-white border-[2px]"
                        />
                        <div>
                          <p className="font-bold text-xl">
                            {item.following.name}
                          </p>
                          <p>{item.following.gender}</p>
                        </div>
                      </div>
                      <div
                        key={post.id}
                        className="bg-black p-6 my-4 rounded-lg"
                      >
                        <p className="text-xl font-bold">{post.title}</p>
                        <p className="text-xs mb-3">{post.createdAt}</p>
                        <hr />
                        <img
                          src={post.url}
                          className=" max-h-[500px] w-fit mx-auto object-contain object-center rounded-md my-3"
                        />
                        <p className="break-all font-bold my-2">
                          {post.description}
                        </p>
                        <div className="my-2 flex gap-2">
                          <Button
                            onClick={() => {
                              handleLikeDislike(post.id, "like");
                            }}
                          >
                            <ThumbsUp
                              fill={
                                postsReactions.data &&
                                postsReactions.data?.[post.id]?.like
                                  ? "white"
                                  : "transparent"
                              }
                            />
                            <span>
                              {reactionCount.data?.[post.id]?.likes > 0 &&
                                reactionCount.data?.[post.id]?.likes}
                            </span>
                          </Button>
                          <Button
                            onClick={() => {
                              handleLikeDislike(post.id, "dislike");
                            }}
                          >
                            <ThumbsDown
                              fill={
                                postsReactions.data &&
                                postsReactions.data?.[post.id]?.dislike
                                  ? "white"
                                  : "transparent"
                              }
                            />
                            <span>
                              {reactionCount.data?.[post.id]?.dislikes > 0 &&
                                reactionCount.data?.[post.id]?.dislikes}
                            </span>
                          </Button>
                        </div>
                        <div className="flex flex-col items-start gap-4">
                          <Comments id={post.id}/>
                          <AddComment id={post.id} />
                        </div>
                      </div>{" "}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          ) : postsFeedData.loading ? (
            <Loader2 className="animate-spin" />
          ) : (
            <p>{postsFeedData.error}</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default Feed;
