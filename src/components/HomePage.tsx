"use client";

import React from "react";
import {
  Users,
  Award,
  PlayCircle,
  ChevronRight,
  GraduationCap,
} from "lucide-react";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const { userId } = useAuth();
  const router = useRouter();

  const handleClick = () => {
    if (userId) {
      router.push("/all-courses");
    } else {
      router.push("signup");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white mx-auto w-full overflow-hidden">
      <div>
        <div className="relative animate-fade-in-right">
          <div className="bg-indigo-600/20 rounded-full absolute -inset-4 blur-2xl"></div>
          <GraduationCap
            className="text-indigo-400 mx-auto"
            size={100}
            strokeWidth={1.5}
          />
        </div>
        {/* Hero Section */}
        <div className="relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
            <div className="text-center animate-fade-in">
              <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
                Transform Your Learning Journey
              </h1>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Unlock your potential with our cutting-edge learning management
                system. Access world-class courses anytime, anywhere.
              </p>
              <div className="flex justify-center space-x-4">
                <button
                  className="px-8 py-4 bg-blue-600 rounded-lg hover:bg-blue-700 transition-all transform hover:scale-105 flex items-center"
                  onClick={handleClick}
                >
                  {userId ? "Go To All Courses" : "Get Started"}
                  <ChevronRight className="ml-2" />
                </button>
                <button
                  className="px-8 py-4 bg-gray-700 rounded-lg hover:bg-gray-600 transition-all transform hover:scale-105"
                  onClick={() =>
                    window.scrollTo({
                      top: document.body.scrollHeight,
                      behavior: "smooth",
                    })
                  }
                >
                  Learn More
                </button>
              </div>
            </div>
          </div>

          {/* Features Section */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="p-6 bg-gray-800 rounded-xl hover:bg-gray-750 transition-all transform hover:-translate-y-2">
                <PlayCircle className="h-12 w-12 text-blue-500 mb-4" />
                <h3 className="text-xl font-semibold mb-2">
                  Interactive Courses
                </h3>
                <p className="text-gray-400">
                  Engage with dynamic content and learn at your own pace
                </p>
              </div>
              <div className="p-6 bg-gray-800 rounded-xl hover:bg-gray-750 transition-all transform hover:-translate-y-2">
                <Users className="h-12 w-12 text-purple-500 mb-4" />
                <h3 className="text-xl font-semibold mb-2">
                  Community Learning
                </h3>
                <p className="text-gray-400">
                  Connect with peers and experts in your field
                </p>
              </div>
              <div className="p-6 bg-gray-800 rounded-xl hover:bg-gray-750 transition-all transform hover:-translate-y-2">
                <Award className="h-12 w-12 text-green-500 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Certifications</h3>
                <p className="text-gray-400">
                  Earn recognized certificates upon completion
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="grid md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold text-blue-400 mb-2">
                  100+
                </div>
                <div className="text-gray-400">Courses Available</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-purple-400 mb-2">
                  50k+
                </div>
                <div className="text-gray-400">Active Students</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-green-400 mb-2">
                  95%
                </div>
                <div className="text-gray-400">Completion Rate</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-red-400 mb-2">4.8</div>
                <div className="text-gray-400">Average Rating</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
