import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { userFailed, userLoading, userSuccess } from "@/redux/userSlice";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { toast } from "sonner";

const Signin = () => {
  const nav = useNavigate();
  const mount = useRef(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userReducer);
  
  const [details, setDetails] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (mount.current && !user.loading && user?.data ) {
      if (user?.data && Object.keys(user.data).length > 0 && !user.error) {
        toast(<p className="text-md font-bold">Status</p>, {
          description: (
            <p className="font-bold text-green-600 text-md">Login Success</p>
          ),
        });
        nav('/') ;
      } else {
        toast(<p className="text-md font-bold">Status</p>, {
          description: (
            <p className="font-bold text-red-600 text-md">{user.error}</p>
          ),
        });
      }
    }
    mount.current = true ;
  }, [user]);

  const disable = details.email.length === 0 || details.password.length == 0;
  const handleChange = (e) => {
    const { name, value } = e.target;
    setDetails((prev) => ({ ...prev, [name]: value }));
  };

  async function loginAPI() {
    try {
      dispatch(userLoading());
      const response = await axios.post(
        `${import.meta.env.VITE_API}auth/login`,
        details,
        { withCredentials: true }
      );
      dispatch(userSuccess(response.data));
    } catch (error) {
      dispatch(userFailed(error.response.data.error));
    }
  }

  return (
    <div className="relative pt-12 h-[100vh] w-[100vw]">
      <img
        src="6964058_7990.jpg"
        className="absolute top-0 left-0 z-[-1] opacity-[0.5] h-full w-full object-cover"
        loading="lazy"
      />
      <h1 className="text-center text-5xl font-bold">Sign In </h1>
      <div className="bg-white p-12 shadow-lg w-[40%] mx-auto rounded-lg my-6 min-w-[300px]">
        <Input
          type="email"
          value={details.email}
          placeholder="Enter your email..."
          name="email"
          className="w-[90%] mx-auto my-8 border-black min-w-[200px]"
          onChange={handleChange}
        />
        <Input
          type="password"
          value={details.password}
          placeholder="Enter your password..."
          name="password"
          className="w-[90%] mx-auto my-8 border-black min-w-[200px]"
          onChange={handleChange}
        />
        <Button className="mx-auto block" disabled={disable} onClick={loginAPI}>
          Signin
        </Button>
        <p className="text-center my-3">
          New here ?{" "}
          <span
            onClick={() => nav("/register")}
            className="font-bold text-blue-600 cursor-pointer"
          >
            Register
          </span>
        </p>
      </div>
    </div>
  );
};

export default Signin;
