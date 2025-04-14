"use client";

import clsx from "clsx";
import { ChevronRight, ChevronLeft, Video, Play } from "lucide-react";
import React, { useEffect, useState } from "react";

interface sideBarProps {
  setCurrentVideo: any;
  currentVideo: { id: string; video_public_id: string };
  isCollapsed: boolean;
  setisCollapsed: any;
  course: courseDetailPageType;
  progressData: ProgressData[];
}

export default function VideoPlayerSideBar({
  setCurrentVideo,
  currentVideo,
  isCollapsed,
  setisCollapsed,
  course,
  progressData,
}: sideBarProps) {
  const API_END_POINT = process.env.NEXT_PUBLIC_API_BASE_URL;

  const currentProgressData = progressData?.map((eachCourse) => {
    if (eachCourse.courseProgress?.courseId === course.id) {
      return eachCourse.courseProgress;
    }
  })[0];

  const handleVideoClick = async (videoSectionId: string) => {
    const result = await fetch(
      `${API_END_POINT}api/course/video/${videoSectionId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!result.ok) {
      throw new Error("Failed to fetch data");
    }

    const finalData = await result.json();

    setCurrentVideo(finalData.data);
  };

  return (
    <div
      className={clsx(
        "bg-gray-900 text-white transition-all duration-300 ease-in-out flex flex-col vertical-center overflow-y-auto",
        isCollapsed ? "w-10 md:w-14" : "w-44 md:w-80"
      )}
    >
      <div
        className={`flex ${
          isCollapsed ? "justify-center" : "items-center justify-between"
        }`}
      >
        {isCollapsed ? (
          ""
        ) : (
          <div className="mt-3 ml-2 text-cyan-500 font-bold md:text-xl">
            {currentProgressData?.completionPercentage}% Completed
          </div>
        )}

        <button
          className={`flex mt-3 ${
            isCollapsed ? "" : "mr-2"
          } w-8 h-8 bg-gray-700 rounded-lg text-gray-300`}
          onClick={() => setisCollapsed((prevState: any) => !prevState)}
        >
          {isCollapsed ? <ChevronRight size={30} /> : <ChevronLeft size={30} />}
        </button>
      </div>

      <div>
        {!isCollapsed && (
          <div className="text-xl md:text-2xl text-gray-400 font-bold border-t border-gray-400 border-b mt-2 p-1.5 mb-3">
            Course: {course.title}
          </div>
        )}
      </div>

      <div>
        {!isCollapsed &&
          course.section.map((eachSection, index) => (
            <div
              key={eachSection.id}
              className="bg-gray-700 mb-2 rounded-md p-2 m-2 border border-gray-600 bg-transparent hover:bg-transparent/50"
            >
              <div className="flex flex-wrap gap-2 items-center">
                <div className="text-sm md:text-xl text-gray-400">
                  Section : {index + 1}
                </div>
                <div className="font-bold text-sm md:text-xl text-gray-200">
                  {eachSection.sectionName}
                </div>
              </div>
              <div>
                {eachSection.videoSection.map((eachVideo) => {
                  const currentSection =
                    currentProgressData?.sectionProgress.map(
                      (eachSectionProgressData) => {
                        if (
                          eachSectionProgressData.sectionId === eachSection.id
                        ) {
                          return eachSectionProgressData;
                        }
                      }
                    );

                  const videoData = currentSection?.map((eachVideoProgress) =>
                    eachVideoProgress?.videoProgress.map((eachObj) => {
                      if (eachObj.videoSectionId === eachVideo.id) {
                        return eachObj;
                      }
                    })
                  )[index];

                  const progressPercentage: number[] = videoData
                    ? videoData
                        .filter(
                          (
                            item
                          ): item is {
                            videoSectionId: string;
                            watchedSeconds: number;
                            completionPercentage: number;
                            isCompleted: boolean;
                          } => item !== undefined
                        )
                        .map((item) => item.completionPercentage)
                    : [];

                  return (
                    <div
                      key={eachVideo.id}
                      className={clsx(
                        "mb-1 bg-gray-800 mt-2 md:mt-4 p-1 md:p-2 rounded-lg h-auto"
                      )}
                      onClick={() => handleVideoClick(eachVideo.id)}
                    >
                      <div className="flex hover:font-semibold text-sm md:text-xl justify-between items-center text-gray-200 cursor-pointer">
                        <div className="flex gap-1 items-center">
                          <Video size={16} />
                          <div>{eachVideo.video_title}</div>
                        </div>
                        <div>
                          {eachVideo.id === currentVideo.id ? (
                            <div className="transition-all animate-pulse text-gray-300">
                              <Play size={18} />
                            </div>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>

                      {/* Progress Line with Circle Indicator */}
                      <div className="mt-2 mb-1 relative">
                        <div className="w-full bg-gray-700 rounded-full h-0.5">
                          <div
                            className="h-full bg-cyan-500 rounded-full transition-all duration-1000"
                            style={{
                              width: `${
                                progressPercentage.length > 0
                                  ? progressPercentage
                                  : 0
                              }%`,
                            }}
                          />
                        </div>
                        {/* Circle Indicator */}
                        <div
                          className="absolute h-2.5 w-2.5 bg-cyan-400 rounded-full top-1/2 transform -translate-y-1/2 transition-all duration-1000"
                          style={{
                            left: `calc(${progressPercentage}% - 7px)`, // Adjust circle position
                            boxShadow: "0 0 6px 1px rgba(34, 211, 238, 0.7)",
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
