"use client";

import React from "react";
import {
  CldUploadButton,
  CloudinaryUploadWidgetResults,
} from "next-cloudinary";

type Props = {
  onAssetUpload: (result: CloudinaryUploadWidgetResults) => void;
  btnName: string;
};

export default function VideoUploadButton({ onAssetUpload, btnName }: Props) {
  const API_END_POINT = process.env.NEXT_PUBLIC_API_BASE_URL;

  return (
    <CldUploadButton
      options={{
        maxFiles: 1,
        folder: "LMS",
        resourceType: "video",
      }}
      onSuccess={onAssetUpload}
      signatureEndpoint={`${API_END_POINT}api/sign-video`}
      uploadPreset="ml_default"
      className={`flex items-center gap-2 border-2 border-gray-400 text-gray-300 
        rounded-lg py-1.5 px-4 hover:bg-secondary/10`}
    >
      {btnName}
    </CldUploadButton>
  );
}
