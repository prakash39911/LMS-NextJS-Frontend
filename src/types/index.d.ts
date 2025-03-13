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
};

type courseDetailPageType = {
  id: string;
  title: string;
  description: string;
  price: number;
  main_image: string;
  enrolledStudents: { id: string; courseId: string; studentId: string }[];
  rating: { id: string; value: number; userId: string }[];
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
