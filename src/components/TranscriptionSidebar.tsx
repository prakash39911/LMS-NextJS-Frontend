"use client";

import { X } from "lucide-react";
import React, { useEffect, useState } from "react";
import GenerateAnimateCompo from "./GenerateAnimateCompo";
import { Button } from "./ui/button";
import { useAuth } from "@clerk/nextjs";

export default function TranscriptionSidebar({
  videoPublicId,
  transcriptionData,
}: {
  videoPublicId: string;
  transcriptionData: string | null | undefined;
}) {
  const { getToken } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isButtonVisible, setIsButtonVisible] = useState(true);

  const [summary, setSummary] = useState<string | null | undefined>(null);

  useEffect(() => {
    setSummary(transcriptionData);
  }, [transcriptionData]);

  const API_END_POINT = process.env.NEXT_PUBLIC_API_BASE_URL || "";

  const actualAPICallToGenerateSummary = async () => {
    try {
      const token = await getToken();
      const abortController = new AbortController();

      const url = `${API_END_POINT}api/video/transcript/summary`;
      console.log("Fetching from URL:", url); // Debug log

      const result = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ videoPublicId }),
        signal: abortController.signal,
      });

      // Check if response is OK (status 200-299)
      if (!result.ok) {
        const errorText = await result.text();
        throw new Error(
          `API request failed with status ${result.status}: ${errorText}`
        );
      }

      const finalData = await result.json();

      if (!finalData.status) {
        throw new Error(
          "Failed to fetch data: Server returned unsuccessful status"
        );
      }

      console.log("HTML String", finalData?.data);

      // Cleaning incoming string having extra "'''html" & "'''"
      const cleanedHTMLString = finalData?.data.replace(/```html|```/g, "");

      await fetch(`${API_END_POINT}api/video/transcript/saveSummary`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ summary: cleanedHTMLString, videoPublicId }),
      });

      setSummary(cleanedHTMLString || null);
    } catch (error: any) {
      // Don't set error if the error is due to abort
      if (error.name !== "AbortError") {
        console.error("Error while generating Lecture Summary", error);
      }
    }
  };

  const handleRegenerate = async () => {
    setIsLoading(true);
    setSummary(null);
    try {
      await fetch(`${API_END_POINT}api/video/transcript/delete`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ videoPublicId }),
      });

      await actualAPICallToGenerateSummary();
    } catch (error) {
      console.log("There is a error while re-generating Summary", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerate = async () => {
    setIsLoading(true);
    try {
      await actualAPICallToGenerateSummary();
    } catch (error: any) {
      console.log("Something went Wrong while making an API call", error);
    } finally {
      setIsLoading(false);
    }
  };

  const generatePdfClick = async () => {
    try {
      const generatedPdf = await fetch(
        `${API_END_POINT}api/video/transcript/generatePdf`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ videoPublicId }),
        }
      );

      const blob = await generatedPdf.blob();
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "summary.pdf";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (error) {
      console.error("Unable to Generate PDF", error);
    }
  };

  return (
    <div>
      <div className="absolute top-5 right-5">
        <button
          onClick={() => {
            setIsOpen(true);
            setIsButtonVisible(false);
          }}
          hidden={!isButtonVisible}
          className="rounded-full text-gray-300 bg-blue-700 px-3 py-3 hover:scale-105 transition-all"
        >
          <div className="flex flex-col">
            <span className="font-semibold text-3xl">AI</span>
            <span className="text-sm">Summary</span>
          </div>
        </button>
      </div>
      <div>
        <div
          className={`fixed right-0 h-full rounded-xl top-16 w-[450px] bg-gray-800 backdrop-blur-md shadow-lg transform transition-transform duration-300 ease-in-out ${
            isOpen ? "translate-x-0" : "translate-x-full"
          } z-60`}
        >
          <div className="text-white relative flex flex-col gap-5 overflow-generate-summary-height overflow-y-auto">
            <span
              className="cursor-pointer w-8 absolute right-3 top-2"
              onClick={() => {
                setIsButtonVisible(true);
                setIsOpen(false);
              }}
            >
              <X size={35} />
            </span>
            <div className="relative top-12 p-1.5 flex flex-col gap-5">
              {summary && (
                <div className="flex justify-between items-center">
                  <div className="flex justify-center font-bold text-2xl text-blue-500">
                    Generated Summary
                  </div>
                  <div>
                    <Button
                      variant="outline"
                      onClick={() => generatePdfClick()}
                      className="bg-transparent border-blue-500 hover:bg-blue-600 hover:text-gray-100"
                    >
                      Download pdf
                    </Button>
                  </div>
                </div>
              )}

              {summary && (
                <div className="border border-gray-700 h-[580px] text-gray-200 rounded-xl p-2 font-mono break-words overflow-y-auto">
                  <div dangerouslySetInnerHTML={{ __html: summary }} />
                </div>
              )}

              <div>
                {summary ? (
                  <div className="flex justify-center">
                    <div
                      onClick={() => handleRegenerate()}
                      className="border border-gray-800 px-6 py-3 text-xl bg-gradient-to-r from-blue-500 to-violet-700 rounded-lg cursor-pointer"
                    >
                      Generate Summary Again
                    </div>
                  </div>
                ) : (
                  <div>
                    {isLoading ? (
                      <div>
                        <GenerateAnimateCompo />
                      </div>
                    ) : (
                      <div className="flex justify-center">
                        <div
                          onClick={() => handleGenerate()}
                          className="border border-gray-800 px-6 py-3 text-xl bg-gradient-to-r from-blue-500 to-violet-700 rounded-lg cursor-pointer"
                        >
                          Generate Summary Using AI
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
