import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import clsx from "clsx";
import { useAuth } from "@clerk/nextjs";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function RatingDialog({ courseId }: { courseId: string }) {
  const router = useRouter();
  const [selected, setSelected] = useState(0);
  const [open, setOpen] = useState(false);
  const { getToken } = useAuth();

  const API_END_POINT = process.env.NEXT_PUBLIC_API_BASE_URL;

  const handleSubmit = async () => {
    const token = await getToken();

    console.log("Inside Submit");

    if (selected > 0 && selected <= 5) {
      const submitRating = await fetch(
        `${API_END_POINT}api/course/giveRating/${courseId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ value: selected }),
        }
      );

      const isRatingSubmitted = await submitRating.json();

      if (isRatingSubmitted.status) {
        setOpen(false);
        toast("Rating Submitted Successfully");
        router.refresh();
      }
    }
  };
  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="text-xl text-gray-100 bg-gray-500"
            onClick={() => setOpen(true)}
          >
            Please Give your feedback
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Rating</DialogTitle>
            <DialogDescription>
              Please Provide your valuable feedback to our course{" "}
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col items-center gap-4">
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((num) => (
                <button
                  key={num}
                  className={clsx(
                    `w-12 h-12 flex items-center justify-center border-2 rounded-md text-lg font-semibold transition-all`,
                    selected === num
                      ? "bg-blue-500 text-white border-blue-500"
                      : "border-gray-400"
                  )}
                  onClick={() => setSelected(num)}
                >
                  {num}
                </button>
              ))}
            </div>
          </div>
          <DialogFooter>
            <Button
              type="submit"
              onClick={() => handleSubmit()}
              disabled={selected === 0}
            >
              Submit
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
