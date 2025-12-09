import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    loading : false ,
    data : null ,
    error : null 
}


const commentsSlice = createSlice({
    name : 'commentsSlice' ,
    initialState : initialState , 
    reducers : {
        commentsSliceLoading : ( state ) => {
            state.loading = true ;
        },
        commentsSliceSuccess : ( state , action ) => {
            state.loading = false ;
            state.data = action.payload.data ;
            state.error = null ;
        },
        commentsSliceFailed : ( state , action ) => {
            state.loading = false ;
            state.data = action.payload ;
        }
    }
})


export const { commentsSliceLoading , commentsSliceSuccess , commentsSliceFailed } = commentsSlice.actions ; 
export default commentsSlice.reducer ; 