"use client";

import React, { useEffect, useRef, useState } from "react";
import { CldVideoPlayer } from "next-cloudinary";
import "next-cloudinary/dist/cld-video-player.css";
import clsx from "clsx";
import VideoPlayerSideBar from "./VideoPlayerSideBar";
import { useAuth } from "@clerk/nextjs";
import { useGetCourseProgressApi } from "@/hooks/useGetCourseProgressApi";

export default function VideoPlayerComponent({
  course,
  isTeacher,
}: {
  course: courseDetailPageType;
  isTeacher: boolean;
}) {
  const { getToken } = useAuth();
  const [isCollapsed, setisCollapsed] = useState(false);
  const [currentVideo, setCurrentVideo] = useState({
    id: course.section[0].videoSection[0].id,
    video_public_id: course.section[0].videoSection[0].video_public_id,
  });

  const { data: apiData } = useGetCourseProgressApi(isTeacher);

  const progressDataArray = apiData?.data as ProgressData[];
  const progressDataForThiscourse = progressDataArray
    ?.map((eachobj) => {
      if (eachobj.courseProgress?.courseId === course.id) {
        return eachobj;
      }
    })
    .filter((item) => item !== undefined);

  const API_END_POINT = process.env.NEXT_PUBLIC_API_BASE_URL;

  const videoPlayerRef = useRef<any>(null);
  const lastReportedTimeRef = useRef<number>(-5); // Initialize with -5 to ensure first check works

  // Function to make API call

  useEffect(() => {
    // Reset the last reported time when video changes
    lastReportedTimeRef.current = -5;

    const checkPlaybackTime = () => {
      if (!videoPlayerRef.current) return;

      const currentTime = videoPlayerRef.current.currentTime();
      const lastReportedBlock = Math.floor(lastReportedTimeRef.current / 5);
      const currentBlock = Math.floor(currentTime / 5);

      // If we've moved to a new 5-second block, report it
      if (currentBlock > lastReportedBlock) {
        const reportTime = currentBlock * 5; // The exact 5-second mark

        const reportPlaybackProgress = async (timeInSeconds: number) => {
          const token = await getToken();

          try {
            if (timeInSeconds > 0) {
              await fetch(
                `${API_END_POINT}api/updateuserdata/updateCourseProgress`,
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                  },
                  body: JSON.stringify({
                    videoId: currentVideo.id,
                    timeInSeconds: Math.floor(timeInSeconds),
                    courseId: course.id,
                  }),
                }
              )
                .then((res) => res.json())
                .then((data) => {
                  if (data?.status) {
                    apiData?.refetch();
                  }
                });
            }
          } catch (error) {
            console.error("Failed to report playback progress:", error);
          }
        };

        reportPlaybackProgress(reportTime);
        lastReportedTimeRef.current = reportTime;
      }
    };

    const interval = setInterval(checkPlaybackTime, 1000);

    return () => clearInterval(interval);
  }, [currentVideo.id, getToken, API_END_POINT, course.id, apiData]); // Re-initialize when video changes

  return (
    <div className="bg-gray-900 vertical-center w-full flex">
      <div className="border-r-2 border-gray-800">
        <VideoPlayerSideBar
          setCurrentVideo={setCurrentVideo}
          currentVideo={currentVideo}
          isCollapsed={isCollapsed}
          setisCollapsed={setisCollapsed}
          course={course}
          progressData={
            progressDataForThiscourse ? progressDataForThiscourse[0] : null
          }
          isTeacher={isTeacher}
        />
      </div>
      <div
        className={clsx(
          "flex justify-center items-center flex-1",
          isCollapsed ? "w-[calc(100%-3.5rem)]" : "w-[calc(100%-24rem)]"
        )}
      >
        <div className="w-4/5">
          <CldVideoPlayer
            id={`player-${currentVideo.id}`}
            width={1920}
            height={1080}
            src={currentVideo.video_public_id}
            key={currentVideo.video_public_id}
            playerRef={videoPlayerRef}
          />
        </div>
      </div>
    </div>
  );
}
