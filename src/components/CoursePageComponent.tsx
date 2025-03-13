"use client";

import React from "react";
import {
  Clock,
  PlayCircle,
  Award,
  Users,
  Globe,
  ChevronDown,
  BookOpen,
} from "lucide-react";
import { StarRating } from "./StarComponent";
import {
  CalNoOfEntrolledStudents,
  CalRating,
  calSectionsDurationsEtc,
} from "@/lib/utilityFunctions";
import { CldImage } from "next-cloudinary";

function CoursePageComponent({ course }: { course: courseDetailPageType }) {
  const { ratings, noOfRating } = CalRating(course.rating);
  const enrolledStudents = CalNoOfEntrolledStudents(course.enrolledStudents);
  const { noOfSections, noOfVideoSections, totalDurationInMinutesOrHours } =
    calSectionsDurationsEtc(course.section);

  return (
    <div className="vertical-center bg-gray-900 text-white">
      {/* Hero Section */}
      <div className="bg-gray-800 py-12">
        <div className="container mx-auto px-4 max-w-8xl">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <h1 className="text-3xl font-bold mb-4">{course.title}</h1>
              <p className="text-gray-300 mb-6">{course.description}</p>

              <div className="flex items-center gap-4 mb-6">
                <StarRating rating={ratings} />
                <span className="text-blue-400">{noOfRating} ratings</span>
                <span className="text-gray-400">
                  {enrolledStudents} students
                </span>
              </div>

              <div className="flex items-center gap-4 text-sm text-gray-300 mb-6">
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  <span>Created by John Doe</span>
                </div>
                <div className="flex items-center gap-1">
                  <Globe className="w-4 h-4" />
                  <span>English</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>Last updated 2/2024</span>
                </div>
              </div>
            </div>

            {/* Course Preview Card */}
            <div className="relative">
              <div className="bg-gray-700 rounded-lg overflow-hidden shadow-xl sticky top-4">
                <CldImage
                  src={course.main_image}
                  height={300}
                  width={300}
                  alt="course image"
                  className="w-full aspect-video object-cover"
                />
                <div className="p-6">
                  <div className="mb-6">
                    <span className="text-3xl font-bold">Rs.149</span>
                    <span className="line-through text-gray-400 ml-2">
                      Rs.{course.price}
                    </span>
                  </div>
                  <button className="w-full bg-blue-700 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg mb-4 transition">
                    Buy Now
                  </button>
                  <div className="space-y-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Clock className="w-5 h-5" />
                      <span>
                        {totalDurationInMinutesOrHours} of video content
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <BookOpen className="w-5 h-5" />
                      <span>
                        {noOfSections} Sections and {noOfVideoSections} Lectures
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Award className="w-5 h-5" />
                      <span>Certificate of completion</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Course Content Preview */}
      <div className="container mx-auto px-4 max-w-7xl py-8">
        <h2 className="text-2xl font-bold mb-6">Course Content</h2>
        <div className="bg-gray-800 rounded-lg overflow-hidden">
          <div className="p-4 border-b border-gray-700 flex items-center justify-between">
            <div>
              <span className="font-medium">{noOfSections} sections</span>
              <span className="mx-2">•</span>
              <span className="font-medium">{noOfVideoSections} lectures</span>
              <span className="mx-2">•</span>
              <span className="font-medium">
                {totalDurationInMinutesOrHours} of Content
              </span>
            </div>
          </div>

          {/* Sample Section */}
          <div className="border-b border-gray-700">
            <button className="w-full p-4 flex items-center justify-between hover:bg-gray-700 transition">
              <div className="flex items-center gap-4">
                <ChevronDown className="w-5 h-5" />
                <div className="text-left">
                  <h3 className="font-medium">1. Introduction to React</h3>
                  <p className="text-sm text-gray-400">4 lectures • 45min</p>
                </div>
              </div>
              <PlayCircle className="w-5 h-5 text-gray-400" />
            </button>
          </div>

          {/* More sections would follow... */}
        </div>
      </div>
    </div>
  );
}

export default CoursePageComponent;
