type videoDetails = {
  sectionIndex: number;
  videoIndex: number;
  public_id: string;
  url: string;
  thumbnailUrl: string;
  fileName: string;
  duration: number;
};

type imageDetails = {
  publicId: string;
  url: string;
  fileName: string;
};

type courseType = {
  id: string;
  title: string;
  description: string;
  price: number;
  main_image: string;
  rating: { value: number }[];
  section: {
    sectionName: string;
    videoSection: {
      video_title: string;
      video_url: string;
      video_public_id: string;
      video_thumbnailUrl: string;
    }[];
  }[];
  enrolledStudents: {
    id: string;
    studentId: string;
    courseProgress: {
      completionPercentage: number;
      isCompleted: boolean;
    };
  }[];
};

type courseDetailPageType = {
  id: string;
  title: string;
  description: string;
  price: number;
  main_image: string;
  ownerName: string;
  enrolledStudents: { id: string; courseId: string; studentId: string }[];
  rating: { id: string; value: number; userId: string }[];
  updatedAt: Date;
  section: {
    id: string;
    sectionName: string;
    videoSection: {
      id: string;
      video_title: string;
      video_url: string;
      video_public_id: string;
      video_thumbnailUrl: string;
      video_duration: number;
    }[];
  }[];
};

type GetAllCoursesParams = {
  ratings: string;
  priceRange: string;
  search: string;
};

type getFilterPresetDataType = {
  SavedFilterData: {
    id: string;
    name: string;
    selectedRating: string[];
    priceRange: number[];
  }[];
};

type DashBoardDataType = {
  id: string;
  title: string;
  enrolledStudents: {
    studentId: string;
    amount: number;
    created_at: string;
    courseId: string;
  }[];
};

type ChartDataType = {
  date: string;
  courses_sold: number;
};

type PieChartDataType = {
  course_name: string;
  totalIncome: number;
};

type ProgressData = {
  courseProgress: {
    courseId: string;
    completionPercentage: number;
    isCompleted: boolean;
    sectionProgress: {
      sectionId: string;
      videoProgress: {
        videoSectionId: string;
        watchedSeconds: number;
        completionPercentage: number;
        isCompleted: boolean;
      }[];
    }[];
  } | null;
};
