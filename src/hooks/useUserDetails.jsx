import { userFailed, userSuccess } from "@/redux/userSlice";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { toast } from "sonner";

const useUserDetails = () => {
  const dispatch = useDispatch();
  const nav = useNavigate() ;

  async function userDetails() {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API}users`,
        { withCredentials: true }
      );
      dispatch(userSuccess(response.data));
    } catch (error) {
      toast(<p className="text-md font-bold">Status</p>, {
        description: (
          <p className="font-bold text-red-600 text-md">
            {error.response?.data.error || error.message }
          </p>
        ),
      });
      if (error.response && error.response.status === 401) {
        nav("/login");
      }
      dispatch( userFailed( error.response?.data.error ) ) ;
    }
  }

  return {
    userDetails
  }
};

export default useUserDetails;
