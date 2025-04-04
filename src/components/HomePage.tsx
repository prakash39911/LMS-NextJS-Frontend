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
import { homePageStats } from "@/lib/Values";

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
                  className="px-4 py-3 bg-blue-600 md:px-8 md:py-4 rounded-lg hover:bg-blue-700 transition-all transform hover:scale-105 flex items-center"
                  onClick={handleClick}
                >
                  {userId ? "Go To All Courses" : "Get Started"}
                  <ChevronRight className="ml-2" />
                </button>
                <button
                  className="px-4 py-3 md:px-8 md:py-4 bg-gray-700 rounded-lg hover:bg-gray-600 transition-all transform hover:scale-105"
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
        <section className="bg-gray-900 py-16">
          <div className="container mx-auto px-4">
            <h3 className="text-3xl font-bold text-center mb-12">
              Why Choose LearnHub
            </h3>
            <div className="grid md:grid-cols-4 gap-6">
              {homePageStats.map((feature, index) => (
                <div
                  key={index}
                  className="bg-gray-700 p-6 rounded-lg text-center hover:scale-105 transition-transform duration-300 ease-in-out"
                >
                  <div className="mb-4 flex justify-center">{feature.icon}</div>
                  <h4 className="text-xl font-semibold mb-2">
                    {feature.title}
                  </h4>
                  <p className="text-gray-300">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <footer className="bg-gray-900 border-t border-gray-800 py-8">
          <div className="container mx-auto px-4 text-center">
            <p className="text-gray-400">© 2024 LMS. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </div>
  );
}
