import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    data : null ,
    loading : false ,
    error : null
}

const postsFeedSlice = createSlice({
    name : "postsFeedSlice" ,
    initialState : initialState ,
    reducers : {
        postsFeedLoading : ( state ) => {
            state.loading = true ;
        },
        postsFeedSuccess : ( state , action ) => {
            state.loading = true ;
            state.data = action.payload.data ;
            state.error = null ;
        },
        postsFeedFailed : ( state , action ) => {
            state.loading = false ;
            state.error = action.payload ;
        }
    }
})


export const { postsFeedFailed , postsFeedSuccess , postsFeedLoading } = postsFeedSlice.actions ;
export default postsFeedSlice.reducer ; 