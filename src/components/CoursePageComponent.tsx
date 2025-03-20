"use client";

import React from "react";
import { Clock, Award, Users, Globe, BookOpen, Video } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { StarRating } from "./StarComponent";
import {
  CalNoOfEntrolledStudents,
  CalRating,
  calSectionsDurationsEtc,
  DatabaseDateToGeneralDate,
  secondsToMinuteForEachVideo,
} from "@/lib/utilityFunctions";
import { CldImage } from "next-cloudinary";
import { useAuth } from "@clerk/nextjs";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    if ((window as any).Razorpay) {
      resolve(true);
      return;
    }
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

export default function CoursePageComponent({
  course,
  isTeacher,
}: {
  course: courseDetailPageType;
  isTeacher: boolean;
}) {
  const router = useRouter();
  const { getToken } = useAuth();
  const { ratings, noOfRating } = CalRating(course.rating);
  const enrolledStudents = CalNoOfEntrolledStudents(course.enrolledStudents);
  const { noOfSections, noOfVideoSections, totalDurationInMinutesOrHours } =
    calSectionsDurationsEtc(course.section);

  const handleClick = async (data: { amount: string }) => {
    try {
      const token = await getToken();

      const isRazorpayLoaded = await loadRazorpayScript();

      if (!isRazorpayLoaded) {
        console.log("Razorpay SDK failed to load.");
        return;
      }

      const response = await fetch(
        "http://localhost:8000/api/payment/createOrder",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // Authorization: `Basic ${process.env.RZPAY_KEY_ID}:${process.env.RZPAY_SECRET_KEY}`,
          },
          body: JSON.stringify(data),
        }
      );
      const finalResponse = await response.json();

      if (!finalResponse.success) {
        console.error("Order was not created:", finalResponse);
        return;
      }

      const options = {
        key: process.env.NEXT_PUBLIC_RZPAY_KEY_ID,
        amount: data.amount,
        currency: "INR",
        name: "LMS Website",
        description: "Payment for Order",
        order_id: finalResponse?.data?.id,
        prefill: {
          name: "John Doe",
          email: "john@example.com",
        },
        handler: async function (response: any) {
          const result = await fetch(
            "http://localhost:8000/api/payment/verify-payment",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify({
                razorpay_order_id: finalResponse?.data?.id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                courseId: course.id,
              }),
            }
          );

          const finalResult = await result.json();

          if (finalResult.status) {
            toast("Payment Was Successfull");
            router.push(`/learn/${course.id}`);
          } else {
            alert("Payment verification failed");
          }
        },
      };

      const razor = new (window as any).Razorpay(options);
      razor.open();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="vertical-center bg-gray-900 text-white">
      {/* Hero Section */}
      <div className="bg-gray-800 py-5">
        <div className="container mx-auto px-4 max-w-7xl">
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
                  <span>
                    Last updated {DatabaseDateToGeneralDate(course.updatedAt)}
                  </span>
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
                  <div className="mb-6 gap-2 flex items-center">
                    <span className="line-through text-gray-400 ml-2">
                      Rs.{course.price}
                    </span>
                    <span className="text-2xl font-bold">
                      Rs.{Math.ceil(course.price * 0.9)}
                    </span>
                  </div>
                  {!isTeacher && (
                    <button
                      className="w-full bg-blue-700 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg mb-4 transition"
                      onClick={() =>
                        handleClick({
                          amount:
                            Math.ceil(course.price * 0.9).toString() + "00",
                        })
                      }
                    >
                      Buy Now
                    </button>
                  )}

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
          <div className="border-b border-gray-700 mx-3">
            <Accordion type="single" collapsible className="w-full">
              {course.section.map((eachSection) => (
                <AccordionItem key={eachSection.id} value={eachSection.id}>
                  <AccordionTrigger className="text-xl font-extrabold">
                    {eachSection.sectionName}
                  </AccordionTrigger>
                  <div>
                    {eachSection.videoSection.map((eachVideoSection) => (
                      <AccordionContent
                        key={eachVideoSection.id}
                        className="border-b mt-0.5"
                      >
                        <div className="flex justify-between">
                          <div className="flex gap-2 items-center cursor-pointer hover:font-semibold">
                            <span>
                              <Video size={18} />
                            </span>
                            <span className="font-serif text-xl">
                              {eachVideoSection.video_title}
                            </span>
                          </div>
                          <div>
                            {secondsToMinuteForEachVideo(
                              eachVideoSection.video_duration
                            )}
                          </div>
                        </div>
                      </AccordionContent>
                    ))}
                  </div>
                </AccordionItem>
              ))}
            </Accordion>
            {/* <button className="w-full p-4 flex items-center justify-between hover:bg-gray-700 transition">
              <div className="flex items-center gap-4">
                <ChevronDown className="w-5 h-5" />
                <div className="text-left">
                  <h3 className="font-medium">1. Introduction to React</h3>
                  <p className="text-sm text-gray-400">4 lectures • 45min</p>
                </div>
              </div>
              <PlayCircle className="w-5 h-5 text-gray-400" />
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
}
