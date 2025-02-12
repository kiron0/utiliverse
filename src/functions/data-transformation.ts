export const toCamelCase = (str: string): string => {
  return str.replace(/[-_]+(.)?/g, (_, c) => (c ? c.toUpperCase() : ""));
};

export const toSnakeCase = (str: string): string => {
  return str.replace(/[A-Z]+/g, (m) => "_" + m.toLowerCase());
};

export const toKebabCase = (str: string): string => {
  return str.replace(/[A-Z]+/g, (m) => "-" + m.toLowerCase());
};

export const toPascalCase = (str: string): string => {
  return str.replace(/[-_]+(.)?/g, (_, c) => (c ? c.toUpperCase() : ""));
};

export const toTitleCase = (str: string): string => {
  return str.replace(/[-_]+(.)?/g, (_, c) => (c ? " " + c.toUpperCase() : ""));
};

export const toSentenceCase = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const toSlug = (str: string): string => {
  return str.toLowerCase().replace(/ /g, "-");
};

export const fromBase64 = (base64: string): string => {
  return Buffer.from(base64, "base64").toString("utf-8");
};

export const fromHex = (hex: string): string => {
  return Buffer.from(hex, "hex").toString("utf-8");
};

export const fromJSON = (json: string): unknown => {
  return JSON.parse(json);
};

export const fromCSV = (csv: string): string[][] => {
  return csv.split("\n").map((row) => row.split(","));
};
