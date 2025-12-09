import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    data : null ,
    loading : false ,
    error : null 
}

const followingListSlice = createSlice({
    name : 'followingListSlice' ,
    initialState : initialState ,
    reducers : {
        followingListLoading : ( state ) => {
            state.loading = true ;
        },
        followingListSuccess : ( state , action ) => {
            state.data = action.payload.data ;
            state.loading = false ;
        },
        followingListFailed : ( state , action ) => {
            state.data = action.payload ;
            state.loading = false ;
        }
    }
})



export const { followingListFailed , followingListLoading , followingListSuccess } = followingListSlice.actions ;
export default followingListSlice.reducer ;