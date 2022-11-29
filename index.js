import moment from "moment";

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

/*
QUESTION 1
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

/*
QUESTION 2
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
  let weekday = dayFound.clone().format("ddd, MM DD YYYY");
  console.log(weekday);
}

/*
QUESTION 3
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
  let weekday = dayFound.clone().format("ddd, MM DD YYYY");
  console.log(weekday);
}

/*
QUESTION 4
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

/*
QUESTION 5
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

// input for question 1
let inputDate = "04/13/2022";

// input for questions 2 & 3
let year = 2023;

// input for question 4
let date1 = "03/01/2022";
let time1 = "13:03";
let date2 = "03/01/2022";
let time2 = "15:04";

formatAnyInputToStandardDate(inputDate);
getFirstMondayOfYear(year);
getLastMondayOfYear(year);
differenceBetweenTwoDates(date1, time1, date2, time2);
closestToNow();
