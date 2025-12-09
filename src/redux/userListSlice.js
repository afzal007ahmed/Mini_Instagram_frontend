import { createSlice } from "@reduxjs/toolkit"



const initialState = {
    data : null ,
    loading : false ,
    error : null 
}


const userListSlice = createSlice({
    name : "userListSlice" ,
    initialState : initialState ,
    reducers : {
        userListLoading : ( state ) => {
            state.loading = true ;
        }
        ,
        userListSuccess : ( state , action ) => {
            state.data = action.payload.data ;
            state.loading = false ;
        },
        userListFailed : ( state , action ) => {
            state.error = action.payload ;
            state.loading = false ;
        }
    }
})


export const { userListFailed , userListLoading , userListSuccess } = userListSlice.actions ;
export default userListSlice.reducer ; 