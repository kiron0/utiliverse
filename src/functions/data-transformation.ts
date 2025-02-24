import { numberError, stringError } from "../errors";

export const toCamelCase = (str: string): string => {
  stringError(str, "Please input a valid value to convert to camel case.");
  return str.replace(/[-_]+(.)?/g, (_, c) => (c ? c.toUpperCase() : ""));
};

export const toSnakeCase = (str: string): string => {
  stringError(str, "Please input a valid value to convert to snake case.");
  return str.replace(/[A-Z]+/g, (m) => "_" + m.toLowerCase());
};

export const toKebabCase = (str: string): string => {
  stringError(str, "Please input a valid value to convert to kebab case.");
  return str.replace(/[A-Z]+/g, (m) => "-" + m.toLowerCase());
};

export const toPascalCase = (str: string): string => {
  stringError(str, "Please input a valid value to convert to pascal case.");
  return str.replace(/[-_]+(.)?/g, (_, c) => (c ? c.toUpperCase() : ""));
};

export const toTitleCase = (str: string): string => {
  stringError(str, "Please input a valid value to convert to title case.");
  return str.replace(/[-_]+(.)?/g, (_, c) => (c ? " " + c.toUpperCase() : ""));
};

export const toSentenceCase = (str: string): string => {
  stringError(str, "Please input a valid value to convert to sentence case.");
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const toSlugWithDash = (str: string): string => {
  stringError(str, "Please input a valid value to convert to slug with dash.");
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
};

export const toSlugWithUnderscore = (str: string): string => {
  stringError(
    str,
    "Please input a valid value to convert to slug with underscore.",
  );
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_|_$/g, "");
};

export const toMaskedEmail = (email: string): string => {
  stringError(email, "Please input a email address to mask.");

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw new Error("Invalid email address.");
  }

  const [name, domain] = email.split("@");

  return `${name[0]}*****@${domain}`;
};

export const fromBase64 = (base64: string): string => {
  stringError(base64, "Please input a value to convert from base64.");

  if (!/^[A-Za-z0-9+/]*={0,2}$/.test(base64)) {
    throw new Error("Invalid base64 string.");
  }

  return Buffer.from(base64, "base64").toString("utf-8");
};

export const fromHex = (hex: string): string => {
  stringError(hex, "Please input a value to convert from hex.");

  if (!/^[0-9A-Fa-f]*$/.test(hex)) {
    throw new Error("Invalid hex string.");
  }

  return Buffer.from(hex, "hex").toString("utf-8");
};

export const fromJSON = (json: string): unknown => {
  return JSON.parse(json);
};

export const fromCSV = (csv: string): string[][] => {
  stringError(csv, "Please input a value to convert from CSV.");

  if (!csv.includes(",")) {
    throw new Error("Invalid CSV string.");
  }

  return csv.split("\n").map((row) => row.split(","));
};

export const toMaskedPhone = (phone: string): string => {
  stringError(phone, "Please input a valid phone number to mask.");
  return phone.replace(/(\d{3})\d{4}(\d{3})/, "$1****$2");
};

export const toPercentage = (num: number, decimals = 2) => {
  return `${(num * 100).toFixed(decimals)}%`;
};

export const toDurationString = (seconds: number): string => {
  numberError(
    seconds,
    "Please input a valid value to convert to duration string.",
  );
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  return `${h}h ${m}m ${s}s`;
};

export const toFileSize = (bytes: number, decimals = 2) => {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(decimals))} ${
    sizes[i]
  }`;
};

export const toPlural = (word: string): string => {
  stringError(word, "Please input a valid value to convert to plural.");
  if (word.endsWith("y")) return word.slice(0, -1) + "ies";
  if (word.endsWith("s") || word.endsWith("x") || word.endsWith("z"))
    return word + "es";
  return word + "s";
};

export const toSingular = (word: string): string => {
  stringError(word, "Please input a valid value to convert to singular.");
  if (word.endsWith("ies")) return word.slice(0, -3) + "y";
  if (word.endsWith("es")) return word.slice(0, -2);
  if (word.endsWith("s")) return word.slice(0, -1);
  return word;
};

export const toInitials = (name: string): string => {
  stringError(name, "Please input a valid value to convert to initials.");
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase();
};

export const toMorseCode = (str: string): string => {
  stringError(str, "Please input a valid value to convert to morse code.");
  const morseMap: { [key: string]: string } = {
    A: ".-",
    B: "-...",
    C: "-.-.",
    D: "-..",
    E: ".",
    F: "..-.",
    G: "--.",
    H: "....",
    I: "..",
    J: ".---",
    K: "-.-",
    L: ".-..",
    M: "--",
    N: "-.",
    O: "---",
    P: ".--.",
    Q: "--.-",
    R: ".-.",
    S: "...",
    T: "-",
    U: "..-",
    V: "...-",
    W: ".--",
    X: "-..-",
    Y: "-.--",
    Z: "--..",
    " ": "/",
  };
  return str
    .toUpperCase()
    .split("")
    .map((char) => morseMap[char] || "")
    .join(" ");
};

export const toLeetSpeak = (str: string): string => {
  stringError(str, "Please input a valid value to convert to leet speak.");
  const leetMap: { [key: string]: string } = {
    A: "4",
    E: "3",
    G: "6",
    I: "1",
    O: "0",
    S: "5",
    T: "7",
  };
  return str
    .toUpperCase()
    .split("")
    .map((char) => leetMap[char] || char)
    .join("");
};

export const toPigLatin = (str: string): string => {
  stringError(str, "Please input a valid value to convert to pig latin.");
  return str.replace(/\b(\w)(\w+)\b/g, "$2$1ay");
};

export const toReverseSentence = (sentence: string): string => {
  stringError(sentence, "Please input a valid value to reverse the sentence.");
  return sentence.split(" ").reverse().join(" ");
};

export const toAlternatingCase = (str: string): string => {
  stringError(
    str,
    "Please input a valid value to convert to alternating case.",
  );
  return str
    .split("")
    .map((char, i) => (i % 2 === 0 ? char.toUpperCase() : char.toLowerCase()))
    .join("");
};

export const toEmoji = (str: string): string => {
  stringError(str, "Please input a valid value to convert to emoji.");

  const emojiMap: { [key: string]: string } = {
    A: "🅰️",
    B: "🅱️",
    C: "©️",
    D: "🇩",
    E: "🇪",
    F: "🇫",
    G: "🇬",
    H: "♓",
    I: "ℹ️",
    J: "🇯",
    K: "🇰",
    L: "🇱",
    M: "Ⓜ️",
    N: "🇳",
    O: "🅾️",
    P: "🅿️",
    Q: "🇶",
    R: "®️",
    S: "💲",
    T: "✝️",
    U: "🇺",
    V: "✅",
    W: "🇼",
    X: "❌",
    Y: "🇾",
    Z: "💤",
  };
  return str
    .toUpperCase()
    .split("")
    .map((char) => emojiMap[char] || char)
    .join("");
};

export const randomHexColor = (): string => {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, "0")}`;
};

export const toEmojiNumber = (num: number): string => {
  numberError(num, "Please input a valid number to convert to emoji number.");

  const emojiMap: Record<string, string> = {
    "0": "0️⃣",
    "1": "1️⃣",
    "2": "2️⃣",
    "3": "3️⃣",
    "4": "4️⃣",
    "5": "5️⃣",
    "6": "6️⃣",
    "7": "7️⃣",
    "8": "8️⃣",
    "9": "9️⃣",
  };
  return String(num)
    .split("")
    .map((digit) => emojiMap[digit] || digit)
    .join("");
};

export const toHexColor = (r: number, g: number, b: number): string => {
  numberError(r, "Please input a valid red value to convert to hex color.");
  numberError(g, "Please input a valid green value to convert to hex color.");
  numberError(b, "Please input a valid blue value to convert to hex color.");

  return `#${[r, g, b].map((x) => x.toString(16).padStart(2, "0")).join("")}`;
};

export const toRGBColor = (hex: string): string => {
  stringError(hex, "Please input a valid hex color to convert to RGB color.");

  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgb(${r}, ${g}, ${b})`;
};

export const toHSLColor = (r: number, g: number, b: number): string => {
  numberError(r, "Please input a valid red value to convert to HSL color.");
  numberError(g, "Please input a valid green value to convert to HSL color.");
  numberError(b, "Please input a valid blue value to convert to HSL color.");

  (r /= 255), (g /= 255), (b /= 255);
  const max = Math.max(r, g, b),
    min = Math.min(r, g, b);
  let h = 0,
    s,
    l = (max + min) / 2;
  if (max === min) {
    h = s = 0;
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }
  return `hsl(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(
    l * 100,
  )}%)`;
};
