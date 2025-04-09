"use client";

import React from "react";
import { StarRating } from "./StarComponent";
import { CalRating } from "@/lib/utilityFunctions";
import { useRouter } from "next/navigation";
import { CldImage } from "next-cloudinary";
import { ArrowRight, Users } from "lucide-react";

export default function CourseCard({
  course,
  ispurchasedCourse,
  isOwner,
}: {
  course: courseType;
  ispurchasedCourse?: boolean;
  isOwner?: boolean;
}) {
  const router = useRouter();
  const { ratings } = CalRating(course.rating);
  return (
    <div
      className="w-80 md:w-96 bg-gray-800 rounded-xl overflow-hidden transform transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-purple-500/40 hover:cursor-pointer"
      onClick={() => router.push(`/course/${course.id}`)}
    >
      <div className="relative group">
        <CldImage
          src={course?.main_image}
          height={300}
          width={300}
          alt="course image"
          className="w-full h-full aspect-video object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-60" />
      </div>

      <div className="p-6 space-y-4 border border-purple-700/30">
        <div className="space-y-2">
          <h3 className="text-2xl font-bold text-white tracking-wide">
            {course.title}
          </h3>
          <StarRating rating={ratings} />
        </div>

        {ispurchasedCourse ? (
          <div className="space-y-4">
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div className="w-[45%] h-full bg-purple-500 rounded-full" />
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Progress</span>
              <span className="text-purple-400 font-medium">45% Complete</span>
            </div>
            <button
              className="w-full flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white py-2.5 px-4 rounded-lg transition-colors duration-200"
              onClick={(e) => {
                e.stopPropagation();
                router.push(`/learn/${course.id}`);
              }}
            >
              Continue Learning
              <ArrowRight size={18} />
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold text-white">
                ₹{course?.price?.toLocaleString()}
              </div>
              {isOwner && (
                <div className="flex items-center gap-2 bg-gray-700/50 py-1.5 px-3 rounded-full">
                  <Users size={16} className="text-purple-400" />
                  <span className="text-sm font-medium text-gray-300">
                    {course.enrolledStudents.length} enrolled
                  </span>
                </div>
              )}
            </div>
            <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2.5 px-4 rounded-lg transition-colors duration-200">
              Learn More
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
