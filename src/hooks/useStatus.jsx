import { onlineStatusFailed, onlineStatusLoading, onlineStatusSuccess } from '@/redux/onlineStatusSlice';
import axios from 'axios'
import { useDispatch } from 'react-redux';

const useStatus = () => {

    const dispatch = useDispatch() ;

async function onlineStatus() {
    try {
        dispatch( onlineStatusLoading()) ;
       const response = await axios.get(`${import.meta.env.VITE_API}users/status/all` , {withCredentials : true } ) ;
        dispatch( onlineStatusSuccess( response.data ) ) ;
    } catch (error) {
        dispatch( onlineStatusFailed( error?.response?.data?.error || error.message ) ) ;
    }
}
  return {
    onlineStatus 
  }
}

export default useStatus