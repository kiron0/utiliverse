import { dateError, numberError } from "../errors";

export const getDaysBetweenDates = (date1: Date, date2: Date): number => {
  dateError(date1, "Invalid date1 provided.");
  dateError(date2, "Invalid date2 provided.");
  const oneDay = 24 * 60 * 60 * 1000;
  return Math.round(Math.abs((date1.getTime() - date2.getTime()) / oneDay));
};

export const getTimeAgo = (date: Date): string => {
  dateError(date, "Invalid date provided.");

  const diffMs = Date.now() - date.getTime();
  const seconds = Math.floor(Math.max(0, diffMs) / 1000);

  const intervals = [
    { label: "year", duration: 31536000 },
    { label: "month", duration: 2592000 },
    { label: "day", duration: 86400 },
    { label: "hour", duration: 3600 },
    { label: "minute", duration: 60 },
  ];

  for (const { label, duration } of intervals) {
    const interval = Math.floor(seconds / duration);
    if (interval >= 1) {
      return `${interval} ${label}${interval !== 1 ? "s" : ""} ago`;
    }
  }

  return `${seconds} second${seconds !== 1 ? "s" : ""} ago`;
};

export const getAge = (birthDate: Date, today: Date = new Date()): string => {
  dateError(birthDate, "Invalid birthDate provided.");
  dateError(today, "Invalid today provided.");

  let years = today.getFullYear() - birthDate.getFullYear();
  let months = today.getMonth() - birthDate.getMonth();
  let days = today.getDate() - birthDate.getDate();

  if (months < 0 || (months === 0 && days < 0)) {
    years--;
    months += 12;
  }

  if (days < 0) {
    const prevMonthLastDay = new Date(
      today.getFullYear(),
      today.getMonth(),
      0,
    ).getDate();
    days += prevMonthLastDay;
    months--;
  }

  if (months < 0) {
    months += 12;
    years--;
  }

  const birthTime =
    birthDate.getHours() * 3600 +
    birthDate.getMinutes() * 60 +
    birthDate.getSeconds();
  const currentTime =
    today.getHours() * 3600 + today.getMinutes() * 60 + today.getSeconds();
  let timeDiff = currentTime - birthTime;
  let daysAdjustment = 0;

  if (timeDiff < 0) {
    timeDiff += 86400;
    daysAdjustment = -1;
  }

  days += daysAdjustment;

  if (days < 0) {
    const prevMonthLastDay = new Date(
      today.getFullYear(),
      today.getMonth(),
      0,
    ).getDate();
    days += prevMonthLastDay;
    months--;

    if (months < 0) {
      months += 12;
      years--;
    }
  }

  const hours = Math.floor(timeDiff / 3600);
  timeDiff %= 3600;
  const minutes = Math.floor(timeDiff / 60);
  const seconds = timeDiff % 60;

  const parts: string[] = [];
  if (years > 0) parts.push(`${years} year${years > 1 ? "s" : ""}`);
  if (months > 0) parts.push(`${months} month${months > 1 ? "s" : ""}`);
  if (days > 0) parts.push(`${days} day${days > 1 ? "s" : ""}`);
  if (hours > 0) parts.push(`${hours} hour${hours > 1 ? "s" : ""}`);
  if (minutes > 0) parts.push(`${minutes} minute${minutes > 1 ? "s" : ""}`);
  if (seconds > 0) parts.push(`${seconds} second${seconds > 1 ? "s" : ""}`);

  if (parts.length === 0) return "0 seconds";

  return parts.length === 1
    ? parts[0]
    : `${parts.slice(0, -1).join(", ")} and ${parts[parts.length - 1]}`;
};

export const getWeekNumber = (date: Date): number => {
  dateError(date, "Invalid date provided.");

  const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
  const pastDaysOfYear = (date.getTime() - firstDayOfYear.getTime()) / 86400000;
  return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
};

export const getMonthName = (date: Date, locale = "en-US"): string => {
  dateError(date, "Invalid date provided.");

  return date.toLocaleString(locale, { month: "long" });
};

export const getDayName = (date: Date, locale = "en-US") => {
  dateError(date, "Invalid date provided.");
  return date.toLocaleString(locale, { weekday: "long" });
};

export const getTimeZone = (): string => {
  return Intl.DateTimeFormat().resolvedOptions().timeZone;
};

export const getDaysInMonth = (year: number, month: number): number => {
  numberError(year, "Year must be a number.");
  numberError(month, "Month must be a number.");

  if (month < 1 || month > 12) {
    throw new Error("Month must be between 1 (January) and 12 (December).");
  }

  return new Date(year, month, 0).getDate();
};

export const getFirstDayOfMonth = (date: Date): Date => {
  dateError(date, "Invalid date provided.");
  return new Date(date.getFullYear(), date.getMonth(), 1);
};

export const getLastDayOfMonth = (date: Date): Date => {
  dateError(date, "Invalid date provided.");
  return new Date(date.getFullYear(), date.getMonth() + 1, 0);
};

export const getQuarter = (date: Date): number => {
  dateError(date, "Invalid date provided.");
  return Math.floor((date.getMonth() + 3) / 3);
};

export const getSeason = (date: Date): string => {
  dateError(date, "Invalid date provided.");
  const month = date.getMonth();
  if (month >= 2 && month <= 4) return "Spring";
  if (month >= 5 && month <= 7) return "Summer";
  if (month >= 8 && month <= 10) return "Autumn";
  return "Winter";
};

export const getTimeDifference = (date1: Date, date2: Date): number => {
  dateError(date1, "Invalid date1 provided.");
  dateError(date2, "Invalid date2 provided.");
  return Math.abs(date1.getTime() - date2.getTime());
};

export const getHumanReadableTimeDifference = (
  date1: Date,
  date2: Date,
  options: { showMonths?: boolean; showDays?: boolean } = {},
): string => {
  const validateDate = (d: Date, name: string) => {
    if (!(d instanceof Date)) throw new Error(`${name} must be a Date object`);
    if (isNaN(d.getTime())) throw new Error(`Invalid ${name}`);
  };
  validateDate(date1, "date1");
  validateDate(date2, "date2");

  const diffSeconds = Math.abs(date1.getTime() - date2.getTime()) / 1000;
  const parts: string[] = [];

  const years = Math.floor(diffSeconds / 31536000);
  let remainingSeconds = diffSeconds % 31536000;

  if (years > 0) {
    parts.push(`${years} year${years !== 1 ? "s" : ""}`);
  }

  if (options.showMonths) {
    const months = Math.floor(remainingSeconds / 2592000);
    remainingSeconds %= 2592000;
    if (months > 0) {
      parts.push(`${months} month${months !== 1 ? "s" : ""}`);
    }
  }

  if (options.showDays) {
    const days = Math.floor(remainingSeconds / 86400);
    remainingSeconds %= 86400;
    if (days > 0) {
      parts.push(`${days} day${days !== 1 ? "s" : ""}`);
    }
  }

  if (parts.length === 0) {
    const hours = Math.floor(remainingSeconds / 3600);
    remainingSeconds %= 3600;
    const minutes = Math.floor(remainingSeconds / 60);
    const seconds = Math.floor(remainingSeconds % 60);

    if (hours > 0) return `${hours} hour${hours !== 1 ? "s" : ""}`;
    if (minutes > 0) return `${minutes} minute${minutes !== 1 ? "s" : ""}`;
    return `${seconds} second${seconds !== 1 ? "s" : ""}`;
  }

  return parts.join(" ");
};

export const getTimeStamp = (
  date: Date = new Date(),
  format: string = "YYYY-MM-DD HH:mm:ss",
  options: { utc?: boolean } = {},
): string => {
  if (!(date instanceof Date)) throw new Error("Invalid date object");
  if (isNaN(date.getTime())) throw new Error("Invalid date value");

  const get = {
    year: options.utc ? date.getUTCFullYear() : date.getFullYear(),
    month: (options.utc ? date.getUTCMonth() : date.getMonth()) + 1,
    day: options.utc ? date.getUTCDate() : date.getDate(),
    hours: options.utc ? date.getUTCHours() : date.getHours(),
    minutes: options.utc ? date.getUTCMinutes() : date.getMinutes(),
    seconds: options.utc ? date.getUTCSeconds() : date.getSeconds(),
    milliseconds: options.utc
      ? date.getUTCMilliseconds()
      : date.getMilliseconds(),
  };

  const pad = (num: number, length: number = 2): string =>
    num.toString().padStart(length, "0");

  // Formatting tokens
  const replacements: { [key: string]: string } = {
    YYYY: pad(get.year, 4),
    YY: pad(get.year % 100),
    MM: pad(get.month),
    DD: pad(get.day),
    HH: pad(get.hours),
    mm: pad(get.minutes),
    ss: pad(get.seconds),
    SSS: pad(get.milliseconds, 3),
    A: get.hours >= 12 ? "PM" : "AM",
    a: get.hours >= 12 ? "pm" : "am",
    hh: pad(get.hours % 12 || 12),
  };

  return format.replace(
    /YYYY|YY|MM|DD|HH|hh|mm|ss|SSS|A|a/g,
    (match) => replacements[match] || match,
  );
};
