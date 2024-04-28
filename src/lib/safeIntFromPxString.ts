export default function safeIntFromPxString(str: string) {
  if (typeof str === "string" && str.includes("px")) {
    return Number.parseInt(str);
  } else {
    return str;
  }
}
