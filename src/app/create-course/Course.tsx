"use client";

import { Button } from "@/components/ui/button";
import VideoUploadButton from "@/components/VideoUploadButton";
import { toast } from "sonner";
import {
  FormProviderCreateCourse,
  useFormContextCreateCourse,
} from "@/hooks/useReactHookForm";
import { useFormStore } from "@/store/CreateCourseStore";
import { useAuth, useUser } from "@clerk/nextjs";
import { X, Image, Plus, Upload, Video, ArrowRight } from "lucide-react";
import { CldImage, CloudinaryUploadWidgetResults } from "next-cloudinary";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useFieldArray } from "react-hook-form";
import ImageUploadButton from "@/components/ImageUploadButton";
import LoadingComponent from "@/components/LoadingComponent";

export default function Course({ name }: { name: string }) {
  return (
    <FormProviderCreateCourse>
      <CreateCourseForm name={name} />
    </FormProviderCreateCourse>
  );
}

function CreateCourseForm({ name }: { name: string }) {
  const { user } = useUser();
  const router = useRouter();
  const { getToken } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const fullName = user?.fullName || name;

  const API_END_POINT = process.env.NEXT_PUBLIC_API_BASE_URL;

  const {
    videos,
    image,
    addVideo: addVideoToStore,
    addImage: addImageToStore,
    removeVideo: removeVideoFromState,
    reset,
  } = useFormStore();

  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useFormContextCreateCourse();

  useEffect(() => {
    reset();
  }, [reset]);

  const onActualImageUpload = (result: CloudinaryUploadWidgetResults) => {
    console.log("Cloudinary image upload Result", result);

    if (result.info && typeof result.info === "object") {
      addImageToStore({
        publicId: result.info.public_id,
        url: result.info.secure_url,
        fileName: result.info.original_filename,
      });
      setValue("main_image", result.info.public_id);
    }
  };

  const actualSubmit = async (data: any) => {
    setIsLoading(true);
    try {
      const finalObjToBeSubmitted = { ...data, ownerName: fullName };
      const token = await getToken();

      const result = await fetch(`${API_END_POINT}api/course/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(finalObjToBeSubmitted),
      });

      const finalData = await result.json();

      console.log("Created Course", finalData?.course);

      reset();
      router.push("/all-courses");
      toast("Course Saved Successfully");
    } catch (error) {
      console.error(error);
      toast("Error While saving Course");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-2 items-center max-w-7xl mx-auto px-4">
      <div className="text-5xl font-bold text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text mb-3">
        Create Course
      </div>

      <form
        onSubmit={handleSubmit(actualSubmit)}
        className="flex flex-col gap-4 items-center w-full"
      >
        <div className="w-full max-w-5xl bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4 shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="text-gray-300 text-sm font-medium mb-1 block">
                  Course Title
                </label>
                <input
                  type="text"
                  placeholder="Enter an engaging title"
                  {...register("title")}
                  className="py-2 w-full bg-gray-800/80 border border-gray-600 rounded-lg px-4 text-gray-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition duration-200 shadow-inner"
                />
                {errors.title && (
                  <div className="text-rose-500 text-sm mt-1">
                    {errors.title.message}
                  </div>
                )}
              </div>

              <div>
                <label className="text-gray-300 text-sm font-medium mb-1 block">
                  Price
                </label>
                <input
                  type="number"
                  placeholder="Set your course price"
                  {...register("price", { valueAsNumber: true })}
                  className="py-2 w-full bg-gray-800/80 border border-gray-600 rounded-lg px-4 text-gray-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition duration-200 shadow-inner"
                />
                {errors.price && (
                  <div className="text-rose-500 text-sm mt-1">
                    Please enter a valid price
                  </div>
                )}
              </div>

              <div>
                <label className="text-gray-300 text-sm font-medium mb-3 block">
                  Course Thumbnail
                </label>
                <div className="flex items-center gap-4">
                  <ImageUploadButton
                    btnName={"Upload Thumbnail"}
                    onAssetUpload={(result) => onActualImageUpload(result)}
                  />

                  {image.publicId && (
                    <div className="flex items-center gap-3 bg-gray-800/60 py-1 px-3 rounded-lg">
                      <CldImage
                        src={image.publicId}
                        alt="Course thumbnail"
                        width={40}
                        height={40}
                        className="rounded-md"
                      />
                      <span className="text-green-400 text-sm font-medium">
                        Image uploaded
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div>
              <label className="text-gray-300 text-sm font-medium mb-1 block">
                Course Description
              </label>
              <textarea
                placeholder="Describe what students will learn"
                {...register("description")}
                rows={7}
                className="py-3 w-full bg-gray-800/80 border border-gray-600 rounded-lg px-4 text-gray-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition duration-200 shadow-inner resize-none"
              />
              {errors.description && (
                <div className="text-rose-500 text-sm mt-1">
                  {errors.description.message}
                </div>
              )}
            </div>
          </div>
        </div>

        <ManageSection
          videos={videos}
          addVideoToStore={addVideoToStore}
          removeVideoFromState={removeVideoFromState}
        />

        <Button
          type="submit"
          disabled={isLoading}
          className="font-medium text-white bg-gradient-to-r from-indigo-600 to-purple-700 hover:from-indigo-700 hover:to-purple-800 transition-all duration-200 py-3 px-8 text-lg rounded-lg shadow-lg shadow-indigo-700/20"
        >
          {isLoading ? (
            <div className="flex gap-3 items-center">
              <LoadingComponent className="text-white" />
              <div>Creating Course...</div>
            </div>
          ) : (
            <div className="flex items-center py-2 gap-2">
              <span>Publish Course</span>
              <ArrowRight size={18} />
            </div>
          )}
        </Button>
      </form>
    </div>
  );
}

const ManageSection = ({
  videos,
  addVideoToStore,
  removeVideoFromState,
}: {
  videos: videoDetails[];
  addVideoToStore: any;
  removeVideoFromState: any;
}) => {
  const {
    register,
    formState: { errors },
    control,
  } = useFormContextCreateCourse();

  const {
    fields: sectionFields,
    append: appendSection,
    remove,
  } = useFieldArray({
    name: "section",
    control,
  });

  const addSection = () => {
    appendSection({
      sectionName: "New Section",
      videoSection: [
        {
          video_title: "",
          video_url: "",
          video_public_id: "",
          video_thumbnailUrl: "",
          video_duration: 0,
        },
      ],
    });
  };

  return (
    <div className="flex flex-col gap-5 w-full max-w-5xl">
      {sectionFields.map((section, sectionIndex) => (
        <div
          className="bg-gray-900/70 backdrop-blur-sm rounded-xl border border-gray-700/50 p-4 shadow-lg"
          key={section.id}
        >
          <div className="flex justify-between items-center border-b border-gray-700/70 pb-4 mb-4">
            <div className="flex items-center gap-3">
              <div className="bg-indigo-600/20 flex gap-2 text-indigo-400 font-bold rounded-lg px-3 py-1">
                <span>Section</span>
                {sectionIndex + 1}
              </div>
              <input
                type="text"
                placeholder="Section name"
                {...register(`section.${sectionIndex}.sectionName`)}
                className="py-2 w-full max-w-md bg-gray-800/70 border border-gray-600 rounded-lg px-4 text-gray-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition duration-200"
              />
              {errors.section?.[sectionIndex]?.sectionName && (
                <div className="text-rose-500 text-sm">
                  {errors.section[sectionIndex]?.sectionName?.message}
                </div>
              )}
            </div>

            {sectionIndex > 0 && (
              <Button
                type="button"
                onClick={() => remove(sectionIndex)}
                variant="ghost"
                className="text-gray-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors p-2 rounded-full"
              >
                <X size={20} />
              </Button>
            )}
          </div>

          <ManageVideoSection
            sectionIndex={sectionIndex}
            videos={videos}
            addVideoToStore={addVideoToStore}
            removeVideoFromState={removeVideoFromState}
          />
        </div>
      ))}

      <Button
        type="button"
        onClick={addSection}
        className="mx-auto font-medium text-gray-200 bg-indigo-700/80 hover:bg-indigo-700 transition-colors flex items-center gap-2 py-2 px-4 rounded-lg shadow-md"
      >
        <Plus size={18} />
        <span>Add New Section</span>
      </Button>
    </div>
  );
};

const ManageVideoSection = ({
  sectionIndex,
  videos,
  addVideoToStore,
}: {
  sectionIndex: number;
  videos: videoDetails[];
  removeVideoFromState: any;
  addVideoToStore: any;
}) => {
  const {
    register,
    formState: { errors },
    control,
    setValue,
  } = useFormContextCreateCourse();

  const { fields, append, remove } = useFieldArray({
    name: `section.${sectionIndex}.videoSection`,
    control,
  });

  const onActualVideoUpload = async (
    result: CloudinaryUploadWidgetResults,
    sectionIndex: number,
    videoIndex: number
  ) => {
    console.log("Cloudinary video upload result", result);

    if (result.info && typeof result.info === "object") {
      addVideoToStore({
        url: result.info.secure_url,
        public_id: result.info.public_id,
        thumbnailUrl: result.info.thumbnail_url,
        fileName: result.info.original_filename,
        sectionIndex: sectionIndex,
        videoIndex: videoIndex,
        duration: result.info.duration || 0,
      });
      setValue(
        `section.${sectionIndex}.videoSection.${videoIndex}.video_url`,
        result.info.secure_url as string
      );
      setValue(
        `section.${sectionIndex}.videoSection.${videoIndex}.video_public_id`,
        result.info.public_id
      );
      setValue(
        `section.${sectionIndex}.videoSection.${videoIndex}.video_thumbnailUrl`,
        result.info.thumbnail_url
      );

      setValue(
        `section.${sectionIndex}.videoSection.${videoIndex}.video_duration`,
        (result.info.duration as number) || 0
      );
    }
  };

  return (
    <div className="space-y-4">
      {fields.map((video, videoIndex) => (
        <div
          key={video.id}
          className="bg-gray-800/50 backdrop-blur-sm rounded-lg border border-gray-700/50 p-4"
        >
          <div className="flex justify-between items-center border-b border-gray-700/50 pb-3 mb-3">
            <div className="flex items-center gap-3">
              <div className="text-gray-400 font-medium">{videoIndex + 1}</div>
              <input
                type="text"
                placeholder="Video title"
                {...register(
                  `section.${sectionIndex}.videoSection.${videoIndex}.video_title`
                )}
                className="py-2 w-full max-w-md bg-gray-800 border border-gray-600 rounded-lg px-3 text-gray-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition duration-200"
              />
              {errors.section?.[sectionIndex]?.videoSection?.[videoIndex]
                ?.video_title && (
                <div className="text-rose-500 text-sm">
                  {
                    errors.section?.[sectionIndex]?.videoSection?.[videoIndex]
                      ?.video_title.message
                  }
                </div>
              )}
            </div>

            {videoIndex > 0 && (
              <Button
                type="button"
                onClick={() => remove(videoIndex)}
                variant="ghost"
                className="text-gray-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors p-1.5 rounded-full"
              >
                <X size={18} />
              </Button>
            )}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3">
            <VideoUploadButton
              btnName={"Video Upload"}
              onAssetUpload={(result) =>
                onActualVideoUpload(result, sectionIndex, videoIndex)
              }
            />

            {videos.map(
              (videoDetailsObject) =>
                videoDetailsObject.sectionIndex === sectionIndex &&
                videoDetailsObject.videoIndex === videoIndex && (
                  <div
                    key={videoDetailsObject.public_id}
                    className="flex items-center gap-3 bg-gray-800/80 py-1.5 px-3 rounded-lg"
                  >
                    <div className="text-green-400 text-sm font-medium">
                      Video uploaded successfully
                    </div>
                    <div className="text-gray-400 text-xs truncate max-w-xs hidden md:block">
                      {videoDetailsObject.fileName}
                    </div>
                  </div>
                )
            )}
          </div>
        </div>
      ))}

      <Button
        type="button"
        onClick={() =>
          append({
            video_title: "",
            video_public_id: "",
            video_thumbnailUrl: "",
            video_url: "",
            video_duration: 0,
          })
        }
        className="mt-2 font-medium text-gray-300 bg-gray-800/70 hover:bg-gray-700/80 transition-colors flex items-center gap-2 py-1.5 px-3 rounded-lg shadow-md"
      >
        <Plus size={16} />
        <span>Add Video</span>
      </Button>
    </div>
  );
};
