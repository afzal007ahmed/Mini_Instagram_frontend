import { createSlice, current  } from "@reduxjs/toolkit"


const initialState = {
     data : null ,
     loading : false ,
     error : null 
}


const currentChatSlice = createSlice({
    name : "currentChatSlice" , 
    initialState : initialState ,
    reducers : {
        currentChatLoading : ( state ) => {
            state.loading = true ;
        },
        currentChatSuccess : ( state , action ) => {
            state.loading = false ;
            state.data = action.payload.data ;
            state.error = null ;
        },
        currentChatFailed : ( state , action ) => {
            state.loading = false; 
            state.error = action.payload ;
        }
    }
})


export const { currentChatFailed , currentChatLoading , currentChatSuccess } = currentChatSlice.actions ;
export default currentChatSlice.reducer ; 