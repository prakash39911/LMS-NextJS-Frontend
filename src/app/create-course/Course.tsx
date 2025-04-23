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
import { X, Image } from "lucide-react";
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
    // watch,
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

  // const formData = watch();
  // console.log("FormData", formData);
  // console.log("Error", errors);

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
    <div className="flex flex-col gap-2 items-center">
      <div className="text-5xl font-bold text-transparent bg-gradient-to-r from-indigo-600 to-purple-700 bg-clip-text mb-2">
        Create Course
      </div>
      <form
        onSubmit={handleSubmit(actualSubmit)}
        className="flex flex-col gap-2 items-center"
      >
        <div className="flex flex-col gap-4 md:flex-row justify-between items-center w-[400px] md:w-[1200px] mb-1.5">
          <div className="flex flex-col gap-3">
            <div className="flex gap-3 items-center">
              <input
                type="text"
                placeholder="Course title"
                {...register("title")}
                className="py-1.5 w-[350px] bg-slate-800 border border-gray-400 rounded-lg px-1 text-gray-200"
              />
              {errors.title && (
                <div className="text-red-800">{errors.title.message}</div>
              )}
            </div>
            <div className="flex gap-3 items-center">
              <input
                type="number"
                placeholder="Price"
                {...register("price", { valueAsNumber: true })}
                className="py-1.5 w-[350px] bg-slate-800 border border-gray-400 rounded-lg px-1 text-gray-200"
              />

              {errors.price && (
                <div className="text-red-800">Please enter valid number</div>
              )}
            </div>
            <div className="flex flex-row justify-between items-center gap-5">
              <div className="flex items-center gap-1.5">
                <label className="text-gray-400">Image :</label>
                <ImageUploadButton
                  btnName="Upload Image"
                  onAssetUpload={(result) => onActualImageUpload(result)}
                />
              </div>
              <div>
                {image.publicId && (
                  <div className="flex flex-row gap-4 items-center">
                    <span className="text-gray-400">
                      <Image size={20} aria-label="Upload icon" />
                    </span>
                    <div className="hidden md:block">
                      <CldImage
                        src={image.publicId}
                        alt="Image"
                        width={55}
                        height={55}
                      />
                    </div>

                    <div className="text-blue-500 font-semibold">
                      Upload Success!!
                    </div>
                    <div className="text-gray-300 overflow-x-hidden md:block hidden">
                      <span>File:</span>
                      <span>{image.fileName}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-0.5">
            <textarea
              placeholder="Description"
              {...register("description")}
              className="py-1.5 w-[350px] bg-slate-800 border border-gray-400 rounded-lg px-1 text-gray-200"
            />
            {errors.description && (
              <div className="text-red-800">{errors.description.message}</div>
            )}
          </div>
        </div>

        <ManageSection
          videos={videos}
          addVideoToStore={addVideoToStore}
          removeVideoFromState={removeVideoFromState}
        />

        <div className="flex flex-row gap-5 justify-center">
          <Button
            type="submit"
            disabled={isLoading}
            className="font-semibold text-gray-300 bg-red-900"
          >
            {isLoading ? (
              <div className="flex gap-4 items-center">
                <LoadingComponent className="text-white" />
                <div className="text-xl">Saving...</div>
              </div>
            ) : (
              "Save this Course"
            )}
          </Button>
        </div>
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
    <div className="flex flex-col gap-3">
      {sectionFields.map((section, sectionIndex) => {
        return (
          <div
            className="p-2 wd-[400px] md:w-[1200px] bg-gray-800 rounded-lg border border-gray-600 flex flex-col gap-2 pl-4"
            key={section.id}
          >
            <div className="text-gray-400 flex justify-between border-b border-b-gray-800">
              <div className="flex flex-row gap-1 items-center mb-1.5">
                <div className="font-extrabold text-2xl">
                  Section {sectionIndex + 1}:
                </div>
                <div className="flex items-center gap-1.5">
                  <input
                    type="text"
                    placeholder="Section name"
                    {...register(`section.${sectionIndex}.sectionName`)}
                    className="py-1 w-[200px] md:w-[350px] bg-slate-800 border border-gray-400 rounded-lg px-1 text-gray-200"
                  />
                  {errors.section?.[sectionIndex]?.sectionName && (
                    <div className="text-red-800">
                      {errors.section[sectionIndex]?.sectionName?.message}
                    </div>
                  )}
                </div>
              </div>

              {sectionIndex > 0 && (
                <div
                  className="cursor-pointer"
                  onClick={() => remove(sectionIndex)}
                >
                  <X />
                </div>
              )}
            </div>
            <ManageVideoSection
              sectionIndex={sectionIndex}
              videos={videos}
              addVideoToStore={addVideoToStore}
              removeVideoFromState={removeVideoFromState}
            />
          </div>
        );
      })}
      <div className="flex justify-center">
        <Button
          type="button"
          onClick={addSection}
          className="font-semibold text-gray-300 bg-blue-900"
        >
          Add More Section
        </Button>
      </div>
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

  // const removeVideo = async (video_public_id: string) => {
  //   console.log("remove video public ID", video_public_id);

  //   await fetch("http://localhost:8000/api/deleteFromCloudinary/", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({ video_public_id }),
  //   });
  //   removeVideoFromState(video_public_id);
  // };

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
    <div>
      {fields.map((video, videoIndex) => {
        return (
          <div
            key={video.id}
            className="p-2 w-[380] md:w-[1100px] h-[115px] bg-gray-900 rounded-lg border border-gray-600 flex flex-col gap-2 pl-4"
          >
            <div className="text-gray-400 flex justify-between border-b border-b-gray-600">
              <div className="flex flex-row gap-1 items-center mb-1.5">
                <div className="text-xl font-bold">Video {videoIndex + 1}:</div>
                <div className="flex items-center gap-1.5">
                  <input
                    type="text"
                    placeholder="Video title"
                    {...register(
                      `section.${sectionIndex}.videoSection.${videoIndex}.video_title`
                    )}
                    className="py-1 w-[200px] md:w-[350px] bg-slate-800 border border-gray-400 rounded-lg px-1 text-gray-200"
                  />
                  {errors.section?.[sectionIndex]?.videoSection?.[videoIndex]
                    ?.video_title && (
                    <div className="text-red-800">
                      {
                        errors.section?.[sectionIndex]?.videoSection?.[
                          videoIndex
                        ]?.video_title.message
                      }
                    </div>
                  )}
                </div>
              </div>

              {videoIndex > 0 && (
                <div
                  className="cursor-pointer"
                  onClick={() => {
                    remove(videoIndex);
                  }}
                >
                  <X />
                </div>
              )}
            </div>

            <div className="flex flex-row justify-between items-center">
              <div className="flex items-center gap-1.5">
                <label className="text-gray-400">Video File :</label>
                <VideoUploadButton
                  btnName="Upload Video"
                  onAssetUpload={(result) =>
                    onActualVideoUpload(result, sectionIndex, videoIndex)
                  }
                />
              </div>

              {videos.map(
                (videoDetailsObject) =>
                  videoDetailsObject.sectionIndex === sectionIndex &&
                  videoDetailsObject.videoIndex === videoIndex && (
                    <div key={videoDetailsObject.public_id}>
                      <div className=" gap-3 flex items-center">
                        <div className="text-blue-400 text-sm md:text-xl font-bold">
                          Upload Success!
                        </div>
                        <div className="text-gray-300 hidden md:block">
                          {" "}
                          {videoDetailsObject.fileName}
                        </div>
                      </div>
                    </div>
                  )
              )}
            </div>
          </div>
        );
      })}
      <div className="flex justify-center">
        <Button
          type="button"
          className="font-semibold text-gray-300"
          onClick={() =>
            append({
              video_title: "",
              video_public_id: "",
              video_thumbnailUrl: "",
              video_url: "",
              video_duration: 0,
            })
          }
        >
          Add More Videos
        </Button>
      </div>
    </div>
  );
};
