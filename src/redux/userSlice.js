import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    data : null ,
    loading : false ,
    error : null 
}

const userSlice = createSlice({
    name : "userSlice" , 
   initialState : initialState ,
   reducers : {
       userLoading : ( state ) => {
        state.loading = true ;
       },
       userSuccess : ( state , action  ) => {
        state.loading = false ;
        state.data = action.payload.data ;
        state.error = null ;
       },
       userFailed : ( state , action ) => {
        state.loading = false ;
        state.error = action.payload ;
       }
   }  
})



export const { userFailed , userLoading , userSuccess } = userSlice.actions ; 
export default userSlice.reducer ; 