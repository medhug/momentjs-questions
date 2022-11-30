import moment from "moment";
import "moment-timezone";

function someLessonsLearned() {
  // empty brackets to get current date. creates a moment (mutable) object
  let now = moment([]);

  // clone the original before performing date math
  let oneWeekLater = now.clone().add(1, "week");

  // date and time math are different
  // one date may not be 24 hours, one year may not be 365 days

  // A UTC offset is a value that represents how far a particular dates and time is from UTC.
  // a time zone usually has more than one offset. therefore, it is impossible to infer a timezone from just an offset value.

  // to use the date as a UTC date use moment.utc
  let c = moment.utc("13/02/2022", "DD/MM/YYYY", true).format();
}

someLessonsLearned();

/* QUESTION 1
Given the following strings:
"13/02/2022", check
"03/04/2022", check
"Q3 of 2021",
"Tue, 22 Feb 2022"

Write a function to display each date in standard "mm/dd/yyyy" format

*/

function formatAnyInputToStandardDate(input) {
  // parsing is notably unpredictable with native date.
  // will receive MM/DD/YYYY but not DD/MM/YYYY (invalid date input but valid date)
  // let a = new Date('13/12/2016');  -> will fail

  // use moment with modifiers. parser ignores non-alphanumeric characters by default
  // strict mode requires the input to exactly match the specified format, including separators.
  // strict mode is set by passing true as third parameter.
  // use an array in the second parameter will try to match input

  let b = moment(
    input,
    ["MM/DD/YYYY", "DD/MM/YYYY", "QQ of YYYY", "ddd, DD MMM YYYY"],
    true
  ).format("MM/DD/YYYY");

  if (b != "Invalid date") {
    console.log(b); // results in a date in the context of the users local time
    return b;
  }
  if (b === "Invalid date") {
    console.log("fix Q submissions");
  }
}

/* QUESTION 2
Given a year, write a function to get the first monday of the year in standard "mm/dd/yyyy" format
*/

function getFirstMondayOfYear(year) {
  // validates user input type
  let yearInStringFormat;
  if (typeof year != "string") {
    yearInStringFormat = year.toString();
  }
  let firstDay = "01/01/" + yearInStringFormat;
  let dayFound = moment(firstDay, "MM/DD/YYYY", true);

  let firstMonday = moment(dayFound)
    .day(1 + 7)
    .format("LLLL");
  console.log("first Monday is: ", firstMonday);
  return firstMonday;
}

/* QUESTION 3
Given a year, write a function to get the last monday of the year in standard "mm/dd/yyyy" format
*/

function getLastMondayOfYear(year) {
  // validates user input type
  let yearInStringFormat;
  if (typeof year != "string") {
    yearInStringFormat = year.toString();
  }
  let lastDay = "12/31/" + yearInStringFormat;
  let dayFound = moment(lastDay, "MM/DD/YYYY", true);

  let lastMonday = moment(dayFound).day(1).format("LLLL");
  console.log("last Monday is: ", lastMonday);
  return lastMonday;
}

/* QUESTION 4
Given two dates and two time markers, write a function to find the difference between the two dates in the following format:
"X Years, X Months, X Days, X Hours, and X Minutes"
*/

function differenceBetweenTwoDates(date1, time1, date2, time2) {
  // may get unexpected results when parsing both date and time, according to docs
  // solution to build to ISO 8601 format for consistent input into moment function
  // first reverse order
  let A = moment(
    date1,
    ["MM/DD/YYYY", "DD/MM/YYYY", "ddd, DD MMM YYYY"],
    true
  ).format("YYYY-MM-DD");
  let B = moment(
    date2,
    ["MM/DD/YYYY", "DD/MM/YYYY", "ddd, DD MMM YYYY"],
    true
  ).format("YYYY-MM-DD");

  // build date into long datetime format minus zone
  A = A + "T" + time1 + ":00";
  B = B + "T" + time2 + ":00";

  let dateAndTime1 = moment(A, moment.ISO_8601);
  let dateAndTime2 = moment(B, moment.ISO_8601);

  // second argument in diff returns truncated unit, true as third returns floating
  let difference = dateAndTime2.diff(dateAndTime1);
  let tempTime = moment.duration(difference);

  let years = tempTime.years();
  let months = tempTime.months();
  let days = tempTime.days();
  let hours = tempTime.hours();
  let minutes = tempTime.minutes();

  let answer = `${years} Years, ${months} Months, ${days} Days, ${hours} Hours, and ${minutes} Minutes`;
  console.log(answer);
  return answer;
}

/* QUESTION 5
Write a function to generate two random dates and returns the date that is closest to right now.
*/

function closestToNow() {
  let now = moment([]);

  function randomDate() {
    // date must be a real date so best to start from a real date and move randomly away.
    // generating random number sets can lead to dates that dont exist like June 31st
    // first, generate random year between 1968-2068 (two digit YY limits)
    let year = Math.floor(Math.random() * (2068 - 1968) + 1968);
    year = year.toString();
    let day = Math.floor(Math.random() * (365 - 1) + 1);
    day = day.toString();
    let dateFirstPass = moment(year);
    // can add .format("L") to end of secondpass for formatting
    let dateSecondPass = moment(dateFirstPass).add(day, "days");
    console.log("random date: ", dateSecondPass.format("L"));
    return dateSecondPass;
  }

  let A = randomDate();
  let B = randomDate();

  let diffA = now.diff(A);
  let diffB = now.diff(B);
  // postprocessing negative values
  if (diffA < 0) {
    diffA = diffA * -1;
  }
  if (diffB < 0) {
    diffB = diffB * -1;
  }
  // find smallest
  if (diffA < diffB) {
    console.log(A.format("L"), "is closer to Now");
    return A;
  }
  if (diffB < diffA) {
    console.log(B.format("L"), "is closer to Now");
    return B;
  }
}

/* QUESTION 6
Write a function that would return the months, days, hours, minutes, and seconds until the beginning of the year in Miami
*/

function absoluteCountdown(year) {
  // first, find time to new year from UTC for absolute time
  let now = moment.utc([]);
  let newYears = moment.utc(year, "YYYY");

  let difference = newYears.diff(now);
  let tempTime = moment.duration(difference);

  return tempTime;
}
function processCountdown(input) {
  let years = input.years();
  let months = input.months();
  let days = input.days();
  let hours = input.hours();
  let minutes = input.minutes();

  let answer = `${years} Years, ${months} Months, ${days} Days, ${hours} Hours, and ${minutes} Minutes`;
  console.log(answer);
  return answer;
}

function countdownInMiami(input) {
  // first, find absolute countdown
  let countdown = absoluteCountdown(input);

  // second, include offset from UTC of miami
  // caution: A time zone can not be represented solely by an offset from UTC
  // may use IANA/Olson time zone database
  // miami is 5 hours behind UTC in standard, 4 hours in daylight saving (depending on calendar date)

  let adjustedCountdown = countdown.add(5, "hours");

  console.log("Miami is: ");
  processCountdown(adjustedCountdown);
}

/* QUESTION 7
Write a function that would return the months, days, hours, minutes, and seconds until the beginning of the year in Qatar
*/

function countdownInQatar(input) {
  // first, find absolute countdown
  let countdown = absoluteCountdown(input);

  // second, include offset from UTC of qatar
  // Qatar is 3 hours ahead of UTC, no daylight saving

  // find qatar time zone
  let list = moment.tz.names();
  console.log(list.includes("Qatar"));
  //   let timeInQatar = moment.tz(input, "Arabian/Qatar");
  let adjustedCountdown = countdown.subtract(3, "hours");

  console.log("Qatar is: ");
  processCountdown(adjustedCountdown);
}

/* QUESTION 8
Given a date and two timezones write a function to return the hour difference between the timezones.
*/

function timezoneHourDifference(dateAndTime, zone1, zone2) {
  let A = moment.tz(dateAndTime, "MM/DD/YYYY hh:mmA", timezone1);
  console.log("time in: ", zone1, A);
  let B = moment.tz(dateAndTime, "MM/DD/YYYY hh:mmA", timezone2);
  console.log("time in: ", zone2, B);

  let difference = A.diff(B, "hours");
  console.log(difference, "hours");
  return difference;
}

/* QUESTION 9

*/
function getAllSpecificDays(year, month, dayOfWeek) {
  // validates user input type
  let yearInStringFormat;
  if (typeof year != "string") {
    yearInStringFormat = year.toString();
  }
  let monthInStringFormat;
  if (typeof month != "string") {
    monthInStringFormat = month.toString();
    if (monthInStringFormat.length < 2) {
      monthInStringFormat = "0" + monthInStringFormat;
    }
  }

  let firstDayBuild = monthInStringFormat + "/01/" + yearInStringFormat;
  let firstDayOfMonth = moment(firstDayBuild, "MM/DD/YYYY", true);
  console.log(firstDayOfMonth.format("LLLL"));

  let daysFoundArray = [];
  let dayID;
  let dictionary = {
    Sunday: 0,
    Monday: 1,
    Tuesday: 2,
    Wednesday: 3,
    Thursday: 4,
    Friday: 5,
    Saturday: 6,
  };
  dayID = dictionary[dayOfWeek];

  while (dayID <= 31) {
    let foundDay = moment(firstDayOfMonth).day(dayID).format("L");
    daysFoundArray.push(foundDay);
    dayID = dayID + 7;
  }

  console.log("The array has: ", daysFoundArray);
  return daysFoundArray;
}

// ------------------------------

// input for question 1
let inputDate = "04/13/2022";

// input for questions 2 & 3
let year = 2020;

// input for question 4
let date1 = "03/01/2022";
let time1 = "13:03";
let date2 = "03/01/2022";
let time2 = "15:04";

// input for questions 6 & 7
let timeToYear = "2026";

// input for question 8
let dateAndTime = "03/02/2022 03:45pm";
let timezone1 = "America/Los_Angeles";
let timezone2 = "Asia/Shanghai";

// input for question 9
let yearToFind = 2022;
let monthToFind = 3;
let dayToFind = "Tuesday";

// ----------------------------

// uncomment the following functions individually to run

// formatAnyInputToStandardDate(inputDate);
// getFirstMondayOfYear(year);
// getLastMondayOfYear(year);
// differenceBetweenTwoDates(date1, time1, date2, time2);
// closestToNow();
// countdownInMiami(timeToYear);
// countdownInQatar(timeToYear);
// timezoneHourDifference(dateAndTime, timezone1, timezone2);
getAllSpecificDays(yearToFind, monthToFind, dayToFind);
