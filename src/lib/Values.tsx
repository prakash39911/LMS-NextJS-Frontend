import { Book, Clock, Users, GraduationCap } from "lucide-react";

export const ratings = ["1", "2", "3", "4", "5"];

export const homePageStats = [
  {
    icon: <Book className="text-indigo-400" size={48} />,
    title: "Diverse Courses",
    description: "Wide range of subjects from expert instructors",
  },
  {
    icon: <Clock className="text-green-400" size={48} />,
    title: "Flexible Learning",
    description: "Learn at your own pace, anytime, anywhere",
  },
  {
    icon: <Users className="text-pink-400" size={48} />,
    title: "Community",
    description: "Connect with learners worldwide",
  },
  {
    icon: <GraduationCap className="text-orange-400" size={48} />,
    title: "Certification",
    description: "Earn recognized certificates",
  },
];
