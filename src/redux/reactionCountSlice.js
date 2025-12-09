import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  loading : false ,
  data : null ,
  error : null
}


const reactionCountSlice = createSlice({
    name  : "reactionCountSlice" ,
    initialState : initialState , 
    reducers : {
        reactionCountLoading : ( state ) => {
            state.loading = true ;
        },
        reactionCountSuccess : ( state , action ) => {
            state.loading = false ;
            state.data = action.payload.data ;
            state.error = null ;
        },
        reactionCountFailed : ( state , action ) => {
            state.loading = false ;
            state.error = action.payload ;
        }
    }
})

export const { reactionCountLoading , reactionCountSuccess , reactionCountFailed } = reactionCountSlice.actions ; 
export default reactionCountSlice.reducer ; 