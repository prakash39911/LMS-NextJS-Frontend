"use client";

import React, { useState } from "react";
import { CldVideoPlayer } from "next-cloudinary";
import "next-cloudinary/dist/cld-video-player.css";
import clsx from "clsx";
import VideoPlayerSideBar from "./VideoPlayerSideBar";

export default function VideoPlayerComponent({
  course,
}: {
  course: courseDetailPageType;
}) {
  const [isCollapsed, setisCollapsed] = useState(true);
  const [currentVideo, setCurrentVideo] = useState({
    id: course.section[0].videoSection[0].id,
    video_public_id: course.section[0].videoSection[0].video_public_id,
  });

  return (
    <div className=" bg-gray-900 vertical-center w-full flex">
      <div className="border-r-2 border-gray-800">
        <VideoPlayerSideBar
          setCurrentVideo={setCurrentVideo}
          currentVideo={currentVideo}
          isCollapsed={isCollapsed}
          setisCollapsed={setisCollapsed}
          course={course}
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
            width={1920}
            height={1080}
            src={currentVideo.video_public_id}
            key={currentVideo.video_public_id}
          />
        </div>
      </div>
    </div>
  );
}
