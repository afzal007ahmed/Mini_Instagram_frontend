import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    data : null ,
    loading : false ,
    error : null 
}


const followersCountSlice = createSlice({
    name : "followersCountSlice" ,
    initialState : initialState ,
    reducers : {
        followersCountLoading : ( state ) => {
            state.loading = true ;
        },
        followersCountSuccess : ( state , action ) => {
            state.loading = false ;
            state.data = action.payload.data ;
        },
        followersCountFailed : ( state , action ) => {
            state.loading = false ;
            state.error = action.payload ;
        }
    }
})


export const { followersCountFailed , followersCountLoading , followersCountSuccess } = followersCountSlice.actions ;
export default followersCountSlice.reducer ;