"use client";

import { motion } from "framer-motion";
import {
  Rocket,
  Search,
  Shield,
  MessageCircle,
  FileText,
  Upload,
  BarChart3,
  DollarSign,
  BookOpen,
  Star,
  Receipt,
  Smartphone,
  ArrowRight,
  Brain,
  Zap,
  Users,
  Award,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";

// Animation variants for reusability
const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" },
};

const staggerContainer = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const slideInLeft = {
  initial: { opacity: 0, x: -60 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.7, ease: "easeOut" },
};

const slideInRight = {
  initial: { opacity: 0, x: 60 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.7, ease: "easeOut" },
};

export default function HomePage({ userId }: { userId: string | null }) {
  const router = useRouter();

  const handleClick = () => {
    if (userId) {
      router.push("/all-courses");
    } else {
      router.push("/signup");
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-teal-600/10" />
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl" />
          <div className="absolute top-40 right-10 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />
        </div>

        <div className="relative w-full mx-auto px-40 py-20 md:py-32">
          <motion.div
            className="text-center mx-auto"
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            <motion.h1
              className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
              variants={fadeInUp}
            >
              Unlock Your Potential.{" "}
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-teal-400 bg-clip-text text-transparent">
                Create, Sell, and Master
              </span>{" "}
              Skills with the Power of AI.
            </motion.h1>

            <motion.p
              className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed"
              variants={fadeInUp}
            >
              The all-in-one platform for creators to build their teaching
              empire and for learners to accelerate their growth.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              variants={fadeInUp}
            >
              <Button
                size="lg"
                onClick={() => handleClick()}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
              >
                Start Today
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>

              <Button
                variant="outline"
                size="lg"
                onClick={() => router.push("/all-courses")}
                className="border-2 border-gray-600 hover:border-purple-400 bg-transparent text-white hover:bg-purple-500/10 hover:text-white px-8 py-4 text-lg font-semibold transition-all duration-300"
              >
                Explore Courses
                <BookOpen className="ml-2 h-5 w-5" />
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Trust Bar Section */}
      <section className="bg-gray-800/50 backdrop-blur-sm border-y border-gray-700/50">
        <div className="container mx-auto px-4 py-4">
          <motion.div
            className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 text-gray-300">
              <div className="p-2 bg-purple-500/20 rounded-full">
                <Shield className="h-6 w-6 text-purple-400" />
              </div>
              <span className="font-semibold">Secure Payments by Razorpay</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* AI-Powered Learning Feature Section */}
      <section className="py-20 md:py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-800/30 to-slate-800/30" />

        <div className="relative container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
              AI-Powered Learning
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Experience the future of education with intelligent assistance and
              smart summaries
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Column - AI Chatbot */}
            <motion.div
              variants={slideInLeft}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="space-y-6 p-3 rounded-lg text-center"
            >
              <div className="inline-flex items-center gap-2 bg-blue-500/20 text-blue-300 px-4 py-2 rounded-full text-sm font-medium">
                <Brain className="h-4 w-4" />
                AI Assistant
              </div>

              <h3 className="text-3xl md:text-4xl font-bold text-white">
                Have a Question? Just Ask Our AI.
              </h3>

              <p className="text-lg text-gray-300 leading-relaxed">
                Our intelligent assistant has read all our course materials and
                can answer your questions instantly, from curriculum details to
                complex concepts.
              </p>

              {/* Mock Chat Interface */}
              <div className="bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-700 p-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center">
                      <MessageCircle className="h-4 w-4 text-gray-300" />
                    </div>
                    <div className="bg-gray-700 rounded-2xl px-4 py-2 max-w-xs">
                      <p className="text-sm text-gray-200">
                        What topics are covered in React Course?
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 justify-end">
                    <div className="bg-blue-600 text-white rounded-2xl px-4 py-2 max-w-xs">
                      <p className="text-sm">
                        The React course covers hooks, state management,
                        routing, and more!
                      </p>
                    </div>
                    <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center">
                      <Zap className="h-4 w-4 text-blue-400" />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Column - AI Summaries */}
            <motion.div
              variants={slideInRight}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="space-y-6 p-2.5 rounded-lg text-center"
            >
              <div className="inline-flex items-center gap-2 bg-purple-500/20 text-purple-300 px-4 py-2 rounded-full text-sm font-medium">
                <FileText className="h-4 w-4" />
                Smart Summaries
              </div>

              <h3 className="text-3xl md:text-4xl font-bold text-white">
                Revise Smarter, Not Harder.
              </h3>

              <p className="text-lg text-gray-300 leading-relaxed">
                Instantly generate concise summaries of any video lesson.
                Download as a PDF and keep your learning on the fast track.
              </p>

              {/* Mock Video Player with Summary */}
              <div className="bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-700 overflow-hidden">
                <div className="bg-black h-32 flex items-center justify-center">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                    <div className="w-0 h-0 border-l-4 border-l-white border-y-2 border-y-transparent ml-1" />
                  </div>
                </div>
                <div className="p-4 space-y-3">
                  <h4 className="font-semibold text-white">
                    React Hooks Fundamentals
                  </h4>
                  <Button
                    size="sm"
                    className="w-full bg-purple-600 hover:bg-purple-700"
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    Generate Summary
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Designed For Section */}
      <section className="py-20 md:py-32 relative">
        {/* Enhanced background with better contrast */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/80 to-gray-900/80" />
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl" />
        </div>

        <div className="relative container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
              Designed For Everyone
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Whether you&apos;re teaching or learning, we&apos;ve got you
              covered
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
            {/* Card 1: For Creators */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
            >
              <Card className="h-full bg-gray-800/90 backdrop-blur-sm border-2 border-blue-500/30 shadow-2xl hover:shadow-blue-500/20 hover:border-blue-400/50 transition-all duration-300 group">
                <CardHeader className="text-center pb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-blue-500/30 transition-all duration-300">
                    <Users className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl md:text-3xl font-bold text-white mb-2">
                    Your Teaching, Your Business.
                  </CardTitle>
                  <CardDescription className="text-gray-300 text-lg">
                    Everything you need to create and sell your courses
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-5">
                    <div className="flex items-center gap-4 p-3 rounded-lg bg-gray-700/50 hover:bg-gray-700/70 transition-colors duration-200">
                      <div className="p-2 bg-blue-500/20 rounded-lg">
                        <Upload className="h-5 w-5 text-blue-400" />
                      </div>
                      <span className="text-white font-medium">
                        Seamless Course Upload (using Cloudinary)
                      </span>
                    </div>

                    <div className="flex items-center gap-4 p-3 rounded-lg bg-gray-700/50 hover:bg-gray-700/70 transition-colors duration-200">
                      <div className="p-2 bg-green-500/20 rounded-lg">
                        <BarChart3 className="h-5 w-5 text-green-400" />
                      </div>
                      <span className="text-white font-medium">
                        Powerful Analytics Dashboard
                      </span>
                    </div>

                    <div className="flex items-center gap-4 p-3 rounded-lg bg-gray-700/50 hover:bg-gray-700/70 transition-colors duration-200">
                      <div className="p-2 bg-purple-500/20 rounded-lg">
                        <Users className="h-5 w-5 text-purple-400" />
                      </div>
                      <span className="text-white font-medium">
                        Track Sales & Student Enrollment
                      </span>
                    </div>

                    <div className="flex items-center gap-4 p-3 rounded-lg bg-gray-700/50 hover:bg-gray-700/70 transition-colors duration-200">
                      <div className="p-2 bg-orange-500/20 rounded-lg">
                        <DollarSign className="h-5 w-5 text-orange-400" />
                      </div>
                      <span className="text-white font-medium">
                        Secure & Fast Payouts
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Card 2: For Learners */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
            >
              <Card className="h-full bg-gray-800/90 backdrop-blur-sm border-2 border-purple-500/30 shadow-2xl hover:shadow-purple-500/20 hover:border-purple-400/50 transition-all duration-300 group">
                <CardHeader className="text-center pb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-purple-500/30 transition-all duration-300">
                    <BookOpen className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl md:text-3xl font-bold text-white mb-2">
                    A World of Knowledge at Your Fingertips.
                  </CardTitle>
                  <CardDescription className="text-gray-300 text-lg">
                    Learn at your own pace with powerful tools
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-5">
                    <div className="flex items-center gap-4 p-3 rounded-lg bg-gray-700/50 hover:bg-gray-700/70 transition-colors duration-200">
                      <div className="p-2 bg-green-500/20 rounded-lg">
                        <Award className="h-5 w-5 text-green-400" />
                      </div>
                      <span className="text-white font-medium">
                        Interactive Course Progress Tracking
                      </span>
                    </div>

                    <div className="flex items-center gap-4 p-3 rounded-lg bg-gray-700/50 hover:bg-gray-700/70 transition-colors duration-200">
                      <div className="p-2 bg-yellow-500/20 rounded-lg">
                        <Star className="h-5 w-5 text-yellow-400" />
                      </div>
                      <span className="text-white font-medium">
                        Rate Courses & Share Feedback
                      </span>
                    </div>

                    <div className="flex items-center gap-4 p-3 rounded-lg bg-gray-700/50 hover:bg-gray-700/70 transition-colors duration-200">
                      <div className="p-2 bg-blue-500/20 rounded-lg">
                        <Receipt className="h-5 w-5 text-blue-400" />
                      </div>
                      <span className="text-white font-medium">
                        Easy Billing & Invoice Downloads
                      </span>
                    </div>

                    <div className="flex items-center gap-4 p-3 rounded-lg bg-gray-700/50 hover:bg-gray-700/70 transition-colors duration-200">
                      <div className="p-2 bg-purple-500/20 rounded-lg">
                        <Smartphone className="h-5 w-5 text-purple-400" />
                      </div>
                      <span className="text-white font-medium">
                        Learn On Any Device
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-10 md:py-12 bg-gradient-to-r from-blue-900 via-purple-900 to-teal-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl" />
          <div className="absolute bottom-10 right-10 w-48 h-48 bg-white/10 rounded-full blur-xl" />
        </div>

        <div className="relative container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-4xl md:text-6xl font-bold text-gray-100 mb-6">
              Ready to Begin Your Journey?
            </h2>
            <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
              Join thousands of creators and learners who are already
              transforming their future
            </p>
            <Button
              size="lg"
              onClick={() => handleClick()}
              className="bg-gray-200 text-gray-900 hover:bg-gray-100 px-12 py-6 text-xl font-bold shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105"
            >
              {userId ? "Go To Courses" : "Get Started for Free"}
              <ArrowRight className="ml-3 h-6 w-6" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            {/* Logo and Description */}
            <div className="space-y-4">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                LMS
              </h3>
              <p className="text-gray-400 leading-relaxed">
                The future of learning and teaching, powered by artificial
                intelligence.
              </p>
            </div>

            {/* Product Links */}
            <div>
              <h4 className="font-semibold text-lg mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Courses
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    AI Assistant
                  </a>
                </li>
              </ul>
            </div>

            {/* Company Links */}
            <div>
              <h4 className="font-semibold text-lg mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Blog
                  </a>
                </li>
              </ul>
            </div>

            {/* Legal Links */}
            <div>
              <h4 className="font-semibold text-lg mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Cookie Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    GDPR
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>
              &copy; 2025 LMS. All rights reserved. Built with ❤️ for creators
              and learners.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
