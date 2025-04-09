import { FilterStateType } from "@/components/Filter";

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
  const noOfRating = rating?.length;
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

export function secondsToMinuteForEachVideo(totalSeconds: number) {
  const roundOffSeconds = Math.floor(totalSeconds);
  const minutes = Math.floor(roundOffSeconds / 60);
  const seconds = roundOffSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")} minute`;
}

export function DatabaseDateToGeneralDate(date: Date) {
  const convertedDate = new Date(date);
  const year = convertedDate.getFullYear();
  const month = String(convertedDate.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const day = String(convertedDate.getDate()).padStart(2, "0");

  return `${day}/${month}/${year}`;
}

export function areObjectsEqual(obj1: FilterStateType, obj2: FilterStateType) {
  if (!obj1 || !obj2) return false;

  const areArraysEqualUnordered = (arr1: string[], arr2: string[]) => {
    if (arr1.length !== arr2.length) return false;
    return (
      arr1.every((item) => arr2.includes(item)) &&
      arr2.every((item) => arr1.includes(item))
    );
  };

  const areArraysEqualOrdered = (arr1: number[], arr2: number[]) => {
    if (arr1.length !== arr2.length) return false;
    return arr1.every((item, index) => item === arr2[index]);
  };

  return (
    areArraysEqualUnordered(obj1.selectedRating, obj2.selectedRating) &&
    areArraysEqualOrdered(obj1.priceRange, obj2.priceRange)
  );
}

export function calTotalStudentsDashboard(allDetails: DashBoardDataType[]) {
  return allDetails.reduce(
    (accu, curr) => (accu = accu + curr.enrolledStudents.length),
    0
  );
}

export function calTotalIncomeDashboard(allDetails: DashBoardDataType[]) {
  return (
    allDetails.reduce((accumulator, currentValue) => {
      return (accumulator =
        accumulator +
        currentValue.enrolledStudents.reduce(
          (accu, curr) => (accu += curr.amount),
          0
        ));
    }, 0) / 100
  );
}

export function formatUnixTimestamp(unixTimestamp: number) {
  const date = new Date(unixTimestamp * 1000); // timestamp is in seconds
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
}

const generateEmptyChartData = () => {
  const arr = [];
  const nowInSeconds = Math.floor(Date.now() / 1000); // convert to seconds

  for (let i = 29; i >= 0; i--) {
    const timestamp = nowInSeconds - i * 86400; // go back 29, 28, ..., 0 days
    arr.push({
      date: formatUnixTimestamp(timestamp),
      courses_sold: 0,
    });
  }

  return arr;
};

export function dashBoardChartData(allDetails: DashBoardDataType[]) {
  const emptyArr = generateEmptyChartData();
  for (let i = 0; i < allDetails.length; i++) {
    const currentArr = allDetails[i];

    for (let j = 0; j < currentArr.enrolledStudents.length; j++) {
      const currEle = currentArr.enrolledStudents[j];

      for (let k = 0; k < emptyArr.length; k++) {
        const element = emptyArr[k];

        if (
          element.date === formatUnixTimestamp(parseInt(currEle.created_at))
        ) {
          emptyArr[k].courses_sold += 1;
        }
      }
    }
  }

  return emptyArr;
}

// type DashBoardDataType = {
//   id: string;
//   title: string;
//   enrolledStudents: {
//       amount: number;
//       created_at: string;
//       courseId: string;
//   }[];
// }

// type PieChartDataType = {
//   course_name: string;
//   totalIncome: string;
// }[];

export function formatDataForPieChart(allDetails: DashBoardDataType[]) {
  const finalArray = [];

  for (let i = 0; i < allDetails.length; i++) {
    const element = allDetails[i];

    const incomePerCourse = element.enrolledStudents.reduce(
      (accumulator, currentvalue) => (accumulator += currentvalue.amount),
      0
    );

    finalArray.push({
      course_name: element.title,
      totalIncome: incomePerCourse / 100,
    });
  }

  return finalArray;
}
