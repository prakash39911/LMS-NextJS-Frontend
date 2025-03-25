"use client";

import React from "react";
import {
  Clock,
  Award,
  Users,
  Globe,
  BookOpen,
  Video,
  ArrowRight,
} from "lucide-react";
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
import { useAuth, useUser } from "@clerk/nextjs";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import RatingDialog from "./RatingDialog";
import { Button } from "./ui/button";

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
  userId,
  isPurchased,
  isTeacherOwner,
}: {
  course: courseDetailPageType;
  isTeacher: boolean;
  userId: string | null;
  isPurchased: boolean;
  isTeacherOwner: boolean;
}) {
  const API_END_POINT = process.env.NEXT_PUBLIC_API_BASE_URL;
  const { user } = useUser();
  const router = useRouter();
  const { getToken } = useAuth();
  const { ratings, noOfRating } = CalRating(course.rating);
  const enrolledStudents = CalNoOfEntrolledStudents(course.enrolledStudents);
  const { noOfSections, noOfVideoSections, totalDurationInMinutesOrHours } =
    calSectionsDurationsEtc(course.section);
  const ratingArray = course.rating.filter(
    (eachObj) => eachObj.userId === userId
  );

  const isUserHasGivenRating = ratingArray.length > 0 ? true : false;

  const handleClick = async (data: { amount: string }) => {
    try {
      if (!userId) {
        router.push("/signin");
        return;
      }
      const token = await getToken();

      const isRazorpayLoaded = await loadRazorpayScript();

      if (!isRazorpayLoaded) {
        console.log("Razorpay SDK failed to load.");
        return;
      }

      const response = await fetch(`${API_END_POINT}api/payment/createOrder`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });
      const finalResponse = await response.json();

      if (!finalResponse.success) {
        toast.error("Order Creation Failed");
        return;
      }

      const options = {
        key: process.env.NEXT_PUBLIC_RZPAY_KEY_ID,
        amount: data.amount,
        currency: "INR",
        name: "LMS Website",
        description: "Payment for Course",
        order_id: finalResponse?.data?.id,
        prefill: {
          name: user?.fullName || "",
          email: user?.emailAddresses || "",
        },
        handler: async function (response: any) {
          try {
            const result = await fetch(
              `${API_END_POINT}api/payment/verify-payment`,
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
              toast.success("Payment Successful");
              router.replace(`/learn/${course.id}`);
            } else {
              toast.error("Payment verification failed");
            }
          } catch (verificationError) {
            console.error("Payment verification error:", verificationError);
            toast.error("An error occurred during payment verification");
          }
        },
      };

      const razor = new (window as any).Razorpay(options);
      razor.open();
    } catch (error) {
      console.error("Payment initiation error:", error);
      toast.error("An error occurred while initiating payment");
    }
  };

  return (
    <div>
      <div className="vertical-center bg-gray-900 text-white">
        {/* Hero Section */}
        <div className="bg-gray-900 py-5">
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
                    <span>
                      Created by {course.ownerName && course.ownerName}
                    </span>
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
                      {!isPurchased && (
                        <div className="flex gap-2 items-center">
                          <span className="line-through text-gray-400 ml-2">
                            Rs.{course.price}
                          </span>
                          <span className="text-2xl font-bold">
                            Rs.{Math.ceil(course.price * 0.9)}
                          </span>
                        </div>
                      )}
                    </div>
                    {isUserHasGivenRating ? (
                      <div className="text-gray-300 text-xl flex justify-center mb-10 border border-blue-400 py-1">
                        Thank you for your feedback
                      </div>
                    ) : (
                      <div>
                        {!isTeacher &&
                          (isPurchased ? (
                            <div className="flex justify-center items-center mt-[-20px] mb-4">
                              <RatingDialog courseId={course.id} />
                            </div>
                          ) : (
                            <button
                              className="w-full bg-blue-700 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg mb-4 transition"
                              onClick={() =>
                                handleClick({
                                  amount:
                                    Math.ceil(course.price * 0.9).toString() +
                                    "00",
                                })
                              }
                            >
                              {userId
                                ? isPurchased
                                  ? "Please give your feedback"
                                  : "Buy Now"
                                : "Login to Buy this Course"}
                            </button>
                          ))}
                      </div>
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
                          {noOfSections} Sections and {noOfVideoSections}{" "}
                          Lectures
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
          <div className="flex justify-between">
            <h2 className="text-2xl font-bold mb-6">Course Content</h2>
            {(isTeacherOwner || isPurchased) && (
              <div>
                <Button
                  variant="outline"
                  className="bg-transparent text-gray-300"
                  onClick={() => router.push(`/learn/${course.id}`)}
                >
                  <span>Go To Content</span>
                  <span>
                    <ArrowRight />
                  </span>
                </Button>
              </div>
            )}
          </div>
          <div className="bg-gray-800 rounded-lg overflow-hidden">
            <div className="p-4 border-b border-gray-700 flex items-center justify-between">
              <div>
                <span className="font-medium">{noOfSections} sections</span>
                <span className="mx-2">•</span>
                <span className="font-medium">
                  {noOfVideoSections} lectures
                </span>
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
    </div>
  );
}
