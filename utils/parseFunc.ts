import { IDataset } from "../types";

const characters = "(),+%$";

function parseNumber(value: string) {
  value = value || "";

  if (value)
    characters.split("").forEach((char) => {
      value = value.replaceAll(char, "");
    });

  return Number(value);
}

parseNumber("0");
export function parseFunc<T>(func: string, fallback: T): T {
  try {
    if (func.includes("function(data)")) {
      return eval(func.replace("function(data)", "data => "));
    }
    if (func.includes("(data) => ")) {
      return eval(func.replace("(data) =>", "data =>"));
    }
    if (func.includes("data => ")) {
      return eval(func);
    }

    const myFunc: T = eval(`data => ${func}`);
    return myFunc;
  } catch (err) {
    return fallback;
  }
}
