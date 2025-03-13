"use client";

import React from "react";
import { StarRating } from "./StarComponent";
import { CalRating } from "@/lib/utilityFunctions";
import { useRouter } from "next/navigation";
import { CldImage } from "next-cloudinary";

export default function CourseCard({ course }: { course: courseType }) {
  const router = useRouter();
  const { ratings } = CalRating(course.rating);
  return (
    <div
      className="w-96 h-96 bg-gray-900 text-gray-300 rounded-xl shadow-lg shadow-blue-900 cursor-pointer"
      onClick={() => router.replace(`/course/${course.id}`)}
    >
      <div className=" h-full grid-rows-2">
        <div className="h-2/3">
          <CldImage
            src={course.main_image}
            height={300}
            width={300}
            alt="course image"
            className="w-full h-full aspect-video object-cover"
          />
        </div>
        <div className="h-1/3 bg-gray-700 p-2 flex flex-col gap-4">
          <div className="font-bold text-2xl text-gray-300">{course.title}</div>
          <div>
            <StarRating rating={ratings} />
          </div>
          <div className="text-xl font-serif">Rs.{course.price}</div>
        </div>
      </div>
    </div>
  );
}
