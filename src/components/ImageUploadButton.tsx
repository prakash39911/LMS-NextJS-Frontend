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

export default function ImageUploadButton({ onAssetUpload, btnName }: Props) {
  return (
    <CldUploadButton
      options={{ maxFiles: 1, folder: "LMS" }}
      onSuccess={onAssetUpload}
      signatureEndpoint="http://localhost:8000/api/sign-video"
      uploadPreset="ml_default"
      className={`flex items-center gap-2 border-2 border-gray-400 text-gray-300 
        rounded-lg py-1.5 px-4 hover:bg-secondary/10`}
    >
      {btnName}
    </CldUploadButton>
  );
}
