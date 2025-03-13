export function makeid() {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < 6) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

export function CalRating(rating: { value: number }[]) {
  const noOfRating = rating.length;
  let ratings = 0;
  for (let i = 0; i < noOfRating; i++) {
    ratings += rating[i].value;
  }

  return { ratings, noOfRating };
}

export function CalNoOfEntrolledStudents(
  studentArray: {
    id: string;
    courseId: string;
    studentId: string;
  }[]
) {
  return studentArray.length;
}

export function secondsToMinutesOrHour(totalSeconds: number) {
  const roundOffSeconds = Math.floor(totalSeconds);
  const minutes = Math.floor(roundOffSeconds / 60);

  if (minutes >= 60) {
    const hour = Math.floor(minutes / 60);
    const hourMinute = minutes % 60;
    return `${hour}:${hourMinute.toString().padStart(2, "0")} hour`;
  } else {
    const seconds = roundOffSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, "0")} minutes`;
  }
}

type section = {
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

export function calSectionsDurationsEtc(section: section) {
  const noOfSections = section.length;
  let noOfVideoSections = 0;
  let totalDuration = 0;

  for (let i = 0; i < noOfSections; i++) {
    noOfVideoSections += section[i].videoSection.length;
    for (let j = 0; j < section[i].videoSection.length; j++) {
      totalDuration += section[i].videoSection[j].video_duration;
    }
  }

  const totalDurationInMinutesOrHours = secondsToMinutesOrHour(totalDuration);

  return { noOfSections, noOfVideoSections, totalDurationInMinutesOrHours };
}
