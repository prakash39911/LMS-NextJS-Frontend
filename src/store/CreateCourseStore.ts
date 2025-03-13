import { create } from "zustand";
import { persist } from "zustand/middleware";

interface FormStore {
  videos: videoDetails[];
  image: imageDetails;
  addVideo: (video: videoDetails) => void;
  removeVideo: (public_is: string) => void;
  addImage: (image: imageDetails) => void;
  removeImage: () => void;
  reset: () => void;
}

const initialState = {
  videos: [],
  image: { publicId: "", url: "", fileName: "" },
};

export const useFormStore = create<FormStore>()(
  persist(
    (set) => ({
      ...initialState,
      addVideo: (video) =>
        set((state) => ({
          videos: [video, ...state.videos],
        })),
      removeVideo: (public_id) =>
        set((state) => ({
          videos: state.videos.filter(
            (videoObject) => videoObject.public_id !== public_id
          ),
        })),
      addImage: (image) => set(() => ({ image })),
      removeImage: () =>
        set(() => ({ image: { publicId: "", url: "", fileName: "" } })),
      reset: () => set(initialState),
    }),
    {
      name: "create-course-store",
    }
  )
);
