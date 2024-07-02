"use client";
import React, { useEffect, useState } from "react";
import InputField from "../Field/InputField";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/lib/store";
import { login } from "@/lib/features/auth/authSlice";
import { toast } from "../ui/use-toast";
import { Toaster } from "../ui/toaster";
import InputPasswordField from "../Field/InputPasswordField";

interface LoginFormProps {
  isModal?: boolean;
  children?: React.ReactNode;
}

const LoginForm: React.FC<LoginFormProps> = ({ isModal = false, children }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [userData, setUserData] = useState({
    username: "",
    password: "",
  });

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(login(userData))
      .unwrap()
      .then((res) => {
        toast({
          title: "Login successful",
          description: `Redirecting to dashboard...`,
        });

        setTimeout(() => {
          router.push("/admin/dashboard");
        }, 2000);
      })
      .catch((err) => {
        console.log(err);
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

  return (
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
      <p className="text-sm text-left mb-2">Forgot Password?</p>
      <div className="flex flex-col gap-3">
        <input
          type="submit"
          value={"Log in"}
          className="bg-primary text-white rounded font-medium py-2 cursor-pointer"
        />
      </div>
      <p className="text-center text-sm mt-3">
        Don't have an account? {children}
      </p>

      <Toaster />
    </form>
  );
};

export default LoginForm;
