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
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth, useUser } from "@clerk/nextjs";
import {
  onBoardingFormSchema,
  onBoardingFormSchemaType,
} from "@prakash39911/sharedlms";
import { toast } from "sonner";

export default function OnBoardingForm() {
  const { user } = useUser();
  const { getToken } = useAuth();
  const router = useRouter();

  const isFirstNameExist = user?.firstName;
  const isLastNameExist = user?.lastName;

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isDirty },
  } = useForm<onBoardingFormSchemaType>({
    resolver: zodResolver(onBoardingFormSchema),
    mode: "onTouched",
  });

  const onActualSubmit = async (data: onBoardingFormSchemaType) => {
    try {
      const token = await getToken();

      const result = await fetch(
        "http://localhost:8000/api/updateuserdata/addRole",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(data),
        }
      );

      if (result.ok) {
        await user?.reload();
        router.push("/");
        toast("Data Saved Successfully");
        router.refresh();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Card className="w-[400px] bg-gray-700 border border-gray-800 shadow-md shadow-black">
      <CardHeader>
        <CardTitle className="text-xl text-gray-300">
          Provide these Details to continue...
        </CardTitle>
        <CardDescription className="text-gray-300">
          Select Whether you are{" "}
          <span className="text-blue-500 font-semibold">Teacher</span> or{" "}
          <span className="text-blue-500 font-semibold">Student</span>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onActualSubmit)}>
          <div className="grid w-full items-center gap-4">
            {!isFirstNameExist && (
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name" className="text-gray-300">
                  FirstName
                </Label>
                <Input
                  id="firstname"
                  placeholder="Enter firstname"
                  className="bg-gray-300"
                  {...register("firstname")}
                />
                {errors.firstname && (
                  <div className="text-sm text-red-600">
                    {errors.firstname.message}
                  </div>
                )}
              </div>
            )}
            {!isLastNameExist && (
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name" className="text-gray-300">
                  LastName
                </Label>
                <Input
                  id="lastname"
                  placeholder="Enter lastname"
                  className="bg-gray-300"
                  {...register("lastname")}
                />
                {errors.lastname && (
                  <div className="text-sm text-red-600">
                    {errors.lastname.message}
                  </div>
                )}
              </div>
            )}

            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name" className="text-gray-300">
                Continue as
              </Label>
              <Controller
                name="role"
                control={control}
                render={({ field }) => (
                  <select {...field} className="p-2 rounded-sm bg-gray-300">
                    <option value="">Select...</option>
                    <option value="student">Student</option>
                    <option value="teacher">Teacher</option>
                  </select>
                )}
              />
              {errors.role && (
                <div className="text-sm text-red-600">
                  {errors.role.message}
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
              Submit
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
