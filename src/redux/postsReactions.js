import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    loading : false ,
    data : null ,
    error : null 
}

const postsReactionsSlice = createSlice({
    name : "postsReactions" ,
    initialState : initialState , 
    reducers : {
        postsReactionsLoading : ( state ) =>{
            state.loading = true ;
        },
        postsReactionsSuccess : ( state , action ) => {
            state.loading = false ;
            state.data = action.payload.data ;
            state.error = null ;
        },
        postsReactionsFailed : ( state , action ) => {
            state.loading = false ;
            state.error = action.payload ;
        }
    }
})


export const { postsReactionsFailed , postsReactionsLoading , postsReactionsSuccess } = postsReactionsSlice.actions ;
export default postsReactionsSlice.reducer ;