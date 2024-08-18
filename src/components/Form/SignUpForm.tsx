"use client";
import React, { useEffect, useState } from "react";
import InputField from "../Field/InputField";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/lib/store";
import { login, signup } from "@/lib/features/auth/authSlice";
import { toast } from "../ui/use-toast";
import { Toaster } from "../ui/toaster";
import InputPasswordField from "../Field/InputPasswordField";
import Loading from "../Loading";
import axios from "axios";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface SignUpProps {
  isModal?: boolean;
  children?: React.ReactNode;
}

const SignUpForm: React.FC<SignUpProps> = ({ isModal = false, children }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [userData, setUserData] = useState({
    username: "",
    password: "",
    desa: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [listDesa, setListDesa] = useState([]);

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    dispatch(signup(userData))
      .unwrap()
      .then((res) => {
        toast({
          title: "Register successful",
          description: `Redirecting to dashboard...`,
        });

        setTimeout(() => {
          router.push("/admin/dashboard");
        }, 2000);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
        toast({
          variant: "destructive",
          title: "Failed to login",
          description: err.response,
        });
      });
  };

  const handleChange = (id: string, value: string) => {
    setUserData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const fetchDesa = async () => {
    await axios
      .get(process.env.NEXT_PUBLIC_API_URL + "/desa")
      .then((res) => {
        setListDesa(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDesa = (value: string) => {
    setUserData((prevData) => ({
      ...prevData,
      desa: value,
    }));
  };

  useEffect(() => {
    fetchDesa();
  }, []);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <form className="w-full p-6" onSubmit={handleLogin}>
          <InputField
            label="Username"
            type="text"
            id="text"
            value={userData.username}
            onChange={(value) => {
              handleChange("username", value);
            }}
          />
          <InputPasswordField
            label="Password"
            id="password"
            value={userData.password}
            onChange={(value) => {
              handleChange("password", value);
            }}
          />
          <div className="w-full flex flex-col gap-1 mb-3">
            <label htmlFor="desa">Desa</label>
            <Select onValueChange={handleDesa}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Desa" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Pihak Kecamatan">Pihak Kecamatan</SelectItem>
                {listDesa.map((data: any, index) => (
                  <SelectItem key={index} value={data.name}>
                    {data.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <p className="text-sm text-left mb-2">Forgot Password?</p>
          <div className="flex flex-col gap-3">
            <input
              type="submit"
              value={"Register"}
              className="bg-primary text-white rounded font-medium py-2 cursor-pointer"
            />
          </div>
          <p className="text-center text-sm mt-3">
            Already have an account? {children}
          </p>

          <Toaster />
        </form>
      )}
    </>
  );
};

export default SignUpForm;
