"use client";

import React, { useEffect, useState } from "react";
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
  const [isLoaded, setIsLoaded] = useState(false);
  const [visibleSections, setVisibleSections] = useState({
    features: false,
    stats: false,
    footer: false,
  });
  const [headingText, setHeadingText] = useState("");
  const fullHeadingText = "Transform Your Learning Journey";

  useEffect(() => {
    // Set page as loaded after a small delay to trigger animations
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);

    // Animate the heading text character by character
    let currentIndex = 0;
    const textInterval = setInterval(() => {
      if (currentIndex <= fullHeadingText.length) {
        setHeadingText(fullHeadingText.substring(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(textInterval);
      }
    }, 80); // Speed of text reveal

    // Add scroll listener for scroll animations
    const handleScroll = () => {
      const scrollY = window.scrollY;

      // Calculate which sections should be visible based on scroll position
      setVisibleSections({
        features: scrollY > 100,
        stats: scrollY > 300,
        footer: scrollY > 600,
      });
    };

    window.addEventListener("scroll", handleScroll);
    // Trigger once on load to check initial viewport
    handleScroll();

    // Clean up
    return () => {
      clearTimeout(timer);
      clearInterval(textInterval);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleClick = () => {
    if (userId) {
      router.push("/all-courses");
    } else {
      router.push("signup");
    }
  };

  const scrollToLearnMore = () => {
    const statsSection = document.getElementById("stats-section");
    if (statsSection) {
      statsSection.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollTo({
        top: document.body.scrollHeight / 2, // Scroll to middle of page as fallback
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white mx-auto w-full overflow-hidden">
      <div>
        {/* Logo Animation */}
        <div
          className={`relative mt-24 transition-all duration-1000 transform ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="bg-indigo-600/20 rounded-full absolute -inset-4 blur-2xl"></div>
          <GraduationCap
            className="text-indigo-400 mx-auto animate-pulse"
            size={100}
            strokeWidth={1.5}
          />
        </div>

        {/* Hero Section */}
        <div className="relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
            <div className="text-center">
              {/* Animated Heading with Text Reveal */}
              <h1 className="text-5xl md:text-6xl font-bold mb-6 relative">
                <span className="relative inline-block">
                  {/* Animated text with gradient */}
                  <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 text-transparent bg-clip-text bg-size-200 animate-gradient-x">
                    {headingText}
                  </span>

                  {/* Cursor effect */}
                  <span
                    className={`absolute -right-1 top-0 h-full w-1 bg-blue-400 ${
                      headingText === fullHeadingText ? "animate-blink" : ""
                    }`}
                    style={{
                      display:
                        headingText === fullHeadingText
                          ? "none"
                          : "inline-block",
                    }}
                  ></span>
                </span>
              </h1>
              <p
                className={`text-xl text-gray-300 mb-8 max-w-2xl mx-auto transition-all duration-1000 transform ${
                  isLoaded
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: "600ms" }}
              >
                Unlock your potential with our cutting-edge learning management
                system. Access world-class courses anytime, anywhere.
              </p>
              <div
                className={`flex justify-center space-x-4 transition-all duration-1000 transform ${
                  isLoaded
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: "900ms" }}
              >
                <button
                  className="px-4 py-3 bg-blue-600 md:px-8 md:py-4 rounded-lg hover:bg-blue-700 transition-all transform hover:scale-105 flex items-center"
                  onClick={handleClick}
                >
                  {userId ? "Go To All Courses" : "Get Started"}
                  <ChevronRight className="ml-2" />
                </button>
                <button
                  className="px-4 py-3 md:px-8 md:py-4 bg-gray-700 rounded-lg hover:bg-gray-600 transition-all transform hover:scale-105"
                  onClick={scrollToLearnMore}
                >
                  Learn More
                </button>
              </div>
            </div>
          </div>

          {/* Features Section */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="grid md:grid-cols-3 gap-8">
              {[0, 1, 2].map((index) => (
                <div
                  key={index}
                  className={`p-6 bg-gray-800 rounded-xl hover:bg-gray-750 transition-all transform hover:-translate-y-2 duration-700 ${
                    visibleSections.features
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-10"
                  }`}
                  style={{ transitionDelay: `${index * 200}ms` }}
                >
                  {index === 0 && (
                    <PlayCircle className="h-12 w-12 text-blue-500 mb-4" />
                  )}
                  {index === 1 && (
                    <Users className="h-12 w-12 text-purple-500 mb-4" />
                  )}
                  {index === 2 && (
                    <Award className="h-12 w-12 text-green-500 mb-4" />
                  )}

                  <h3 className="text-xl font-semibold mb-2">
                    {index === 0 && "Interactive Courses"}
                    {index === 1 && "Community Learning"}
                    {index === 2 && "Certifications"}
                  </h3>
                  <p className="text-gray-400">
                    {index === 0 &&
                      "Engage with dynamic content and learn at your own pace"}
                    {index === 1 &&
                      "Connect with peers and experts in your field"}
                    {index === 2 &&
                      "Earn recognized certificates upon completion"}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <section id="stats-section" className="bg-gray-900 py-16">
          <div className="container mx-auto px-4">
            <h3
              className={`text-3xl font-bold text-center mb-12 transition-all duration-1000 ${
                visibleSections.stats ? "opacity-100" : "opacity-0"
              }`}
            >
              Why Choose LearnHub
            </h3>
            <div className="grid md:grid-cols-4 gap-6">
              {homePageStats.map((feature, index) => (
                <div
                  key={index}
                  className={`bg-gray-700 p-6 rounded-lg text-center hover:scale-105 transition-all duration-700 ease-in-out ${
                    visibleSections.stats
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-10"
                  }`}
                  style={{ transitionDelay: `${index * 150}ms` }}
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

        <footer
          className={`bg-gray-900 border-t border-gray-800 py-8 transition-opacity duration-1000 ${
            visibleSections.footer ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="container mx-auto px-4 text-center">
            <p className="text-gray-400">© 2024 LMS. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </div>
  );
}
