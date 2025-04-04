"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginUserSchema, loginUserSchemaType } from "@prakash39911/sharedlms";

export default function LoginCard() {
  const API_END_POINT = process.env.NEXT_PUBLIC_API_BASE_URL;
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm<loginUserSchemaType>({
    resolver: zodResolver(loginUserSchema),
    mode: "onTouched",
  });

  const onActualSubmit = async (data: loginUserSchemaType) => {
    const result = await fetch(`${API_END_POINT}user/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const finalData = await result.json();

    console.log("Api Call Result", finalData);
    reset();
  };

  return (
    <Card className="w-[400px] bg-gray-700 border border-gray-800 shadow-md shadow-black">
      <CardHeader>
        <CardTitle className="text-xl text-gray-300">Login</CardTitle>
        <CardDescription className="text-gray-300">
          Does not have an account.{" "}
          <span
            className="font-semibold text-blue-600 cursor-pointer"
            onClick={() => router.push("/register")}
          >
            Register
          </span>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onActualSubmit)}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name" className="text-gray-300">
                Email
              </Label>
              <Input
                id="email"
                placeholder="Enter your email"
                className="bg-gray-300"
                {...register("email")}
              />
              {errors.email && (
                <div className="text-sm text-red-600">
                  {errors.email.message}
                </div>
              )}
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name" className="text-gray-300">
                Password
              </Label>
              <Input
                type="password"
                id="password"
                placeholder="Enter your password"
                className="bg-gray-300"
                {...register("password")}
              />
              {errors.password && (
                <div className="text-sm text-red-600">
                  {errors.password.message}
                </div>
              )}
            </div>
          </div>
          <div className="flex justify-center items-center mt-4">
            <Button
              type="submit"
              variant="outline"
              className="font-semibold bg-gray-600 text-gray-50 hover:bg-gray-700 hover:text-white"
              disabled={!isDirty}
            >
              Login
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
