import { createSlice } from "@reduxjs/toolkit" ;

const initialState = {
    data : null ,
    loading : false ,
    error : null 
}


const postSlice = createSlice({
    name : "postSlice" ,
    initialState : initialState ,
    reducers : {
        postSliceLoading : ( state ) => {
            state.loading = true ;
        },
        postSliceSuccess : ( state , action ) => {
            state.loading = false ;
            state.data = action.payload.data ;
        },
        postSliceFailed : ( state , action ) => {
            state.loading = false ;
            state.error  = action.payload ;
        }
    }
})


export const { postSliceFailed , postSliceLoading , postSliceSuccess } = postSlice.actions ;
export default postSlice.reducer ; 