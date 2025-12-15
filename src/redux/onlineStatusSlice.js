import { createSlice } from "@reduxjs/toolkit"

const initialState = { 
  data : null ,
  loading : false ,
  error : null 
}

const onlineStatusSlice = createSlice({
    name : 'onlineStatusSlice' , 
    initialState : initialState ,
    reducers : {
        onlineStatusLoading : ( state ) => {state.loading = true } , 
        onlineStatusSuccess : ( state , action ) => { 
            state.loading = false ;
            state.data = action.payload.data ;
            state.error =  null ;
        } ,
        onlineStatusFailed : ( state , action ) => {
            state.loading = false ;
            state.error = action.payload; 
        }
    }

})

export const { onlineStatusFailed , onlineStatusLoading , onlineStatusSuccess } = onlineStatusSlice.actions ; 
export default onlineStatusSlice.reducer ;