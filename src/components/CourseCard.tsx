"use client";

import React from "react";
import { StarRating } from "./StarComponent";
import { CalRating } from "@/lib/utilityFunctions";
import { useRouter } from "next/navigation";
import { CldImage } from "next-cloudinary";
import { ArrowRight } from "lucide-react";

export default function CourseCard({
  course,
  ispurchasedCourse,
}: {
  course: courseType;
  ispurchasedCourse?: boolean;
}) {
  const router = useRouter();
  const { ratings } = CalRating(course.rating);
  return (
    <div
      className="w-96 h-96 bg-gray-900 text-gray-300 shadow-md shadow-gray-500 cursor-pointer"
      onClick={() => router.push(`/course/${course.id}`)}
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
          <div className="flex justify-between items-center mr-2">
            <div className="font-bold text-2xl text-gray-300">
              {course.title}
            </div>
            {ispurchasedCourse && (
              <div>
                <button
                  className="py-1.5 px-1.5 bg-transparent border border-gray-400 shadow-sm rounded-md hover:bg-gray-900 hover:text-gray-100 hover:border-gray-100"
                  onClick={(e) => {
                    e.stopPropagation();
                    router.push(`/learn/${course.id}`);
                  }}
                >
                  <div className="flex gap-0.5 items-center">
                    <span>Continue to Course</span>
                    <span>
                      <ArrowRight size={20} />
                    </span>
                  </div>
                </button>
              </div>
            )}
          </div>

          <div>
            <StarRating rating={ratings} />
          </div>
          {ispurchasedCourse ? (
            <div className="text-xl flex justify-between">
              <div>Completed</div>
              <div>%</div>
            </div>
          ) : (
            <div className="text-xl font-serif">Rs.{course.price}</div>
          )}
        </div>
      </div>
    </div>
  );
}
