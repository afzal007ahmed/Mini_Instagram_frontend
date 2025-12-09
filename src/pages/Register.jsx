import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
} from "../components/ui/select";
import { Label } from "../components/ui/label";
import { useMemo, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { useNavigate } from "react-router";

export default function Register() {
  const nav = useNavigate();
  const [details, setDetails] = useState({
    name: "",
    email: "",
    password: "",
    age: 0,
    gender: "",
  });
  const disable =
    details.age === 0 ||
    details.name.trim().length === 0 ||
    details.email.trim().length === 0 ||
    details.password.trim().length === 0 ||
    details.gender.trim().length === 0;

  const ageArray = useMemo(() => Array.from({ length: 100 }), []);

  async function regiesterAPI() {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API}auth/register`,
        details,
        { withCredentials: true }
      );
      toast(<p className="text-md font-bold">Status</p>, {
        description: (
          <p className="font-bold text-green-600 text-md">
            User added to database successfully.
          </p>
        ),
      });
      nav("/login");
    } catch (err) {
      toast(<p className="text-md font-bold">Status</p>, {
        description: (
          <p className="font-bold text-red-500 text-md">
            {err.response.data.error}
          </p>
        ),
      });
    }
  }

  function handleChange(type, value) {
    setDetails((prev) => ({ ...prev, [type]: value }));
  }

  return (
    <div className="bg-[url('/89123.jpg')] bg-cover bg-center pt-12 w-screen h-screen">
      <h1 className="text-center text-4xl font-bold">Register</h1>

      <Input
        className="mt-12 w-[30%] mx-auto border-black min-w-[200px]"
        placeholder="Enter your name..."
        type="text"
        name="name"
        value={details.name}
        onChange={(e) => {
          handleChange("name", e.target.value);
        }}
      />
      <Input
        className="mt-12 w-[30%] mx-auto border-black min-w-[200px]"
        placeholder="Enter your email..."
        type="email"
        name="email"
        value={details.email}
        onChange={(e) => {
          handleChange("email", e.target.value);
        }}
      />
      <Input
        className="mt-12 w-[30%] mx-auto border-black min-w-[200px]"
        placeholder="Enter your password."
        type="password"
        name="password"
        value={details.password}
        onChange={(e) => {
          handleChange("password", e.target.value);
        }}
      />

      <div className="flex flex-col items-center mt-12">
        <Label>Age:</Label>
        <Select
          onValueChange={(value) => {
            handleChange("age", value);
          }}
          value={details.age}
        >
          <SelectTrigger className="w-[180px] my-4">
            <SelectValue placeholder="Select your age." />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {ageArray.map((_item, index) => (
                <SelectItem key={index} value={index}>
                  {index}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-col items-center">
        <Label>Gender :</Label>
        <Select
         value={ details.gender}
          onValueChange={(value) => {
            handleChange("gender", value);
          }}
        >
          <SelectTrigger className="w-[180px] my-4">
            <SelectValue placeholder="Select your gender" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="female">Female</SelectItem>
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="others"> Others </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <Button
        disabled={disable}
        className="mx-auto block my-6"
        onClick={regiesterAPI}
      >
        Signup
      </Button>
      <p className="text-center my-3 bg-white w-fit p-3 shadow-lg rounded-lg mx-auto">
        Already have a account ?{" "}
        <span
          onClick={() => nav("/login")}
          className="font-bold text-blue-600 cursor-pointer"
        >
          Signin
        </span>
      </p>
    </div>
  );
}
