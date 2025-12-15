import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./redux/userSlice";
import userListReducer from "./redux/userListSlice";
import followingListReducer from "./redux/follwingListSlice";
import followersCountReducer from "./redux/followersCountSlice";
import postReducer from "./redux/postsSlice";
import postsFeedReducer from "./redux/postsFeedSlice";
import postsReactionsReducer from "./redux/postsReactions";
import reactionCountReducer from "./redux/reactionCountSlice";
import commentsReducer from "./redux/commentsSlice";
import onlineStatusReducer from "./redux/onlineStatusSlice";
import currentChatReducer from './redux/currentChatSlice'

const store = configureStore({
  reducer: {
    userReducer,
    userListReducer,
    followingListReducer,
    followersCountReducer,
    postReducer,
    postsFeedReducer,
    postsReactionsReducer,
    reactionCountReducer,
    commentsReducer,
    onlineStatusReducer,
    currentChatReducer
  },
});

export default store;
